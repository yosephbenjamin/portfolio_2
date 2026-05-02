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

function showSubpage() {
    menu.style.display = "none";
    subpage.classList.remove("hidden");
    page.classList.remove("hidden");
}

async function transitionTo(view) {
    page.classList.add("hidden");
    await wait(500);
    await playLoader(CLICK_HOLD);
    if (view === "home") {
        showHome();
    } else {
        showSubpage();
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
        await transitionTo("subpage");
    });
});

returnBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await transitionTo("home");
});

const GLITCH_CHARS = "!@#$%^&*?+={}[]<>|/\\~`▦◎▣◉■□●○✦✧※†‡¤§";
const supportsHover = window.matchMedia("(hover: hover)").matches;

document.querySelectorAll(".glitch").forEach((el) => {
    if (!supportsHover) return;
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
});
