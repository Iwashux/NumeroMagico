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

// validacion por precionar Enter
inputUsuario.addEventListener('keydown', function(event) {
    numeroUsuario = parseInt(this.value);
    // Comprobar si la tecla presionada es Enter
    if (event.key === 'Enter' ) {
        validarNumero()
    }
});

// validacion por precionar boton
buttonUsuario.addEventListener('click', function() {
    numeroUsuario = parseInt(inputUsuario.value);
    // comprueba si el boton dice Enviar
    if(buttonUsuario.textContent === 'Enviar'){
        validarNumero();
    }else{ // caso contrario se reinicia la pagina (boton = Reiniciar)
        location.reload();
    }
});

// validacion del numero secreto
function validarNumero() { 
    if (!isNaN(numeroUsuario)) { // validacion de que el campo no este vacio
        if (numeroUsuario === numeroSecreto) { 
            // cambios del texto dinamico
            textoDinamico(' Correcto!', 'Descubriste el número secreto!')
            finalizacionTurno()
            trofeo.style.color = '#ffee00'

        }else{
            if(numeroUsuario < numeroSecreto) {
                textoDinamico(' Incorrecto!', 'El número secreto es MAYOR') 
            } else {
                textoDinamico(' Incorrecto!', 'El número secreto es Menor')
            }
            
            inputUsuario.classList.add('error'); // agrega animacion error
            intentos.classList.add('error');
        }
        
        // termina animacion error
        setTimeout(() => {
            inputUsuario.classList.remove('error');
            intentos.classList.remove('error');
        }, 500);

        //selecciona input para cambio constante
        inputUsuario.select();
        contadorIntentos++;
        //texto dinamico
        intentos.textContent = `Quedan ${posiblesIntentos - contadorIntentos} intento${contadorIntentos != 1 ? 's' : ''}`;

        // validacion de termino de intentos
        if (posiblesIntentos - contadorIntentos == 0 && numeroUsuario != numeroSecreto) {
            // cambios del texto dinamico
            textoDinamico(' Perdiste!', 'Vuelve a intentarlo')
            finalizacionTurno()
        }
    }
}

// texto dinamico para la validacion del numero
function textoDinamico(textTitulo, textTexto) {
    title.textContent = textTitulo;
    text.textContent = textTexto;
}

function finalizacionTurno() {
    inputUsuario.disabled = true;
    buttonUsuario.textContent = 'Reiniciar'; // cambia la funcionalidad del boton
}

// validacion del input para el usuario solo numero del 1 - numero deseado
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




