<template>
  <div class="bg-wedding">
    <full-page ref="fullpage" :options="options">
      <section class="section">
        <div class="h-screen">
          <vue-p5
            @preload="preload"
            @setup="setup"
            @draw="draw"
            @keypressed="keyPressed"
            @mousereleased="mouseReleased"
            @touchended="mouseReleased"
          ></vue-p5>
        </div>
      </section>
      <!-- <audio :src="require('@/assets/audios/church-bell.wav')" controls></audio> -->

      <section class="section">
        <div class="h-screen p-4 grid grid-cols-2 gap-4">
          <div class="h-full w-full bg-white bg-opacity-30"></div>
          <div class="h-full w-full bg-white bg-opacity-30"></div>
          <div class="h-full w-full bg-white bg-opacity-30"></div>
          <div class="row-span-2 h-full w-full bg-white bg-opacity-30">
            <div
              ref="aniText"
              class="text-xl md:text-3xl lg:text-5xl animate-text"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              fugiat doloribus perferendis quas? Aperiam asperiores accusantium
              accusamus unde, soluta molestias consequatur veniam consectetur
              quos laudantium!
            </div>
          </div>
          <div class="row-span-2 h-full w-full bg-white bg-opacity-30">
            <img
              src="https://images.unsplash.com/photo-1537907690979-ee8e01276184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
              alt=""
            />
          </div>
          <div class="h-full w-full bg-white bg-opacity-30"></div>
          <div class="h-full w-full bg-white bg-opacity-30"></div>
          <div class="h-full w-full bg-white bg-opacity-30">
            <img
              src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
              alt=""
            />
          </div>
        </div>
      </section>

      <section class="section">
        <div class="h-screen flex justify-center items-center">
          <iframe
            width="90%"
            height="90%"
            src="https://www.surveycake.com/s/947X1"
            style="border: #ddd 1px solid"
            allowTransparency="true"
            frameborder="0"
          ></iframe>
        </div>
      </section>

      <section class="section">
        <div class="h-screen flex justify-center items-center"></div>
      </section>
    </full-page>
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
const wordsEngine = Engine.create()
wordsEngine.world.gravity.y = 0.3
// const bellSound = require('~/assets/audios/church-bell.wav')

export default {
  data() {
    return {
      bellSound: null,
      bellImage: null,
      heartImage: null,
      letterBImage: null,
      letterEImage: null,
      letterAndImage: null,
      wordB: null,
      wordE: null,
      wordAnd: null,
      ball: null,
      bell: null,
      rope: null,
      sling: null,
      toys: [],
      sandBoxes: [],
      constraints: [],
      words: [],

      options: {
        afterLoad: this.afterLoad,
      },
    }
  },
  mounted() {},
  methods: {
    preload(sketch) {
      // this.bellSound = sketch.loadSound('~/assets/audios/church-bell.wav')
      this.bellSound = new Audio(require('@/assets/audios/church-bell.wav'))
      // https://www.flaticon.com/free-icon/bell_4318021?term=bell&page=3&position=36&page=3&position=36&related_id=4318021&origin=search
      this.bellImage = sketch.loadImage(require('~/assets/images/bell.png'))

      // https://www.flaticon.com/free-icon/favourite_3208707?term=heart&page=1&position=20&page=1&position=20&related_id=3208707&origin=search
      this.heartImage = sketch.loadImage(require('~/assets/images/heart.png'))

      this.letterBImage = sketch.loadImage(require('~/assets/images/b.svg'))
      this.letterEImage = sketch.loadImage(require('~/assets/images/e.svg'))
      this.letterAndImage = sketch.loadImage(
        require('~/assets/images/ampersand.svg')
      )
    },
    setup(sketch) {
      const sCanvas = sketch.createCanvas(
        sketch.windowWidth,
        sketch.windowHeight
        // (sketch.windowHeight * 4) / 5
      )
      sketch.background('#abd8e0')

      //
      this.createSandbox(sketch)

      // Words
      this.wordB = Bodies.rectangle(sketch.width / 2 - 75, -125, 50, 50, {
        restitution: 0.8,
        angle: -Math.PI * 0.15,
      })
      this.wordE = Bodies.rectangle(sketch.width / 2 + 75, -125, 50, 50, {
        restitution: 0.8,
        angle: Math.PI * 0.15,
      })
      this.wordAnd = Bodies.rectangle(sketch.width / 2, -100, 30, 30, {
        restitution: 0.8,
        angle: Math.PI * 0.25,
      })
      Body.setStatic(this.wordB, true)
      Body.setStatic(this.wordE, true)
      Body.setStatic(this.wordAnd, true)
      this.words.push(this.wordB)
      this.words.push(this.wordE)
      this.words.push(this.wordAnd)
      World.add(wordsEngine.world, this.wordB)
      World.add(wordsEngine.world, this.wordE)
      World.add(wordsEngine.world, this.wordAnd)

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
      const wordsMC = MouseConstraint.create(wordsEngine, { mouse })
      World.add(engine.world, mouseConstraint)
      World.add(wordsEngine.world, wordsMC)

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
            Body.setStatic(this.wordAnd, false)
          }
        }
      })

      Engine.run(engine)
      Engine.run(wordsEngine)
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
        sketch.strokeWeight(0)
        sketch.fill('#b7dbdb')
        for (const vert of sand.vertices) {
          sketch.vertex(vert.x, vert.y)
        }
        sketch.endShape(sketch.CLOSE)
      }

      sketch.imageMode(sketch.CENTER)
      sketch.push()
      sketch.translate(this.wordB.position.x, this.wordB.position.y)
      sketch.rotate(this.wordB.angle)
      sketch.image(this.letterBImage, 0, 0, 75, 75)
      sketch.pop()

      sketch.push()
      sketch.translate(this.wordE.position.x, this.wordE.position.y)
      sketch.rotate(this.wordE.angle)
      sketch.image(this.letterEImage, 0, 0, 75, 75)
      sketch.pop()

      sketch.push()
      sketch.translate(this.wordAnd.position.x, this.wordAnd.position.y)
      sketch.rotate(this.wordAnd.angle)
      sketch.image(this.letterAndImage, 0, 0, 50, 50)
      sketch.pop()

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
      setTimeout(() => {
        this.sling.bodyB = null
      }, 70)
    },
    createSandbox(sketch) {
      const ground = Bodies.rectangle(
        sketch.width / 2,
        sketch.height,
        sketch.width,
        100,
        {
          isStatic: true,
        }
      )
      const ceiling = Bodies.rectangle(
        sketch.width / 2,
        -350,
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
        sketch.height + 500,
        {
          isStatic: true,
        }
      )
      const wallRight = Bodies.rectangle(
        sketch.width + 150,
        sketch.height / 2,
        300,
        sketch.height + 500,
        {
          isStatic: true,
        }
      )

      this.sandBoxes = [ground, ceiling, wallLeft, wallRight]
      World.add(engine.world, this.sandBoxes)
      World.add(wordsEngine.world, this.sandBoxes)
    },

    afterLoad(orig, dest, direct) {
      console.log("Emitted 'after load' event.", orig, dest, direct)
      if (dest.index === 1) {
        this.$refs.aniText.style = 'opacity: 1; transform: translateZ(0);'
      }
    },
  },
}
</script>

<style scoped>
.bg-wedding {
  background-image: linear-gradient(
    to bottom,
    #abd8e0 0%,
    #d5e3ce 96%,
    #dddec9 98%,
    #f7e6ba 100%
  );
}

.animate-text {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
