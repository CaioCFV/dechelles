import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { SkuType } from '../types'
import { HANDLES_PRODUCT_KIT } from '../handles'
import { toMoney } from '../../utils/toMoney'

type Props = {
  data: SkuType | undefined
}

const Price: React.FC<Props> = function ({ data }) {
  const { handles } = useCssHandles(HANDLES_PRODUCT_KIT)

  if (!data) {
    return <></>
  }

  if (data.listPrice > data.bestPrice) {
    return (
      <div className={handles['productkit__info--priceWrapper']}>
        <s className={handles['productkit__info--listPrice']}>
          {toMoney(data.listPrice)}
        </s>
        <strong className={handles['productkit__info--bestPrice']}>
          {toMoney(data.bestPrice)}
        </strong>
      </div>
    )
  }

  return (
    <div className={handles['productkit__info--priceWrapper']}>
      <s className={handles['productkit__info--listPrice']}></s>
      <strong className={handles['productkit__info--bestPrice']}>
        {toMoney(data.bestPrice)}
      </strong>
    </div>
  )
}

export default Price
