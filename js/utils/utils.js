async function addTemplate(id, container, options = {}) {
    let template = document.querySelector(`template#${id}`);
    if (!template) {
        throw Error("Template not found");
    }

    // Create a clone of a node from a external document
    let clone = document.importNode(template.content, true);

    if (template.dataset.type) {
        await type(clone.textContent, options, container);
    } else {
        container.appendChild(clone);
    }

    return container.childNodes;
}

function addClasses(element, ...classes) {
    let list = [...classes].filter(Boolean);
    element.classList.add(...list);
}

function getScreen(...cls) {
    let div = document.createElement("div");
    addClasses(div, "fullscreen", ...cls);
    document.querySelector(".crt").appendChild(div);
    return div;
}

// Create new Screen and load template by id
async function showTemplateScreen(id) {
    let screen = getScreen(id);
    await addTemplate(id, screen);
    return screen;
}

// Clear the screen
function clear(container = document.querySelector(".terminal")) {
    container.innerHTML = "";
}

// Pause X seconds
async function pause(seg = 1) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * Number(seg)));
}

// Transform text to audio
function say(text, pitch = 1, rate = 1, volume = 0) {
    if (volume === 0) {
        return;
    }
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    if (synth.speaking) {
        synth.pause();
        synth.cancel();
    }

    let spokenText = text;
    if (Array.isArray(spokenText)) {
        spokenText = spokenText.join(".");
    }
    let speech = new SpeechSynthesisUtterance(spokenText);
    speech.voice = voices[0];
    speech.pitch = pitch;
    speech.rate = rate;
    speech.volume = volume;
    speech.lang = "es-ES";
    synth.speak(speech);
}

export {
    addTemplate,
    addClasses,
    getScreen,
    showTemplateScreen,
    clear,
    pause,
    say,
};
