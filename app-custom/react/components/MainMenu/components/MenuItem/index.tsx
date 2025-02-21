import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { HANDLES_MAIN_MENU } from '../..'
import { ItemType } from '../../typings/MainMenuTypes'
import { SubmenuItem } from '../SubMenu'

export const MenuItem = ({
  __editorItemTitle,
  href,
  columns = [],
  closeMenu,
}: ItemType) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const { isMobile } = useDevice()
  const [open, setOpen] = useState(false)

  if (isMobile) {
    if (columns.length) {
      return (
        <li className={handles.menu__item}>
          <button
            className={applyModifiers(
              handles.menu__item__button,
              open ? 'active' : ''
            )}
            onClick={() => setOpen(!open)}
          >
            <Link
              to={href}
              onClick={() => setOpen(!open)}
              style={{ textDecoration: 'none', color: '#585858' }}
            >
              {__editorItemTitle}
            </Link>
          </button>
          <div
            className={applyModifiers(
              handles.menu__item__submenu,
              open ? 'active' : ''
            )}
          >
            {columns.map(column => (
              <ul className={handles.menu__item__submenu__links}>
                {column.children.map(children => (
                  <SubmenuItem {...children} closeMenu={closeMenu} />
                ))}
              </ul>
            ))}
          </div>
        </li>
      )
    } else {
      return (
        <li className={handles.menu__item}>
          <Link
            className={handles.menu__item__link}
            to={href}
            onClick={closeMenu}
          >
            {__editorItemTitle}
          </Link>
        </li>
      )
    }
  }

  return (
    <li className={handles.menu__item}>
      <Link className={handles.menu__item__link} to={href}>
        {__editorItemTitle}
      </Link>
      {columns.length ? (
        <div className={handles.menu__item__submenu}>
          {columns.map(column => (
            <ul className={handles.menu__item__submenu__links}>
              {column.children.map(children => (
                <SubmenuItem {...children} />
              ))}
            </ul>
          ))}
        </div>
      ) : (
        ''
      )}
    </li>
  )
}
