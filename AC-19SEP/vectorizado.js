const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Clase base para formas
class Forma {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dibujar() {
        throw new Error("Método 'dibujar()' debe ser implementado");
    }
}

// Clase para líneas
class Linea extends Forma {
    constructor(x1, y1, x2, y2) {
        super(x1, y1);
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke(); // Dibuja la línea
    }
}

// Clase para circunferencias
class Circunferencia extends Forma {
    constructor(cx, cy, r) {
        super(cx, cy);
        this.r = r;
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke(); // Dibuja la circunferencia
    }
}

// Clase para elipses
class Elipse extends Forma {
    constructor(cx, cy, a, b) {
        super(cx, cy);
        this.a = a;
        this.b = b;
    }

    dibujar() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.a, this.b, 0, 0, Math.PI * 2);
        ctx.stroke(); // Dibuja la elipse
    }
}

// Crear y dibujar las formas
ctx.strokeStyle = 'black'; // Color del trazo

const linea = new Linea(50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar();
