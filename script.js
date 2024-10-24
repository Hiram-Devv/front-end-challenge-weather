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
}

function mostrarError(mensaje){
    // console.log(mensaje)
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




