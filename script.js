//Acceder a los elementos del DOM utilizando los atributos id
const duck = document.getElementById("duck");
const backgroundImage = document.getElementById("background-image");
const disparosCounter = document.createElement("div");
const aciertosCounter = document.createElement("div");

const disparosRestantesSpan = document.getElementById("disparos-restantes");
const aciertosCounterSpan = document.getElementById("aciertos-counter");
//Hasta aqui DOM

let disparosRestantes = 8;
let aciertos = 0;
let mouseTimeout; // Variable agregada para el temporizador de deslizamiento

document.body.prepend(disparosCounter);
document.body.prepend(aciertosCounter);

//da una posicion aleatoria
function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - duck.offsetWidth);
  const y = Math.random() * (window.innerHeight - duck.offsetHeight);
  return { x, y };
}

//mueve al pato
function moveDuck() {
  if (disparosRestantes > 0) {
    const position = getRandomPosition();
    duck.style.top = `${position.y}px`;
    duck.style.left = `${position.x}px`;
    startTimer(); // Agregamos esta línea para reiniciar el temporizador después de mover el pato
  }
}

let timer;

function startTimer() {
  timer = setTimeout(moveDuck, 1000);
}

function stopTimer() {
  clearTimeout(timer);
}

/**/function volverAlInicio() {
  window.location.href = "menu.html";
}/**/

//esta función se encarga de manejar las acciones que ocurren cuando se realiza un clic en el pato durante el juego
function handleClick(e) {
  aciertos++;
  aciertosCounterSpan.textContent = aciertos;
  playSound();

  disparosRestantes--;
  disparosRestantesSpan.textContent = disparosRestantes;

  if (disparosRestantes === 0) {
    duck.removeEventListener("click", handleClick); //escucha y responde los elementos del dom
    backgroundImage.removeEventListener("click", handleBackgroundClick); //escucha y responde los elementos del dom
    /**/volverAlInicio()/**/
    alert("Juego terminado");
  } else {
    moveDuck();
  }
}

//esta función se encarga de manejar las acciones que ocurren cuando se realiza un clic en el fondo de la página durante el juego
function handleBackgroundClick() {
  if (disparosRestantes === 0) {
    return; // Si no quedan disparos restantes, no se realiza ninguna acción
  }

  disparosRestantes--;
  disparosRestantesSpan.textContent = disparosRestantes;
  playSound();
  aciertosCounterSpan.textContent = aciertos;

  if (disparosRestantes === 0) {
    duck.removeEventListener("click", handleClick);
    backgroundImage.removeEventListener("click", handleBackgroundClick);
    /**/volverAlInicio()/**/
    alert("Juego terminado");
  } else {
    moveDuck();
  }
}

//DESLIZAMIENTO DEL PATO
document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const duckRect = duck.getBoundingClientRect();
  const duckX = duckRect.left + duckRect.width / 2;
  const duckY = duckRect.top + duckRect.height / 2;

  const distance = Math.sqrt(Math.pow(mouseX - duckX, 2) + Math.pow(mouseY - duckY, 2));

  if (distance < 100) {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(startRandomMovement, 700);
  }
}

function startRandomMovement() {
  const position = getRandomPosition();
  
  duck.style.transition = "2s"; // Hacer que la transición dure 2 segundos
  duck.style.top = `${position.y}px`;
  duck.style.left = `${position.x}px`;

  // Reiniciar el temporizador después de mover el pato
  clearTimeout(timer);
  timer = setTimeout(moveDuck, 3500);
}
//AQUI ACABAN FUNCIONES DESLIZAMIENTO


//SONIDO
function playSound() {
 const audio = new Audio ('https://www.myinstants.com/media/sounds/pew_pew-dknight556-1379997159.mp3');
 audio.play();
}

duck.addEventListener("click", handleClick);
backgroundImage.addEventListener("click", handleBackgroundClick);

moveDuck();
startTimer();