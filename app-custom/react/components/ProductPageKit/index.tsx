import React from 'react'
import { KitDataProvider } from './context'
import { useCssHandles } from 'vtex.css-handles'
import { Single, BuyButton, Resume } from './components'
import { HANDLES_PRODUCT_KIT } from './handles'
import { useKitDataContext } from './context'
import { SizeGuide } from '../SizeGuide'

export const App: React.FC = function () {
  const { state, dispatch } = useKitDataContext()
  const { handles } = useCssHandles(HANDLES_PRODUCT_KIT)

  if (!state.products.length) {
    return <></>
  }

  const disable = function () {
    dispatch({ type: 'TOOGLE_SIZE_TABLE' })
  }

  return (
    <ul className={handles.productkit}>
      {state.products.map(item => (
        <Single product={item} key={item.productId} />
      ))}
      <Resume />
      <BuyButton />
      <SizeGuide active={state.sizeTableActive} toggle={disable} />
    </ul>
  )
}

export const ProductPageKit: React.FC = function () {
  return (
    <KitDataProvider>
      <App />
    </KitDataProvider>
  )
}
