'use strict'

const galeria = document.getElementById('galeria')
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')

let currentIndex = 0
let slides = []
let autoplayInterval = null

async function chamarFotos() {
  try {
    const response = await fetch('http://localhost:3000/fotos')
    const dados = await response.json()
    return dados || []
  } catch (error) {
    console.error('Erro ao conectar com a API:', error)
    return []
  }
}

async function renderizarFotos() {
  const fotos = await chamarFotos()

  fotos.forEach((foto) => {
    const container = document.createElement('div')
    container.classList.add('slide')

    const image = document.createElement('img')
    image.src = foto.imagem

    const legenda = document.createElement('p')
    legenda.textContent = foto.legenda

    const data = document.createElement('p')
    data.textContent = `Data: ${foto.data}`

    container.appendChild(image)
    container.appendChild(legenda)
    container.appendChild(data)

    galeria.appendChild(container)
  })

  slides = document.querySelectorAll('.slide')
  mostrarSlide(currentIndex)
  iniciarAutoplay()
}

function mostrarSlide(index) {
  const slideWidth = slides[0].offsetWidth
  galeria.style.transform = `translateX(-${index * slideWidth}px)`
}

prevButton.addEventListener('click', () => {
  pararAutoplay()
  currentIndex = (currentIndex - 1 + slides.length) % slides.length
  mostrarSlide(currentIndex)
  iniciarAutoplay()
})

nextButton.addEventListener('click', () => {
  pararAutoplay()
  currentIndex = (currentIndex + 1) % slides.length
  mostrarSlide(currentIndex)
  iniciarAutoplay()
})

function iniciarAutoplay() {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length
    mostrarSlide(currentIndex)
  }, 4000) // muda a cada 4 segundos
}

function pararAutoplay() {
  clearInterval(autoplayInterval)
}

renderizarFotos()
