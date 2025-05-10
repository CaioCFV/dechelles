import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import {
  Action,
  KitDataActions,
  KitDataProps,
  KitDataProviderType,
} from './types'

import { slugify } from '../../utils/slugify'
import { SingleProduct } from '../types'

const INITIAL_STATE: KitDataProps = {
  products: [],
  selecteds: {},
  value: 0.0,
  sizeTableActive: false,
}
const KitDataContext = createContext<KitDataActions>({} as KitDataActions)

const reducer = function (state: KitDataProps, action: Action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        products: action.data,
      }

    case 'SET_SKU_SELECTED':
      let totalPrice = 0
      let data = { ...state }

      if (data.selecteds[action.data.productId]?.id == action.data.sku?.id) {
        delete data.selecteds[action.data.productId]
      } else {
        data.selecteds[action.data.productId] = action.data.sku
      }

      Object.keys(data.selecteds).forEach(function (productId) {
        const skuId = data.selecteds[productId].id
        const product = data.products.find(item => item.productId == productId)
        const sku = product?.skus.find(item => item.sku == skuId)
        sku && (totalPrice += sku.bestPrice)
      })

      data.value = totalPrice

      return data

    case 'TOOGLE_SIZE_TABLE':
      return {
        ...state,
        sizeTableActive: !state.sizeTableActive,
      }
    default:
      return state
  }
}
let debouce: any = setTimeout(() => {})

const KitDataProvider: React.FC<KitDataProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { product } = useProduct() as ProductContextState

  const getKitSpecification = () => {
    const data = []
    const top = product?.properties.find(item => {
      return slugify(item?.name).includes('parte-de-cima')
    })
    const bottom = product?.properties.find(item => {
      return slugify(item?.name).includes('parte-de-baixo')
    })
    top && data.push(top.values[0])
    bottom && data.push(bottom.values[0])

    return data
  }

  const formatInfo = (data: any): SingleProduct => ({
    productId: data.productId,
    available: true,
    name: data.productName,
    skus: data.items.map((item: any) => ({
      sku: parseInt(item.itemId),
      skuname: item.Tamanhos[0],
      available: item.sellers[0].commertialOffer.IsAvailable,
      bestPrice: (
        item.sellers[0].commertialOffer.FullSellingPrice * 100
      ).toFixed(2),
      listPrice: (item.sellers[0].commertialOffer.ListPrice * 100).toFixed(2),
      image: item.images[0].imageUrl,
    })),
  })

  useEffect(() => {
    clearTimeout(debouce)
    debouce = setTimeout(function () {
      const requests = getKitSpecification().map(item => {
        return fetch(
          `/api/catalog_system/pub/products/search?fq=alternateIds_RefId:${item}`
        ).then(r => r.json())
      })
      Promise.all(requests).then(response => {
        const data = []
        if (response[0]) {
          const product = response[0][0]
          if (product) {
            data.push(formatInfo(product))
          }
        }
        if (response[1]) {
          const product = response[1][0]
          if (product) {
            data.push(formatInfo(product))
          }
        }
        dispatch({ type: 'SET_DATA', data })
      })
    }, 1000)
  }, [product])

  return (
    <KitDataContext.Provider value={{ state, dispatch }}>
      {children}
    </KitDataContext.Provider>
  )
}

const useKitDataContext = () => {
  const context = useContext(KitDataContext)
  return context
}

export { KitDataProvider, useKitDataContext }
