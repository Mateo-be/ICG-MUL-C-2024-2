const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Clase base para formas
class Forma {
    #x; // Propiedad privada
    #y; // Propiedad privada

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos getter para acceder a las propiedades privadas
    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    dibujar() {
        throw new Error("Método 'dibujar()' debe ser implementado");
    }
}

// Clase para puntos
class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Implementación del algoritmo de Bresenham para líneas
function dibujarLineaBresenham(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const sx = dx >= 0 ? 1 : -1; // Dirección en x
    const sy = dy >= 0 ? 1 : -1; // Dirección en y

    let err = absDx - absDy; // Error inicial

    while (true) {
        ctx.fillRect(p1.x, p1.y, 1, 1); // Dibuja el píxel

        // Si hemos alcanzado el punto final, salimos
        if (p1.x === p2.x && p1.y === p2.y) break;

        const err2 = err * 2; // Duplica el error

        // Ajuste de error y coordenadas
        if (err2 > -absDy) {
            err -= absDy; // Ajusta el error
            p1.x += sx;   // Mueve en x
        }
        if (err2 < absDx) {
            err += absDx; // Ajusta el error
            p1.y += sy;   // Mueve en y
        }
    }
}

// Clase para líneas
class Linea extends Forma {
    #p2; // Propiedad privada

    constructor(p1, p2) {
        super(p1.x, p1.y);
        this.#p2 = p2;
    }

    dibujar() {
        dibujarLineaBresenham(new Punto(this.x, this.y), this.#p2); // Usar el algoritmo de Bresenham
    }
}

// Clase para circunferencias
class Circunferencia extends Forma {
    #r; // Propiedad privada

    constructor(c, r) {
        super(c.x, c.y); // Usa las coordenadas de punto
        this.#r = r;
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.#r, 0, Math.PI * 2); // Acceso a través del getter
        ctx.stroke(); // Dibuja la circunferencia
    }
}

// Clase para elipses
class Elipse extends Forma {
    #a; // Propiedad privada
    #b; // Propiedad privada

    constructor(c, a, b) {
        super(c.x, c.y);
        this.#a = a;
        this.#b = b;
    }

    dibujar() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.#a, this.#b, 0, 0, Math.PI * 2); // Acceso a través del getter
        ctx.stroke(); // Dibuja la elipse
    }
}

// Crear y dibujar las formas
ctx.fillStyle = 'black'; // Color del trazo para la línea
ctx.strokeStyle = 'blue'; // Color del trazo para circunferencia y elipse

// Puntos para la línea
const p1 = new Punto(50, 50);
const p2 = new Punto(200, 200);
const linea = new Linea(p1, p2);
linea.dibujar();

// Puntos para la circunferencia
const pc = new Punto(300, 100);
const circunferencia = new Circunferencia(pc, 50);
circunferencia.dibujar();

// Puntos para la elipse
const pe = new Punto(400, 300);
const elipse = new Elipse(pe, 80, 50);
elipse.dibujar();
