const container = document.querySelector(".carousel-tech"); 
const skills = Array.from(container.querySelectorAll(".skill"));

const styles = window.getComputedStyle(container);
const gap = parseFloat(styles.gap) || 0;

const skillWidth = skills[0].clientWidth;
const stepWidth = skillWidth + gap; 

const frame = container.parentElement;
const frameWidth = frame.clientWidth;
const centerOffset = frameWidth / 2 - skillWidth / 2;

const sideNumberItems = Math.floor((frameWidth - skillWidth) / stepWidth / 2); 
let currIndex = 0; 
let offset = 0; 

function getVisibleSkills(skills, currIndex, sideCount) {
    const total = skills.length;
    const visible = [];

    for (let i = -sideCount; i <= sideCount; i++) {
        const idx = (currIndex + i + skills.length) % skills.length; // wrap around
        visible.push(skills[idx]);
    }

    return visible;
}

function renderCarousel(currIndex, offset) {
    const visibleSkills = getVisibleSkills(skills, currIndex, sideNumberItems);

    const startX = centerOffset - stepWidth * sideNumberItems - offset;

    skills.forEach(skill => {
        skill.style.display = "none";
    });

    visibleSkills.forEach((skill, i) => {
        skill.style.display = "block";
        skill.style.position = "absolute";
        skill.style.top = "0px";
        skill.style.left = `${startX + i * stepWidth + gap / 2}px`;
    });

    highlightMiddle();
}

function highlightMiddle() {
    skills.forEach(s => s.classList.remove("highlight"));
    skills[currIndex].classList.add("highlight");
}

const speed = 0.5; // pixels per frame
let lastTime = null;

function animate(time) {
    if (lastTime !== null) {
        const delta = time - lastTime;
        offset += speed * (delta / 16); 

        if (offset >= stepWidth) {
            offset -= stepWidth;
            currIndex = (currIndex + 1) % skills.length;
        }
    }

    renderCarousel(currIndex, offset);
    lastTime = time;
    requestAnimationFrame(animate); // recursion
}

requestAnimationFrame(animate);
