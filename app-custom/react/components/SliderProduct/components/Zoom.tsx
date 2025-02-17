import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

export const HANDLES_SLIDER = [
  'slider__zoom',
  'slider__zoom--image',
  'slider__zoom--close',
  'slider__zoom--wrapper',
] as const

type ZoomProps = {
  image: string
  isActive: boolean
  disableZoom: React.MouseEventHandler
}
export function Zoom({ image, isActive, disableZoom }: ZoomProps) {
  const { handles } = useCssHandles(HANDLES_SLIDER)

  return (
    <>
      <div
        className={applyModifiers(
          handles.slider__zoom,
          isActive ? 'active' : ''
        )}
        onClick={disableZoom}
      >
        <button
          className={handles['slider__zoom--close']}
          onClick={disableZoom}
        >
          <img src={require('../images/icon-close.png')} alt="icon-close" />
        </button>
        <div className={handles['slider__zoom--wrapper']}>
          <img
            src={image}
            alt="Imagem zoom"
            className={handles['slider__zoom--image']}
          />
        </div>
      </div>
    </>
  )
}
