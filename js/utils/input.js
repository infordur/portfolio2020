// import { typeSound } from "./js/sound/index.js";
import { typeSound } from "../sound/index.js";
import { pause } from "./utils.js";

// Command History
let commandHistory = getCommandHistory();
let commandHistoryIndex = -1;
let tmp = "";

function addToCommandHistory(cmd) {
    commandHistory = [cmd, ...commandHistory];
    commandHistoryIndex = -1;
    tmp = "";
    try {
        localStorage.setItem("commandHistory", JSON.stringify(commandHistory));
    } catch (error) {
        console.log(error);
    }
}

function getCommandHistory() {
    let storage = localStorage.getItem("commandHistory");
    let commandHistory;
    if (storage) {
        try {
            let json = JSON.parse(storage);
            commandHistory = Array.isArray(json) ? json : [];
        } catch (error) {
            commandHistory = [];
        }
    } else {
        commandHistory = [];
    }
    return commandHistory;
}

function cleanInput(input) {
    return input.toLowerCase().trim();
}

async function input() {
    return new Promise((resolve) => {
        const onKeyDown = (event) => {
            typeSound();
            //ENTER KEY
            if (event.keyCode === 13) {
                event.preventDefault();
                event.target.setAttribute("contenteditable", false);
                let result = cleanInput(event.target.textContent);
                // History
                addToCommandHistory(result);
                resolve(result);
            }
            // UP KEY
            else if (event.keyCode === 38) {
                if (commandHistoryIndex === -1) {
                    tmp = event.target.textContent;
                }
                commandHistoryIndex = Math.min(
                    commandHistory.length - 1,
                    commandHistoryIndex + 1
                );
                let command = commandHistory[commandHistoryIndex];
                event.target.textContent = command;
            }
            // DOWN KEY
            else if (event.code === 40) {
                commandHistoryIndex = Math.max(-1, commandHistoryIndex - 1);
                let command = commandHistory[commandHistoryIndex] || tmp;
                event.target.textContent = text;
            }
        };

        // Add input to terminal
        let terminal = document.querySelector(".terminal");

        let typer = document.querySelector(".typer:last-child");
        let terminal_bar = terminal.querySelector(".ti-cursor");
        let input = document.createElement("span");
        input.setAttribute("id", "input");
        input.setAttribute("contenteditable", true);
        input.addEventListener("keydown", onKeyDown);

        if (!typer) {
            terminal.insertBefore(input, terminal_bar);
        } else {
            typer.insertBefore(input, terminal_bar);
        }
        input.focus();
    });
}

/** Types the given text and asks input */
async function prompt(text) {
    await type(text);
    return input();
}

async function type(
    text,
    {
        typerClass = "",
        speed = 75,
        finalWait = 500,
        useContainer = false,
        loop = false,
        clearContainer = false,
        nextStringDelay = 0,
    } = {},
    container = document.querySelector(".terminal")
) {
    return new Promise(async (resolve) => {
        let typer = useContainer ? container : document.createElement("div");
        typer.classList.add("typer");

        if (typerClass) {
            typer.classList.add(typerClass);
        }

        if (clearContainer) {
            container.innerHTML = "&nbsp;";
        }

        if (!useContainer) {
            container.appendChild(typer);
        }

        // say(text);

        new TypeIt(typer, {
            strings: text,
            speed: speed,
            loop: loop,
            nextStringDelay: nextStringDelay,
            afterComplete: async (step, instance) => {
                instance.destroy();
                await pause(finalWait / 1000);
                resolve();
            },
        }).go();
    });
}

export { input, prompt, type, cleanInput };
