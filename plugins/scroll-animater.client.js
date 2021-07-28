import Vue from 'vue'

const animatedScrollObserver = new IntersectionObserver(
  (entries, animatedScrollObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enter')
        animatedScrollObserver.unobserve(entry.target)
      }
    })
  }
)

// https://youtu.be/NVgNUXsXn-s
Vue.directive('scroll-animater', {
  bind(el) {
    el.classList.add('before-enter')
    animatedScrollObserver.observe(el)
  },
})
