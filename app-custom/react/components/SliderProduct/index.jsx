import React, { useState, useRef, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import Slider from 'react-slick'
import { canUseDOM, useRuntime } from 'vtex.render-runtime'
import './styles/slider.css'
import { Zoom } from './components/Zoom'
import ReactImageZoom from 'react-image-zoom'

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
  'slider__main__wrapper',
  'slider__next',
  'slider__prev',
  'slider__dots',
]

export function SliderProduct() {
  const product = useProduct()
  const { handles } = useCssHandles(HANDLES_SLIDER)
  const { deviceInfo } = useRuntime()
  const [zoom, setZoom] = useState({
    isActive: false,
    index: -1,
  })

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

  if (deviceInfo.isMobile) {
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
    }
    return (
      <>
        <Slider {...settings} className={handles.slider__main}>
          {product.selectedItem.images.map(function (item, index) {
            return (
              <div
                key={item.imageId}
                className={handles.slider__main__slider}
                onClick={() => {
                  setZoom({ ...zoom, isActive: true, index: index })
                }}
              >
                <img
                  src={
                    `https://dechelles.vtexassets.com/arquivos/ids/` +
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

  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  let sliderRef1 = useRef(null)
  let sliderRef2 = useRef(null)

  useEffect(() => {
    setNav1(sliderRef1)
    setNav2(sliderRef2)
  }, [])

  const settingsTHUMBS = {
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    arrows: false,
    asNavFor: nav2,
    swipeToSlide: true,
    focusOnSelect: true,
  }

  const settingsMAIN = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    dots: false,
    asNavFor: nav2,
  }

  return (
    <>
      <div className={handles.slider}>
        <div className={handles.slider__thumbs__wrapper}>
          <Slider
            {...settingsTHUMBS}
            className={handles.slider__thumbs}
            ref={slider => (sliderRef1 = slider)}
          >
            {product.selectedItem.images.map(function (item) {
              return (
                <span
                  key={item.imageId}
                  className={handles.slider__thumbs__slide}
                >
                  <img
                    src={
                      `https://dechelles.vtexassets.com/arquivos/ids/` +
                      item.imageId +
                      '-100-auto/produto.webp'
                    }
                    className={handles.slider__thumbs__image}
                  />
                </span>
              )
            })}
          </Slider>
        </div>
        <div className={handles.slider__main__wrapper}>
          <Slider
            className={handles.slider__main}
            {...settingsMAIN}
            ref={slider => (sliderRef2 = slider)}
          >
            {product.selectedItem.images.map(function (item, index) {
              return (
                <div
                  key={item.imageId}
                  className={handles.slider__main__slider}
                  data-image={index}
                >
                  <ReactImageZoom
                    width="670"
                    height="1000"
                    img={
                      `https://dechelles.vtexassets.com/arquivos/ids/` +
                      item.imageId +
                      '/produto.webp'
                    }
                    zoomPosition="original"
                    className={handles.slider__main__image}
                  ></ReactImageZoom>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </>
  )
}
