import React, { useState } from 'react'
import { SizeGuide } from '../SizeGuide'

export const SizeGuidePDP = () => {
  const [active, setActive] = useState(false)

  return (
    <>
      <span
        style={{
          color: '#e6964b',
          fontSize: '13px',
          fontWeight: '500',
          fontStyle: 'normal',
          letterSpacing: '0.65px',
          lineHeight: 1,
          textDecoration: 'underline',
          display: 'block',
          background: 'none',
          border: 'unset',
          padding: '0',
          margin: '-70px 0px 0px',
          cursor: 'pointer',
          textAlign: 'right',
        }}
        onClick={() => setActive(!active)}
      >
        guia de medidas
      </span>
      <SizeGuide toggle={() => setActive(!active)} active={active} />
    </>
  )
}
