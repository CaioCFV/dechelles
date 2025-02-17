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
      return slugify(item?.name).includes('sutia')
    })
    const bottom = product?.properties.find(item => {
      return slugify(item?.name).includes('calcinha')
    })
    top && data.push(top.values[0])
    bottom && data.push(bottom.values[0])

    return data
  }

  useEffect(() => {
    clearTimeout(debouce)
    debouce = setTimeout(function () {
      const requests = getKitSpecification().map(item => {
        return fetch(
          `/api/catalog_system/pub/products/variations/${item}`
        ).then(r => r.json())
      })
      Promise.all(requests).then(response => {
        const data = []
        if (response[0]) {
          data.push(response[0])
        }
        if (response[1]) {
          data.push(response[1])
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
