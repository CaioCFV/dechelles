import React, { useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import Slider from 'react-slick'
import { canUseDOM, useRuntime } from 'vtex.render-runtime'
import './styles/slider.css'
import { Zoom } from './components/Zoom'

export const HANDLES_SLIDER = [
  'slider',
  'slider__thumbs',
  'slider__thumbs__wrapper',
  'slider__thumbs__slide',
  'slider__thumbs__image',
  'slider__thumbs__prev',
  'slider__thumbs__next',
  'slider__wrapper',
  'slider__main',
  'slider__main__slider',
  'slider__main__image',
  'slider__next',
  'slider__prev',
  'slider__dots',
] as const

export function SliderProduct() {
  const product: any = useProduct()
  const { handles } = useCssHandles(HANDLES_SLIDER)
  const { deviceInfo } = useRuntime()
  const maxImages = product.selectedItem.images.length - 1
  const [current, setIndex] = useState(0)
  const [zoom, setZoom] = useState({
    isActive: false,
    index: -1,
  })
  function doScrolling(elementY: any, duration: any) {
    var startingY = window.pageYOffset
    var diff = elementY - startingY + 50
    var start: any
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp
      var time = timestamp - start
      var percent = Math.min(time / duration, 1)
      window.scrollTo(0, startingY + diff * percent)
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  }

  const scrollToImage = function (index: number) {
    const elmnt: any = document.querySelector(`[data-image="${index}"]`)
    doScrolling(elmnt.offsetTop, 200)
  }

  const next = () => {
    let val = current + 1
    if (val > maxImages) val = 0
    setIndex(val)
    scrollToImage(val)
  }

  const setImage = (index: any) => {
    setIndex(index)
    scrollToImage(index)
  }

  const previous = () => {
    let val = current - 1
    if (val < 0) val = maxImages
    setIndex(val)
    scrollToImage(val)
  }

  if (deviceInfo.isMobile) {
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      dots: true,
    }
    return (
      <>
        <Slider {...settings} className={handles.slider__main}>
          {product.selectedItem.images.map(function (item: any, index: any) {
            return (
              <div
                key={item.imageId}
                className={handles.slider__main__slider}
                onClick={() => {
                  setIndex(index)
                  setZoom({ ...zoom, isActive: true, index: index })
                }}
              >
                <img
                  src={
                    `https://michaelkorsbr.vtexassets.com/arquivos/ids/` +
                    item.imageId +
                    '-710-1065/produto.webp'
                  }
                  className={handles.slider__main__image}
                />
              </div>
            )
          })}
        </Slider>
        <Zoom
          isActive={zoom.isActive}
          images={product.selectedItem.images}
          disableZoom={() => setZoom({ ...zoom, isActive: false })}
          index={zoom.index}
        />
      </>
    )
  }

  const settingsTHUMBS = {
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    arrows: false,
    dots: false,
    draggable: true,
  }

  if (canUseDOM) {
    document
      .querySelector('[class*="-product__info--addtocart"] .vtex-button')
      ?.addEventListener('click', function () {
        setTimeout(function () {
          document
            .querySelector('[class*="minicartIconContainer--header__minicart"]')
            //@ts-ignore
            ?.click()
        }, 4000)
      })
  }

  return (
    <div className={handles.slider}>
      <div className={handles.slider__thumbs__wrapper}>
        <Slider {...settingsTHUMBS} className={handles.slider__thumbs}>
          {product.selectedItem.images.map(function (item: any, index: number) {
            return (
              <div
                key={item.imageId}
                className={applyModifiers(
                  handles.slider__thumbs__slide,
                  index == current ? 'active' : ''
                )}
                onClick={() => setImage(index)}
              >
                <img
                  src={
                    `https://dechelles.vtexassets.com/arquivos/ids/` +
                    item.imageId +
                    '-70-100/produto.webp'
                  }
                  className={handles.slider__thumbs__image}
                />
              </div>
            )
          })}
        </Slider>
        <button
          className={handles.slider__thumbs__prev}
          onClick={() => previous()}
        >
          <img
            //src={require('./images/large-arrow.svg')}
            alt="próximo slide"
            style={{ width: '42px', margin: '0 auto' }}
          />
        </button>
        <button className={handles.slider__thumbs__next} onClick={() => next()}>
          <img
            //src={require('./images/large-arrow.svg')}
            alt="slide anterior"
            style={{ width: '42px', margin: '0 auto' }}
          />
        </button>
      </div>
      <div className={handles.slider__main}>
        {product.selectedItem.images.map(function (item: any, index: number) {
          return (
            <div
              key={item.imageId}
              className={handles.slider__main__slider}
              data-image={index}
            >
              <img
                src={
                  `https://dechelles.vtexassets.com/arquivos/ids/` +
                  item.imageId +
                  '-710-710/produto.webp'
                }
                className={handles.slider__main__image}
                onClick={() => {
                  setZoom({ ...zoom, isActive: true, index: index })
                }}
              />
            </div>
          )
        })}
      </div>
      <Zoom
        isActive={zoom.isActive}
        images={product.selectedItem.images}
        disableZoom={() => setZoom({ ...zoom, isActive: false })}
        index={zoom.index}
      />
    </div>
  )
}
