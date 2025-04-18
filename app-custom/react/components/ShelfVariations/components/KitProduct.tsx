import React, { useState, useEffect, useRef } from 'react'
import { KitInfo, KitValue } from '../typings/Sku'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { slugify } from '../../utils/slugify'
import { HANDLES_SHELF } from './DefaultProduct'

interface Props {
  kitInfo: KitInfo
  handleAddToCart: Function
}
interface Sku {
  sku: string
  dimensions: { tamanho: string }
  available: boolean
}

interface KitDataState {
  top: Sku[]
  bottom: Sku[]
}
interface SkuResponseType {
  itemId: string
  Tamanhos: string[]
  sellers: { commertialOffer: { IsAvailable: boolean } }[]
}
interface ResponseKit {
  name: KitValue
  product: { items: SkuResponseType[] }
}

export const KitProduct: React.FC<Props> = function ({
  kitInfo,
  handleAddToCart,
}) {
  const wrapperElement: any = useRef(null)
  const { handles } = useCssHandles(HANDLES_SHELF)

  const [skuSelected, setSkuSelected] = useState([
    { id: '0', seller: 1, quantity: 1 },
    { id: '0', seller: 1, quantity: 1 },
  ])

  const [kitData, setKitData] = useState<KitDataState>({
    top: [],
    bottom: [],
  })

  const preventLink = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  const hoverDelay = function (el: HTMLDivElement) {
    let delay: any
    el.addEventListener('mouseenter', function () {
      if (!el.classList.contains('loaded')) {
        delay = setTimeout(function () {
          el.classList.add('loaded')
          renderKit()
        }, 500)
      }
    })
    el.addEventListener('mouseleave', function () {
      clearInterval(delay)
    })
  }

  useEffect(function () {
    if (wrapperElement && wrapperElement.current) {
      const el = wrapperElement.current
      const hoverEventTarget = el.parentElement.parentElement
      hoverDelay(hoverEventTarget)
    }
  }, [])

  const formatInfo = (data: SkuResponseType): Sku => ({
    sku: data.itemId,
    available: data.sellers[0].commertialOffer.IsAvailable,
    dimensions: { tamanho: data.Tamanhos[0] },
  })

  const renderKit = async function () {
    const requests = kitInfo.specifications.map(item => {
      return fetch(
        `/api/catalog_system/pub/products/search?fq=alternateIds_RefId:${item.values[0]}`
      )
        .then(r => r.json())
        .then(r => ({ name: item, product: r[0] }))
    })
    await Promise.all(requests).then(function (data) {
      let kitskus: KitDataState = { top: [], bottom: [] }
      data.forEach(function (item) {
        const { name, product }: ResponseKit = item
        if (slugify(name.originalName).includes('parte-de-cima')) {
          console.log(product, 'uio')
          kitskus.top = product.items.map(formatInfo)
        }
        if (slugify(name.originalName).includes('parte-de-baixo')) {
          kitskus.bottom = product.items.map(formatInfo)
        }
      })
      setKitData(kitskus)
    })
  }

  const getItemClass = function (
    availability: boolean,
    item: Sku,
    index: number
  ) {
    if (!availability) {
      return (
        handles['shelf__skus--item'] +
        ' ' +
        handles['shelf__skus--item--unavailable']
      )
    }
    return applyModifiers(
      handles['shelf__skus--item'],
      skuSelected[index].id === item.sku ? 'selected' : ''
    )
  }

  const selectSku = function (itemId: string, index: number) {
    const data = [...skuSelected]
    data[index].id = itemId
    setSkuSelected(() => data)
  }

  const addToCart = function () {
    const skus = skuSelected.filter(function (item) {
      return item.id != '0'
    })
    handleAddToCart(skus.map(item => ({ ...item, id: parseInt(item.id) })))
  }

  return (
    <div
      className={handles.shelf + ' vtex-shelf-variations'}
      onClick={preventLink}
      ref={wrapperElement}
    >
      <div>
        <ul className={handles.shelf__skus}>
          <li className={handles['shelf__skus--itemImage']}>
            <img src={require('../assets/top-icon.png')} alt="top" />
          </li>
          {kitData.top.map(function (item) {
            return (
              <li
                key={item.sku}
                className={getItemClass(item.available, item, 0)}
                onClick={selectSku.bind('', item.sku, 0)}
              >
                {item.dimensions.tamanho}
              </li>
            )
          })}
        </ul>
        <ul className={handles.shelf__skus}>
          <li className={handles['shelf__skus--itemImage']}>
            <img src={require('../assets/bottom-icon.png')} alt="bottom" />
          </li>
          {kitData.bottom.map(function (item) {
            return (
              <li
                key={item.sku}
                onClick={selectSku.bind('', item.sku, 1)}
                className={getItemClass(item.available, item, 1)}
              >
                {item.dimensions.tamanho}
              </li>
            )
          })}
        </ul>
      </div>
      <button
        className={applyModifiers(
          handles.shelf__buybutton,
          skuSelected[0].id != '0' || skuSelected[1].id != '0' ? 'active' : ''
        )}
        onClick={addToCart}
      >
        adicionar à sacola
      </button>
    </div>
  )
}
