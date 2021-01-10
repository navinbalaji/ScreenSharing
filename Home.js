 function startsharing() {
  window.location="caller.html#1";
 }
    function joinsharing() {
  window.location="Receiver.html";
 }
       	let button = document.querySelector('#dark')
button.addEventListener('click', ()=>{

let darkvalue=document.getElementById('dark').innerText;
  	if(darkvalue==="nights_stay"){
         document.getElementById('dark').innerText="wb_sunny";
  	}else if(darkvalue==="wb_sunny"){
        document.getElementById('dark').innerText="nights_stay";
  	}
  document.documentElement.classList.toggle('dark-mode');

  document.querySelectorAll('.inverted').forEach( (result)=>{
  	result.classList.toggle('invert');
  })
})


