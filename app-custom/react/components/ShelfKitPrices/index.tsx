import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { KitValue } from '../ShelfVariations/typings/Sku'
import { slugify } from '../utils/slugify'
import { toMoney } from '../utils/toMoney'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

interface Sku {
  sellingPrice: string
  listPrice: string
}

interface KitDataState {
  top: Sku
  bottom: Sku
  topCategory: string
  bottomCategory: string
}
interface SkuResponseType {
  sellers: {
    commertialOffer: { ListPrice: number; FullSellingPrice: number }
  }[]
}
interface ResponseKit {
  name: KitValue
  product: { items: SkuResponseType[]; categories: string[] }
}

export const HANDLES_SKU_PRICES = [
  'shelf__prices',
  'shelf__prices__itemTop',
  'shelf__prices__itemBottom',
  'shelf__prices__image',
]

export function ShelfKitPrices() {
  if (window.innerWidth < 1024) {
    return <></>
  }
  const { handles } = useCssHandles(HANDLES_SKU_PRICES)
  const [kitData, setKitData] = useState({
    top: { listPrice: '', sellingPrice: '' },
    bottom: { listPrice: '', sellingPrice: '' },
    topCategory: '',
    bottomCategory: '',
  })
  const { product }: any = useProduct()
  const kitInfo = product.specificationGroups.find(
    (item: any) => item.name == 'Combo'
  ) as { specifications: KitValue[] }

  const formatInfo = (data: SkuResponseType): Sku => ({
    listPrice: toMoney(
      (data.sellers[0].commertialOffer.ListPrice * 100).toFixed(2)
    ),
    sellingPrice: toMoney(
      (data.sellers[0].commertialOffer.FullSellingPrice * 100).toFixed(2)
    ),
  })

  const renderKit = async function () {
    const kitSpecIds = kitInfo.specifications.filter(function (item: any) {
      return item.name == 'Parte de cima' || item.name == 'Parte de baixo'
    })
    const requests = kitSpecIds.map(item => {
      return fetch(
        `/api/catalog_system/pub/products/search?fq=alternateIds_RefId:${item.values[0]}`
      )
        .then(r => r.json())
        .then(r => ({ name: item, product: r[0] }))
    })
    await Promise.all(requests).then(function (data) {
      let kitskus: KitDataState = {
        top: { listPrice: '', sellingPrice: '' },
        bottom: { listPrice: '', sellingPrice: '' },
        topCategory: '',
        bottomCategory: '',
      }
      data.forEach(function (item) {
        const { name, product }: ResponseKit = item
        if (
          slugify(name.originalName).includes('parte-de-cima') &&
          product.items.length
        ) {
          kitskus.top = product.items.map(formatInfo)[0]
          kitskus.topCategory = slugify(product.categories[0].split('/')[1])
        }
        if (
          slugify(name.originalName).includes('parte-de-baixo') &&
          product.items.length
        ) {
          kitskus.bottom = product.items.map(formatInfo)[0]
          kitskus.bottomCategory = slugify(product.categories[0].split('/')[1])
        }
      })
      setKitData(kitskus)
    })
  }

  useEffect(() => {
    renderKit()
  }, [])

  const unavailable =
    kitData.top.sellingPrice.length < 2 &&
    kitData.bottom.sellingPrice.length < 2
  return (
    <div className={handles.shelf__prices}>
      {kitData.top.sellingPrice.length > 1 ? (
        <div
          className={applyModifiers(
            handles.shelf__prices__itemTop,
            kitData.topCategory
          )}
        >
          {kitData.top.sellingPrice}
        </div>
      ) : (
        ''
      )}
      {kitData.bottom.sellingPrice.length > 1 ? (
        <div
          className={applyModifiers(
            handles.shelf__prices__itemBottom,
            kitData.bottomCategory
          )}
        >
          {kitData.bottom.sellingPrice}
        </div>
      ) : (
        ''
      )}
      {unavailable ? <>indisponível</> : ''}
    </div>
  )
}
