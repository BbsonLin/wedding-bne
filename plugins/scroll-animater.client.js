import Vue from 'vue'

// https://youtu.be/NVgNUXsXn-s
Vue.directive('scroll-animater', {
  bind(el, binding) {
    console.log('scroll-animater binding :>> ', binding)
    const defaultAnimationName = 'enter'

    if (binding.value) el.classList.add(`before-${binding.value}`)
    else el.classList.add(`before-${defaultAnimationName}`)
    const asObserver = new IntersectionObserver((entries, asObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (binding.value) entry.target.classList.add(`${binding.value}`)
          else entry.target.classList.add(defaultAnimationName)
          asObserver.unobserve(entry.target)
        }
      })
    })
    asObserver.observe(el)
  },
})
