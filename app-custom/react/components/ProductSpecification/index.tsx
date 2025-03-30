import React, { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { useCssHandles } from 'vtex.css-handles'

const HANDLES = ['productdescription'] as const

export const ProductSpecification = ({ name }: any) => {
  const product = useMemo(() => {
    const data = useProduct() as ProductContextState
    return data.product
  }, [])
  const { handles } = useCssHandles(HANDLES)

  if (!product) {
    return <></>
  }

  if (name == 'description') {
    return (
      <p
        className={handles.productdescription}
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></p>
    )
  } else {
    const specificationGroup = product.specificationGroups.find(
      (item: any) => item.name == 'Especificações'
    )
    const specification = specificationGroup?.specifications.find(
      (item: any) => item.name == name
    )
    if (specification?.values) {
      return (
        <p
          className={handles.productdescription}
          dangerouslySetInnerHTML={{ __html: specification?.values[0] }}
        ></p>
      )
    }
  }

  return <></>
}
