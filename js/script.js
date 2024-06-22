// Constantes / Elementos traidas del HTML
const title = document.getElementById("precision"),
text = document.getElementById("text"),
trofeo = document.getElementById("trofeo"),
intentos = document.getElementById("intentos"),
textoNumeros = document.getElementById("numeros-validos"),
inputUsuario = document.getElementById("numero-usuario"),
buttonUsuario = document.getElementById("button-usuario");

let numerosValidos = 100, // cantidad de numeros
posiblesIntentos = 6, // intentos
contadorIntentos = 0; // contador

let numeroSecreto = Math.floor(Math.random() * numerosValidos)+1; // numero aleatorio

// ingresa texto a partir de parametros anteriores
textoNumeros.textContent = `Ingresa un numero del 1 al ${numerosValidos}` 
intentos.textContent = `Tienes ${posiblesIntentos} intentos`;

// validacion del numero secreto
inputUsuario.addEventListener('keydown', function(event) {
    numeroUsuario = parseInt(this.value);
    // Comprobar si la tecla presionada es Enter
    if (event.key === 'Enter' ) {
        validarNumero()
    }
});

buttonUsuario.addEventListener('click', function() {
    numeroUsuario = parseInt(inputUsuario.value);
    
    if(buttonUsuario.textContent === 'Enviar'){
        validarNumero();
    }else{
        location.reload();
    }
});

function validarNumero() {
    if (!isNaN(numeroUsuario)) {
        if (numeroUsuario === numeroSecreto) {
            title.textContent = ' Correcto!';
            text.textContent = 'Descubriste el número secreto!';
            trofeo.style.color = '#ffee00'
            inputUsuario.disabled = true;
            buttonUsuario.textContent = 'Reiniciar';
        }else if(numeroUsuario < numeroSecreto){
            title.textContent = ' Incorrecto!';
            text.textContent = 'El número secreto es MAYOR';
            inputUsuario.classList.add('error');
        }else{
            title.textContent = ' Incorrecto!';
            text.textContent = 'El número secreto es Menor';
            inputUsuario.classList.add('error');
        }
        
        setTimeout(() => {
            inputUsuario.classList.remove('error');
        }, 500);

        inputUsuario.select();
        contadorIntentos++;

        intentos.textContent = `Quedan ${posiblesIntentos - contadorIntentos} intento${contadorIntentos != 1 ? 's' : ''}`;

        if (posiblesIntentos - contadorIntentos == 0 && numeroUsuario != numeroSecreto) {
            title.textContent = ' Perdiste!';
            text.textContent = 'Vuelve a intentarlo';
            inputUsuario.disabled = true;
            buttonUsuario.textContent = 'Reiniciar';
        }
    }
}

// validacion del input para el usuario solo numero del 1 - 10
document.getElementById('numero-usuario').addEventListener('input', function(event) {
    numeroUsuario = this;
    // Remover cualquier carácter que no sea un número
    numeroUsuario.value = numeroUsuario.value.replace(/[^0-9]/g, '');

    // Obtener el valor actual del numeroUsuario y lo transforma a numero
    let valor = parseInt(numeroUsuario.value);

    // Si el valor es mayor a 10, establecerlo a 10
    if (valor > numerosValidos) {
        numeroUsuario.value = numerosValidos;
    }

    // Si el valor es menor a 0 o esta vacio queda vacio
    if (valor < 0 || isNaN(valor)) {
        numeroUsuario.value = '';
    }
});




