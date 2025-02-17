import type { ReactNode, Dispatch } from 'react'
import { SingleProduct, ProductType } from '../types'

export type KitDataProviderType = {
  children: ReactNode | ReactNode[]
}

export interface KitDataActions {
  state: KitDataProps
  dispatch: Dispatch<Action>
}

export interface KitDataProps {
  products: SingleProduct[]
  selecteds: {
    [key: string]: AddToCart
  }
  value: number
  sizeTableActive: boolean
}

export type SkuType = {
  sku: number
  available: boolean
  bestPrice: number
  listPrice: number
  image: string
  skuname: string
}

type AddToCart = {
  id: number
  seller: number
  quantity: number
}

type SET_SKU_SELECTED = {
  productId: string
  sku: AddToCart
}

export type Action =
  | {
      type: 'SET_DATA'
      data: SingleProduct[]
    }
  | {
      type: 'SET_SKU_SELECTED'
      data: SET_SKU_SELECTED
    }
  | { type: 'TOOGLE_SIZE_TABLE' }

export type ProductResponseType = {
  product: ProductType
}

export type StateInfoType = {
  top: string | number
  bottom: string | number
}
