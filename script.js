// Acceder a los elementos del DOM utilizando los atributos id
const duck = document.getElementById("duck"); // Accede al elemento de pato por su id
const backgroundImage = document.getElementById("background-image"); // Accede al elemento de la imagen de fondo por su id
const disparosCounter = document.createElement("div"); // Crea un nuevo elemento de div para el contador de disparos
const aciertosCounter = document.createElement("div"); // Crea un nuevo elemento de div para el contador de aciertos

const disparosRestantesSpan = document.getElementById("disparos-restantes"); // Accede al elemento de span para mostrar los disparos restantes por su id
const aciertosCounterSpan = document.getElementById("aciertos-counter"); // Accede al elemento de span para mostrar los aciertos por su id

let disparosRestantes = 8; // Establece el número inicial de disparos restantes a 8
let aciertos = 0; // Establece el número inicial de aciertos a 0
let mouseTimeout; // Variable agregada para el temporizador de deslizamiento

document.body.prepend(disparosCounter); // Agrega el contador de disparos al inicio del cuerpo del documento
document.body.prepend(aciertosCounter); // Agrega el contador de aciertos al inicio del cuerpo del documento

// Función para obtener una posición aleatoria
function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - duck.offsetWidth); // Genera una posición X aleatoria dentro del ancho de la ventana
  const y = Math.random() * (window.innerHeight - duck.offsetHeight); // Genera una posición Y aleatoria dentro de la altura de la ventana
  return { x, y }; // Devuelve un objeto con las coordenadas X e Y
}

// Función para mover al pato
function moveDuck() {
  if (disparosRestantes > 0) { // Comprueba si aún quedan disparos restantes
    const position = getRandomPosition(); // Obtiene una posición aleatoria
    duck.style.top = `${position.y}px`; // Establece la posición vertical del pato en la coordenada Y
    duck.style.left = `${position.x}px`; // Establece la posición horizontal del pato en la coordenada X
    startTimer(); // Inicia un temporizador para mover el pato nuevamente
  }
}

let timer;

function startTimer() {
  timer = setTimeout(moveDuck, 1000); // Establece un temporizador para llamar a la función moveDuck después de 1 segundo
}

function stopTimer() {
  clearTimeout(timer); // Detiene el temporizador actual
}

function volverAlInicio() {
  window.location.href = "index.html"; // Redirige a la página de inicio (index)
}

// Esta función maneja las acciones que ocurren cuando se hace clic en el pato durante el juego
function handleClick(e) {
  aciertos++; // Incrementa el número de aciertos
  aciertosCounterSpan.textContent = aciertos; // Actualiza el contenido del contador de aciertos en el DOM
  playSound(); // Reproduce un sonido

  disparosRestantes--; // Reduce el número de disparos restantes
  disparosRestantesSpan.textContent = disparosRestantes; // Actualiza el contenido del contador de disparos restantes en el DOM

  if (disparosRestantes === 0) { // Comprueba si ya no quedan disparos restantes
    duck.removeEventListener("click", handleClick); // Elimina el evento de clic en el pato
    backgroundImage.removeEventListener("click", handleBackgroundClick); // Elimina el evento de clic en el fondo de pantalla
    volverAlInicio() // Redirige a la página de inicio 
    alert("Juego terminado. Recoge tu aceite por caja."); // Muestra una alerta de "Juego terminado"
  } else {
    moveDuck(); // Mueve el pato a una nueva posición
  }
}

// Esta función se encarga de manejar las acciones que ocurren cuando se realiza un clic en el fondo de la página durante el juego
function handleBackgroundClick() {
  if (disparosRestantes === 0) { 
    return; // Si no quedan disparos restantes, no se realiza ninguna acción adicional y se sale de la función con la sentencia "return"
  }

  disparosRestantes--; // Reducir el contador de disparos restantes
  disparosRestantesSpan.textContent = disparosRestantes; // Actualizar el elemento en el DOM con el valor de disparos restantes
  playSound(); // Reproducir un sonido
  aciertosCounterSpan.textContent = aciertos; // Actualizar el elemento en el DOM con el valor de aciertos

  if (disparosRestantes === 0) { // Si no quedan disparos restantes
    duck.removeEventListener("click", handleClick); // Eliminar el evento de clic en el pato
    backgroundImage.removeEventListener("click", handleBackgroundClick); // Eliminar el evento de clic en el fondo de la página
    volverAlInicio(); // Llamar a la función volverAlInicio para redirigir al usuario a la página "index.html"
    alert("Juego terminado"); // Mostrar una alerta indicando que el juego ha terminado
  } else {
    moveDuck(); // Si quedan disparos restantes, llamar a la función moveDuck para mover el pato nuevamente
  }
}

// Deslizamiento del pato
document.addEventListener("mousemove", handleMouseMove); // Agregar un evento de escucha en el documento para detectar movimientos del ratón

function handleMouseMove(event) {
  const mouseX = event.clientX; // Obtener la posición horizontal (eje x) del ratón
  const mouseY = event.clientY; // Obtener la posición vertical (eje y) del ratón

  const duckRect = duck.getBoundingClientRect(); // Obtener las propiedades del rectángulo del pato
  const duckX = duckRect.left + duckRect.width / 2; // Obtener la posición horizontal (eje x) central del pato
  const duckY = duckRect.top + duckRect.height / 2; // Obtener la posición vertical (eje y) central del pato

  const distance = Math.sqrt(Math.pow(mouseX - duckX, 2) + Math.pow(mouseY - duckY, 2)); // Calcular la distancia entre la posición del ratón y el centro del pato utilizando el teorema de Pitágoras

  if (distance < 100) { // Si la distancia entre el ratón y el pato es menor a 100 píxeles
    clearTimeout(mouseTimeout); // Limpiar el temporizador de deslizamiento si el ratón está cerca del pato
    mouseTimeout = setTimeout(startRandomMovement, 700); // Iniciar un temporizador para mover el pato aleatoriamente después de 700 milisegundos
  }
}

function startRandomMovement() {
  const position = getRandomPosition(); // Obtener una posición aleatoria

  duck.style.transition = "2s"; // Establecer una transición de 2 segundos para que el movimiento del pato sea más suave
  duck.style.top = `${position.y}px`; // Actualizar la posición vertical (top) del pato en base a la posición aleatoria
  duck.style.left = `${position.x}px`; // Actualizar la posición horizontal (left) del pato en base a la posición aleatoria

  // Reinicia el temporizador después de mover el pato
  clearTimeout(timer); 
  timer = setTimeout(moveDuck, 3500);
}
//AQUI ACABAN FUNCIONES DESLIZAMIENTO

// Reproducir sonido
function playSound() {
  const audio = new Audio ('https://www.myinstants.com/media/sounds/pew_pew-dknight556-1379997159.mp3'); // Crear un nuevo objeto de audio
  audio.play(); // Reproducir el sonido
 }
 
 duck.addEventListener("click", handleClick); // Agregar un evento de clic en el pato para llamar a la función handleClick
 backgroundImage.addEventListener("click", handleBackgroundClick); // Agregar un evento de clic en el fondo de la página para llamar a la función handleBackgroundClick
 
 moveDuck(); // Llamar a la función moveDuck para iniciar el movimiento del pato
 startTimer(); // Llamar a la función startTimer para iniciar el temporizador