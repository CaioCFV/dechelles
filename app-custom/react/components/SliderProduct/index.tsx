import React, { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation, Pagination, Zoom } from 'swiper/modules'
import { Helmet } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

export const HANDLES_SLIDER = [
  'slider',
  'slider__wrapper',
  'slider__slide__video',
  'slider__slide',
  'slider__image',
  'slider__next',
  'slider__prev',
  'slider__dots',
] as const

interface VideoProp {
  link: string
}

function Video({ link }: VideoProp) {
  const { handles } = useCssHandles(HANDLES_SLIDER)
  const id = link.split('/').pop()

  return (
    <div
      className={handles.slider__slide + ' swiper-slide'}
      style={{ overflow: 'hidden' }}
    >
      <div>
        <iframe
          src={`https://player.vimeo.com/video/${id}?title=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          data-ready="true"
          className={handles.slider__slide__video}
        ></iframe>
      </div>
    </div>
  )
}
export function SliderProduct() {
  const swiperRef: any = useRef(null)
  const product: any = useProduct()
  const { handles } = useCssHandles(HANDLES_SLIDER)

  const video = product.product.properties.find(
    (item: any) => item.name == 'video produto'
  )

  useEffect(() => {
    Swiper.use([Navigation, Pagination, Zoom])
    const next = swiperRef.current.querySelector('.swiper-next')
    const prev = swiperRef.current.querySelector('.swiper-prev')
    const dots = swiperRef.current.querySelector('.swiper-dots')
    const swiper = new Swiper(swiperRef.current, {
      speed: 400,
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: {
        el: dots,
        type: 'bullets',
      },
      zoom: {
        maxRatio: 3,
        minRatio: 1,
      },
      breakpoints: {
        1025: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      },
      on: {
        init: function () {
          swiperRef.current
            .querySelector('.swiper-wrapper')
            .classList.remove('vtex-slider-initialized')
        },
      },
    })
    swiper.enable()
  }, [])

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.css"
        />
      </Helmet>
      <div className={handles.slider + ' swiper'} ref={swiperRef}>
        <div
          className={
            handles.slider__wrapper + ' swiper-wrapper vtex-slider-initialized'
          }
        >
          {product.selectedItem.images.map(function (item: any) {
            return (
              <div
                key={item.imageId}
                className={handles.slider__slide + ' swiper-slide'}
                style={{ overflow: 'hidden' }}
              >
                <div className="swiper-zoom-container">
                  <img
                    src={
                      `https://dechelles.vtexassets.com/arquivos/ids/` +
                      item.imageId +
                      '/produto.webp'
                    }
                    className={handles.slider__image}
                  />
                </div>
              </div>
            )
          })}

          {video && <Video link={video.values[0]}></Video>}
        </div>
        <button className={handles.slider__prev + ' swiper-prev'}>
          <img
            src={require('./images/icon-arrow-left.png')}
            alt="próximo slide"
          />
        </button>
        <button className={handles.slider__next + ' swiper-next'}>
          <img
            src={require('./images/icon-arrow-right.png')}
            alt="slide anterior"
          />
        </button>
        <div className={handles.slider__dots + ' swiper-dots'}></div>
      </div>
    </>
  )
}
