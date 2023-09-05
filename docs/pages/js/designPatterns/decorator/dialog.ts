import { createVNode, render } from 'vue'
import Demo from './dialog.vue'

export class Dialog {
  public $el: HTMLElement
  public wrapper: HTMLElement
  constructor(el: HTMLElement) {
    this.$el = el
    this.wrapper = document.createElement('div')
  }

  open() {
    const instance = createVNode(Demo, {})
    render(instance, this.wrapper)
    this.$el.appendChild(this.wrapper)
  }

  close() {
    this.wrapper.remove()
  }
}