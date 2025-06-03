/* eslint-disable global-require */
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

// @ts-ignore
import Helper from './assets/icon-helper.svg'
// @ts-ignore
import Arrow from './assets/icon-helper-arrow.svg'
// @ts-ignore
import Questions from './assets/icon-helper-questions.svg'
// @ts-ignore
import Trade from './assets/icon-helper-trade.svg'
// @ts-ignore
import Truck from './assets/icon-helper-truck.svg'
// @ts-ignore
import WPP from './assets/icon-helper-wpp.svg'
// @ts-ignore
import SAC from './assets/icon-sac.svg'

const HANDLES = [
  'HelperButton',
  'HelperButton_opened',
  'HelperButton_buttonClosed',
  'HelperButton_buttonOpened',
  'HelperButton_container',
  'HelperButton_containerOpened',
  'HelperButton_text',
  'HelperButton_img',
  'HelperButton_imgArrow',
] as const

export const HelperButton = () => {
  const [active, setActive] = useState(false)
  const { handles } = useCssHandles(HANDLES)

  return (
    <div
      className={`${handles.HelperButton} ${
        active && handles.HelperButton_opened
      }`}
    >
      <button
        className={active ? 'dn' : handles.HelperButton_buttonClosed}
        onClick={() => setActive(true)}
      >
        <img
          className={handles.HelperButton_img}
          src={Helper}
          alt=""
          style={{ width: '15px' }}
        />
        Ajuda
      </button>

      <div
        className={`${handles.HelperButton_container} ${
          active && handles.HelperButton_containerOpened
        }`}
      >
        <button
          className={handles.HelperButton_buttonOpened}
          onClick={() => setActive(false)}
        >
          Ajuda
          <img
            className={handles.HelperButton_imgArrow}
            src={Arrow}
            alt=""
            style={{ width: '15px' }}
          />
        </button>
        <a
          href="/login?ReturnUrl=/_secure/account#/orders"
          className={handles.HelperButton_text}
        >
          <img src={Truck} alt="" width={20} />
          status do pedido
        </a>

        <a
          href="/institucional/trocas-e-devolucoes"
          className={handles.HelperButton_text}
        >
          <img
            className={handles.HelperButton_img}
            src={Trade}
            alt=""
            width={20}
          />
          troca e devolução
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5522998198629"
          target="_blank"
          className={handles.HelperButton_text}
        >
          <img
            className={handles.HelperButton_img}
            src={SAC}
            alt=""
            width={20}
          />
          contato via whatsapp
        </a>

        <a
          href="/institucional/pagamento"
          target="_blank"
          className={handles.HelperButton_text}
        >
          <img
            src="/arquivos/bi_credit-card.png?v=637741497702700000"
            alt="formas de pagamento"
            width="20"
          />
          formas de pagamento
        </a>

        <a
          href="/institucional/duvidas-frequentes"
          className={handles.HelperButton_text}
        >
          <img
            className={handles.HelperButton_img}
            src={Questions}
            alt=""
            width={20}
          />
          perguntas frequentes
        </a>
      </div>
    </div>
  )
}
