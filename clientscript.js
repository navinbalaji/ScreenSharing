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
const db=firebase.database().ref("two");
 var alice=firebase.database().ref("one");

  navigator.mediaDevices.getUserMedia({
    video:true,audio:true
  }).then(stream=>{
   var peer =new SimplePeer({
    initiator:location.hash==='#1',
    stream:stream,
    trickle:false,
      config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },{
   urls: [ "stun:ss-turn2.xirsys.com" ]
}, {
   username: "u840PZ3UZ_6KZiTJDW6VrXbudvNgccwyue1EqLhZaNAI1RFpRYksztq3TAEppcetAAAAAF_A-7NOYXZpbg==",
   credential: "79d117b4-30b2-11eb-86df-0242ac140004",
   urls: [
       "turn:ss-turn2.xirsys.com:80?transport=udp",
       "turn:ss-turn2.xirsys.com:3478?transport=udp",
       "turn:ss-turn2.xirsys.com:80?transport=tcp",
       "turn:ss-turn2.xirsys.com:3478?transport=tcp",
       "turns:ss-turn2.xirsys.com:443?transport=tcp",
       "turns:ss-turn2.xirsys.com:5349?transport=tcp"
   ]
}] },
  });
   
 peer.onicecandidate=e=>{
  if(e.candidate){
    peer.addIceCandidate(e.candidate);
  }
}

  peer.on("signal",(data)=>{
     alice.set({
      name :"offer",
      sdp:JSON.stringify(data),
     })
     console.log(data);
  })

  document.getElementById("connects").addEventListener("click", function () {
db.on("value",(snapshot)=>{
     var otherId = JSON.parse(snapshot.val().sdp);
     console.log(otherId);
           peer.signal(otherId);
});
    });


peer.on("stream", function (stream) {
      console.log("Streaming");
      document.getElementById('client').srcObject=stream;
    });
  })




