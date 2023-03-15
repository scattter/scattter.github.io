import { DefaultTheme } from "vitepress";

export type { DirectiveBinding } from 'vue'


export interface VitePressConfig extends DefaultTheme.SidebarGroup {
  items: (DefaultTheme.SidebarItem & {
    collapsible?: boolean
  })[]
}

export type VitePressNav = DefaultTheme.NavItem