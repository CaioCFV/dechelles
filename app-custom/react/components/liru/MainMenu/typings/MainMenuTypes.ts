export interface MainMenuProps {
  data?: Data
  customLinks?: CustomLinks[]
  children?: React.ReactElement
}

export interface CustomLinks {
  __editorItemTitle: string
  href: string
  order: number
  banners: MenuBanners[]
  children?: CustomLinksItem[]
  hasChildren: boolean
  seeAll?: string
  highlight: boolean
}

export interface CustomLinksItem {
  __editorItemTitle: string
  href: string
  order?: number
}

export type CategoriesChildren = {
  id: number
  name: string
  href: string
  order?: number
}

type Data = {
  categories: CategoriesTypes[]
}

export type CategoriesTypes = {
  id: number
  name: string
  href: string
  children: CategoriesChildren[]
  hasChildren: boolean
}

export type MenuBanners = {
  image: string
  link: string
  name: string
}
