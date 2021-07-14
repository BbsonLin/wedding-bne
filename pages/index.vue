<template>
  <div id="bne-wedding">
    <!-- Header -->
    <div id="header">
      <nav class="fixed flex justify-center w-screen bg-transparent py-6">
        <h1 class="transition-all" :class="headerFontSize">Bobson & Elva</h1>
      </nav>
    </div>

    <section>
      <div class="flex justify-center">
        <img
          class="fixed top-20 md:min-w-1/5 max-w-1/4 min-w-1/2"
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
export default {
  data() {
    return {
      headerFontSize: 'text-5xl',
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollShrinkHeader)
  },
  methods: {
    scrollShrinkHeader() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        this.headerFontSize = 'text-3xl md:text-4xl lg:text-5xl'
        // document.querySelector('#header h1').classList.add('text-3xl')
        // document.querySelector('#header h1').style.fontSize = '30px'
        // document.getElementById('header').style.fontSize = '30px'
      } else {
        this.headerFontSize = 'text-5xl md:text-6xl lg:text-7xl'
      }
    },
  },
}
</script>

<style>
#bne-wedding {
  background-image: linear-gradient(
    to bottom,
    #abd8e0 0%,
    #d5e3ce 88%,
    #dddec9 94%,
    #f7e6ba 100%
  );
}

#header h1 {
  font-family: 'Great Vibes', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
