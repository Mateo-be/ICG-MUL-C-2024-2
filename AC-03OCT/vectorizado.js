class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }
}

// Función para generar un número aleatorio entre min y max
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar una lista aleatoria de puntos
function generarPuntosAleatorios() {
    const numPuntos = generarNumeroAleatorio(3, 20);
    const puntos = [];
    
    for (let i = 0; i < numPuntos; i++) {
        const x = generarNumeroAleatorio(50, 450); // Mantener dentro del canvas
        const y = generarNumeroAleatorio(50, 450);
        puntos.push(new Punto(x, y));
    }

    return puntos;
}

// Verificar si los puntos están dentro del canvas
function verificarPuntosDentroCanvas(puntos, anchoCanvas, altoCanvas) {
    let dentroCanvas = true;
    
    puntos.forEach(punto => {
        if (punto.getX() < 0 || punto.getX() > anchoCanvas || punto.getY() < 0 || punto.getY() > altoCanvas) {
            dentroCanvas = false;
        }
    });

    return dentroCanvas;
}

function calcularCentroide(puntos) {
    let sumX = 0, sumY = 0;
    puntos.forEach(p => {
        sumX += p.getX();
        sumY += p.getY();
    });
    return [sumX / puntos.length, sumY / puntos.length];
}

function angleFromCentroid(punto, centroid) {
    return Math.atan2(punto.getY() - centroid[1], punto.getX() - centroid[0]);
}

function ordenarPuntosPorAngulo(puntos, centroid) {
    return puntos.slice().sort((a, b) => {
        return angleFromCentroid(a, centroid) - angleFromCentroid(b, centroid);
    });
}

function crossProduct(o, a, b) {
    return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX());
}

function verificarConvexidad(puntos) {
    const centroid = calcularCentroide(puntos);
    const sortedPuntos = ordenarPuntosPorAngulo(puntos, centroid);
    const n = sortedPuntos.length;
    let crossProducts = [];

    for (let i = 0; i < n; i++) {
        const o = sortedPuntos[i];
        const a = sortedPuntos[(i + 1) % n];
        const b = sortedPuntos[(i + 2) % n];
        crossProducts.push(crossProduct(o, a, b));
    }

    const positive = crossProducts.every(cp => cp > 0);
    const negative = crossProducts.every(cp => cp < 0);

    return (positive || negative) ? "Convexa" : "Cóncava";
}

function dibujarFigura(puntos) {
    const svg = document.getElementById('canvas');
    svg.innerHTML = '';  // Limpiar el canvas antes de dibujar la nueva figura

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    const puntosAttr = puntos.map(p => `${p.getX()},${p.getY()}`).join(' ');
    polygon.setAttribute('points', puntosAttr);
    polygon.setAttribute('stroke', 'black');
    polygon.setAttribute('fill', 'none');

    svg.appendChild(polygon);

    const tipoFigura = verificarConvexidad(puntos);
    document.getElementById('resultado').textContent = `La figura es ${tipoFigura}. Contiene ${puntos.length} puntos.`;

    // Verificar si los puntos están dentro del canvas
    const dentroCanvas = verificarPuntosDentroCanvas(puntos, 500, 500);
    if (dentroCanvas) {
        console.log("¡Eureka! Todos los puntos están dentro del canvas.");
    }
}

document.getElementById('generarBtn').addEventListener('click', () => {
    const puntosAleatorios = generarPuntosAleatorios();
    dibujarFigura(puntosAleatorios);
});

// Dibujar una figura al cargar la página por primera vez
const puntosAleatorios = generarPuntosAleatorios();
dibujarFigura(puntosAleatorios);
