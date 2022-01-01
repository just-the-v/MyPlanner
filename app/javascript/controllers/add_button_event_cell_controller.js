import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {

  }

  hoverIn(event) {

    event.stopImmediatePropagation()
    const addButton = event.target.children.namedItem('addButton');
    if (!addButton) {
      return;
    }
    console.log("in")
    addButton.classList.remove('hidden')
  }

  hoverOut(event) {
    event.stopImmediatePropagation()
    const addButton = event.target.children.namedItem('addButton');
    if (!addButton) {
      return;
    }
    console.log("out")
    addButton.classList.add('hidden')
  }
}
