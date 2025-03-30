import React, { useState } from 'react'
import { Sku } from '../typings/Sku'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

export const HANDLES_SHELF = [
  'shelf',
  'shelf__skus',
  'shelf__skus--item',
  'shelf__skus--itemImage',
  'shelf__skus--item--unavailable',
  'shelf__buybutton',
] as const

interface Props {
  skus: Sku[]
  availability: boolean
  handleAddToCart: Function
}

interface IObjectKeys {
  [key: string]: string | number
}

export const DefaultProduct: React.FC<Props> = function ({
  skus,
  availability,
  handleAddToCart,
}) {
  const { handles } = useCssHandles(HANDLES_SHELF)
  const [skuSelected, setSkuSelected] = useState('')

  const preventLink = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  const getSizeOrder = function (name: string) {
    const sizes: IObjectKeys = {
      PP: '0',
      P: '1',
      M: '2',
      G: '3',
      GG: '4',
    }
    return sizes[name]
  }

  const renderSkus = function () {
    const { handles } = useCssHandles(HANDLES_SHELF)

    const getItemClass = function (availability: boolean, item: Sku) {
      if (!availability) {
        return (
          handles['shelf__skus--item'] +
          ' ' +
          handles['shelf__skus--item--unavailable']
        )
      }
      return applyModifiers(
        handles['shelf__skus--item'],
        skuSelected === item.itemId ? 'selected' : ''
      )
    }
    return (
      <ul className={handles.shelf__skus}>
        {skus.map(function (item: Sku) {
          const availability = !!item.sellers[0].commertialOffer
            .AvailableQuantity
          const name = item.variations[0].values[0]
          return (
            <li
              className={getItemClass(availability, item)}
              key={name}
              onClick={selectSku.bind('', item.itemId)}
              style={{ order: getSizeOrder(name) }}
            >
              {name}
            </li>
          )
        })}
      </ul>
    )
  }

  const selectSku = function (itemId: string) {
    setSkuSelected(() => itemId)
  }

  const addToCart = function () {
    const item = { id: parseInt(skuSelected), seller: 1, quantity: 1 }
    handleAddToCart(item)
  }

  return (
    <div
      className={handles.shelf + ' vtex-shelf-variations'}
      onClick={preventLink}
    >
      {availability ? renderSkus() : 'indisponível'}
      <button
        className={applyModifiers(
          handles.shelf__buybutton,
          skuSelected ? 'active' : ''
        )}
        onClick={addToCart}
      >
        adicionar à sacola
      </button>
    </div>
  )
}
