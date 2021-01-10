
function  join() {
 var firebaseConfig = {
    apiKey: "AIzaSyDB7IpigwfbRruuuhEq_XfSX6IluW1MjnU",
    authDomain: "screenshare-a5a64.firebaseapp.com",
    databaseURL: "https://screenshare-a5a64.firebaseio.com",
    projectId: "screenshare-a5a64",
    storageBucket: "screenshare-a5a64.appspot.com",
    messagingSenderId: "690363778484",
    appId: "1:690363778484:web:91ebb8cae7a8dcb8441ee1",
    measurementId: "G-Y1EKXLWLXN"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
const db=firebase.database().ref("one");
 var bob=firebase.database().ref("two");

 try{

let str2=navigator.mediaDevices["getDisplayMedia"]({
  video:true,audio:false,
})

str2.then( stream=>{
 var peer =new SimplePeer({
    initiator:location.hash==='#1',
    stream:stream,
    trickle:false,
      config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] },
  });

 peer.onicecandidate=e=>{
  if(e.candidate){
    peer.addIceCandidate(e.candidate);
  }
}


// var rec_id;
// if(receivername==null|| receivername==undefined){
//   rec_id="anonymous";
// }else{
//   rec_id=receivername;
// }
 //peer.replaceTrack(localStream.getVideoTracks()[0], stream.getVideoTracks()[0], localStream);
 //peer.replaceTrack(stream.getVideoTracks()[0],,stream);
  peer.on("signal",(data)=>{
     bob.set({
      name:"answer",
      sdp:JSON.stringify(data),
     })
  })

  document.getElementById("connect").addEventListener("click", function () {
db.on("value",(snapshot)=>{
     var otherId = JSON.parse(snapshot.val().sdp);
           peer.signal(otherId);
});
    });
peer.on("stream", function (stream) {
      console.log("Streaming");
      // let myVidePlayer = document.createElement("video");
      // document.body.appendChild(myVidePlayer);
      // var mediaStream = new MediaStream(stream);
      // myVidePlayer.srcObject = mediaStream;
      // myVidePlayer.play();
      console.log(stream);
       document.getElementById('receiver').srcObject=stream;
    });

 let mediaRecorder=new MediaRecorder(stream);
    let start=document.getElementById('start');
    let stop=document.getElementById('stop');
    let saved=document.getElementById('finalmovies');
         let chunks=[];
    start.addEventListener('click',(ev)=>{
      mediaRecorder.start();
      console.log(mediaRecorder.state);
    });
    stop.addEventListener('click',(ev)=>{
      mediaRecorder.stop();
    })

    mediaRecorder.ondataavailable=(ev)=>{
            chunks.push(ev.data);
    }

    mediaRecorder.onstop=(ev)=>{
      let blob=new Blob(chunks,{ 'type':'video/mp4;'});
             chunks=[];
             let videoURL=window.URL.createObjectURL(blob);
             saved.src=videoURL;
    }
});
 }catch(err){
  console.log(err)
 }
}


function joinclose(){
  // window.close();
    // window.location="index.html";
    window.location.replace("index.html");
}

