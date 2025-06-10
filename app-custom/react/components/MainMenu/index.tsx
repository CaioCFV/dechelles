import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { MenuItem } from './components/MenuItem'
import { MainMenuProps } from './typings/MainMenuTypes'
import { Link } from 'vtex.render-runtime'
// @ts-ignore
import { useOrderForm } from 'vtex.order-manager/OrderForm'

export const HANDLES_MAIN_MENU = [
  'menu',
  'menu__wrapper',
  'menu__item',
  'menu__item__link',
  'menu__item__button',
  'menu__item__submenu',
  'menu__item__submenu__wrapper',
  'menu__item__submenu__links',
  'menu__item__submenu__item',
  'menu__item__submenu__link',
  'menu__item__submenu__title',
  'menu__item__submenu__imagelink',
  'menu__item__submenu__label',
  'menu__item__submenu__images',
  'menu__item__submenu__image',
  'menu__header',
  'menu__images',
  'menu__header__toggler',
  'menu__header__login',
  'menu__overlay',
  'menu__toggler',
  'menu__footer',
  'menu__footer__link',
  'menu__item__submenu__header',
  'menu__footer__link__icon',
] as const

export const MainMenu = ({ customLinks }: MainMenuProps) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const { isMobile } = useDevice()
  const [openMenu, setOpenMenu] = useState(false)

  const closeMenu = () => {
    setOpenMenu(false)
  }
  const { orderForm } = useOrderForm()

  if (isMobile) {
    return (
      <>
        <button
          className={handles.menu__toggler}
          onClick={() => setOpenMenu(!openMenu)}
        ></button>
        <span
          className={applyModifiers(
            handles.menu__overlay,
            openMenu ? 'active' : ''
          )}
          onClick={() => setOpenMenu(!openMenu)}
        ></span>
        <nav className={applyModifiers(handles.menu, openMenu ? 'active' : '')}>
          <div className={handles.menu__header}>
            <button
              className={handles.menu__header__toggler}
              onClick={() => setOpenMenu(!openMenu)}
            ></button>
            {orderForm.loggedIn ? (
              <Link to="/account" className={handles.menu__header__login}>
                Olá, {orderForm.clientProfileData.email.split('@')[0]}
              </Link>
            ) : (
              <a href="/account" className={handles.menu__header__login}>
                Cadastro / Login
              </a>
            )}
          </div>
          <ul className={handles.menu__wrapper}>
            {customLinks?.map((item, i) => {
              return (
                <MenuItem
                  {...item}
                  key={item.__editorItemTitle + i}
                  closeMenu={closeMenu}
                />
              )
            })}
          </ul>
          <div className={handles.menu__footer}>
            {/* <Link
              className={handles.menu__footer__link}
              to="/account#/wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={handles.menu__footer__link__icon}
              >
                <path
                  d="M9.99935 18.0413C9.74102 18.0413 9.49102 18.008 9.28268 17.933C6.09935 16.8413 1.04102 12.9663 1.04102 7.24134C1.04102 4.32467 3.39935 1.95801 6.29935 1.95801C7.70768 1.95801 9.02435 2.50801 9.99935 3.49134C10.9743 2.50801 12.291 1.95801 13.6993 1.95801C16.5993 1.95801 18.9577 4.33301 18.9577 7.24134C18.9577 12.9747 13.8993 16.8413 10.716 17.933C10.5077 18.008 10.2577 18.0413 9.99935 18.0413ZM6.29935 3.20801C4.09102 3.20801 2.29102 5.01634 2.29102 7.24134C2.29102 12.933 7.76602 16.0997 9.69102 16.758C9.84102 16.808 10.166 16.808 10.316 16.758C12.2327 16.0997 17.716 12.9413 17.716 7.24134C17.716 5.01634 15.916 3.20801 13.7077 3.20801C12.441 3.20801 11.266 3.79967 10.5077 4.82467C10.2743 5.14134 9.74102 5.14134 9.50768 4.82467C8.73268 3.79134 7.56602 3.20801 6.29935 3.20801Z"
                  fill="#585858"
                />
              </svg>
              Wishlist
            </Link> */}
            <Link
              className={handles.menu__footer__link}
              to="/institucional/a-marca"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={handles.menu__footer__link__icon}
              >
                <g clip-path="url(#clip0_3254_3502)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 9.375C8.96438 9.375 8.125 8.53562 8.125 7.5C8.125 6.46438 8.96438 5.625 10 5.625C11.0356 5.625 11.875 6.46438 11.875 7.5C11.875 8.53562 11.0356 9.375 10 9.375ZM10 4.375C8.27437 4.375 6.875 5.77375 6.875 7.5C6.875 9.22625 8.27437 10.625 10 10.625C11.7256 10.625 13.125 9.22625 13.125 7.5C13.125 5.77375 11.7256 4.375 10 4.375ZM10 18.125C8.96063 18.1306 3.75 10.1131 3.75 7.5C3.75 4.04875 6.54813 1.25 10 1.25C13.4519 1.25 16.25 4.04875 16.25 7.5C16.25 10.0781 11.0231 18.1306 10 18.125ZM10 0C5.85813 0 2.5 3.35813 2.5 7.5C2.5 10.6363 8.75313 20.0069 10 20C11.2275 20.0069 17.5 10.5938 17.5 7.5C17.5 3.35813 14.1419 0 10 0Z"
                    fill="#585858"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3254_3502">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Nossas Lojas
            </Link>
          </div>
        </nav>
      </>
    )
  }

  return (
    <nav className={handles.menu}>
      <ul className={handles.menu__wrapper}>
        {customLinks?.map((item: any, i: number) => {
          return <MenuItem {...item} key={item.name + i} />
        })}
      </ul>
    </nav>
  )
}

MainMenu.schema = {
  title: 'HEADER - Menu Principal',
}
