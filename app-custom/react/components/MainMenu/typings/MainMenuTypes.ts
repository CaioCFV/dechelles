export interface MainMenuProps {
  customLinks?: ItemType[]
}

export interface ItemType {
  __editorItemTitle: string
  href: string
  columns: MenuChildren[]
  closeMenu: React.MouseEventHandler
}
export interface MenuChildren {
  children: SubItemType[]
}

export interface SubItemType {
  __editorItemTitle: string
  href: string
  isTitle: boolean
  closeMenu: React.MouseEventHandler
}
