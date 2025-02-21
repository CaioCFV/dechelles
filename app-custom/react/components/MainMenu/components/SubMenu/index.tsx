import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { HANDLES_MAIN_MENU } from '../..'
import { SubItemType } from '../../typings/MainMenuTypes'

export const SubmenuItem = ({
  __editorItemTitle,
  href,
  isTitle,
  closeMenu,
}: SubItemType) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  return (
    <>
      {isTitle ? (
        <li className={handles.menu__item__submenu__title}>
          {__editorItemTitle}
        </li>
      ) : (
        <li className={handles.menu__item__submenu__item}>
          <Link
            to={href}
            onClick={closeMenu}
            className={handles.menu__item__submenu__link}
          >
            {__editorItemTitle}
          </Link>
        </li>
      )}
    </>
  )
}
