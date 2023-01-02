// Lista de palabras aleatorias
const palabras = ['perro', 'gato', 'casa', 'arbol', 'pajaro'];

// Selecciona una palabra aleatoria de la lista
function seleccionarPalabraAleatoria() {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

// Inicializa el juego con la palabra dada
function iniciarJuego(palabra) {
  // Inicializa variables
  let intentosRestantes = 6;
  let letrasAdivinadas = [];

  // Dibuja el ahorcado con el número de intentos restantes
  function dibujarAhorcado() {
    // Obtiene el canvas y el contexto
    const canvas = document.getElementById('ahorcado');
    const ctx = canvas.getContext('2d');

    // Limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja el cuerpo del ahorcado
    ctx.beginPath();
    if (intentosRestantes === 6) {
      // Base
      ctx.moveTo(150, 250);
      ctx.lineTo(50, 250);
      ctx.stroke();
    }
    if (intentosRestantes <= 5) {
      // Tronco
      ctx.moveTo(100, 250);
      ctx.lineTo(100, 50);
      ctx.stroke();
    }
    if (intentosRestantes <= 4) {
      // Brazos
      ctx.moveTo(100, 75);
      ctx.lineTo(50, 100);
      ctx.stroke();
      ctx.moveTo(100, 75);
      ctx.lineTo(150, 100);
      ctx.stroke();
    }
    if (intentosRestantes <= 3) {
      // Piernas
      ctx.moveTo(100, 125);
      ctx.lineTo(50, 200);
      ctx.stroke();
      ctx.moveTo(100, 125);
      ctx.lineTo(150, 200);
      ctx.stroke();
    }
    if (intentosRestantes <= 2) {
      // Ojos
      ctx.arc(85, 60, 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.arc(115, 60, 5, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (intentosRestantes <= 1) {
      // Nariz
      ctx.moveTo(100, 65);
      ctx.lineTo(100, 75);
      ctx.stroke();
    }
    if (intentosRestantes === 0) {
      // Boca
      ctx.arc(100, 85, 10, 0, Math.PI);
      ctx.stroke();
    }
  }

  // Comprueba si la letra dada está en la palabra y actualiza el juego en consecuencia
  function comprobarLetra(letra) {
    // Si la letra ya ha sido adivinada, no hace nada
    if (letrasAdivinadas.includes(letra)) return;

    // Agrega la letra a la lista de letras adivinadas
    letrasAdivinadas.push(letra);

    // Si la letra está en la palabra, se revisa si el usuario ha adivinado todas las letras
    if (palabra.includes(letra)) {
      const palabraAdivinada = palabra
        .split('')
        .map(l => (letrasAdivinadas.includes(l) ? l : '_'))
        .join(' ');

      // Actualiza el texto de la palabra adivinada en la página
      document.getElementById('palabra').innerText = palabraAdivinada;

      // Si el usuario ha adivinado todas las letras, muestra un mensaje de victoria y detiene el juego
      if (!palabraAdivinada.includes('_')) {
        alert('¡Has ganado!');
        return;
      }
    }
    // Si la letra no está en la palabra, reduce el número de intentos restantes y actualiza el dibujo del ahorcado
    else {
      intentosRestantes -= 1;
      dibujarAhorcado();
    }

    // Si el usuario se ha quedado sin intentos, muestra un mensaje de derrota y revela la palabra
    if (intentosRestantes === 0) {
      alert(`¡Has perdido! La palabra era: ${palabra}`);
    }
  }

  // Muestra la palabra y detiene el juego cuando el usuario se rinde
  function desistir() {
    alert(`La palabra era: ${palabra}`);
  }

  // Asigna los manejadores de eventos a los botones del formulario
  const form = document.getElementById('formulario');
  form.addEventListener('submit', event => {
    event.preventDefault();
    comprobarLetra(form.elements.letra.value.toLowerCase());
    form.reset();
  });
  document.getElementById('desistir').addEventListener('click', desistir);

  // Dibuja el ahorcado inicialmente
  dibujarAhorcado();
}

// Manejador de eventos para el formulario de inicio de juego
document.getElementById('formulario-inicio').addEventListener('submit', event => {
  event.preventDefault();

  // Lee la opción seleccionada y inicia el juego con la palabra apropiada
  const form = event.target;
  if (form.elements.opcion.value === 'aleatoria') {
    iniciarJuego(seleccionarPalabraAleatoria());
  } else {
    iniciarJuego(form.elements.palabra.value.toLowerCase());
  }
});