export type { DirectiveBinding } from 'vue'

export interface ElType extends HTMLElement {
  copyData: string | number
  __handleClick__: any
}

export interface VitePressConfig {
  text: string
  items?: VitePressConfig[]
  link?: string
  activeMatch?: string
  collapsible?: boolean
}