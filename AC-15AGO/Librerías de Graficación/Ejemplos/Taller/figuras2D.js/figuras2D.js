
function mostrarCamposCoordenadas() {
    const tipoCoordenadas = document.getElementById('tipoCoordenadas').value;
    const cartesianas = document.getElementById('coordenadasCartesianas');
    const polares = document.getElementById('coordenadasPolares');

    if (tipoCoordenadas === 'cartesianas') {
        cartesianas.style.display = 'block';
        polares.style.display = 'none';
    } else if (tipoCoordenadas === 'polares') {
        cartesianas.style.display = 'none';
        polares.style.display = 'block';
    } else {
        cartesianas.style.display = 'none';
        polares.style.display = 'none';
    }
}

function convertirAPolares(radio, angulo) {
    const radianes = (angulo * Math.PI) / 180;
    const x = radio * Math.cos(radianes);
    const y = radio * Math.sin(radianes);
    return { x, y };
}

function dibujarFigura(event) {
    event.preventDefault(); // Evita que se recargue la página

    const figura = document.getElementById('figura').value;
    const colorFigura = document.getElementById('colorFigura').value;
    const colorBorde = document.getElementById('colorBorde').value;
    const grosorBorde = parseInt(document.getElementById('grosorBorde').value);
    const tamaño = parseInt(document.getElementById('tamaño').value);
    const tipoCoordenadas = document.getElementById('tipoCoordenadas').value;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = colorFigura;
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = grosorBorde;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let coordX = canvas.width / 2, coordY = canvas.height / 2;

    if (tipoCoordenadas === 'cartesianas') {
        coordX = parseInt(document.getElementById('coordX').value);
        coordY = parseInt(document.getElementById('coordY').value);
    } else if (tipoCoordenadas === 'polares') {
        const radio = parseFloat(document.getElementById('radio').value);
        const anguloPolar = parseFloat(document.getElementById('anguloPolar').value);
        const coordenadas = convertirAPolares(radio, anguloPolar);
        coordX = coordenadas.x + canvas.width / 2;
        coordY = coordenadas.y + canvas.height / 2;
    }

    ctx.save();
    ctx.translate(coordX, coordY);

    ctx.beginPath();
    switch (figura) {
        case 'circulo':
            ctx.arc(0, 0, tamaño, 0, 2 * Math.PI);
            break;
        case 'cuadrado':
            ctx.rect(-tamaño / 2, -tamaño / 2, tamaño, tamaño);
            break;
        case 'triangulo':
            ctx.moveTo(0, -tamaño);
            ctx.lineTo(-tamaño, tamaño / 2);
            ctx.lineTo(tamaño, tamaño / 2);
            ctx.closePath();
            break;
        case 'pentagono':
            dibujarPoligono(ctx, 0, 0, tamaño, 5);
            break;
        case 'estrella':
            dibujarEstrella(ctx, 0, 0, tamaño, tamaño / 2, 5);
            break;
    }
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function dibujarPoligono(ctx, x, y, radius, sides) {
    const angle = (2 * Math.PI) / sides;
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
    for (let i = 1; i <= sides; i++) {
        ctx.lineTo(x + radius * Math.cos(i * angle), y + radius * Math.sin(i * angle));
    }
    ctx.closePath();
}

function dibujarEstrella(ctx, x, y, outerRadius, innerRadius, points) {
    const angle = Math.PI / points;
    ctx.moveTo(x + outerRadius, y);
    for (let i = 0; i < 2 * points; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        ctx.lineTo(x + radius * Math.cos(i * angle), y + radius * Math.sin(i * angle));
    }
    ctx.closePath();
}
