const character = document.querySelector('#character')

const COEFICIENT = 3

const sprite = {
  image: 'animation.png',
  cellSize: {
    width: 78,
    height: 82
  },
}

// Загружаем картинку
async function load() {
  return new Promise(resolve => {
    const image = new Image()
    image.src = sprite.image
    
    image.onload = () => {
      resolve(image)
    }
  })
}

// Старт
async function start() {
  const image = await load()

  const createAnimation = (framesCount, row) => {
    return Array(framesCount).fill(0).map((_, idx) => ({
      x: idx * sprite.cellSize.width * COEFICIENT,
      y: row * sprite.cellSize.height * COEFICIENT
    }))
  } 

  const stayFrames = createAnimation(9, 0)
  const runFrames = createAnimation(8, 1)
  const sprintFrames = createAnimation(4, 2)

  const animationToPlay = runFrames.concat(sprintFrames)

  character.style.backgroundImage = `url(${image.src})`
  character.style.backgroundSize = `${image.width * COEFICIENT}px`
  character.style.width = sprite.cellSize.width * COEFICIENT + 'px'
  character.style.height = sprite.cellSize.height * COEFICIENT + 'px'

  let frameIndex = 0
  let characherX = 0

  // document.addEventListener('keydown', (event) => {
  //   if(['ArrowLeft', 'ArrowRight'].includes(event.key) === false) return

  //   const sign = event.key === 'ArrowLeft' ? -1 : 1
  //   frameIndex += sign
  //   frameIndex = Math.min(Math.max(frameIndex, 0), frames.length - 1)

  //   const frame = frames[frameIndex]

  //   character.style.backgroundPosition = `${-frame.x+2}px ${frame.y}px`
  // })

  const animate = () => {
    const frame = animationToPlay[frameIndex % animationToPlay.length]

    character.style.backgroundPosition = `${-frame.x + 2}px ${-frame.y}px`

    character.style.left = `${characherX * sprite.cellSize.width / 1.5}px`

    frameIndex++
    characherX++

    if(frameIndex >= animationToPlay.length) frameIndex = 8

    if(window.innerWidth <= parseInt(character.style.left)) {
      characherX = -1.5
    }

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

start()
