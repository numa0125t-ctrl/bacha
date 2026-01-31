// --- 0. Password Logic ---
function checkPassword() {
    const userPass = prompt("Enter the secret code to open your surprise(Hint 4digits pin):");
    if (userPass === "0102") {
        document.getElementById('main-content').classList.remove('hidden');
        startPlaylist();
    } else {
        alert("Incorrect code! Locked.");
        location.reload();
    }
}
window.onload = checkPassword;

// --- 1. Playlist Logic ---
let audioStarted = false;
const tracks = [document.getElementById('track1'), document.getElementById('track2'), document.getElementById('track3')];
function startPlaylist() {
    if (audioStarted) return;
    audioStarted = true;
    function playTrack(index) {
        if (index >= tracks.length) index = 0;
        tracks[index].play().catch(() => { audioStarted = false; });
        tracks[index].onended = () => playTrack(index + 1);
    }
    playTrack(0);
}

// --- 2. Navigation ---
function nextScreen(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen${num}`).classList.add('active');
}
// Removed the auto-timer since we now have a button on the first slide!

// --- 3. Cake Logic ---
let cakeStep = 0;
function handleCake() {
    const candle = document.getElementById('candle');
    const flame = document.querySelector('.flame');
    const btn = document.getElementById('cake-action-btn');
    if (cakeStep === 0) {
        candle.classList.remove('hidden');
        btn.innerText = "Light Candle";
    } else if (cakeStep === 1) {
        flame.classList.remove('hidden');
        btn.innerText = "Cut the Cake";
    } else if (cakeStep === 2) {
        document.getElementById('cake-img').src = "pic2.jpeg";
        candle.classList.add('hidden');
        btn.innerText = "See Moments →";
    } else { nextScreen(4); }
    cakeStep++;
}

// --- 4. Balloons ---
let popped = 0;
const messages = ["You", "are", "the", "Best Bacha!"];
function pop(el) {
    if(el.style.visibility === 'hidden') return;
    el.style.visibility = 'hidden';
    const span = document.createElement('span');
    span.innerText = messages[popped] + " ";
    document.getElementById('balloon-msg').appendChild(span);
    popped++;
    if(popped === 4) {
        document.getElementById('bacha-pic').classList.remove('hidden'); // SHOWS THE PIC
        document.getElementById('ball-next').classList.remove('hidden');
    }
}

function createEmoji() {
    const emojis = ['❤️', '🥰', '💖', '✨', '🌸'];
    const el = document.createElement('div');
    el.className = 'floating-item';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + '%';
    document.querySelector('.bg-elements').appendChild(el);
    setTimeout(() => el.remove(), 6000);
}
setInterval(createEmoji, 750);

