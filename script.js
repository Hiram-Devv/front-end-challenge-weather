// Selectores

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario')


window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();
    console.log("Buscando el clima")

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError("Ambos campos son obligatorios")
    }


    // Consultar Api
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){
    // console.log(mensaje)
    limpiarHTML();
    // Si la alerta tiene esta clase, ya no se genera más de una
    const alerta = document.querySelector('.numAlerta')

        if(!alerta){
            // Create alert
            const alerta = document.createElement('div');
            alerta.classList.add('alerta');
            alerta.classList.add('numAlerta');

            alerta.innerHTML = `
            <strong class="font-bold">Error!</strong> <br>
            <span class="block">${mensaje}</span>
            `;
            container.appendChild(alerta)

            // Eliminar alerta después de 3 segundos

            setTimeout(() => {
                alerta.remove();
            }, 3000);
    }
}

function consultarAPI(ciudad, pais){

    const appId = 'c3558fe03befb5e03a2c761ebf161a14';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML(); // Limpiar html previo
            
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada')
                return;
            }

                // Imprimir la respuesta en el html
                mostrarClima(datos);
        })
}


function mostrarClima(datos){
    const { name, main: {temp, temp_max, temp_min}} = datos

    const centigrados = kelvinACentigrados(temp);
    const temp_Maxima = kelvinACentigrados(temp_max);
    const temp_Minima = kelvinACentigrados(temp_min);
    
    // Mostrar en HTML
    // Nombre de la ciudad
    const nombreCiudad = document.createElement('h1');
    nombreCiudad.classList.add('nombre-ciudad');
    nombreCiudad.textContent = `Clima en ${name}`
    // Temperatura actual
    const tempActual = document.createElement('p');
    tempActual.classList.add('style-temp-act');
    tempActual.innerHTML = `${centigrados} &#8451`;

    // Temperatura máxima
    const tempMaxima = document.createElement('p');
    tempMaxima.classList.add('style-temp');
    tempMaxima.innerHTML = `Max: ${temp_Maxima} &#8451`;

    // Temperatura minima
    const tempMinima = document.createElement('p');
    tempMinima.classList.add('style-temp');
    tempMinima.innerHTML = `Min: ${temp_Minima} &#8451`;


    const resultadoDiv = document.createElement('div');
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
    
}
 // Puede ser función o arrowFunction
const kelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}



