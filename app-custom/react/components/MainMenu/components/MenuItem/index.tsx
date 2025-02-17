import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { HANDLES_MAIN_MENU } from '../..'
import {
  CustomLinksItem,
  CustomLinks,
  MenuBanners,
} from '../../typings/MainMenuTypes'
import { SubmenuItem } from '../SubMenu'

export const MenuItem = ({
  __editorItemTitle,
  href,
  banners,
  children,
  seeAll,
  hasChildren,
  highlight,
}: CustomLinks) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const { isMobile } = useDevice()
  const [open, setOpen] = useState(false)

  if (isMobile) {
    if (hasChildren) {
      return (
        <li className={handles.mainMenuItem}>
          <span
            className={applyModifiers(
              handles.mainMenuItemLink,
              open ? 'active' : ''
            )}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setOpen(!open)
            }}
            style={{
              color: highlight == true ? '#e64b4b' : '',
              fontWeight: '600',
            }}
          >
            {__editorItemTitle}
            {isMobile && hasChildren && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="6"
                viewBox="0 0 12 6"
                className="vtex-menu-icon"
              >
                <g>
                  <g transform="rotate(90 6 3)">
                    <path
                      className="vtex-menu-path"
                      fill="#4d4d4d"
                      d="M7.06 3.242a.34.34 0 0 0 0-.485L2.919-1.385a.762.762 0 0 1-.225-.542.767.767 0 0 1 1.308-.542l4.144 4.143c.354.353.548.824.548 1.326 0 .501-.194.972-.548 1.326L4.002 8.47a.762.762 0 0 1-.542.224.768.768 0 0 1-.542-1.308z"
                    />
                  </g>
                </g>
              </svg>
            )}
          </span>
          {hasChildren && (
            <div
              className={applyModifiers(handles.subMenu, open ? 'active' : '')}
            >
              <ul className={handles.subMenuContainer}>
                <div className={handles.subMenuContainerLinks}>
                  {children?.map((item: CustomLinksItem, i: number) => {
                    return (
                      <SubmenuItem
                        __editorItemTitle={item.__editorItemTitle}
                        href={item.href}
                        order={item.order}
                        key={i}
                      />
                    )
                  })}
                  <Link className={handles.seeAll} to={seeAll}>
                    ver tudo
                  </Link>
                </div>
                {!isMobile && (
                  <div className={handles.imageMenuContainer}>
                    {banners?.map((item: MenuBanners) => {
                      return (
                        <Link className={handles.imageMenuLink} to={item?.link}>
                          <img
                            className={handles.imageMenu}
                            src={item?.image}
                            alt={item?.name}
                          />
                          <h2 className={handles.imageMenuName}>{item.name}</h2>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </ul>
            </div>
          )}
        </li>
      )
    } else {
      return (
        <li className={handles.mainMenuItem}>
          <Link
            className={handles.mainMenuItemLink}
            to={href}
            onClick={function () {
              if (window.innerWidth < 1025) {
                document
                  .querySelector('.dechelles-commercegrowth-custom-0-x-blur')
                  // @ts-ignore
                  ?.click()
              }
            }}
            style={{
              color: highlight == true ? '#e64b4b' : '',
              fontWeight: '600',
            }}
          >
            {__editorItemTitle}
          </Link>
        </li>
      )
    }
  }

  return (
    <li className={handles.mainMenuItem}>
      <Link
        className={applyModifiers(
          handles.mainMenuItemLink,
          open ? 'active' : ''
        )}
        style={{ color: highlight == true ? '#e64b4b' : '', fontWeight: '600' }}
        to={href}
      >
        {__editorItemTitle}
        {isMobile && hasChildren && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="6"
            viewBox="0 0 12 6"
            className="vtex-menu-icon"
          >
            <g>
              <g transform="rotate(90 6 3)">
                <path
                  className="vtex-menu-path"
                  fill="#4d4d4d"
                  d="M7.06 3.242a.34.34 0 0 0 0-.485L2.919-1.385a.762.762 0 0 1-.225-.542.767.767 0 0 1 1.308-.542l4.144 4.143c.354.353.548.824.548 1.326 0 .501-.194.972-.548 1.326L4.002 8.47a.762.762 0 0 1-.542.224.768.768 0 0 1-.542-1.308z"
                />
              </g>
            </g>
          </svg>
        )}
      </Link>
      {hasChildren && (
        <div className={applyModifiers(handles.subMenu, open ? 'active' : '')}>
          <ul className={handles.subMenuContainer}>
            <div className={handles.subMenuContainerLinks}>
              {children?.map((item: CustomLinksItem, i: number) => {
                return (
                  <SubmenuItem
                    __editorItemTitle={item.__editorItemTitle}
                    href={item.href}
                    order={item.order}
                    key={i}
                  />
                )
              })}
              <Link className={handles.seeAll} to={seeAll}>
                ver tudo
              </Link>
            </div>
            {!isMobile && (
              <div className={handles.imageMenuContainer}>
                {banners?.map((item: MenuBanners) => {
                  return (
                    <Link className={handles.imageMenuLink} to={item?.link}>
                      <img
                        className={handles.imageMenu}
                        src={item?.image}
                        alt={item?.name}
                      />
                      <h2 className={handles.imageMenuName}>{item.name}</h2>
                    </Link>
                  )
                })}
              </div>
            )}
          </ul>
        </div>
      )}
    </li>
  )
}
