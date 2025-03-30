import React, { useState, useEffect } from 'react'
// @ts-ignore
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'

export const HANDLES_FREESHIPPING = [
  'minicart__shipping',
  'minicart__shipping__label',
  'minicart__shipping__small',
  'minicart__shipping__box',
  'minicart__shipping__background',
] as const

export const MinicartFreeShipping = () => {
  const { handles } = useCssHandles(HANDLES_FREESHIPPING)
  // const { orderForm, updateOrderForm }: any = useMinicartContext()
  // CommonForm
  // useState
  useEffect
  useState
  //service
  // orderForm
  // updateOrderForm

  // const [data, setData] = useState({
  //   error: false,
  //   success: false,
  //   message: '',
  //   value: '',
  //   result: '',
  // })

  // useEffect(() => {
  //   if (orderForm.marketingData.utmiCampaign == 'vendedoraslny') {
  //     setData(() => ({
  //       ...data,
  //       success: true,
  //       error: false,
  //       result: orderForm.marketingData.utmiPage,
  //     }))
  //   }
  // }, [])

  // const onChange = (ev: any) => {
  //   const value = ev.target.value || ''
  //   setData(() => ({ ...data, value: value }))
  // }

  // const getSeller = async function (cod: string) {
  //   let result: Vendedores[] = []
  //   await fetch(
  //     `/api/dataentities/VD/search/?_fields=ativo,cod,name&cod=${cod}`
  //   )
  //     .then(function (item) {
  //       return item.json()
  //     })
  //     .then(r => {
  //       result = r
  //     })
  //   return result
  // }

  // const onSubmit = async (evt?: React.FormEvent<HTMLFormElement>) => {
  //   if (evt) {
  //     evt.preventDefault()
  //   }
  //   if (!data.value.length) {
  //     setData(() => ({ ...data, error: true, message: 'digite um código' }))
  //     return
  //   }

  //   const seller = await getSeller(data.value)

  //   if (seller.length && seller[0].ativo) {
  //     setData(() => ({
  //       ...data,
  //       success: true,
  //       error: false,
  //       result: seller[0].name,
  //     }))
  //     service.marketingDataPost(
  //       orderForm,
  //       'vendedorsuntime',
  //       seller[0].cod,
  //       seller[0].name
  //     )
  //     updateOrderForm()
  //   } else {
  //     setData(() => ({ ...data, error: true, message: 'código inválido' }))
  //   }
  // }

  // const onRemove = async function () {
  //   await service.marketingDataPost(
  //     orderForm,
  //     'sem vendedor',
  //     'sem vendedor',
  //     ''
  //   )
  //   setData(() => ({
  //     ...data,
  //     error: false,
  //     message: '',
  //     result: '',
  //     success: false,
  //     value: '',
  //   }))
  //   updateOrderForm()
  // }

  return (
    <div className={handles.minicart__shipping}>
      <p className={handles.minicart__shipping__label}>sul/sudeste</p>
      <div className={handles.minicart__shipping__box}>
        <div className={handles.minicart__shipping__background}></div>
      </div>
      <span className={handles.minicart__shipping__small}>
        Faltam R$249,10 para o frete grátis!
      </span>
      <p className={handles.minicart__shipping__label}>Outras regiões</p>
      <div className={handles.minicart__shipping__box}>
        <div className={handles.minicart__shipping__background}></div>
      </div>
      <span className={handles.minicart__shipping__small}>
        Faltam R$249,10 para o frete grátis!
      </span>
    </div>
  )
}
