import React from 'react'
import { Helmet } from 'vtex.render-runtime'
import './styles/react-store-custom.css'

export const Header = ({ color }) => {
  return (
    <Helmet>
      <meta name="theme-color" content={color} />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <link
        rel="icon"
        href="https://dechelles.vtexassets.com/arquivos/favicon.ico"
      />
    </Helmet>
  )
}

Header.schema = {
  title: 'HEADER - Cor tema',
}
