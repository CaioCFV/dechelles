import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { SingleProduct } from '../types'
import { HANDLES_PRODUCT_KIT } from '../handles'
import Price from './Price'
import SkuList from './SkusList'
import { useKitDataContext } from '../context'
//@ts-ignore
import { AvailabilityNotifier } from 'vtex.availability-notify'

type Props = {
  product: SingleProduct
}

const Single: React.FC<Props> = function ({ product }) {
  const { handles } = useCssHandles(HANDLES_PRODUCT_KIT)
  const skuAvailable = product.skus.find(item => item.available)
  const { dispatch, state } = useKitDataContext()
  const currentSku = product.skus.find(
    item => item.sku == state.selecteds[product.productId]?.id
  )
  const isAvailable = currentSku?.available

  return (
    <>
      <li className={handles.productkit__item}>
        <img
          src={product.skus[0].image.replace('-1500-2251', '-125-190')}
          className={handles.productkit__image}
        />
        <div className={handles.productkit__info}>
          <h2 className={handles['productkit__info--name']}>{product.name}</h2>
          <Price data={skuAvailable} />
          <SkuList skus={product.skus} productId={product.productId} />
          <button
            className={handles.productkit__sizeguidebutton}
            onClick={() => dispatch({ type: 'TOOGLE_SIZE_TABLE' })}
          >
            guia de medidas
          </button>
        </div>
      </li>
      {currentSku && !isAvailable && (
        <></>
        // <AvailabilityNotifier
        //   skuId={currentSku.sku as number}
        //   available={false}
        // ></AvailabilityNotifier>
      )}
    </>
  )
}

export default React.memo(Single)
