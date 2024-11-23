import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons' // Import solid icons

// Add the icons to the library
library.add(fas)

// Register the FontAwesomeIcon component globally
const setupFontAwesome = app => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}

export default setupFontAwesome
