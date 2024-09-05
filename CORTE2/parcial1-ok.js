// Maneja la visibilidad de los campos, dependiendo del tipo de coordenadas seleccionado
document.querySelectorAll('input[name="coordenadas"]').forEach((elem) => {
    elem.addEventListener('change', function() {
        if (this.value === 'cartesiana') {
            document.getElementById('camposCoordenadas').style.display = 'block';
            document.getElementById('camposPolares').style.display = 'none';
        } else {
            document.getElementById('camposCoordenadas').style.display = 'none';
            document.getElementById('camposPolares').style.display = 'block';
        }
    });
});

// Maneja la visibilidad de los campos, dependiendo de la dimensión seleccionada
document.querySelectorAll('input[name="tipoDimension"]').forEach((elem) => {
    elem.addEventListener('change', function() {
        if (this.value === 'apotema') {
            document.getElementById('campoLados').style.display = 'none';
            document.getElementById('campoApotema').style.display = 'block';
            document.getElementById('labelApotema').textContent = 'Ingrese el número del apotema:';
        } else {
            document.getElementById('campoLados').style.display = 'block';
            document.getElementById('campoApotema').style.display = 'none';
            document.getElementById('labelLados').textContent = 'Ingrese el número de lados:';
        }
    });
});



// Clase para gestionar coordenadas cartesianas
class Cartesiana {
    #x; // Coordenada X
    #y; // Coordenada Y

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos para establecer y obtener las coordenadas X e Y
    setx(x) { this.#x = x; }
    sety(y) { this.#y = y; }
    getx() { return this.#x; }
    gety() { return this.#y; }

    // Método para dibujar el polígono en cartesiano
    dibujar(ctx, radio, color, nlados) {
        ctx.save();
        ctx.translate(this.#x, this.#y); // Mueve el origen al centro del polígono
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (!isNaN(nlados) && nlados >= 3) {
            dibujarPoligono(ctx, 0, 0, radio, nlados); // Dibuja el polígono
        } else {
            alert('Por favor, proporciona un número de lados válido (al menos 3).');//si no habria error
        }
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

// Clase para gestionar coordenadas polares
class Polar {
    #radio;  // Radio del polígono
    #angulo; // Ángulo de rotación

    constructor(radio, angulo) {
        this.#radio = radio;
        this.#angulo = angulo;
    }

    // Métodos para establecer y obtener el radio y el ángulo
    setRadio(radio) { this.#radio = radio; }
    setAngulo(angulo) { this.#angulo = angulo; }
    getRadio() { return this.#radio; }
    getAngulo() { return this.#angulo; }

    // Método para dibujar el polígono en Polar
    dibujar(ctx, nlados, color, canvasWidth, canvasHeight) {
        const coordX = canvasWidth / 2; // Coordenada X en la mitad del canvas
        const coordY = canvasHeight / 2; // Coordenada Y en la mitad del canvas
        ctx.save();
        ctx.translate(coordX, coordY); // Mueve el origen al centro del canvas
        ctx.rotate(this.#angulo * Math.PI / 180); // Rota según el ángulo
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (!isNaN(nlados) && nlados >= 3) {
            dibujarPoligono(ctx, 0, 0, this.#radio, nlados); // Dibujar el polígono
        } else {
            alert('Por favor, proporciona un número de lados válido (al menos 3).');
        }
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

// Función para dibujar un polígono regular
function dibujarPoligono(ctx, x, y, radius, sides) {
    if (sides < 3) {
        console.error('El número de lados debe ser al menos 3 para formar un polígono.');
        return;
    }
    const angle = (2 * Math.PI) / sides; // Ángulo entre los vértices
    const rotation = -Math.PI / 2; // Rota 90 grados para alinear el primer vértice arriba, haciendo que todas las figuras queden de pie
    ctx.moveTo(x + radius * Math.cos(rotation), y + radius * Math.sin(rotation)); // Se mueve al primer vértice
    for (let i = 1; i <= sides; i++) {
        ctx.lineTo(x + radius * Math.cos(rotation + i * angle), y + radius * Math.sin(rotation + i * angle)); // Dibujar líneas entre vértices, repitiendolo por el numero de lados
    }
    ctx.closePath(); // Cerrar el camino, es decir avaba la figura
}

// Función para calcular el radio a partir del apotema y el número de lados
function calcularRadio(apotema, lados) {
    return apotema / Math.cos(Math.PI / lados);
}

// Función para dibujar la figura según la selección del usuario
function dibujarFigura() {
    const color = document.getElementById('color').value;
    const coordenadaTipo = document.querySelector('input[name="coordenadas"]:checked').value;
    const tipoDimension = document.querySelector('input[name="tipoDimension"]:checked').value;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas, para evitar sobreescitura

    if (tipoDimension === 'lados') {
        const nlados = parseInt(document.getElementById('nlados').value); // Obtener el número de lados
        const radio = 100; // Valor predeterminado del radio (puede ser calculado si es necesario)
        if (coordenadaTipo === 'cartesiana') { //si es coordenada cartesiana
            const coordX = parseInt(document.getElementById('coordX').value);
            const coordY = parseInt(document.getElementById('coordY').value);
            const coordenadasCartesiana = new Cartesiana(coordX, coordY);
            coordenadasCartesiana.dibujar(ctx, radio, color, nlados); // Dibuja el polígono en coordenadas cartesianas
        } else if (coordenadaTipo === 'polar') {//o si es polar
            const angulo = parseFloat(document.getElementById('angulo').value);
            const coordenadasPolar = new Polar(radio, angulo);
            coordenadasPolar.dibujar(ctx, nlados, color, canvas.width, canvas.height); // Dibujar el polígono en coordenadas polares
        }
    } else if (tipoDimension === 'apotema') { //si se escoje el apotema
        const apotema = parseFloat(document.getElementById('apotema').value); // Obtener el apotema
        const nlados = parseInt(document.getElementById('nlados').value); // Obtener el número de lados
        const radio = calcularRadio(apotema, nlados); // Calcular el radio a partir del apotema
        if (coordenadaTipo === 'cartesiana') {
            const coordX = parseInt(document.getElementById('coordX').value);
            const coordY = parseInt(document.getElementById('coordY').value);
            const coordenadasCartesiana = new Cartesiana(coordX, coordY);
            coordenadasCartesiana.dibujar(ctx, radio, color, nlados); // Dibujar el polígono en coordenadas cartesianas
        } else if (coordenadaTipo === 'polar') {
            const angulo = parseFloat(document.getElementById('angulo').value);
            const coordenadasPolar = new Polar(radio, angulo);
            coordenadasPolar.dibujar(ctx, nlados, color, canvas.width, canvas.height); // Dibujar el polígono en coordenadas polares
        }
    }
}

// Asocia la función de dibujo al botón de "Dibujar"
document.getElementById('dibujarBtn').addEventListener('click', dibujarFigura);
