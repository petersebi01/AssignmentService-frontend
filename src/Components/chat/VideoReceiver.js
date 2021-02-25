import React from 'react';
import Stomp from 'stompjs';

//import { connect } from 'react-redux';

//import { subscribeToNotifications } from '../../actions/index';

let client;
//let subscription;

class VideoReceiver extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
        this.videoRef = React.createRef()
    }

    componentDidMount(){
        console.log('receiver connect to broker')
        client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', this.receiverStream);  
    }
    render() {
        return(
            <div>
                <video className="video-receiver" ref={this.videoRef} autoPlay></video>
            </div>
        );
    }

    receiverStream = () => {

        const streamID = `user-re`;

        console.log('receiver subscribe to videochat-offer')
        client.subscribe('/topic/videochat-offer', (message) => {
            // connecting peers
            let receiver = new RTCPeerConnection();

            console.log('receiver subscribe to sender icecandidate')
            client.subscribe(`/topic/videochat-sender-icecandidate-${streamID}`, (message) => {
                console.log('receiver add icecandidate from body(sender)')
                receiver.addIceCandidate(message.body);
            }, {'auto-delete': true});
            
            receiver.onicecandidate = (event) => {
                if (event.candidate){
                    console.log('receiver send receiver-icecandidate')
                    client.send(`/topic/videochat-receiver-icecandidate-${streamID}`, { 'auto-delete': true }, JSON.stringify(event.candidate));
                }
            }
            console.log(message.body);
            receiver.setRemoteDescription(JSON.parse(message.body)).then(() => {
                console.log('receiver create answer')
                receiver.createAnswer();
            }).then((answer) => {
                console.log('receiver set localdescription')
                receiver.setLocalDescription(answer);
            }).then(() => {
                console.log('receiver send answerToOffer')
                client.send(`/topic/videochat-answerToOffer-${streamID}`, { 'Content-Type': 'application/json', 'auto-delete': true }, JSON.stringify(receiver.localDescription));
            }).catch((error) => {
                console.log('Unable to connect with the receiver');
                console.log(error);
            });

            console.log('receiver ontrack,??? the last move')
            receiver.ontrack = (track) => {
                console.log('receiver ontrack')
                let video = this.videoRef.current;
                [video.srcObject] = track.streams;
            }
        });
    }
}

export default VideoReceiver;