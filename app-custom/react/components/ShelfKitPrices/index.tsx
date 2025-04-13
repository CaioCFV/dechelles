import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { KitValue } from '../ShelfVariations/typings/Sku'
import { slugify } from '../utils/slugify'
import { toMoney } from '../utils/toMoney'
import { useCssHandles } from 'vtex.css-handles'

interface Sku {
  sellingPrice: string
  listPrice: string
}

interface KitDataState {
  top: Sku
  bottom: Sku
}
interface SkuResponseType {
  sellers: {
    commertialOffer: { ListPrice: number; FullSellingPrice: number }
  }[]
}
interface ResponseKit {
  name: KitValue
  product: { items: SkuResponseType[] }
}

export const HANDLES_SKU_PRICES = [
  'shelf__prices',
  'shelf__prices__item',
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
    const requests = kitInfo.specifications.map(item => {
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
      }
      data.forEach(function (item) {
        const { name, product }: ResponseKit = item
        if (slugify(name.originalName).includes('parte-de-cima')) {
          kitskus.top = product.items.map(formatInfo)[0]
        }
        if (slugify(name.originalName).includes('parte-de-baixo')) {
          kitskus.bottom = product.items.map(formatInfo)[0]
        }
      })
      setKitData(kitskus)
    })
  }

  useEffect(() => {
    renderKit()
  }, [])

  return (
    <div className={handles.shelf__prices}>
      <div className={handles.shelf__prices__item}>
        <img
          src={require('../ShelfVariations/assets/top-icon.png')}
          className={handles.shelf__prices__image}
        />
        {kitData.top.sellingPrice}
      </div>
      <div className={handles.shelf__prices__item}>
        <img
          src={require('../ShelfVariations/assets/bottom-icon.png')}
          className={handles.shelf__prices__image}
        />
        {kitData.bottom.sellingPrice}
      </div>
    </div>
  )
}
