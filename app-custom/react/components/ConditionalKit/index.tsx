import React from 'react'
import { useProduct } from 'vtex.product-context'
import { canUseDOM } from 'vtex.render-runtime'

export const ConditionalKit = function (props: any) {
  const { product }: any = useProduct()
  const kitInfo = product.properties.find(
    (item: any) => item.name == 'Parte de cima' || item.name == 'Parte de baixo'
  )

  if (kitInfo) {
    return <>{props.Then && props.Then()}</>
  } else {
    if (canUseDOM) {
      document
        .querySelector('.vtex-add-to-cart-button-0-x-buttonDataContainer')
        ?.addEventListener('click', function () {
          setTimeout(function () {
            // @ts-ignore
            document
              .querySelector(
                '.vtex-minicart-2-x-openIconContainer--header__minicart'
              )
              // @ts-ignore
              ?.click()
          }, 1000)
        })
    }
    return <>{props.Else && props.Else()}</>
  }
}
