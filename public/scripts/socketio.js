const socket = io()
const myPeer = new Peer({
    secure: true,
    host: 'ab-dev-peerjs-server.herokuapp.com',
    port: 443,
    config: {
        'iceServers': [{
                url: 'stun:stun.l.google.com:19302'
            },
            // {
            //     url: 'turn:numb.viagenie.ca',
            //     credential: 'muazkh',
            //     username: 'webrtc@live.com'
            // },
            {
                url: 'turn:192.158.29.39:3478?transport=udp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            },
            // {
            //     url: 'turn:192.158.29.39:3478?transport=tcp',
            //     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            //     username: '28224511:1379330808'
            // }
        ]
    }
})

const userName = 'test1' //prompt('enter your user name')
let myVideoStream
const videoElement = document.createElement('video')
const peers = {}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream
    addVideoStream(videoElement, stream);
})

function addVideoStream(video, stream) {
    console.log("attemoting to add vid")
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    document.getElementById('video-grid').append(video)
    console.log('vid added')
}

myPeer.on('open', myPeerId => {
    console.log(myPeerId)
    console.log(roomId + " " + myPeerId + " " + userName)
    socket.emit("new user", roomId, myPeerId, userName)
})

socket.on('new peer', (otherPeerId, otheruserName) => {
    console.log("new peer metadata : " + otherPeerId + "    " + otheruserName)
    console.log(otherPeerId)
    makeCall(otherPeerId)
})

function makeCall(otherPeerId) {
    console.log("calling " + otherPeerId)
    var call = myPeer.call(otherPeerId, myVideoStream);
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        console.log("call answered and recieving others sream " + otherPeerId)
        addVideoStream(video, userVideoStream)

    })
    call.on('close', () => {
        console.log("disconnected with user : " + otherPeerId)
        video.remove()
    })
    peers[otherPeerId] = call
}

myPeer.on('call', call => {
    // Answer the call, providing our mediaStream
    call.answer(myVideoStream);
    const video = document.createElement('video')
    console.log("answereing call")
    call.on('stream', otherVideoStream => {
        addVideoStream(video, otherVideoStream)
    })
});

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
    console.log('call closed with ' + userId)
})