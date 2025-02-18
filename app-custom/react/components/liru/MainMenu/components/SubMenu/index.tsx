import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { HANDLES_MAIN_MENU } from '../..'
import { CustomLinksItem } from '../../typings/MainMenuTypes'

export const SubmenuItem = ({ __editorItemTitle, href }: CustomLinksItem) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)

  return (
    <li className={handles.subMenuItem}>
      <Link
        className={handles.subMenuItemLink}
        to={href}
        onClick={() => {
          if (window.innerWidth < 1025) {
            document
              .querySelector('.dechelles-commercegrowth-custom-0-x-blur')
              // @ts-ignore
              ?.click()
          }
        }}
      >
        {__editorItemTitle}
      </Link>
    </li>
  )
}
