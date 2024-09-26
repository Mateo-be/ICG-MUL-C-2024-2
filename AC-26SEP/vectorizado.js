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

// Clase para líneas
class Linea extends Forma {
    #p2; // Propiedad privada

    constructor(p1, p2) {
        super(p1.x, p1.y);
        this.#p2 = p2;
    }

    dibujar() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); // Acceso a través del getter
        ctx.lineTo(this.#p2.x, this.#p2.y);
        ctx.stroke(); // Dibuja la línea
    }
}

// Clase para circunferencias
class Circunferencia extends Forma {
    #r; // Propiedad privada

    constructor(c, r) {
        super(c.x, c.y); //usa las coordenadas de punto
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
ctx.strokeStyle = 'blue'; // Color del trazo

//puntos para linea
const p1 = new Punto(50, 50);
const p2 = new Punto(200, 200);
const linea = new Linea(p1, p2);
linea.dibujar();

//puntos para circuferencia
const pc = new Punto(300, 100);
const circuferencia = new Circunferencia(pc,50)
circunferencia.dibujar();

//puntos elipse
const pe = new Punto(400, 300);
const elipse = new Elipse (pe, 80, 50);
elipse.dibujar();
