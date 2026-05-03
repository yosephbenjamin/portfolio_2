const loader = document.getElementById("loader");
const page = document.getElementById("page");
const subpage = document.getElementById("subpage");
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll(".menu-item");
const returnBtn = document.getElementById("return");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const INITIAL_HOLD = 1500;
const CLICK_HOLD = 800;

async function playLoader(hold) {
    loader.classList.remove("hidden");
    await wait(hold);
    loader.classList.add("hidden");
    await wait(500);
}

function showHome() {
    subpage.style.transition = "none";
    subpage.classList.add("hidden");
    void subpage.offsetHeight;
    subpage.style.transition = "";
    menu.style.display = "flex";
    page.classList.remove("hidden");
}

function showSubpage(target) {
    const content = document.getElementById("subpage-content");
    if (target === "résumé") {
        content.innerHTML = '<a href="__CV_Yoseph_Benjamin__.pdf" target="_blank" rel="noopener" class="cv-link glitch">&gt;CV</a>';
        attachGlitch(content.querySelector(".cv-link"));
    } else if (target === "get in touch") {
        content.innerHTML = `
            <div class="contact-wrap">
                <div class="contact-icons">
                    <a href="https://www.linkedin.com/in/yoseph-benjamin-54a338200" target="_blank" rel="noopener" class="contact-icon" aria-label="LinkedIn">
                        <span class="contact-caret">&gt;</span>
                        <svg viewBox="0 0 24 24" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="3" fill="#000"/>
                            <path fill="#FFC40C" d="M8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/yosephbenjamin" target="_blank" rel="noopener" class="contact-icon" aria-label="GitHub">
                        <span class="contact-caret">&gt;</span>
                        <svg viewBox="0 0 24 24" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="3" fill="#000"/>
                            <path transform="translate(3.6 3.6) scale(0.7)" fill="#FFC40C" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                    </a>
                </div>
                <a href="mailto:yosephjp.benjamin@gmail.com" class="contact-email">yosephjp.benjamin@gmail.com</a>
            </div>
        `;
    } else {
        content.textContent = "coming this month";
    }
    menu.style.display = "none";
    subpage.classList.remove("hidden");
    page.classList.remove("hidden");
}

async function transitionTo(view, target) {
    page.classList.add("hidden");
    await wait(500);
    await playLoader(CLICK_HOLD);
    if (view === "home") {
        showHome();
    } else {
        showSubpage(target);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    page.classList.add("hidden");
    subpage.classList.add("hidden");
    await wait(INITIAL_HOLD);
    loader.classList.add("hidden");
    await wait(500);
    showHome();
});

menuItems.forEach((item) => {
    item.addEventListener("click", async (e) => {
        e.preventDefault();
        await transitionTo("subpage", item.dataset.target);
    });
});

returnBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await transitionTo("home");
});

const GLITCH_CHARS = "!@#$%^&*?+={}[]<>|/\\~`▦◎▣◉■□●○✦✧※†‡¤§";
const supportsHover = window.matchMedia("(hover: hover)").matches;

function attachGlitch(el) {
    if (!supportsHover || !el) return;
    const original = el.textContent;
    let interval = null;

    const stop = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        el.textContent = original;
    };

    el.addEventListener("mouseenter", () => {
        if (interval) return;
        interval = setInterval(() => {
            let out = "";
            for (let i = 0; i < original.length; i++) {
                const c = original[i];
                if (c === " ") {
                    out += " ";
                } else if (Math.random() < 0.55) {
                    out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                } else {
                    out += c;
                }
            }
            el.textContent = out;
        }, 70);
    });

    el.addEventListener("mouseleave", stop);
    el.addEventListener("click", stop);
}

document.querySelectorAll(".glitch").forEach(attachGlitch);
