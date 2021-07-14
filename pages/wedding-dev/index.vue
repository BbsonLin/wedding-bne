<template>
  <div>
    <div id="p5Canvas"></div>
    <section>
      <div class="flex justify-center">
        <!-- <img
          class="fixed top-20 md:min-w-1/5 max-w-1/4 min-w-1/2"
          src="~/assets/images/ballon.png"
          alt=""
        /> -->
        <img
          class="md:min-w-1/5 max-w-1/4 min-w-1/2"
          src="~/assets/images/ballon.png"
          alt=""
        />
      </div>
    </section>

    <section class="min-h-screen"></section>

    <section class="min-h-screen"></section>
  </div>
</template>

<script>
import Matter from 'matter-js'

export default {
  async mounted() {
    const { default: P5 } = await import('p5')
    const Engine = Matter.Engine
    const World = Matter.World
    const Bodies = Matter.Bodies
    const Constraint = Matter.Constraint
    const MouseConstraint = Matter.MouseConstraint
    const Mouse = Matter.Mouse

    // create engine
    const engine = Engine.create()

    let bell
    let ball
    let rope
    let toys
    let sandBoxes
    let constraints

    const sketch = (s) => {
      toys = []
      constraints = []

      s.setup = () => {
        const sCanvas = s.createCanvas(s.windowWidth, (s.windowHeight * 2) / 3)
        s.background('#abd8e0')

        //
        createSandbox()

        // Ball
        ball = Bodies.circle(100, 300, 25)
        toys.push(ball)
        World.add(engine.world, ball)

        // Bell
        bell = Bodies.rectangle(s.width - 150, 250, 25, 70)
        toys.push(bell)
        World.add(engine.world, bell)

        // Rope
        rope = Constraint.create({
          pointA: { x: s.width - 150, y: 100 },
          bodyB: bell,
          length: 100,
          stiffness: 0.75,
        })
        constraints.push(rope)
        World.add(engine.world, rope)

        // Mouse Control
        const mouse = Mouse.create(sCanvas.elt)
        const mouseConstraint = MouseConstraint.create(engine, { mouse })
        World.add(engine.world, mouseConstraint)

        Engine.run(engine)
      }

      s.draw = () => {
        s.background('#abd8e0')
        // s.ellipse(s.mouseX, s.mouseY, 20, 20)

        for (const t of toys) {
          s.beginShape()
          for (const vert of t.vertices) {
            s.vertex(vert.x, vert.y)
          }
          s.endShape(s.CLOSE)
        }

        for (const sand of sandBoxes) {
          s.beginShape()
          for (const vert of sand.vertices) {
            s.vertex(vert.x, vert.y)
          }
          s.endShape(s.CLOSE)
        }

        for (const cons of constraints) {
          const pA = cons.pointA
          const pB = cons.bodyB.position
          s.push()
          s.stroke('white')
          s.line(pA.x, pA.y, pB.x, pB.y)
          s.pop()
        }
      }

      function createSandbox() {
        const ground = Bodies.rectangle(
          s.width / 2,
          s.height + 150,
          s.width,
          300,
          {
            isStatic: true,
          }
        )
        const ceiling = Bodies.rectangle(s.width / 2, -150, s.width, 300, {
          isStatic: true,
        })
        const wallLeft = Bodies.rectangle(-150, s.height / 2, 300, s.height, {
          isStatic: true,
        })
        const wallRight = Bodies.rectangle(
          s.width + 150,
          s.height / 2,
          300,
          s.height,
          {
            isStatic: true,
          }
        )

        sandBoxes = [ground, ceiling, wallLeft, wallRight]
        World.add(engine.world, sandBoxes)
      }
    }

    // eslint-disable-next-line no-unused-vars
    const can = new P5(sketch, 'p5Canvas')
    console.log('can :>> ', can)
  },
}
</script>
