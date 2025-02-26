import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { HANDLES_PRODUCT_KIT } from '../handles'
import { useKitDataContext } from '../context'
import { toMoney } from '../../utils/toMoney'

const getInstallment = (price: number, parcels: number, minParcel: number) => {
  let ready = true
  let lastParcel = parcels
  const data = { installment: 0, parcels: 0 }
  if (price > minParcel) {
    while (ready) {
      const installment = price / lastParcel
      if (installment >= minParcel) {
        ready = false
        data.installment = installment
        data.parcels = lastParcel
      }
      lastParcel = lastParcel - 1
    }
    if (data.parcels == 0) {
      return { installment: price, parcels: 1 }
    }
  }
  return data
}

const Resume: React.FC = function () {
  const { handles } = useCssHandles(HANDLES_PRODUCT_KIT)
  const { state } = useKitDataContext()
  const { installment, parcels } = getInstallment(state.value, 12, 3000)

  return (
    <div className={handles.productkit__resume}>
      <span className={handles['productkit__resume--selected']}>
        Selecionado:
        <strong className={handles['productkit__resume--strong']}>
          {Object.keys(state.selecteds).length} produtos
        </strong>
      </span>
      <strong className={handles['productkit__resume--price']}>
        {state.value > 9999999 ? (
          'indisponível'
        ) : (
          <>
            {toMoney(state.value)} <br />
            <small className={handles['productkit__resume--installments']}>
              {installment > 1 &&
                `em até ${parcels}x ${toMoney(
                  Math.ceil(installment)
                )} sem juros`}
            </small>
          </>
        )}
      </strong>
    </div>
  )
}

export default Resume
