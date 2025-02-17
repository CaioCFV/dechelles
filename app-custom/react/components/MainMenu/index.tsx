import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { MenuItem } from './components/MenuItem'
import { MainMenuProps } from './typings/MainMenuTypes'

export const HANDLES_MAIN_MENU = [
  'mainMenu',
  'mainMenuContainer',
  'mainMenuItem',
  'mainMenuItemLink',
  'mainMenuItemLinkOpen',
  'subMenu',
  'subMenuOpen',
  'subMenuContainer',
  'subMenuContainerLinks',
  'subMenuItem',
  'subMenuItemLink',
  'seeAll',
  'imageMenuContainer',
  'imageMenuLink',
  'imageMenu',
  'imageMenuName',
  'blur',
  'mainMenu_mobileHeader',
  'mainMenu_mobileFooter',
  'mainMenu_mobileHamburguer',
  'mainMenu_mobileItem',
] as const

export const MainMenu = ({ customLinks }: MainMenuProps) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const { isMobile } = useDevice()
  const [openMenu, setOpenMenu] = useState(false)

  if (isMobile) {
    return (
      <>
        <button
          className={handles.mainMenu_mobileHamburguer}
          onClick={() => setOpenMenu(true)}
        >
          <img src={require('.//assetsicon-menu.png')} alt="Menu Hamburger" />
        </button>
        <span
          className={applyModifiers(handles.blur, openMenu ? 'active' : '')}
          onClick={() => setOpenMenu(false)}
        ></span>
        <nav
          className={applyModifiers(handles.mainMenu, openMenu ? 'active' : '')}
        >
          <div className={handles.mainMenu_mobileHeader}>
            <button
              className={handles.mainMenu_mobileItem}
              onClick={() => setOpenMenu(false)}
            >
              <img
                src={require('.//assetsicon-close.png')}
                alt="Fechar Menu Hamburger"
              />
            </button>
            <a className={handles.mainMenu_mobileItem} href="/account">
              <img src={require('.//assetsicon-user.png')} alt="Login" />
            </a>
          </div>
          <ul className={handles.mainMenuContainer}>
            {customLinks?.map((item: any) => {
              return (
                <MenuItem
                  __editorItemTitle={item.__editorItemTitle}
                  href={item.href}
                  key={item.name}
                  order={item.order}
                  banners={item.banners}
                  children={item.children}
                  hasChildren={item.hasChildren}
                  seeAll={item.href}
                  highlight={item.highlight}
                />
              )
            })}
          </ul>
        </nav>
      </>
    )
  }

  return (
    <nav className={handles.mainMenu}>
      <ul className={handles.mainMenuContainer}>
        {customLinks?.map((item: any, i: number) => {
          return (
            <MenuItem
              __editorItemTitle={item.__editorItemTitle}
              href={item.href}
              seeAll={item.href}
              key={i}
              order={item.order}
              banners={item.banners}
              children={item.children}
              hasChildren={item.hasChildren}
              highlight={item.highlight}
            />
          )
        })}
      </ul>
    </nav>
  )
}

MainMenu.schema = {
  title: 'HEADER - Menu Principal',
}
