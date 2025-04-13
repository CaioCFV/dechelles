import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { HANDLES_PRODUCT_KIT } from '../handles'
import { useKitDataContext } from '../context'
import { useMutation } from 'react-apollo'
import ADD_ITEM from '../queries/addToCart.graphql'
import { OrderForm } from 'vtex.order-manager'
const { useOrderForm } = OrderForm

const handleMinicart = function () {
  const minicartBtn = document.querySelector(
    '.vtex-minicart-2-x-minicartContainer--header__minicart button'
  )
  if (minicartBtn) {
    //@ts-ignore
    minicartBtn.click()
  }
}

const BuyButton: React.FC = function () {
  const { handles } = useCssHandles(HANDLES_PRODUCT_KIT)
  const { state } = useKitDataContext()
  const [text, setText] = useState('adicionar ao carrinho')
  const { setOrderForm } = useOrderForm()

  const [addToCart] = useMutation(ADD_ITEM, {
    onCompleted: (data: any) => {
      const orderFormData = data?.addToCart
      setOrderForm((prevOrderForm: any) => {
        return {
          ...prevOrderForm,
          ...orderFormData,
        }
      })
    },
  })

  const handleBuyButton = function () {
    const items = Object.values(state.selecteds)
    if (!items.length) {
      setText('Selecione um tamanho !')
    }

    addToCart({
      variables: {
        items: items,
      },
    })

    setTimeout(handleMinicart, 1000)
  }

  return (
    <button className={handles.productkit__buybutton} onClick={handleBuyButton}>
      {text}
    </button>
  )
}
export default BuyButton
