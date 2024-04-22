<template>
    <div>
<h1>JS drump kit</h1>
<h1>Sound Pad in Javascript</h1>
<div class="keys">
    <div data-key="65" class="key"><kbd>A</kbd><span class="sound">Clap</span></div>
    <div data-key="83" class="key"><kbd>S</kbd><span class="sound">Hi Hat</span></div>
    <div data-key="68" class="key"><kbd>D</kbd><span class="sound">Kick</span></div>
    <div data-key="70" class="key"><kbd>F</kbd><span class="sound">Open Hat</span></div>
    <div data-key="71" class="key"><kbd>G</kbd><span class="sound">Boom</span></div>
    <div data-key="72" class="key"><kbd>H</kbd><span class="sound">Ride</span></div>
    <div data-key="74" class="key"><kbd>J</kbd><span class="sound">Snare</span></div>
    <div data-key="75" class="key"><kbd>K</kbd><span class="sound">Tom</span></div>
    <div data-key="76" class="key"><kbd>L</kbd><span class="sound">Tink</span></div>
</div>

<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/clap.wav" data-key="83"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/hihat.wav" data-key="68"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/kick.wav" data-key="70"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/openhat.wav" data-key="65"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/boom.wav" data-key="71"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/ride.wav" data-key="72"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/snare.wav" data-key="74"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/tom.wav" data-key="75"></audio>
<audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/tink.wav" data-key="76"></audio>


    </div>
</template>

<script setup lang="ts">
window.addEventListener('keydown', playSound);

// To add!!!
// window.addEventListener('click', playSound); play sound on click

function playSound(e){
    console.log('e: ', e);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log('audio: ', audio);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    console.log('key: ', key);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e){
    if(e.propertyName !== 'box-shadow') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Bree+Serif');
body {
  font-family: 'Bree Serif';
  margin: 0;
  text-align: center;
  color: #fff; /* remove this later */
  background-color: #1d1e22;
}
.keys { 
  margin:0 auto;
  max-width: 600px;
  overflow: hidden;
  cursor: pointer;
}
.key {
    width: 160px;
    height: 160px;
    margin: 20px;
    float: left;
    transition: all .07s;
    border-radius: 5px;
    background: rgb(240,249,255);
    background: radial-gradient(ellipse at center, rgba(240,249,255,1) 0%,rgba(99, 99, 99,1) 100%);
}
.playing {
    box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.3);
    background: rgb(240,249,255);
    background: radial-gradient(ellipse at center, rgba(240,249,255,1) 0%,rgba(0,180,227,1) 100%);
}

kbd {
  display: block;
  padding-top: 30px;
  font-size: 60px;
  color: transparent;
  text-shadow: 1px 1px 2px #fff;
}

</style>