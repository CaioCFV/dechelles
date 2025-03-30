import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

export const HANDLES_SLIDER = [
  'slider__zoom',
  'slider__zoom--image',
  'slider__zoom--close',
  'slider__zoom--wrapper',
] as const

type ZoomProps = {
  isActive: boolean
  disableZoom: React.MouseEventHandler
  images: { imageId: string }[]
  index: number
}

export function Zoom({ isActive, disableZoom, images, index }: ZoomProps) {
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
          Fechar
          <img
            src={require('../images/icon-close.png')}
            alt="icon-close"
            width={12}
            style={{ marginLeft: '10px' }}
          />
        </button>
        <div className={handles['slider__zoom--wrapper']}>
          {isActive &&
            images.map(function ({ imageId }, indice) {
              if (indice == index) {
                return (
                  <>
                    <img
                      src={
                        `https://dechelles.vtexassets.com/arquivos/ids/` +
                        imageId +
                        '/produto.webp'
                      }
                      alt="Imagem zoom"
                      className={
                        handles['slider__zoom--image'] + ' vtex-current-image'
                      }
                    />
                  </>
                )
              }

              return (
                <>
                  <img
                    src={
                      `https://dechelles.vtexassets.com/arquivos/ids/` +
                      imageId +
                      '/produto.webp'
                    }
                    alt="Imagem zoom"
                    className={handles['slider__zoom--image']}
                  />
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}
