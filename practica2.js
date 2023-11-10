const numeroSecreto = "54321";
const maxIntentos = 5;
let intentos = 0;

// ... (código existente)

function comprobarNumero() {
  const userInput = document.getElementById("userInput").value;
  intentos++;

  if (userInput === numeroSecreto) {
    mostrarResultado("¡Has adivinado el número secreto!", true);
    mostrarCodigo(numeroSecreto);
  } else if (intentos >= maxIntentos) {
    mostrarResultado("Has alcanzado el número máximo de intentos. El número secreto era: " + numeroSecreto, false);
    mostrarCodigo(numeroSecreto);
    solicitarNuevoIntento();
  } else {
    const resultado = compararNumeros(numeroSecreto, userInput);
    mostrarResultado(`Intento ${intentos}: ${resultado}`, false);
    mostrarIntento(userInput, resultado);
    solicitarNuevoIntento();
  }
}


function solicitarNuevoIntento() {
  const userInput = document.getElementById("userInput");
  userInput.value = "";
  userInput.focus();
}

// ... (código existente)

function compararNumeros(numSecreto, numUsuario) {
  if (numSecreto === numUsuario) {
    return "¡Has adivinado el número secreto!";
  }

  let resultado = "";
  for (let i = 0; i < numSecreto.length; i++) {
    resultado += numSecreto[i] === numUsuario[i] ? numUsuario[i] : (numSecreto.includes(numUsuario[i]) ? "*" : " ");
  }

  return resultado;
}

function mostrarResultado(resultado, acierto) {
  const info = document.getElementById("info");
  info.innerHTML = resultado;

  // Agregar o quitar la clase 'acierto-box' según si es un acierto
  const inputBox = document.querySelector(".input-box");
  inputBox.classList.toggle("acierto-box", !acierto);

  // Limpiar la entrada y enfocarla solo si no es un acierto
  if (!acierto) {
    solicitarNuevoIntento();
  }
}


function mostrarCodigo(codigo) {
  const codeCells = document.querySelectorAll(".code-cell");
  codeCells.forEach((cell, index) => {
    cell.textContent = codigo[index];
    const bgColor = cell.textContent === codigo[index] ? "green" : (codigo.includes(cell.textContent) ? "yellow" : "gray");
    cell.style.backgroundColor = bgColor;
  });
}

function mostrarIntento(intento, resultado) {
  const attempts = document.querySelector(".attempts");
  const attemptRow = document.createElement("div");
  attemptRow.classList.add("attempt-row");

  for (let i = 0; i < intento.length; i++) {
    const attemptCell = document.createElement("div");
    attemptCell.classList.add("code-cell");
    attemptCell.textContent = intento[i];
    const bgColor = (intento[i] === numeroSecreto[i] ? "green" : (numeroSecreto.includes(intento[i]) ? "yellow" : "gray"));
    attemptCell.style.backgroundColor = bgColor;
    attemptRow.appendChild(attemptCell);
  }

  attempts.appendChild(attemptRow);
}
