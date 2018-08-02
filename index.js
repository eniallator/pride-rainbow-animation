const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const points = 100
const colours = [
    { colour: '#E70000', trail: [], trailLength: 30 },
    { colour: '#FF8C00', trail: [], trailLength: 30 },
    { colour: '#FFEF00', trail: [], trailLength: 30 },
    { colour: '#00811F', trail: [], trailLength: 30 },
    { colour: '#0044FF', trail: [], trailLength: 30 },
    { colour: '#760089', trail: [], trailLength: 30 }
]

let frame = 0

function run() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'

    for (let i in colours) {
        // const width = canvas.width / colours.length
        // ctx.fillRect(i * width, 0, width, canvas.height)
        const offset = i * 40
        const width = canvas.width - offset * 2
        const height = canvas.height - offset

        const x = offset + ((frame % points) / points) * width
        const y = canvas.height - height * Math.sin(((frame % points) / points) * Math.PI)
        colours[i].trail.unshift([x, y])

        while (colours[i].trail.length > colours[i].trailLength) colours[i].trail.pop()

        for (let j in colours[i].trail) {
            const pos = colours[i].trail[j]
            ctx.fillStyle = colours[i].colour
            ctx.globalAlpha = 1 - j / colours[i].trailLength
            ctx.fillRect(pos[0] - 20, pos[1], 40, 40)
        }
        ctx.globalAlpha = 1
    }

    frame++
    requestAnimationFrame(run)
}

run()