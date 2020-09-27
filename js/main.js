import { clear, pause } from "./utils/utils.js";
import { input, prompt, type, cleanInput } from "./utils/input.js";

async function loadTemplate(path) {
    let txt = await fetch(path).then((res) => res.text());
    let html = new DOMParser().parseFromString(txt, "text/html");
    let templates = html.querySelectorAll("template");

    templates.forEach((template) => {
        document.head.appendChild(template);
    });
}

async function parseCommand(input) {
    input = cleanInput(input);

    if (!input) {
        return;
    }

    // Only allow words
    let input_matches = String(input).match(
        /^(\w+)(?:\s((?:\w+(?:\s\w+)*)))?$/
    );
    if (!input_matches) {
        throw new Error("Invalid command");
    }
    let command = input_matches[1];
    let args = input_matches[2];

    let module;
    // Import command functions
    try {
        module = await import(`./commands/${command}.js`);
    } catch (error) {
        if (error instanceof TypeError) {
            return await type(["Unknown command", "> "]);
        } else {
            return await type([
                "Error while executing command",
                "Try again",
                "> ",
            ]);
        }
    }

    // Type text if the command file has the var (output)
    if (module && module.output) {
        await pause();
        await type(module.output);
    }

    // Try to import and parse any HTML templates that the command module exports
    if (module && module.template) {
        await loadTemplate(`./js/templates/${module.template}.html`);
    }

    // Execute command function
    if (module.default) {
        await pause();
        await module.default(args);
    }

    module = null;

    return;
}

async function main() {
    let command = await input();
    try {
        await parseCommand(command);
    } catch (error) {
        if (error.message) {
            await type(error.message);
        }
    }
    main();
}

async function login() {
    clear();

    let user = await prompt(["WHO ARE YOU?:", "> "]);

    if (user) {
        await pause();
        clear();
        await type([
            `Welcome to the system ${user}`,
            `COPYRIGHT © ${new Date().getFullYear()} - Pablo Durán`,
            " ",
            "To see available commands type: HELP",
            " ",
            "> ",
        ]);
        return main();
    } else {
        await pause();
        clear();
        return login();
    }
}

function handleClick(event) {
    if (event) {
        event.preventDefault();
    }
    let input = document.querySelector("[contenteditable='true']");
    if (input) {
        input.focus();
    }
}

async function boot() {
    clear();
    await type([
        "Welcome to Pablo Durán (PDT) terminal",
        " ",
        "> SET TERMINAL/BOOT",
        "Loading........................",
        "Please wait........",
        "..........",
        "...",
        ".",
        "OK.",
        " ",
        "> SET TERMINAL/LOGON",
        "USER AUTHENTICATION CHECK",
    ]);

    // Fix click writer
    const crt = document.querySelector(".crt");
    crt.addEventListener("click", handleClick);

    await pause();
    return login();
}

boot();

export { login, boot };
