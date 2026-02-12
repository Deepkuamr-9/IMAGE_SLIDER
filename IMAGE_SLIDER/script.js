const status = document.getElementById('status');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const ppIcon = document.getElementById('ppIcon');
const ppLabel = document.getElementById('ppLabel');
const track = document.getElementById('sliderTrack');
const dotsWrap = document.getElementById('dots');


const AUTOPLAY_INTERVAL_MS = 3000;


const images = [
  { src: "https://picsum.photos/id/1015/800/400", alt: "Image 1", caption: "Beautiful landscape" },
  { src: "https://picsum.photos/id/1016/800/400", alt: "Image 2", caption: "Mountain view" },
  { src: "https://picsum.photos/id/1018/800/400", alt: "Image 3", caption: "Calm lake" },
  { src: "https://picsum.photos/id/1025/800/400", alt: "Image 4", caption: "Cute dog" },
  { src: "https://picsum.photos/id/1035/800/400", alt: "Image 5", caption: "City night lights" }
];


let current = 0;
let autoplay = true;
let timerId = null;


function buildSlides() {
  images.forEach((img, idx) => {

    const slide = document.createElement('figure');
    slide.className = 'slide';


    const imageEl = document.createElement('img');
    imageEl.src = img.src; 
    imageEl.alt = img.alt;


    const cap = document.createElement('figcaption');
    cap.className = 'caption'; 
    cap.textContent = img.caption;


    slide.append(imageEl, cap);
    track.appendChild(slide);


    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.addEventListener('click', () => goTo(idx, true));
    dotsWrap.appendChild(dot);
  });
}


function updateUI() {

  track.style.transform = `translateX(${-current * 100}%)`;


  [...dotsWrap.children].forEach((dot, i) =>
    dot.setAttribute('aria-current', i === current ? 'true' : 'false')
  );


  status.textContent = `${current + 1} / ${images.length}`;
}


function goTo(index, user = false) {
  current = (index + images.length) % images.length; // wrap around
  updateUI();


  if (user && autoplay) restartAutoplay();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }


function startAutoplay() {
  stopAutoplay();
  if (!autoplay) return;
  timerId = setInterval(next, AUTOPLAY_INTERVAL_MS);
  ppIcon.textContent = '❚❚'; 
  ppLabel.textContent = 'Pause';
}

function stopAutoplay() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  ppIcon.textContent = '▶'; 
  ppLabel.textContent = 'Play';
}

function restartAutoplay() {
  if (autoplay) {
    stopAutoplay();
    startAutoplay();
  }
}


prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

playPauseBtn.addEventListener('click', () => {
  autoplay = !autoplay;
  autoplay ? startAutoplay() : stopAutoplay();
});


window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});


(function init() {
  buildSlides();
  goTo(0);
  if (autoplay) startAutoplay();
})();
