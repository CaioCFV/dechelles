import React from 'react'
import { SkuType } from '../types'
import { HANDLES_PRODUCT_KIT } from '../handles'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useKitDataContext } from '../context'

type Props = {
  skus: SkuType[]
  productId: string
}

const SkuList: React.FC<Props> = function ({ skus, productId }) {
  const { handles } = useCssHandles(HANDLES_PRODUCT_KIT)
  const { state, dispatch } = useKitDataContext()

  const selectSku = function (id: number) {
    dispatch({
      type: 'SET_SKU_SELECTED',
      data: { productId, sku: { id, quantity: 1, seller: 1 } },
    })
  }

  const getClass = function (sku: number, available: boolean) {
    if (!available) {
      return applyModifiers(
        handles['productkit__info--skuWrapper__item'] +
          ' ' +
          handles['productkit__info--skuWrapper__item--unavailable'],
        state.selecteds[productId]?.id == sku ? 'active' : ''
      )
    }
    return applyModifiers(
      handles['productkit__info--skuWrapper__item'],
      state.selecteds[productId]?.id == sku ? 'active' : ''
    )
  }

  return (
    <div className={handles['productkit__info--skuWrapper']}>
      <span className={handles['productkit__info--skuWrapper__title']}>
        tamanho
      </span>
      <ul className={handles['productkit__info--skuWrapper__skuList']}>
        {skus.map(sku => {
          return (
            <li
              key={sku.sku}
              className={getClass(sku.sku, sku.available)}
              onClick={() => selectSku(sku.sku)}
            >
              {sku.skuname}
            </li>
          )
        })}
      </ul>
      {state.selecteds[productId] && (
        <button
          className={handles['productkit__info--skuWrapper__remove']}
          onClick={() => selectSku(state.selecteds[productId].id)}
        >
          remover
        </button>
      )}
    </div>
  )
}

export default SkuList
