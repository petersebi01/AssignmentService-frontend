import React from 'react';
import Stomp from 'stompjs';

import VideoReceiver from './VideoReceiver';

//import { connect } from 'react-redux';

//import { subscribeToNotifications } from '../../actions/index';

let client;
//let subscription;

class VideoChat extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            receivers: []
        }

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        console.log('Component did mount in vidochat');
        client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', this.videoStream);
    }

    render() {

        let receivers = this.state.receivers;
        if (receivers.length > 0) {
            receivers = receivers.map((receiver, id) => {
                return (
                    <VideoReceiver receiver={receiver} key={id}/>
                );
            })
        }

        return(
            <div>
                <video className="video-sender" ref={this.videoRef} autoPlay></video>
                <ul>{receivers}</ul>
                <VideoReceiver />
            </div>
        );
    }

    videoStream = () => {

        const streamID = `user-re`;

        let sender = new RTCPeerConnection();

        console.log('sender subscribe to receiver-icecandidate');
        client.subscribe(`/topic/videochat-receiver-icecandidate-${streamID}`, (message) => {
            console.log('sender add icecandidate from body(receiver)');
            sender.addIceCandidate(message.body);
        }, {'auto-delete': true});

        console.log('sender media device get user media')
        navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((videoStream) => {
            let video = this.videoRef.current;
            video.srcObject = videoStream;

            videoStream.getTracks((track) => {
                console.log('sender gettrack')
                sender.addTrack(track, videoStream);
            });
            // connecting peers

            sender.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('sender send to sender-icecandidate')
                    client.send(`/topic/videochat-sender-icecandidate-${streamID}`, { 'Content-Type': 'application/json' }, JSON.stringify(event.candidate));
                }
            }

            sender.createOffer().then((offer) => {
                console.log('sender set local description');
                sender.setLocalDescription(offer); // saját leírás
            }).then(() => {
                console.log('sender send to videochat-offer a local description')
                client.send(`/topic/videochat-offer`, { 'Content-Type': 'application/json' }, JSON.stringify(sender.localDescription));
            }).catch((error) => {
                console.log('Unable to connect with the sender');
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });

        console.log('sender subscribe to answerToOffer')
        client.subscribe(`/topic/videochat-answerToOffer-${streamID}`, (message) => {
            console.log('sender set remote description');
            sender.setRemoteDescription(JSON.parse(message.body)).then(() => {
                console.log('connected');
            }).catch((error) => {
                console.log('Unable to connect');
                console.log(error);
            });
        }, {'auto-delete': true});
    }
}

export default VideoChat;