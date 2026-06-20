/* audio.js
   Shared script — include this on ALL THREE pages: home.html, photos.html, ending.html
   Keeps the background song playing continuously as the user moves between pages.

   Requires each page to have:
   <audio id="bgMusic" src="song.mp3" loop preload="auto"></audio>
*/

const bgMusic = document.getElementById('bgMusic');

// Runs the moment a page loads — resumes the song from wherever
// it was left on the PREVIOUS page (if anywhere).
window.addEventListener('DOMContentLoaded', () => {
    const savedTime = sessionStorage.getItem('audioTime');
    const wasPlaying = sessionStorage.getItem('audioPlaying') === 'true';

    if (savedTime !== null) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    if (wasPlaying) {
        bgMusic.play().catch(() => {
            // If the browser blocks it, resume on the next tap anywhere on the page.
            document.addEventListener('click', () => bgMusic.play(), { once: true });
        });
    }
});

// Runs right before leaving the page — saves the exact second the song
// was at, so the next page can pick up from there instead of restarting.
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('audioTime', bgMusic.currentTime);
    sessionStorage.setItem('audioPlaying', String(!bgMusic.paused));
});