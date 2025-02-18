import React, { useEffect, useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

export const HANDLES_LGPD = [
  'lgpd',
  'lgpd__wrapper',
  'lgpd__text',
  'lgpd__link',
  'lgpd__close',
] as const

export function LGPD() {
  const { handles } = useCssHandles(HANDLES_LGPD)
  const [active, setActive] = useState(false)
  const FIVE_SECONDS = 5000
  useEffect(function () {
    setTimeout(function () {
      const lgpd = sessionStorage.getItem('lgpd')
      if (!lgpd) {
        setActive(true)
      }
    }, FIVE_SECONDS)
  }, [])
  return (
    <aside className={applyModifiers(handles.lgpd, active ? 'active' : '')}>
      <div className={handles.lgpd__wrapper}>
        <p className={handles.lgpd__text}>
          utilizamos cookies para oferecer melhor experiência, melhorar o
          desempenho, analisar como você interage em nosso site e personalizar
          conteúdo. ao utilizar este site, você concorda com a nossa política de
          segurança e privacidade.{' '}
          <a
            className={handles.lgpd__link}
            href="/institucional/politica-de-privacidade"
          >
            saiba mais
          </a>
        </p>
        <button
          className={handles.lgpd__close}
          onClick={() => {
            sessionStorage.setItem('lgpd', 'true')
            setActive(false)
          }}
        >
          ok, entendi!
        </button>
      </div>
    </aside>
  )
}
