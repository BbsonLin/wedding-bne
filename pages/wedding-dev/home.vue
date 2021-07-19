<template>
  <div>
    <client-only>
      <vue-p5
        @preload="preload"
        @setup="setup"
        @draw="draw"
        @keypressed="keyPressed"
        @mousereleased="mouseReleased"
      ></vue-p5>
    </client-only>
    <audio :src="require('@/assets/audios/church-bell.wav')" controls></audio>
  </div>
</template>

<script>
import Matter from 'matter-js'

const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body
const Constraint = Matter.Constraint
const MouseConstraint = Matter.MouseConstraint
const Mouse = Matter.Mouse
const Events = Matter.Events

const engine = Engine.create()
// const bellSound = require('~/assets/audios/church-bell.wav')

export default {
  data() {
    return {
      bellSound: null,
      bellImage: null,
      heartImage: null,
      wordB: null,
      wordE: null,
      ball: null,
      bell: null,
      rope: null,
      sling: null,
      toys: [],
      sandBoxes: [],
      constraints: [],
      words: [],
    }
  },
  methods: {
    preload(sketch) {
      // this.bellSound = sketch.loadSound('~/assets/audios/church-bell.wav')
      this.bellSound = new Audio(require('@/assets/audios/church-bell.wav'))
      // https://www.flaticon.com/free-icon/bell_4318021?term=bell&page=3&position=36&page=3&position=36&related_id=4318021&origin=search
      this.bellImage = sketch.loadImage(require('~/assets/images/bell.png'))

      // https://www.flaticon.com/free-icon/favourite_3208707?term=heart&page=1&position=20&page=1&position=20&related_id=3208707&origin=search
      this.heartImage = sketch.loadImage(require('~/assets/images/heart.png'))
      console.log('heartImage', this.heartImage, '~')
    },
    setup(sketch) {
      const sCanvas = sketch.createCanvas(
        sketch.windowWidth,
        (sketch.windowHeight * 2) / 3
      )
      sketch.background('#abd8e0')

      //
      this.createSandbox(sketch)

      // Words
      this.wordB = Bodies.rectangle(sketch.width / 2 + 15, -50, 50, 50, {
        restitution: 0.8,
      })
      this.wordE = Bodies.rectangle(sketch.width / 2, -125, 50, 50, {
        restitution: 0.8,
      })
      Body.setStatic(this.wordB, true)
      Body.setStatic(this.wordE, true)
      this.words.push(this.wordB)
      this.words.push(this.wordE)
      World.add(engine.world, this.wordB)
      World.add(engine.world, this.wordE)

      // Ball
      this.ball = Bodies.circle(100, 300, 25)
      this.toys.push(this.ball)
      World.add(engine.world, this.ball)

      // // Bell
      this.bell = Bodies.rectangle(sketch.width - 150, 250, 25, 70)
      this.toys.push(this.bell)
      World.add(engine.world, this.bell)

      // // Rope
      this.rope = Constraint.create({
        pointA: { x: sketch.width - 150, y: 100 },
        bodyB: this.bell,
        length: 100,
        stiffness: 0.75,
      })
      this.constraints.push(this.rope)
      World.add(engine.world, this.rope)

      // Sling
      this.sling = Constraint.create({
        pointA: { x: 300, y: sketch.height - 150 },
        bodyB: this.ball,
        length: 0,
        stiffness: 0.05,
      })
      this.constraints.push(this.sling)
      World.add(engine.world, this.sling)

      // Mouse Control
      const mouse = Mouse.create(sCanvas.elt)
      /// https://youtu.be/W-ou_sVlTWk?t=386
      mouse.pixelRatio = sketch.pixelDensity()
      const mouseConstraint = MouseConstraint.create(engine, { mouse })
      World.add(engine.world, mouseConstraint)

      Events.on(engine, 'collisionStart', (evt) => {
        for (const pair of evt.pairs) {
          // console.log('==========')
          // console.log(pair.bodyA)
          // console.log('bell', this.ball)
          if (pair.bodyA === this.ball && pair.bodyB === this.bell) {
            // const sound = new Audio(this.bellSound)
            // console.log(pair.bodyB)
            // console.log(pair.bodyB.angle)
            this.bellSound.play()
            Body.setStatic(this.wordB, false)
            Body.setStatic(this.wordE, false)
          }
        }
      })

      Engine.run(engine)
    },
    draw(sketch) {
      sketch.background('#abd8e0')
      // sketch.ellipse(sketch.mouseX, sketch.mouseY, 20, 20)

      for (const cons of this.constraints) {
        const pA = cons.pointA
        if (cons.bodyB) {
          const pB = cons.bodyB.position
          sketch.push()
          sketch.stroke('white')
          sketch.strokeWeight(2)
          sketch.line(pA.x, pA.y, pB.x, pB.y)
          sketch.pop()
        }
      }

      for (const w of this.words) {
        sketch.beginShape()
        for (const vert of w.vertices) {
          sketch.vertex(vert.x, vert.y)
        }
        sketch.endShape(sketch.CLOSE)
      }

      for (const t of this.toys) {
        sketch.beginShape()
        for (const vert of t.vertices) {
          sketch.vertex(vert.x, vert.y)
        }
        sketch.endShape(sketch.CLOSE)
      }

      for (const sand of this.sandBoxes) {
        sketch.beginShape()
        for (const vert of sand.vertices) {
          sketch.vertex(vert.x, vert.y)
        }
        sketch.endShape(sketch.CLOSE)
      }

      sketch.imageMode(sketch.CENTER)
      sketch.image(
        this.heartImage,
        this.ball.position.x,
        this.ball.position.y,
        50,
        50
      )
      sketch.push()
      sketch.translate(this.bell.position.x, this.bell.position.y)
      sketch.rotate(this.bell.angle)
      sketch.image(this.bellImage, 0, 0, 75, 75)
      sketch.pop()
    },
    keyPressed({ keyCode }) {
      console.log('keyPressed', keyCode)

      if (keyCode === 32) {
        // space
        this.sling.bodyB = this.ball
      }

      if (keyCode === 83) {
        // s
        this.sling.bodyB = null
      }

      if (keyCode === 87) {
        // w
        Body.setStatic(this.wordB, false)
        Body.setStatic(this.wordE, false)
      }
    },
    mouseReleased() {
      console.log('mouseReleased')

      setTimeout(() => {
        this.sling.bodyB = null
      }, 70)
    },
    createSandbox(sketch) {
      const ground = Bodies.rectangle(
        sketch.width / 2,
        sketch.height + 150,
        sketch.width,
        300,
        {
          isStatic: true,
        }
      )
      const ceiling = Bodies.rectangle(
        sketch.width / 2,
        -150,
        sketch.width,
        300,
        {
          isStatic: true,
        }
      )
      const wallLeft = Bodies.rectangle(
        -150,
        sketch.height / 2,
        300,
        sketch.height,
        {
          isStatic: true,
        }
      )
      const wallRight = Bodies.rectangle(
        sketch.width + 150,
        sketch.height / 2,
        300,
        sketch.height,
        {
          isStatic: true,
        }
      )

      this.sandBoxes = [ground, ceiling, wallLeft, wallRight]
      World.add(engine.world, this.sandBoxes)
    },
  },
}
</script>
