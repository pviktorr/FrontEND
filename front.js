'use strict'

const galeria = document.getElementById('galeria')
    
async function chamarFotos() {
    const response = await fetch('http://localhost:3000/fotos')

    const dados = await response.json()

    if(dados){
        return dados
    }else{
        return ('Erro ao conectar com a API')
    }

}


async function pegarFotos() {

    const fotos = await chamarFotos()
    return fotos
    
}

async function renderizarFotos() {
    const fotos = await pegarFotos()
    fotos.forEach(function(foto) {
        const image = document.createElement('img')
        image.src = foto.imagem
       
        const legenda = document.createElement('p')
        legenda.textContent = foto.legenda;

        const data = document.createElement('p')
        data.textContent = `Data: ${foto.data}`

        const container = document.createElement('div')

        container.appendChild(image)
        container.appendChild(legenda)
        container.appendChild(data)
        galeria.appendChild(container)
    });
}
   



