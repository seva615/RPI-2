const nextButton = document.getElementById('next_button');
const prevButton = document.getElementById('prev_button');
const playButton = document.getElementById('play_button');
const slideImage = document.getElementById('slider_images');
const interval = 3000;

let slideId;
let currentIndex;
let playing;

const arrOfImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
const base = 'images/';


if (localStorage.getItem("backNum") == null) {
    localStorage.setItem("backNum", '0');
}
currentIndex = localStorage.getItem("backNum");
if (localStorage.getItem("isPlaying") == null) {
    localStorage.setItem("isPlaying", 'false');
}
playing = localStorage.getItem("isPlaying");


const startSlide = () => {
    slideId = setInterval(() => {
        moveToNextSlide();
    }, interval);
};

checkAutoPlay();
makeDots();
updateBack();

const dots = document.querySelectorAll('.dot');
let activeDotNum = currentIndex;

dots.forEach((dot, idx) => {
    dot.setAttribute('data-num', idx);

    dot.addEventListener('click', (e) => {
        currentIndex = e.target.dataset.num;
        updateDots();
    });
});

function checkAutoPlay() {
    if (playing === 'true') {
        localStorage.setItem("isPlaying", "true");
        playButton.innerText = 'Stop';
        startSlide();
    } else {
        localStorage.setItem("isPlaying", "false");
        playButton.innerText = 'Start';
        clearInterval(slideId);
    }
}

function updateDots() {
    if (currentIndex === activeDotNum) {
        return;
    } else {
        dots[activeDotNum].classList.remove('active');
        dots[currentIndex].classList.add('active');
        activeDotNum = currentIndex;
        updateBack();
    }
}

function makeDots() {
    let dotWrapper = document.getElementById('dots');
    for (let i = 0; i < arrOfImages.length; i++) {
        let dot = document.createElement('button');
        dot.classList.add('dot');
        if (i == currentIndex) {
            dot.classList.add('active');
        }
        dotWrapper.appendChild(dot);
    }
}

function checkForPlaying() {
    if (playing === 'true') {
        localStorage.setItem("isPlaying", "false");
        playButton.innerText = 'Start';
        clearInterval(slideId);
        playing = 'false';
    }
}

document.addEventListener('click', ev => {
    if (ev.target === playButton) {
        if (playing === 'false') {
            playing = 'true';
            localStorage.setItem("isPlaying", "true");
            playButton.innerText = 'Stop';
            startSlide();
        } else {
            localStorage.setItem("isPlaying", "false");
            playButton.innerText = 'Start';
            clearInterval(slideId);
            playing = 'false';
        }
    }
    if (ev.target === nextButton) {
        checkForPlaying()
        if (currentIndex == 4) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateBack();
        updateDots();
        nextButton.disabled = true;
        setTimeout(function () {
            nextButton.disabled = false;
        }, 1000);
    }

    if (ev.target === prevButton) {
        checkForPlaying()
        if (currentIndex == 0) {
            currentIndex = 4;
        } else {
            currentIndex--;
        }
        updateBack();
        updateDots();
        prevButton.disabled = true;
        setTimeout(function () {
            prevButton.disabled = false;
        }, 1000);
    }

});


document.addEventListener('keydown', ev => {
    if (ev.code === 'ArrowRight') {
        nextButton.click();
    };

    if (ev.code === 'ArrowLeft') {
        prevButton.click();
    };

    if (ev.code === 'Escape') {
        window.close();
    };

    if (ev.code === 'Space') {
        playButton.click();
    };
});

function moveToNextSlide() {
    if (currentIndex === 4) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updateBack();
    updateDots();
}

function updateBack() {
    const src = base + arrOfImages[currentIndex];
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        slideImage.style.backgroundImage = `url(${src})`;
    };
    localStorage.setItem("backNum", currentIndex);
}
