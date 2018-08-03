const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const points = 100
// const speed = 50
const colourWidth = 20
const colours = [
    { colour: '#E70000', trail: [], trailLength: 30 },
    { colour: '#FF8C00', trail: [], trailLength: 30 },
    { colour: '#FFEF00', trail: [], trailLength: 30 },
    { colour: '#00811F', trail: [], trailLength: 30 },
    { colour: '#0044FF', trail: [], trailLength: 30 },
    { colour: '#760089', trail: [], trailLength: 30 }
]

let count = 0

function run() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'

    for (let i in colours) {
        const offset = i * colourWidth * 2
        const radius = Math.min(canvas.width / 2, canvas.height) - offset

        const angle = ((count % points) / points) * Math.PI
        // const angle = ((count * speed) / (Math.PI * radius)) % Math.PI
        const x = canvas.width / 2 - radius * Math.cos(angle)
        const y = canvas.height - radius * Math.sin(angle)
        colours[i].trail.unshift([x, y])

        while (colours[i].trail.length > colours[i].trailLength) colours[i].trail.pop()

        for (let j in colours[i].trail) {
            const pos = colours[i].trail[j]
            ctx.fillStyle = colours[i].colour
            ctx.globalAlpha = 1 - j / colours[i].trailLength
            ctx.beginPath()
            ctx.arc(pos[0], pos[1], colourWidth + 1, 0, 2 * Math.PI, false)
            ctx.fill()
        }

        ctx.globalAlpha = 1
    }

    count++
    requestAnimationFrame(run)
}

run()
