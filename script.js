// --- 1. Playlist Logic (Starts from beginning) ---
let audioStarted = false;
const tracks = [
    document.getElementById('track1'),
    document.getElementById('track2'),
    document.getElementById('track3')
];

function startPlaylist() {
    if (audioStarted) return; // Prevent restarting if already playing
    audioStarted = true;
    playTrack(0);
}

function playTrack(index) {
    if (index >= tracks.length) {
        playTrack(0); // Loop back to song 1
        return;
    }

    tracks[index].play().catch(error => {
        // If browser blocks, we wait for the body click
        audioStarted = false; 
    });

    tracks[index].onended = function() {
        playTrack(index + 1);
    };
}

// Auto-attempt to play on load
window.addEventListener('load', () => {
    startPlaylist();
});

// --- 2. Background Emojis ---
const bgContainer = document.querySelector('.bg-elements');
const emojis = ['❤️', '🥰','🤗','🤗','💖', '✨', '🌸', '🎈', '🍬','🥰'];

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

// --- 3. Navigation & Interaction ---
function nextScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen${screenNum}`);
    if(target) target.classList.add('active');
}

setTimeout(() => nextScreen(2), 3500);

let cakeStep = 0;
function handleCake() {
    const btn = document.getElementById('cake-action-btn');
    const status = document.getElementById('cake-status');
    const candle = document.getElementById('candle');
    const flame = document.querySelector('.flame');
    const cakeImg = document.getElementById('cake-img');

    if (cakeStep === 0) {
        candle.classList.remove('hidden');
        status.innerText = "Needs some light! ✨";
        btn.innerText = "Light the Candle";
        cakeStep++;
    } else if (cakeStep === 1) {
        flame.classList.remove('hidden');
        status.innerText = "Make a wish! 🎂";
        btn.innerText = "Cut the Cake";
        cakeStep++;
    } else if (cakeStep === 2) {
        cakeImg.src = "pic2.jpeg"; 
        cakeImg.style.transform = "scale(1.1) rotate(-5deg)";
        candle.classList.add('hidden');
        status.innerText = "Yummy! Best day ever!";
        btn.innerText = "Pop some balloons! →";
        cakeStep++;
    } else {
        nextScreen(4);
    }
}

// Balloon Logic
let poppedCount = 0;
const messages = ["You", "are", "the", "Best Bacha!"];
function pop(el, index) {
    if(el.style.visibility === 'hidden') return;
    el.style.visibility = 'hidden';
    const msgContainer = document.getElementById('balloon-msg');
    const span = document.createElement('span');
    span.innerText = messages[poppedCount] + " ";
    span.style.fontWeight = "bold";
    span.style.color = "#d81b60";
    msgContainer.appendChild(span);
    poppedCount++;
    if(poppedCount === 4) document.getElementById('ball-next').classList.remove('hidden');
}