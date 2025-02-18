export type ProductType = {
  properties: { name: string; values: string[] }[]
}

export type SkuType = {
  sku: number
  available: boolean
  bestPrice: number
  listPrice: number
  image: string
  skuname: string
}

export type SingleProduct = {
  productId: string
  available: boolean
  name: string
  skus: SkuType[]
}

export type ProductResponseType = {
  product: ProductType
}

export type StateInfoType = {
  top: string | number
  bottom: string | number
}
