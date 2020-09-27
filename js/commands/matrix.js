const output = ["WELCOME TO MATRIX...", "> "];

async function matrix() {
    return new Promise((resolve) => {
        let div = document.createElement("div");
        document.querySelector(".crt").appendChild(div);
        div.classList.add("fullscreen");

        const container = div;

        const remove = (event) => {
            event.preventDefault();
            container.remove();
            resolve();
        };

        container.setAttribute("contenteditable", true);
        container.focus();
        container.addEventListener("keypress", remove);
        container.addEventListener("click", remove);

        const canvas = document.createElement("canvas");
        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        // Set the width and height of the canvas
        const w = (canvas.width = container.offsetWidth);
        const h = (canvas.height = container.offsetHeight);
        const cols = Math.floor(w / 20) + 1;
        const ypos = Array(cols).fill(0);

        // draw a black rectangle of width and height same as that of the canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        function updateMatrix() {
            ctx.fillStyle = "#0001";
            ctx.fillRect(0, 0, w, h);

            // Set font color to green and font style to 16pt VT323
            ctx.fillStyle = "#0f0";
            ctx.font = "16pt VT323";

            // For each column put a random character at the end
            ypos.forEach((y, ind) => {
                // Generate random character
                const text = String.fromCharCode(Math.random() * 128);

                // x coordinate of the column, y coordinate is already given
                const x = ind * 20;
                // Render the character at (x, y)
                ctx.fillText(text, x, y);

                // Randomly reset the end of the column if it's at least 100px high
                if (y > 100 + Math.random() * 10000) {
                    ypos[ind] = 0;
                } else {
                    ypos[ind] = y + 20;
                }
            });
        }

        setInterval(updateMatrix, 50);
    });
}

export { output };
export default matrix;
