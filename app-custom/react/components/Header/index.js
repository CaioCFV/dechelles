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
      <style>
        {`
          .slick-list,
          .slick-slider,
          .slick-track {
            position: relative;
            display: block;
          }
          .slick-loading .slick-slide,
          .slick-loading .slick-track {
            visibility: hidden;
          }
          .slick-slider {
            box-sizing: border-box;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
            -khtml-user-select: none;
            -ms-touch-action: pan-y;
            touch-action: pan-y;
            -webkit-tap-highlight-color: transparent;
          }
          .slick-list {
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          .slick-list:focus {
            outline: 0;
          }
          .slick-list.dragging {
            cursor: pointer;
            cursor: hand;
          }
          .slick-slider .slick-list,
          .slick-slider .slick-track {
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          .slick-track {
            top: 0;
            left: 0;
          }
          .slick-track:after,
          .slick-track:before {
            display: table;
            content: '';
          }
          .slick-track:after {
            clear: both;
          }
          .slick-slide {
            display: none;
            float: left;
            height: 100%;
            min-height: 1px;
          }
          [dir='rtl'] .slick-slide {
            float: right;
          }
          .slick-slide img {
            display: block;
          }
          .slick-slide.slick-loading img {
            display: none;
          }
          .slick-slide.dragging img {
            pointer-events: none;
          }
          .slick-initialized .slick-slide {
            display: block;
          }
          .slick-vertical .slick-slide {
            display: block;
            height: auto;
            border: 1px solid transparent;
          }
          .slick-arrow.slick-hidden {
            display: none;
          }
           .sku_color_branco:before {
                background: #fff;
                border: 1px solid #ebebeb
            }

           .sku_color_amarelo:before {
                background: #ff0;
                border: 1px solid #d1d1d1
            }

           .sku_color_rosa:before {
                background: #ffcbdb;
                border: 1px solid #d1d1d1
            }

           .sku_color_bege:before {
                background: #e4cfb4;
                border: 1px solid #d1d1d1
            }

           .sku_color_laranja:before {
                background: orange;
                border: 1px solid #d1d1d1
            }

           .sku_color_preto:before {
                background: #000;
                border: 1px solid #d1d1d1
            }

           .sku_color_cinza:before {
                background: grey;
                border: 1px solid #d1d1d1
            }

           .sku_color_vermelho:before {
                background: red;
                border: 1px solid #d1d1d1
            }

           .sku_color_azul:before {
                background: #00f;
                border: 1px solid #d1d1d1
            }

           .sku_color_verde:before {
                background: green;
                border: 1px solid #d1d1d1
            }

           .sku_color_prata:before {
                background: grey;
                border: 1px solid #d1d1d1
            }

           .sku_color_off:before,
           .sku_color_off-white:before {
                background: #fffff4;
                border: 1px solid #d1d1d1
            }

           .sku_color_nude:before {
                background: #ebc8b2;
                border: 1px solid #d1d1d1
            }

           .sku_color_dourado:before {
                background: #daa520;
                border: 1px solid #d1d1d1
            }

           .sku_color_marrom:before {
                background: #964b00;
                border: 1px solid #d1d1d1
            }

           .sku_color_ouro:before {
                background: #daa520;
                border: 1px solid #d1d1d1
            }

           .sku_color_roxo:before {
                background: #7a297a;
                border: 1px solid #d1d1d1
            }

           .sku_color_estampado:before {
                border: 1px solid #d1d1d1;
                background: linear-gradient(45deg,#ae450c 0,#fdcab5 63%,#fdcab5 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fdcab5', endColorstr='#AE450C', GradientType=1)
            }

           .sku_color_vinho:before {
                background: #5e2129;
                border: 1px solid #d1d1d1
            }
        `}
      </style>
    </Helmet>
  )
}

Header.schema = {
  title: 'HEADER - Cor tema',
}
