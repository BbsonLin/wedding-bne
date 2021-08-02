<template>
  <div class="bg-wedding">
    <full-page ref="fullpage" :options="options">
      <section class="section">
        <div class="h-full">
          <vue-p5
            @preload="preload"
            @setup="setup"
            @draw="draw"
            @keypressed="keyPressed"
            @mousereleased="mouseReleased"
            @touchended="mouseReleased"
          ></vue-p5>
        </div>
        <button class="btn-forward" @click="goForward">SKIP</button>
      </section>
      <!-- <audio :src="require('@/assets/audios/church-bell.wav')" controls></audio> -->

      <section id="intro" class="section">
        <div class="h-screen grid grid-cols-8 grid-rows-6 gap-2">
          <div
            class="
              h-full
              w-full
              p-4
              flex
              items-center
              col-span-full
              row-start-1
              md:col-start-1 md:col-span-4
              md:row-start-1 md:row-span-3
            "
          >
            <p v-scroll-animater="'fadein-left'" class="text-5xl md:text-right">
              Lorem ipsum dolor sit amet.
            </p>
          </div>

          <div
            v-scroll-animater="'fadein-up'"
            class="
              h-full
              w-full
              pt-8
              col-span-full
              row-start-2
              md:col-start-5 md:col-span-4
              md:row-span-full
            "
          >
            <img
              src="https://images.unsplash.com/photo-1537907690979-ee8e01276184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
              alt=""
            />
          </div>

          <div
            v-scroll-animater="'fadein-left'"
            class="
              h-full
              w-full
              p-2
              col-start-3 col-end-[-1]
              row-start-5 row-end-[-1]
              md:col-start-2 md:col-span-4
              md:row-start-4 md:row-span-2
              bg-white bg-opacity-70
              rounded
              text-xl
              md:text-right
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            architecto earum ut adipisci laudantium voluptates mollitia voluptas
            perspiciatis quod illo.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="absolute card w-full h-full">
          <div
            v-scroll-animater="'card-flip-left'"
            class="card-front flex flex-col items-center p-8"
          >
            <div class="text-3xl mt-8">Lorem ipsum</div>
            <div class="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique quis et minima possimus consectetur dolorum quibusdam
              dolorem, voluptatibus aliquam quae natus? Quas repellendus
              architecto mollitia voluptatibus molestiae dolor quisquam
              temporibus.
            </div>
          </div>
          <iframe
            v-scroll-animater="'card-flip-right'"
            class="card-back"
            src="https://www.surveycake.com/s/947X1"
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
      cloudx: 100,
      cloudy: 75,
      widthOffset: 0,
      toys: [],
      sandBoxes: [],
      constraints: [],
      words: [],

      options: {
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: ['Bobson & Elva', 'Intro', 'RSVP', 'Thanks'],
        showActiveTooltip: true,
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
      if (sketch.width < 576) this.widthOffset = 100
      sketch.background('#abd8e0')

      Events.on(engine, 'collisionStart', (evt) => {
        for (const pair of evt.pairs) {
          // console.log('==========')
          // console.log(pair.bodyA)
          // console.log('bell', this.ball)
          if (pair.bodyA === this.ball && pair.bodyB === this.bell) {
            this.bellSound.play()
            Body.setStatic(this.wordB, false)
            Body.setStatic(this.wordE, false)
            Body.setStatic(this.wordAnd, false)
          }
        }
      })

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
      this.ball = Bodies.circle(10, 150, 20, { restitution: 0.3 })
      this.toys.push(this.ball)
      World.add(engine.world, this.ball)

      // Bell
      this.bell = Bodies.rectangle(
        sketch.width - 150 + this.widthOffset,
        sketch.height - 300,
        25,
        35
      )
      this.toys.push(this.bell)
      World.add(engine.world, this.bell)

      // Rope
      this.rope = Constraint.create({
        pointA: {
          x: sketch.width - 155 + this.widthOffset,
          y: sketch.height - 330,
        },
        bodyB: this.bell,
        length: 45,
        stiffness: 0.75,
      })
      this.constraints.push(this.rope)
      World.add(engine.world, this.rope)

      // Sling
      this.sling = Constraint.create({
        pointA: { x: 125, y: sketch.height - 150 },
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

      Engine.run(engine)
      Engine.run(wordsEngine)
    },
    draw(sketch) {
      sketch.background('#abd8e0')
      // sketch.ellipse(sketch.mouseX, sketch.mouseY, 20, 20)

      sketch.fill('Salmon')
      sketch.textSize(16)
      sketch.textAlign(sketch.CENTER)
      sketch.text(
        '(' +
          sketch.floor(sketch.mouseX) +
          ', ' +
          sketch.floor(sketch.mouseY) +
          ')',
        sketch.mouseX,
        sketch.mouseY
      )

      this.createChurch(
        sketch,
        sketch.width - 250 + this.widthOffset,
        sketch.windowHeight - 150
      )

      sketch.fill('white')

      for (const cons of this.constraints) {
        const pA = cons.pointA
        if (cons.bodyB) {
          const pB = cons.bodyB.position
          sketch.push()
          sketch.stroke('#91aaaf')
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
        35,
        35
      )
      sketch.push()
      sketch.translate(this.bell.position.x, this.bell.position.y)
      sketch.rotate(this.bell.angle)
      sketch.image(this.bellImage, 0, 0, 50, 50)
      sketch.pop()

      this.createCloud(sketch, this.cloudx, this.cloudy - 25)
      this.createCloud(sketch, this.cloudx + 150, this.cloudy + 25)
      this.createCloud(sketch, this.cloudx + 500, this.cloudy)
      this.cloudx += 0.25
      if (this.cloudx > sketch.windowWidth + 100) this.cloudx = -500
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
    createChurch(sketch, baseX, baseY) {
      sketch.push()
      // Base
      sketch.fill('pink')
      sketch.stroke('white')
      sketch.strokeWeight(5)
      sketch.rect(baseX - 5, baseY, 210, 100)

      // Second Floor
      sketch.arc(baseX + 100, baseY, 200, 200, -sketch.PI, 0)
      sketch.rect(baseX + 50, baseY - 105, 100, 20)

      // Roof
      sketch.strokeWeight(3)
      sketch.rect(baseX + 53, baseY - 165, 15, 60)
      sketch.rect(baseX + 128, baseY - 165, 15, 60)

      // Roof Arc
      sketch.strokeWeight(8)
      sketch.noFill()
      sketch.arc(baseX + 98, baseY - 168, 60, 30, -sketch.PI, 0)

      // Cross
      sketch.strokeWeight(5)
      sketch.line(baseX + 80, baseY - 210, baseX + 110, baseY - 210) // line(x1, y1, x2, y2)
      sketch.line(baseX + 95, baseY - 180, baseX + 95, baseY - 220)

      // Door
      this.createChurchDoor(sketch, baseX + 60, baseY + 25)

      // Window
      this.createChurchWindow(sketch, baseX + 65, baseY - 60)

      sketch.pop()
    },
    createChurchDoor(sketch, baseX, baseY) {
      sketch.push()
      sketch.fill('#057dba')
      sketch.rect(baseX, baseY, 50, 75)

      sketch.fill('#91aaaf')
      sketch.strokeWeight(1)
      sketch.rect(baseX + 5, baseY + 5, 15, 30)
      sketch.rect(baseX + 30, baseY + 5, 15, 30)

      sketch.rect(baseX + 5, baseY + 40, 15, 25)
      sketch.rect(baseX + 30, baseY + 40, 15, 25)

      sketch.stroke('#2a384e')
      sketch.line(baseX + 25, baseY + 5, baseX + 25, baseY + 70)
      sketch.pop()
    },
    createChurchWindow(sketch, baseX, baseY) {
      sketch.push()
      sketch.fill('#5a6b6e')
      sketch.strokeWeight(1)
      sketch.rect(baseX, baseY, 40, 50)

      sketch.stroke('white')
      sketch.strokeWeight(2)
      sketch.line(baseX + 20, baseY, baseX + 20, baseY + 50)
      sketch.line(baseX, baseY + 25, baseX + 40, baseY + 25)
      sketch.pop()
    },
    createCloud(sketch, cloudx, cloudy) {
      sketch.push()
      sketch.fill(250)
      sketch.noStroke()
      sketch.ellipse(cloudx, cloudy, 70, 50)
      sketch.ellipse(cloudx + 10, cloudy + 10, 70, 50)
      sketch.ellipse(cloudx - 20, cloudy + 10, 70, 50)
      sketch.pop()
    },

    afterLoad(orig, dest, direct) {
      console.log("Emitted 'after load' event.", orig, dest, direct)
      if (dest.index === 0) {
        // this.$refs.aniText.style = 'opacity: 1; transform: translateZ(0);'
        this.$nextTick(() => {
          this.$refs.fullpage.api.setAllowScrolling(false)
          this.$refs.fullpage.api.setKeyboardScrolling(false)
        })
      }
      // if (dest.index === 1) {
      //   this.$refs.aniText.style = 'opacity: 1; transform: translateZ(0);'
      // }
    },
    onLeave(orig, dest, direct) {
      if (orig.isFirst) {
        this.$refs.fullpage.api.setAllowScrolling(true)
      }
    },

    goForward() {
      this.$refs.fullpage.api.setAllowScrolling(true)
      this.$refs.fullpage.api.moveSectionDown()
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

#fp-nav ul li a span {
  background: #efe9e9;
}

#fp-nav ul li .fp-tooltip {
  color: black;
}

@media (min-width: 768px) {
  #intro img {
    max-width: inherit;
  }
}

.btn-forward {
  position: absolute;
  left: 50%;
  top: calc(100% - 3.25rem);
  transform: translateX(-50%);
}

.animate-text {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}

.before-fadein-up {
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fadein-up {
  opacity: 1;
  transform: translateY(0);
}

.before-fadein-right {
  opacity: 0;
  transform: translateX(100px);
  transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fadein-right {
  opacity: 1;
  transform: translateX(0);
}

.before-fadein-left {
  opacity: 0;
  transform: translateX(-100px);
  transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fadein-left {
  opacity: 1;
  transform: translateX(0);
}

.card {
  top: 60%;
  left: 55%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  perspective: 1600px;
  transition: 0.5s;
}

.card-front {
  height: 80%;
  width: 90%;
  background-color: #efe9e9;
  backface-visibility: hidden;
  transform: rotateY(0deg);
  transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1) 2s;
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
}

.card-back {
  height: 80%;
  width: 90%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1) 2s;
}

.card-flip-left {
  transform: rotateY(-180deg);
}

.card-flip-right {
  transform: rotateY(0deg);
}

iframe {
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
}
</style>
