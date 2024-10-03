// Clase Punto con encapsulamiento (propiedades privadas #x y #y)
class Punto {
    #x;
    #y;

    // Constructor para inicializar las coordenadas del punto
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Método para obtener el valor de  X
    getX() {
        return this.#x;
    }

    // Método para obtener el valor  Y
    getY() {
        return this.#y;
    }

    // Método para asignar un nuevo valor a la coordenada X
    setX(x) {
        this.#x = x;
    }

    // Método para asignar un nuevo valor a la coordenada Y
    setY(y) {
        this.#y = y;
    }
}

// Función para generar un número aleatorio dentro de un rango  (min y max)
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar una lista de puntos aleatorios dentro del canvas
function generarPuntosAleatorios() {
    const numPuntos = generarNumeroAleatorio(3, 20); // Como se dijo en clase es entre 3 y 20
    const puntos = [];
    
    // Generar las coordenadas aleatorias para cada punto y crear instancias de la clase Punto
    for (let i = 0; i < numPuntos; i++) {
        const x = generarNumeroAleatorio(50, 450); // Mantiene los puntos dentro del rango del canvas, siendo con 50 pixeles de diferencia para que se vea bien la figura
        const y = generarNumeroAleatorio(50, 450);
        puntos.push(new Punto(x, y));
    }

    return puntos; // Devolver la lista de puntos generados
}

// Función para calcular el centroide de un conjunto de puntos
function calcularCentroide(puntos) {
    let sumX = 0, sumY = 0;//valore en cero de contadores
    
    // Sumar las coordenadas X e Y de todos los puntos
    puntos.forEach(p => {
        sumX += p.getX();//obtiene el x y y
        sumY += p.getY();
    });
    
    // El centroide es el promedio de las coordenadas de x y luego y
    return [sumX / puntos.length, sumY / puntos.length];
}

// Función para calcular el ángulo de un punto respecto al centroide
function angleFromCentroid(punto, centroid) {
    return Math.atan2(punto.getY() - centroid[1], punto.getX() - centroid[0]); // Ángulo en radianes
}

// Función para ordenar los puntos por su ángulo respecto al centroide (para asegurar un trazado correcto)
function ordenarPuntosPorAngulo(puntos, centroid) {
    return puntos.slice().sort((a, b) => {
        return angleFromCentroid(a, centroid) - angleFromCentroid(b, centroid); // Orden ascendente por ángulo
    });
}

// Función para calcular el producto cruzado de tres puntos (o, a, b)
// El producto cruzado nos ayuda a determinar si los puntos giran en el sentido horario o antihorario
function crossProduct(o, a, b) {
    return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX());
}

// Función para verificar si la figura es convexa o cóncava
function verificarConvexidad(puntos) {
    const centroid = calcularCentroide(puntos); // Calcular el centroide de los puntos
    const sortedPuntos = ordenarPuntosPorAngulo(puntos, centroid); // Ordenar los puntos
    const n = sortedPuntos.length;
    let crossProducts = [];

    // Calcular el producto cruzado para cada conjunto de tres puntos consecutivos
    for (let i = 0; i < n; i++) {
        const o = sortedPuntos[i];
        const a = sortedPuntos[(i + 1) % n]; // Punto siguiente
        const b = sortedPuntos[(i + 2) % n]; // Punto después del siguiente
        crossProducts.push(crossProduct(o, a, b)); // Guardar el resultado del producto cruzado
    }

    // Verificar si todos los productos cruzados tienen el mismo signo (positivo o negativo)
    const positive = crossProducts.every(cp => cp > 0);
    const negative = crossProducts.every(cp => cp < 0);

    // Si todos los productos cruzados son positivos o negativos, la figura es convexa; de lo contrario, es cóncava
    return (positive || negative) ? "Convexa" : "Cóncava";
}

// Función para dibujar la figura en el canvas (SVG)
function dibujarFigura(puntos) {
    const svg = document.getElementById('canvas'); // Obtener el elemento canvas (SVG)
    svg.innerHTML = '';  // Limpiar el canvas antes de dibujar la nueva figura

    const centroid = calcularCentroide(puntos); // Calcular el centroide
    const puntosOrdenados = ordenarPuntosPorAngulo(puntos, centroid); // Ordenar los puntos por ángulo

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); // Crear un elemento SVG <polygon>

    // Convertir los puntos en un formato adecuado para el atributo "points" del polígono
    const puntosAttr = puntosOrdenados.map(p => `${p.getX()},${p.getY()}`).join(' ');
    polygon.setAttribute('points', puntosAttr); // Asignar los puntos al polígono
    polygon.setAttribute('stroke', 'black'); // Color del borde
    polygon.setAttribute('fill', 'none'); // Sin relleno

    svg.appendChild(polygon); // Añadir el polígono al canvas (SVG)

    // Verificar si la figura es convexa o cóncava y mostrar el resultado en el HTML
    const tipoFigura = verificarConvexidad(puntosOrdenados);
    document.getElementById('resultado').textContent = `La figura es ${tipoFigura}. Contiene ${puntos.length} puntos.`;
}

// Evento para generar y dibujar una nueva figura cuando se presiona el botón
document.getElementById('generarBtn').addEventListener('click', () => {
    const puntosAleatorios = generarPuntosAleatorios(); // Generar puntos aleatorios
    dibujarFigura(puntosAleatorios); // Dibujar la figura generada
});

// Dibujar una figura al cargar la página por primera vez
const puntosAleatorios = generarPuntosAleatorios(); // Generar puntos aleatorios al inicio
dibujarFigura(puntosAleatorios); // Dibujar la figura generada al cargar la página
