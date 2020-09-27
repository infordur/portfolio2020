import { type } from "../utils/input.js";

const jokes = [
    [
        "- ¿Por qué las focas del circo miran siempre hacia arriba?",
        "- Porque es donde están los focos.",
        "> ",
    ],
    [
        "- ¡Estás obsesionado con la comida!",
        "- No sé a que te refieres croquetamente.",
        "> ",
    ],
    ["- ¿Sabes cómo se queda un mago después de comer?", "- Magordito", "> "],
    [
        "- Pongame un café con leche corto.",
        "- Se me ha roto la máquina, cambio.",
        "> ",
    ],
    [
        "- Buenos días, quería una camiseta de un personaje inspirador.",
        "- ¿Ghandi? ",
        "- No, mediani.",
        "> ",
    ],
    ["- ¿Dónde cuelga Superman su supercapa?", "- En superchero", "> "],
    [
        "- ¡Me acaba de picar una serpiente!",
        "- ¿Cobra?",
        "- ¡No, idiota, lo ha hecho gratis!",
        "> ",
    ],
    ["- ¿Qué es un pez en un cine?", "- Un mero espectador", "> "],
    [
        "- ¿Por qué se suicidó el libro de matemáticas?",
        "- Porque tenía muchos problemas.",
        "> ",
    ],
    [
        "- ¿Qué le dice un pingüino a una pingüina?",
        "- ¡Cómo tú ningüina!",
        "> ",
    ],
    [
        "Sí los zombies se deshacen con el paso del tiempo...",
        "¿zombiodegradables?",
        "> ",
    ],
    ["- ¿Cómo se llama el primo vegano de Bruce Lee?", "- Broco Lee.", "> "],
    ["- Soy celíaca.", "- Encantado, yo Antoniaco.", "> "],
    ["- ¿Qué hace un perro con un taladro?", "- Taladrando", "> "],
    [
        "- ¿Sabes por qué no se puede discutir con un DJ?",
        "- Porque siempre están cambiando de tema.",
        "> ",
    ],
    [
        "- ¿Por qué los adivinos no pueden tener hijos?",
        "- Porque tienen las bolas de cristal.",
        "> ",
    ],
    ["- Doctor, soy asmático, ¿es grave?", "- No amigo, es esdrújula.", "> "],
    [
        "- ¿De qué se quejan siempre los astronautas?",
        "- De falta de espacio.",
        "> ",
    ],
    [
        "- ¿Qué le dice una impresora a otra?",
        "- Esa hoja es tuya o es impresión mia.",
        "> ",
    ],
    [
        "- Doctor, tengo todo el cuerpo cubierto de pelo. ¿Qué padezco?",
        "- Padece uzté un ozito.",
        "> ",
    ],
    [
        "- ¿Cuánto cuesta alquilar un coche?",
        "- Depende del tiempo.",
        "- Vale, pongamos que llueve.",
        "> ",
    ],
    [
        "Un hombre entra en un restaurante y el camarero le pregunta:",
        "- ¿Vino blanco el señor?",
        "- No ha sido al ver los precios.",
        "> ",
    ],
    ["- ¿Sabes que le dice un .gif a un .jpg?", "- ¡Anímate hombre!", "> "],
    [
        "- Andresito, ¿qué planeta va después de Marte?",
        "- Miércole, profe.",
        "> ",
    ],
    [
        "Van dos ciegos y le dice uno al otro:",
        "- Ojalá lloviera.",
        "- Ojalá yo también.",
    ],
    ["- Qué es un pelo en una cama?", "- Un bello durmiente.", "> "],
    [
        "- Señora, disculpe pero su vuelo se ha demorado.",
        "- ¡Ay, que emoción, es mi color favorito!",
        "> ",
    ],
    [
        "- Ha cometido usted un crimen matemático.",
        "- Pues, lo asumo.",
        "- Pues, lo arresto.",
        "> ",
    ],
    [
        "- ¿Por qué los patos no tienen amigos?",
        "- Porque son muy antipáticos",
        "> ",
    ],
    [
        "- Ramón, si supieras que voy a morir mañana, ¿qué me dirías hoy?",
        "- ¿Me prestas 1000 euros, y mañana te los devuelvo?",
        "> ",
    ],
    ["- ¿Cómo se despiden los químicos?", "- Ácido un placer", "> "],
    [
        "- ¡Soldado Miralles!",
        "- ¡Sí, mi capitán! ",
        "- No lo vi ayer en la prueba de camuflaje. ",
        "- ¡Gracias, mi capitán!",
        "> ",
    ],
    [
        "- Soy experto en jeroglíficos.",
        "- Pues échale un vistazo al mío, que no enfría bien.",
        "> ",
    ],
    [
        "- Jesús, ¿qué tal la última cena? ¿Salió cara?",
        "- Qué va, salió cruz.",
        "> ",
    ],
    [
        "- Cariño, ¿Tengo la nariz grande?",
        "- No, tienes una nariz común",
        "- ¿Ah, si?",
        "- Sí, ¡común tucán!",
        "> ",
    ],
    [
        "- Íbamos yo y Nacho.",
        "- No hijo, íbamos Nacho y yo.",
        "- ¿Cómo? ¿Entonces yo no iba?",
        "> ",
    ],
    [
        "- ¡Capitán, capitán, nos atacan 40 caravelas!",
        "- ¿Una flota?",
        "- No, flotan todas",
        "> ",
    ],
    [
        "- ¿Te sabes el chiste del hombre entre dos vallas?",
        "- No",
        "- Pues vaya hombre, vaya.",
        "> ",
    ],
    ["¿Qué coche usa Papá Noel?", "Un renol", "> "],
    [
        "- Espero que esta vez hayas estudiado para el examen.",
        "- Por supuesto.",
        "- Háblame del Tercer Reich.",
        "- ¿El de la mirra?",
        "> ",
    ],
    [
        "Se abre el telón y se ve un tetrabrik de Don Simón.",
        "¿Cómo se llama la película?",
        "”Es tinto básico”",
        "> ",
    ],
];

async function randomJoke() {
    let promise = new Promise((resolve) => {
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        resolve(type(joke));
    });

    return promise;
}

export default randomJoke;
