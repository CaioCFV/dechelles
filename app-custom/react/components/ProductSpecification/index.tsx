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
    return <p className={handles.productdescription}>{product.description}</p>
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

  console.log(product, 'ui')
  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repellat non
      iste, laudantium recusandae nesciunt vel ipsum beatae omnis itaque sit
      eaque doloribus eveniet quibusdam saepe deleniti voluptatum enim magnam
      sapiente quas! Quas itaque nesciunt quis, quos dolore quod blanditiis
      harum, ipsam ipsum maiores nisi commodi! Vitae esse reiciendis at
      blanditiis molestiae eum cupiditate? Accusantium nihil quo commodi
      doloremque nobis nemo nulla vitae, rem, laborum placeat explicabo quasi
      minima obcaecati beatae assumenda officia. Dignissimos eligendi nisi
      consectetur enim, omnis ex obcaecati velit neque eveniet ad unde deleniti
      debitis adipisci magni exercitationem placeat. Deleniti impedit vel
      reprehenderit cum quo officiis necessitatibus, sint voluptas quod commodi
      exercitationem repudiandae error earum quidem quibusdam fugiat dolor, ut
      recusandae mollitia. Commodi quod repellendus blanditiis vel? Suscipit
      porro tenetur harum et assumenda non cum ipsam in laboriosam tempore
      earum, quam hic, exercitationem eligendi beatae nostrum praesentium
      temporibus magnam. Aliquam iure, deserunt, numquam odit modi nostrum sunt
      dolores impedit voluptatem autem distinctio amet voluptates, esse ipsam
      eius nulla. Magnam fugit suscipit vero cupiditate sint eius reiciendis.
      Iste neque aperiam eum, dolore ullam adipisci officiis a et, autem earum
      praesentium debitis magni possimus quisquam quibusdam. Ipsa doloremque
      temporibus recusandae, mollitia minima quae ullam omnis veniam neque minus
      magnam?
    </>
  )
}
