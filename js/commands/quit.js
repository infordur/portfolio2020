import { click } from "../sound/index.js";
import { showTemplateScreen, clear, pause } from "../utils/utils.js";
import { boot } from "../main.js";

async function waitForKey() {
    return new Promise((resolve) => {
        const eventHandle = () => {
            document.removeEventListener("keyup", eventHandle);
            document.removeEventListener("click", eventHandle);
            resolve();
        };

        document.addEventListener("keyup", eventHandle);
        document.addEventListener("click", eventHandle);
    });
}

/** Turn off the terminal */
async function off() {
    click();
    power(false);

    clear();
    await pause(2);
    return new Promise(async (resolve) => {
        // Logo
        let screen = await showTemplateScreen("logo");

        await waitForKey();
        power(true);
        screen.remove();

        boot();
        resolve();
    });
}

async function power(on = true) {
    await pause(0.1);

    document.querySelector(".crt").classList.toggle("turn-off", !on);
    document.querySelector(".crt").classList.toggle("off", !on);
    return;
}

const template = "quit";
const output = "Bye...";

export default off;

export { output, template };
