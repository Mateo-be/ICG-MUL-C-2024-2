
        // Maneja la visibilidad de los campos en función del tipo de coordenadas seleccionado
        document.querySelectorAll('input[name="coordenadas"]').forEach((elem) => {
            elem.addEventListener('change', function() {
                if (this.value === 'polar') {
                    document.getElementById('camposCoordenadas').style.display = 'none';
                    document.getElementById('camposPolares').style.display = 'block';
                } else {
                    document.getElementById('camposCoordenadas').style.display = 'block';
                    document.getElementById('camposPolares').style.display = 'none';
                }
            });
        });

        class Cartesiana {
            #x;
            #y;

            constructor(x, y) {
                this.#x = x;
                this.#y = y;
            }

            setx(x) {
                this.#x = x;
            }

            sety(y) {
                this.#y = y;
            }

            getx() {
                return this.#x;
            }

            gety() {
                return this.#y;
            }

            dibujar(ctx, nlados, color) {
                ctx.save();
                ctx.translate(this.#x, this.#y);
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                if (!isNaN(nlados) && nlados >= 3) {
                    dibujarPoligono(ctx, 0, 0, 150, nlados);
                } else {
                    alert('Por favor, proporciona un número de lados válido (al menos 3).');
                }
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }

        class Polar {
            #radio;
            #angulo;

            constructor(radio, angulo) {
                this.#radio = radio;
                this.#angulo = angulo;
            }

            setRadio(radio) {
                this.#radio = radio;
            }

            setAngulo(angulo) {
                this.#angulo = angulo;
            }

            getRadio() {
                return this.#radio;
            }

            getAngulo() {
                return this.#angulo;
            }

            dibujar(ctx, nlados, color, canvasWidth, canvasHeight) {
                const coordX = canvasWidth / 2;
                const coordY = canvasHeight / 2;
                ctx.save();
                ctx.translate(coordX, coordY);
                ctx.rotate(this.#angulo * Math.PI / 180);
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                if (!isNaN(nlados) && nlados >= 3) {
                    dibujarPoligono(ctx, 0, 0, this.#radio, nlados);
                } else {
                    alert('Por favor, proporciona un número de lados válido (al menos 3).');
                }
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }

        function dibujarPoligono(ctx, x, y, radius, sides) {
            if (sides < 3) {
                console.error('El número de lados debe ser al menos 3 para formar un polígono.');
                return;
            }
            const angle = (2 * Math.PI) / sides;
            const rotation = -Math.PI / 2; // Rota 90 grados para alinear el primer vértice arriba
            ctx.moveTo(x + radius * Math.cos(rotation), y + radius * Math.sin(rotation));
            for (let i = 1; i <= sides; i++) {
                ctx.lineTo(x + radius * Math.cos(rotation + i * angle), y + radius * Math.sin(rotation + i * angle));
            }
            ctx.closePath();
        }

        function dibujarFigura() {
            const nlados = parseInt(document.getElementById('nlados').value);
            const color = document.getElementById('color').value;
            const coordenadaTipo = document.querySelector('input[name="coordenadas"]:checked').value;

            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (coordenadaTipo === 'cartesiana') {
                const coordX = parseInt(document.getElementById('coordX').value);
                const coordY = parseInt(document.getElementById('coordY').value);
                const coordenadasCartesiana = new Cartesiana(coordX, coordY);
                coordenadasCartesiana.dibujar(ctx, nlados, color);
            } else if (coordenadaTipo === 'polar') {
                const tamaño = parseInt(document.getElementById('tamaño').value);
                const angulo = parseInt(document.getElementById('angulo').value);
                const coordenadasPolar = new Polar(tamaño, angulo);
                coordenadasPolar.dibujar(ctx, nlados, color, canvas.width, canvas.height);
            }
        }

        document.getElementById('dibujarBtn').addEventListener('click', dibujarFigura);


