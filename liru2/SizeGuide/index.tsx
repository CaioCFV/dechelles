import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

export const HANDLES_SIZEGUIDE = [
  'sizeguide__wrapper',
  'sizeguide__overlay',
  'sizeguide__title',
  'sizeguide__image',
  'sizeguide__text',
] as const

type Props = {
  active: boolean
  toggle: Function
}

export const SizeGuide: React.FC<Props> = ({ active, toggle }) => {
  const { handles } = useCssHandles(HANDLES_SIZEGUIDE)

  return (
    <>
      <div
        className={applyModifiers(
          handles['sizeguide__overlay'],
          active ? 'active' : ''
        )}
        onClick={() => toggle()}
      >
        <div className={handles['sizeguide__wrapper']}>
          <h1 className={handles['sizeguide__title']}>tamanho e medidas</h1>
          <p className={handles['sizeguide__text']}>
            fizemos uma tabela em centímetros, baseada em uma média das medidas
            das nossas clientes e dos tamanhos que elas usam :)
          </p>
          <img
            src="https://dechelles.vtexassets.com/arquivos/medidas5.png"
            className={handles['sizeguide__image']}
          />
          <p className={handles['sizeguide__text']}>
            caso você não saiba seu tamanho em centímetros, pode usar essa
            tabela aqui
          </p>
          <img
            src="https://dechelles.vtexassets.com/arquivos/medidas4.png"
            className={handles['sizeguide__image']}
          />
        </div>
      </div>
    </>
  )
}
