import { Dialog } from "./dialog";

export class Decorator {
  private dialog: { open: () => void, close: () => void }
  constructor(dialog: { open: () => void, close: () => void }) {
    this.dialog = dialog
  }

  open() {
    this.dialog.open()
    this.log()
  }

  close() {
    this.dialog.close()
    this.refresh()
  }

  log() {
    console.log('record open count')
  }

  refresh() {
    console.log('refresh after close')
  }
}

export const decoratorDialog = (ele: HTMLElement) => {
  const dialog = new Dialog(ele)
  return new Decorator(dialog)
}
