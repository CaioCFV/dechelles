import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { canUseDOM } from 'vtex.render-runtime'
import { slugify } from '../utils/slugify'

export const HANDLES_SIZEGUIDE = [
  'sizeguide__wrapper',
  'sizeguide__overlay',
  'sizeguide__close',
  'sizeguide__header',
  'sizeguide__header__title',
  'sizeguide__header__close',
  'sizeguide__image',
  'sizeguide__image__wrapper',
  'sizeguide__button',
] as const

interface TableDataType {
  [key: string]: any
}

const sizeTableData: TableDataType = {
  praia: {
    desktop:
      'https://dechelles.vtexassets.com/arquivos/ids/241063/Tabela-de-Medidas-De-Chelles-Acqua-v2.png',
    mobile: `https://dechelles.vteximg.com.br/arquivos/ids/199755/TABELA-MEDIDA-PRAIA-MOBILE.jpg`,
  },
  lingerie: {
    desktop:
      'https://dechelles.vteximg.com.br/arquivos/ids/199750/TABELA-MEDIDA-LINGERIE-DESKTOP.jpg',
    mobile: `https://dechelles.vteximg.com.br/arquivos/ids/199754/TABELA-MEDIDA-LINGERIE-MOBILE.jpg`,
  },
  fitness: {
    desktop:
      'https://dechelles.vteximg.com.br/arquivos/ids/199752/TABELA-MEDIDA-FITNESS-DESKTOP.jpg',
    mobile: `https://dechelles.vteximg.com.br/arquivos/ids/199753/TABELA-MEDIDA-FITNESS-MOBILE.jpg`,
  },
}

export const SizeGuide: React.FC = () => {
  const { handles } = useCssHandles(HANDLES_SIZEGUIDE)
  const { product } = useProduct() as ProductContextState
  const [activeTable, setActiveTable] = useState(false)

  if (!product) {
    return <></>
  }

  if (!canUseDOM) {
    return <></>
  }

  if (!product.categories[0]) {
    return <></>
  }

  const category = slugify(product.categories[0].split('/')[1])
  const data = sizeTableData[category]

  if (!data) {
    return <></>
  }

  return (
    <>
      <div
        className={applyModifiers(
          handles.sizeguide__overlay,
          activeTable ? 'active' : ''
        )}
        onClick={() => setActiveTable(!activeTable)}
      >
        <div className={handles.sizeguide__wrapper}>
          <button
            className={handles.sizeguide__close}
            onClick={() => setActiveTable(!activeTable)}
          ></button>
          <picture className={handles.sizeguide__image__wrapper}>
            <source srcSet={data.mobile} media="(max-width: 768px)" />
            <img src={data.desktop} className={handles.sizeguide__image} />
          </picture>
        </div>
      </div>
      <span
        onClick={() => setActiveTable(true)}
        className={handles.sizeguide__button}
      >
        + Ver tabela de medidas
      </span>
    </>
  )
}
