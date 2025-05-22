import React from 'react'
import { Sku, AddToCartItem } from './typings/Sku'
import { useProduct } from 'vtex.product-context'
import { useMutation } from 'react-apollo'
import { OrderForm } from 'vtex.order-manager'
import ADD_ITEM from './queries/addToCart.graphql'
import { KitProduct } from './components/KitProduct'
import { DefaultProduct } from './components/DefaultProduct'
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

export function ShelfVariations() {
  if (window.innerWidth < 1024) {
    return <></>
  }
  const { setOrderForm } = useOrderForm()
  const { product }: any = useProduct()
  const isAvailable = !!product.priceRange.sellingPrice.lowPrice
  const kitInfo = product.specificationGroups.find(
    (item: any) => item.name == 'Combo'
  )

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

  const handleAddToCart = (items: AddToCartItem[]) => {
    addToCart({
      variables: {
        items: items,
      },
    })
    setTimeout(handleMinicart, 500)
  }

  const parts = kitInfo?.specifications.find((item: any) => {
    return item.name == 'Parte de cima' || item.name == 'Parte de baixo'
  })

  if (!kitInfo || !parts) {
    const availableSkus: Sku[] = product.items
    return (
      <DefaultProduct
        skus={availableSkus}
        availability={isAvailable}
        handleAddToCart={handleAddToCart}
      />
    )
  }

  return <KitProduct kitInfo={kitInfo} handleAddToCart={handleAddToCart} />
}
