// Clase Punto con encapsulamiento para las coordenadas x e y
class Punto {
    #x; // Coordenada X privada
    #y; // Coordenada Y privada

    // Constructor para inicializar las coordenadas del punto
    constructor(x, y) {
        this.#x = x; // Asignar la coordenada X
        this.#y = y; // Asignar la coordenada Y
    }

    // Método para obtener el valor de la coordenada X
    getX() {
        return this.#x; // Devolver la coordenada X
    }

    // Método para obtener el valor de la coordenada Y
    getY() {
        return this.#y; // Devolver la coordenada Y
    }

    // Método para establecer un nuevo valor para la coordenada X
    setX(x) {
        this.#x = x; // Actualizar la coordenada X
    }

    // Método para establecer un nuevo valor para la coordenada Y
    setY(y) {
        this.#y = y; // Actualizar la coordenada Y
    }
}

// Función para generar un número aleatorio entre min y max
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generar y devolver un número aleatorio
}

// Generar una lista aleatoria de puntos dentro del rango del canvas
function generarPuntosAleatorios() {
    const numPuntos = generarNumeroAleatorio(3, 20); // El número de puntos será entre 3 y 20
    const puntos = []; // Array para almacenar los puntos generados
    
    // Generar las coordenadas aleatorias para cada punto
    for (let i = 0; i < numPuntos; i++) {
        const x = generarNumeroAleatorio(50, 450); // Mantener dentro del canvas
        const y = generarNumeroAleatorio(50, 450);
        puntos.push(new Punto(x, y)); // Crear un nuevo punto y añadirlo al array
    }

    return puntos; // Devolver la lista de puntos generados
}

// Función para calcular el centroide de un conjunto de puntos
function calcularCentroide(puntos) {
    let sumX = 0, sumY = 0; // Inicializar sumas de coordenadas
    // Sumar las coordenadas X e Y de todos los puntos
    puntos.forEach(p => {
        sumX += p.getX(); // Sumar la coordenada X
        sumY += p.getY(); // Sumar la coordenada Y
    });
    // El centroide es el promedio de las coordenadas
    return [sumX / puntos.length, sumY / puntos.length]; // Devolver el centroide como un array [X, Y]
}

// Calcular el ángulo de un punto respecto al centroide
function angleFromCentroid(punto, centroid) {
    return Math.atan2(punto.getY() - centroid[1], punto.getX() - centroid[0]); // Devolver el ángulo en radianes
}

// Ordenar los puntos en sentido horario o antihorario usando el centroide
function ordenarPuntosPorAngulo(puntos, centroid) {
    // Devolver una copia del array de puntos, ordenada por su ángulo respecto al centroide
    return puntos.slice().sort((a, b) => {
        return angleFromCentroid(a, centroid) - angleFromCentroid(b, centroid); // Ordenar los puntos por ángulo
    });
}

// Verificar si la figura es convexa o cóncava usando el producto cruzado
function crossProduct(o, a, b) {
    return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX()); // Calcular el producto cruzado
}

// Función para verificar la convexidad de la figura
function verificarConvexidad(puntos) {
    const centroid = calcularCentroide(puntos); // Calcular el centroide de los puntos
    const sortedPuntos = ordenarPuntosPorAngulo(puntos, centroid); // Ordenar los puntos por ángulo
    const n = sortedPuntos.length; // Número de puntos
    let crossProducts = []; // Array para almacenar los productos cruzados

    // Calcular el producto cruzado para cada conjunto de tres puntos consecutivos
    for (let i = 0; i < n; i++) {
        const o = sortedPuntos[i]; // Punto actual
        const a = sortedPuntos[(i + 1) % n]; // Punto siguiente
        const b = sortedPuntos[(i + 2) % n]; // Punto después del siguiente
        crossProducts.push(crossProduct(o, a, b)); // Guardar el resultado del producto cruzado
    }

    // Verificar si todos los productos cruzados tienen el mismo signo (positivo o negativo)
    const positive = crossProducts.every(cp => cp > 0); // Todos positivos
    const negative = crossProducts.every(cp => cp < 0); // Todos negativos

    // Si todos los productos cruzados son positivos o negativos, la figura es convexa; de lo contrario, es cóncava
    return (positive || negative) ? "Convexa" : "Cóncava"; // Devolver el tipo de figura
}

// Función para dibujar la figura en el canvas (Rasterizado)
function dibujarFigura(puntos) {
    const canvas = document.getElementById('canvas'); // Obtener el elemento canvas
    const ctx = canvas.getContext('2d'); // Obtener el contexto 2D del canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar la nueva figura
    ctx.beginPath(); // Iniciar un nuevo camino para el dibujo

    const centroid = calcularCentroide(puntos); // Calcular el centroide
    const puntosOrdenados = ordenarPuntosPorAngulo(puntos, centroid); // Ordenar los puntos por ángulo

    ctx.moveTo(puntosOrdenados[0].getX(), puntosOrdenados[0].getY()); // Mover el "lápiz" al primer punto
    // Dibujar líneas entre los puntos ordenados
    for (let i = 1; i < puntosOrdenados.length; i++) {
        ctx.lineTo(puntosOrdenados[i].getX(), puntosOrdenados[i].getY()); // Dibujar línea hasta cada punto
    }
    ctx.closePath(); // Cerrar el camino para completar la figura
    ctx.stroke(); // Dibujar el borde de la figura

    // Verificar si la figura es convexa o cóncava y mostrar el resultado en el HTML
    const tipoFigura = verificarConvexidad(puntosOrdenados); // Verificar tipo de figura
    document.getElementById('resultado').textContent = `La figura es ${tipoFigura}. Contiene ${puntos.length} puntos.`; // Mostrar resultado
}

// Evento para generar y dibujar una nueva figura cuando se presiona el botón
document.getElementById('generarBtn').addEventListener('click', () => {
    const puntosAleatorios = generarPuntosAleatorios(); // Generar puntos aleatorios
    dibujarFigura(puntosAleatorios); // Dibujar la figura generada
});

// Dibujar una figura al cargar la página por primera vez
const puntosAleatorios = generarPuntosAleatorios(); // Generar puntos aleatorios al inicio
dibujarFigura(puntosAleatorios); // Dibujar la figura generada al cargar la página
