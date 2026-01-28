// 1. Playlist Logic (Starts on body click)
let audioStarted = false;
const tracks = [
    document.getElementById('track1'),
    document.getElementById('track2'),
    document.getElementById('track3')
];

function startPlaylist() {
    if (audioStarted) return; 
    audioStarted = true;
    playTrack(0);
}

function playTrack(index) {
    if (index >= tracks.length) {
        playTrack(0); // Loop back
        return;
    }
    tracks[index].play().catch(() => { audioStarted = false; });
    tracks[index].onended = () => playTrack(index + 1);
}

// 2. Background Animation
const bgContainer = document.querySelector('.bg-elements');
const emojis = ['❤️', '🥰','🤗','💖', '✨', '🌸', '🎈', '🍬'];

function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-item';
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.animationDuration = (Math.random() * 3 + 4) + 's';
    emoji.style.fontSize = (Math.random() * 10 + 20) + 'px';
    bgContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
}
setInterval(createFloatingEmoji, 600);

// 3. Navigation
function nextScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen${screenNum}`);
    if(target) target.classList.add('active');
}
setTimeout(() => nextScreen(2), 3500);

// 4. Interaction Logic
let cakeStep = 0;
function handleCake() {
    const btn = document.getElementById('cake-action-btn');
    const status = document.getElementById('cake-status');
    if (cakeStep === 0) {
        document.getElementById('candle').classList.remove('hidden');
        status.innerText = "Needs some light! ✨";
        btn.innerText = "Light the Candle";
    } else if (cakeStep === 1) {
        document.querySelector('.flame').classList.remove('hidden');
        status.innerText = "Make a wish! 🎂";
        btn.innerText = "Cut the Cake";
    } else if (cakeStep === 2) {
        document.getElementById('cake-img').src = "pic2.jpeg"; 
        document.getElementById('candle').classList.add('hidden');
        status.innerText = "Yummy! Best day ever!";
        btn.innerText = "Pop some balloons! →";
    } else {
        nextScreen(4);
    }
    cakeStep++;
}

let poppedCount = 0;
const messages = ["You", "are", "the", "Best Bacha!"];
function pop(el) {
    if(el.style.visibility === 'hidden') return;
    el.style.visibility = 'hidden';
    const span = document.createElement('span');
    span.innerText = messages[poppedCount] + " ";
    document.getElementById('balloon-msg').appendChild(span);
    poppedCount++;
    if(poppedCount === 4) document.getElementById('ball-next').classList.remove('hidden');
}
