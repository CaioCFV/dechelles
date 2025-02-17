import React from 'react'
import { Helmet } from 'vtex.render-runtime'

export const TipbarColor = (props: any) => {
  return (
    <Helmet>
      <style>
        {`
          [class*="sliderLayoutContainer--header__tipbar"]{
            background-color: ${props.background};
          }
          [class*="paragraph--header__tipbar--text"]{
            color: ${props.textcolor} !important;
          }
        `}
      </style>
    </Helmet>
  )
}

TipbarColor.schema = {
  title: 'HEADER - Cor tipbar',
}
