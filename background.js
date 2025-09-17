window.onload = function() {
    const container = document.getElementById('background-container');
    if (!container) {
        console.error("Error: The #background-container element was not found.");
        return;
    }

    const mainCanvas = document.createElement("canvas");
    const patternCanvas = document.createElement("canvas");
    container.appendChild(mainCanvas);

    const mainCtx = mainCanvas.getContext("2d");
    const patternCtx = patternCanvas.getContext("2d");

    // --- Helper functions for generating wavy lines ---
    function randn(m, s) {
        return m + (Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random())) * s;
    };

    function normalPDF(x, m, s) {
        return Math.exp(-Math.pow((x - m), 2) / (2 * s * s)) / Math.sqrt(2 * Math.PI * s * s);
    };

    // --- Main drawing function ---
function draw() {
    const viewWidth = window.innerWidth;
    const canvasHeight = Math.max(document.body.scrollHeight, window.innerHeight);

    mainCanvas.width = viewWidth;
    mainCanvas.height = canvasHeight;
    patternCanvas.width = viewWidth;
    patternCanvas.height = 250;

    patternCtx.fillStyle = "#000008";
    patternCtx.strokeStyle = "rgba(229, 112, 69, 0.2)";
    // patternCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    patternCtx.lineWidth = 2;
    patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

    const lineSpacing = 50;
    const lineCount = Math.floor(patternCanvas.height / lineSpacing);

    for (let i = 0; i < lineCount; i++) {
        const y = lineSpacing + i * lineSpacing;
        const modes = Math.floor(Math.random() * 5) + 1;
        
        const mus = Array.from({ length: modes }, () => randn(patternCanvas.width / 2, patternCanvas.width / 15));
        const sigmas = Array.from({ length: modes }, () => randn(0.03 * patternCanvas.width, patternCanvas.width / 200));

        let w = y;
        patternCtx.beginPath();
        
        for (let x = 0; x <= patternCanvas.width; x += 10) {
            let noise = 0;
            for (let l = 0; l < modes; l++) {
                noise += normalPDF(x, mus[l], sigmas[l]);
            }
            w = 0.5 * w + 0.5 * (y - (lineSpacing / 20) * patternCanvas.width * noise + randn(0, lineSpacing / 20));

            // Introduce a random chance to lift the pen and create a gap
            if (Math.random() > 0.1) {
                patternCtx.lineTo(x, w);
            } else {
                patternCtx.moveTo(x, w);
            }
        }
        patternCtx.stroke();
    }

    const pattern = mainCtx.createPattern(patternCanvas, 'repeat');
    mainCtx.fillStyle = pattern;
    mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
}
    // --- Initial draw and redraw on window resize ---
    draw();
    window.onresize = draw;
};