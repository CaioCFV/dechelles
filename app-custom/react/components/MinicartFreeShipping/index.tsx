import React from 'react'
// @ts-ignore
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'
import {
  MincartContextProvider,
  useMinicartContext,
} from '../MinicartTotalizers/context'
import { toMoney } from '../utils/toMoney'

export const HANDLES_FREESHIPPING = [
  'minicart__shipping',
  'minicart__shipping__label',
  'minicart__shipping__small',
  'minicart__shipping__box',
  'minicart__shipping__background',
] as const

const FreeShipping = () => {
  const { handles } = useCssHandles(HANDLES_FREESHIPPING)
  const { orderForm }: any = useMinicartContext()

  let totalItems = 0
  const freeShippingRJ = 50000
  const freeShippingOthers = 80000
  freeShippingOthers

  const itemsTotal = orderForm.totalizers.find(
    (item: any) => (item.id = 'Items')
  )

  if (itemsTotal) {
    totalItems = itemsTotal.value
  }

  const calc = function (shippingRef: number) {
    const calcPercent = 100 * (totalItems / shippingRef)
    const rest = shippingRef - totalItems
    return {
      percent: calcPercent,
      rest: rest,
    }
  }

  const rj = calc(freeShippingRJ)
  const others = calc(freeShippingOthers)

  return (
    <div className={handles.minicart__shipping}>
      <p className={handles.minicart__shipping__label}>sul/sudeste</p>
      <div className={handles.minicart__shipping__box}>
        <div
          className={handles.minicart__shipping__background}
          style={{ width: rj.percent + '%' }}
        ></div>
      </div>
      <span className={handles.minicart__shipping__small}>
        {rj.rest < 0
          ? 'Você consegui frete grátis'
          : `Faltam ${toMoney(rj.rest)} para o frete grátis!`}
      </span>
      <p className={handles.minicart__shipping__label}>Outras regiões</p>
      <div className={handles.minicart__shipping__box}>
        <div
          className={handles.minicart__shipping__background}
          style={{ width: others.percent + '%' }}
        ></div>
      </div>
      <span className={handles.minicart__shipping__small}>
        {others.rest < 0
          ? 'Você consegui frete grátis'
          : `Faltam ${toMoney(others.rest)} para o frete grátis!`}
      </span>
    </div>
  )
}

export const MinicartFreeShipping = () => {
  return (
    <MincartContextProvider>
      <FreeShipping />
    </MincartContextProvider>
  )
}
