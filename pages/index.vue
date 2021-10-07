<template>
  <div class="bg-wedding text-desaturated-blue-500">
    <no-ssr>
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
          <button
            class="btn-reload px-2 py-6 text-xs md:text-sm"
            @click="getMoreHearts"
          >
            GET MORE HEARTS ♥
          </button>
          <button
            class="btn-forward px-2 py-6 text-xs md:text-lg"
            @click="goForward"
          >
            RING THE BELL OR PRESS ME TO SCROLL DOWN
          </button>
        </section>
        <!-- <audio :src="require('@/assets/audios/church-bell.wav')" controls></audio> -->
        <section id="intro" class="section">
          <div class="h-full grid grid-cols-8 grid-rows-6 gap-2">
            <div
              id="intro-image"
              v-scroll-animater="'fadein-up'"
              class="
                h-full
                w-full
                pt-8
                col-span-full
                row-start-2 row-end-[-1]
                md:col-start-4 md:col-span-5
                md:row-span-full
              "
            ></div>
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
                lg:col-start-2 lg:col-span-4
              "
            >
              <p
                v-scroll-animater="'fadein-left'"
                class="
                  text-4xl
                  md:text-5xl
                  lg:text-7xl
                  pt-5
                  md:pt-0
                  md:pl-4
                  md:text-right
                "
              >
                We are getting married.
              </p>
            </div>
            <div
              id="intro-info-box"
              v-scroll-animater="'fadein-left'"
              class="
                h-full
                w-full
                p-2
                col-start-3 col-end-[-1]
                row-start-5 row-end-[-2]
                md:col-start-2 md:col-span-3
                md:row-start-4 md:row-span-2
                md:flex md:flex-col
                md:justify-evenly
                bg-dark-cyan-500 bg-opacity-75
                rounded
                text-xl
                md:text-left
              "
            >
              <div
                class="
                  pl-2
                  py-0
                  md:pl-6
                  md:py-2
                  flex
                  text-2xl
                  md:text-3xl
                  text-white
                "
              >
                <img src="~/assets/images/event_black_24dp.svg" alt="" />
                <p class="pl-2">2021.10.16</p>
              </div>
              <div
                class="
                  pl-2
                  py-0
                  md:pl-6
                  md:py-2
                  flex
                  text-2xl
                  md:text-3xl
                  text-white
                "
              >
                <img src="~/assets/images/schedule_black_24dp.svg" alt="" />
                <p class="pl-2">2:00 pm | 90 mins</p>
              </div>
              <p
                class="
                  pl-2
                  py-0
                  md:pl-6
                  md:py-2
                  flex
                  text-lg
                  md:text-2xl
                  text-white
                "
              >
                <img src="~/assets/images/location_on_black_24dp.svg" alt="" />
                <a class="cursor-pointer pl-2" @click="goForward">
                  林口浸信會
                </a>
              </p>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="w-full h-full flex flex-col justify-center items-center">
            <div class="mt-8 mb-4 text-5xl">Location</div>
            <!-- <div class="w-2/3 mb-5 text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique quis et minima possimus consectetur dolorum quibusdam
              dolorem,
            </div> -->
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.8408151080453!2d121.37079341489658!3d25.07338394286574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a6df26d9659d%3A0xb247253f6c483b8d!2z5p6X5Y-j5rW45L-h5pyD!5e0!3m2!1szh-TW!2stw!4v1633354400098!5m2!1szh-TW!2stw"
              class="h-3/4 md:h-[5/8] w-3/4 md:w-5/6 lg:w-11/12"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
            <!-- <script
              src="https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=47.55098906049447,-121.83173209508661&zoom=10&format=png&maptype=roadmap&style=feature:administrative.locality%7Chue:0x2c2e33%7Csaturation:7%7Clightness:19%7Cvisibility:on&style=feature:landscape%7Chue:0xffffff%7Csaturation:-100%7Clightness:100%7Cvisibility:simplified&style=feature:poi%7Chue:0xffffff%7Csaturation:-100%7Clightness:100%7Cvisibility:off&style=feature:road%7Celement:geometry%7Chue:0xbbc0c4%7Csaturation:-93%7Clightness:31%7Cvisibility:simplified&style=feature:road%7Celement:labels%7Chue:0xbbc0c4%7Csaturation:-93%7Clightness:31%7Cvisibility:on&style=feature:road.arterial%7Celement:labels%7Chue:0xbbc0c4%7Csaturation:-93%7Clightness:-2%7Cvisibility:simplified&style=feature:road.local%7Celement:geometry%7Chue:0xe9ebed%7Csaturation:-90%7Clightness:-8%7Cvisibility:simplified&style=feature:transit%7Chue:0xe9ebed%7Csaturation:10%7Clightness:69%7Cvisibility:on&style=feature:water%7Chue:0xe9ebed%7Csaturation:-78%7Clightness:67%7Cvisibility:simplified&size=480x360"
              defer
            ></script> -->
          </div>
        </section>
        <section id="live-streaming" class="section">
          <div class="h-full flex flex-col justify-center items-center">
            <div class="mt-8 mb-4 text-5xl">Live Streaming</div>
            <iframe
              src="https://www.youtube.com/embed/cl6skUhqj_w"
              class="h-3/4 md:h-5/6 w-3/4 md:w-5/6 lg:w-11/12"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <footer
              class="
                h-1/10
                w-full
                mt-4
                py-2
                bg-cool-gray-50 bg-opacity-30
                flex
                justify-center
                items-center
              "
            >
              <img src="~assets/images/BE_icon.png" class="w-12" alt="" />
              <p class="pl-4 text-sm md:text-xl">
                © 2021 Made by Bobson & Elva. All rights reserved.
              </p>
            </footer>
          </div>
        </section>
      </full-page>
    </no-ssr>
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
      balls: [],

      options: {
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: [
          'Bobson & Elva',
          'Intro',
          'Location',
          'LiveStreaming',
        ],
        showActiveTooltip: false,
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
      sketch.background('#a4d5d0')

      Events.on(engine, 'collisionStart', (evt) => {
        for (const pair of evt.pairs) {
          // console.log('==========')
          // console.log(pair.bodyA, pair.bodyB)
          // console.log(pair.bodyA === this.bell, pair.bodyB === this.bell)
          // console.log('balls', this.balls)
          if (this.balls.includes(pair.bodyA) && pair.bodyB === this.bell) {
            // print(pair.bodyB)
            // print(pair.bodyB.angle)
            this.bellSound.play()
            Body.setStatic(this.wordB, false)
            Body.setStatic(this.wordE, false)
            Body.setStatic(this.wordAnd, false)
          } else if (
            this.balls.includes(pair.bodyB) &&
            pair.bodyA === this.bell
          ) {
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
      this.ball = Bodies.circle(
        200 - this.widthOffset,
        sketch.height - 100,
        20,
        {
          restitution: 0.3,
        }
      )
      this.balls.push(this.ball)
      // this.toys.push(this.ball)
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
        pointA: { x: 200 - this.widthOffset, y: sketch.height - 150 },
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
      sketch.background('#a4d5d0')
      // sketch.ellipse(sketch.mouseX, sketch.mouseY, 20, 20)

      // Draw mouse pointer
      // sketch.fill('Salmon')
      // sketch.textSize(16)
      // sketch.textAlign(sketch.CENTER)
      // sketch.text(
      //   '(' +
      //     sketch.floor(sketch.mouseX) +
      //     ', ' +
      //     sketch.floor(sketch.mouseY) +
      //     ')',
      //   sketch.mouseX,
      //   sketch.mouseY
      // )

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

      // for (const w of this.words) {
      //   sketch.beginShape()
      //   for (const vert of w.vertices) {
      //     sketch.vertex(vert.x, vert.y)
      //   }
      //   sketch.endShape(sketch.CLOSE)
      // }

      // for (const t of this.toys) {
      //   sketch.beginShape()
      //   for (const vert of t.vertices) {
      //     sketch.vertex(vert.x, vert.y)
      //   }
      //   sketch.endShape(sketch.CLOSE)
      // }

      for (const sand of this.sandBoxes) {
        sketch.beginShape()
        sketch.strokeWeight(0)
        sketch.fill('#a4d5d0')
        for (const vert of sand.vertices) {
          sketch.vertex(vert.x, vert.y)
        }
        sketch.endShape(sketch.CLOSE)
      }

      for (const b of this.balls) {
        sketch.beginShape()
        // sketch.fill('#fff')
        sketch.noFill()
        sketch.noStroke()
        for (const vert of b.vertices) {
          sketch.vertex(vert.x, vert.y)
        }
        sketch.endShape(sketch.CLOSE)
        sketch.image(this.heartImage, b.position.x, b.position.y, 45, 45)
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

      // sketch.image(
      //   this.heartImage,
      //   this.ball.position.x,
      //   this.ball.position.y,
      //   35,
      //   35
      // )
      sketch.push()
      sketch.translate(this.bell.position.x, this.bell.position.y)
      sketch.rotate(this.bell.angle)
      sketch.image(this.bellImage, 0, 0, 40, 45)
      sketch.pop()

      this.createCloud(sketch, this.cloudx, this.cloudy - 25)
      this.createCloud(sketch, this.cloudx + 150, this.cloudy + 25)
      this.createCloud(sketch, this.cloudx + 500, this.cloudy)
      this.cloudx += 0.25
      if (this.cloudx > sketch.windowWidth + 100) this.cloudx = -500
    },
    keyPressed({ keyCode }) {
      if (keyCode === 32) {
        console.log('keyCode :>> ', keyCode)
        // space
        // this.sling.bodyB = this.ball
        // eslint-disable-next-line prefer-const
        let newBall = Bodies.circle(
          200 - this.widthOffset,
          window.innerHeight - 100,
          15,
          { restitution: 0.3 }
        )
        this.balls.push(newBall)
        World.add(engine.world, newBall)
        this.sling.bodyB = newBall
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
    getMoreHearts() {
      const newBall = Bodies.circle(
        200 - this.widthOffset,
        window.innerHeight - 100,
        15,
        { restitution: 0.3 }
      )
      this.balls.push(newBall)
      World.add(engine.world, newBall)
      this.sling.bodyB = newBall
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
      sketch.fill('#f7ada7')
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
      sketch.fill('#91aaaf')
      sketch.rect(baseX, baseY, 50, 75)

      sketch.fill('#5a6b6e')
      // sketch.strokeWeight(1)
      sketch.noStroke()
      sketch.rect(baseX + 6, baseY + 5, 15, 30)
      sketch.rect(baseX + 29, baseY + 5, 15, 30)

      sketch.rect(baseX + 6, baseY + 40, 15, 25)
      sketch.rect(baseX + 29, baseY + 40, 15, 25)

      sketch.stroke('white')
      sketch.strokeWeight(2)
      sketch.line(baseX + 25, baseY + 5, baseX + 25, baseY + 70)
      sketch.pop()
    },
    createChurchWindow(sketch, baseX, baseY) {
      sketch.push()
      sketch.fill('#5a6b6e')
      sketch.strokeWeight(3)
      sketch.rect(baseX, baseY, 40, 50)

      sketch.stroke('white')
      // sketch.stroke('#f7ada7')
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
  background-color: #a4d5d0;

  /* background-image: linear-gradient(
    to bottom,
    #a4d5d0 0%,
    #a4d5d0 100%,
    #d5e3ce 96%,
    #dddec9 98%,
    #f7e6ba 100%
  ); */
}

#fp-nav ul li a span {
  background: #efe9e9;
}

#fp-nav ul li .fp-tooltip {
  color: black;
}

/* @media (min-width: 768px) {
  #intro img {
    max-width: inherit;
  }
} */

.btn-forward {
  position: absolute;
  left: 50%;
  top: calc(100% - 4.5rem);
  transform: translateX(-50%);
}

.btn-reload {
  position: absolute;
  left: 4rem;
  top: calc(100% - 3rem);
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

#intro-image {
  /* background-image: url('https://images.unsplash.com/photo-1537907690979-ee8e01276184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'); */
  background-image: url('~/assets/images/intro.png');
  background-repeat: no-repeat;
  background-position: center;
}

#intro-info-box {
  /* font-family: '微軟正黑體', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif; */
  font-weight: bold;
}

iframe {
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
}
</style>
