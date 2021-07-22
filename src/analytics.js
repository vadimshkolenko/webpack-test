import * as $ from 'jquery';

function createAnalytics() {
  let counter = 0
  let isDestroyed = false

  const listener = () => counter++

  $(document).click('click', listener)
  // document.addEventListener('click', listener)

  return {
    destroy() {
      // document.removeEventListener('click', listener)
      $(document).off('click', listener)
      isDestroyed = true
    },
    getClicks() {
      if (isDestroyed) {
        return 'Analitics destroyed'
      }
      return counter
    }
  }
}

window.analitics = createAnalytics()