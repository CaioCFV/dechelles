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
  'menu__bottom',
  'menu__bottom__link',
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
              <Link to="/account" className={handles.menu__header__login}>
                Cadastro / Login
              </Link>
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
            <Link className={handles.menu__footer__link} to="/editorial">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="20"
                viewBox="0 0 8 20"
                fill="none"
                className={handles.menu__footer__link__icon}
              >
                <path
                  d="M5.50977 0.0346727C5.50977 0.0591226 5.70811 1.14959 5.95053 2.46988C6.19294 3.78528 6.39129 4.90508 6.39129 4.94909C6.39129 5.02244 6.46475 5.03711 6.86878 5.03711C7.13323 5.03711 7.34627 5.02733 7.34627 5.01755C7.34627 4.95887 6.67778 0.43565 6.64105 0.230271L6.59697 0.000442982H6.05337C5.75218 0.000442982 5.50977 0.0151129 5.50977 0.0346727Z"
                  fill="#585858"
                />
                <path
                  d="M3.43059 0.757986C3.33509 1.17852 0 19.8191 0 19.912C0 19.9902 0.0661141 20 0.550951 20C0.940289 20 1.1019 19.9804 1.1019 19.9364C1.1019 19.7653 3.45262 6.67973 3.48935 6.66017C3.51139 6.6455 3.52608 6.67484 3.52608 6.72374C3.52608 6.83132 5.78131 19.6039 5.84008 19.8435L5.88415 20H6.50122C7.09624 20 7.12563 19.9951 7.12563 19.8924C7.12563 19.8093 3.59954 1.0416 3.50405 0.611284C3.48935 0.557495 3.45997 0.621067 3.43059 0.757986Z"
                  fill="#585858"
                />
              </svg>
              Its Agilitá
            </Link>
            <Link
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
            </Link>
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
        <div
          className={applyModifiers(
            handles.menu__bottom,
            openMenu ? 'active' : ''
          )}
        >
          <a
            href="https://agilitafashion.troque.app.br/"
            target="_blank"
            className={handles.menu__bottom__link}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              className="vtex-ico"
            >
              <path
                d="M10.584 4.47751C10.9982 4.47751 11.334 4.14173 11.334 3.72751C11.334 3.3133 10.9982 2.97751 10.584 2.97751V4.47751ZM5.00314 16.104C5.3026 16.3901 5.77735 16.3794 6.06353 16.0799C6.3497 15.7804 6.33892 15.3057 6.03946 15.0195L5.00314 16.104ZM8.94055 6.26688C8.70478 6.60744 8.78973 7.07465 9.13029 7.31043C9.47085 7.5462 9.93807 7.46125 10.1738 7.12069L8.94055 6.26688ZM11.6108 3.72751L12.2274 4.15442C12.3432 3.98715 12.3861 3.78002 12.3462 3.58052C12.3064 3.38102 12.1871 3.20628 12.0159 3.09638L11.6108 3.72751ZM8.93559 1.11886C8.58702 0.895092 8.12305 0.996258 7.89928 1.34483C7.6755 1.69339 7.77667 2.15737 8.12524 2.38114L8.93559 1.11886ZM10.584 16.7892C10.1698 16.7892 9.83398 17.125 9.83398 17.5392C9.83398 17.9535 10.1698 18.2892 10.584 18.2892V16.7892ZM16.1648 5.16277C15.8654 4.8766 15.3906 4.88738 15.1044 5.18684C14.8183 5.48631 14.829 5.96106 15.1285 6.24723L16.1648 5.16277ZM12.2274 15.0307C12.4632 14.6902 12.3782 14.223 12.0377 13.9872C11.6971 13.7514 11.2299 13.8364 10.9941 14.1769L12.2274 15.0307ZM9.5572 17.5701L8.94055 17.1432C8.82475 17.3105 8.78187 17.5176 8.82174 17.7171C8.86162 17.9166 8.98082 18.0913 9.15202 18.2012L9.5572 17.5701ZM12.2324 20.1788C12.5809 20.4025 13.0449 20.3014 13.2687 19.9528C13.4925 19.6042 13.3913 19.1403 13.0427 18.9165L12.2324 20.1788ZM10.584 2.97751C6.22715 2.97751 2.64648 6.38564 2.64648 10.6488H4.14648C4.14648 7.26692 7.00172 4.47751 10.584 4.47751V2.97751ZM2.64648 10.6488C2.64648 12.7872 3.55228 14.7175 5.00314 16.104L6.03946 15.0195C4.86588 13.898 4.14648 12.3522 4.14648 10.6488H2.64648ZM10.1738 7.12069L12.2274 4.15442L10.9941 3.30061L8.94055 6.26688L10.1738 7.12069ZM12.0159 3.09638L8.93559 1.11886L8.12524 2.38114L11.2056 4.35865L12.0159 3.09638ZM10.584 18.2892C14.9408 18.2892 18.5215 14.8811 18.5215 10.6179H17.0215C17.0215 13.9998 14.1662 16.7892 10.584 16.7892V18.2892ZM18.5215 10.6179C18.5215 8.47956 17.6157 6.54923 16.1648 5.16277L15.1285 6.24723C16.3021 7.36871 17.0215 8.91459 17.0215 10.6179H18.5215ZM10.9941 14.1769L8.94055 17.1432L10.1738 17.997L12.2274 15.0307L10.9941 14.1769ZM9.15202 18.2012L12.2324 20.1788L13.0427 18.9165L9.96237 16.939L9.15202 18.2012Z"
                fill="#474747"
              />
            </svg>
            Trocas e devoluções
          </a>
          <a
            href="https://agilitafashion.zendesk.com/hc/pt-br"
            target="_blank"
            className={handles.menu__bottom__link}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              className="vtex-ico"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.7493 2.79199C6.49216 2.79199 3.04102 6.24313 3.04102 10.5003C3.04102 14.7575 6.49216 18.2087 10.7493 18.2087C15.0065 18.2087 18.4577 14.7575 18.4577 10.5003C18.4577 6.24313 15.0065 2.79199 10.7493 2.79199ZM1.79102 10.5003C1.79102 5.55278 5.8018 1.54199 10.7493 1.54199C15.6969 1.54199 19.7077 5.55278 19.7077 10.5003C19.7077 15.4479 15.6969 19.4587 10.7493 19.4587C5.8018 19.4587 1.79102 15.4479 1.79102 10.5003ZM10.7493 6.95866C10.2316 6.95866 9.81185 7.37839 9.81185 7.89616C9.81185 8.24133 9.53202 8.52116 9.18685 8.52116C8.84167 8.52116 8.56185 8.24133 8.56185 7.89616C8.56185 6.68803 9.54127 5.70866 10.7493 5.70866C11.9574 5.70866 12.9368 6.68803 12.9368 7.89616C12.9368 8.69894 12.504 9.39999 11.8621 9.77983C11.6981 9.87683 11.5628 9.98274 11.4746 10.0867C11.3889 10.1875 11.3743 10.2533 11.3743 10.292V11.3337C11.3743 11.6788 11.0945 11.9587 10.7493 11.9587C10.4042 11.9587 10.1243 11.6788 10.1243 11.3337V10.292C10.1243 9.87041 10.3089 9.52833 10.5215 9.27783C10.7315 9.03033 10.9934 8.84133 11.2256 8.70398C11.503 8.53982 11.6868 8.23912 11.6868 7.89616C11.6868 7.37839 11.2671 6.95866 10.7493 6.95866ZM10.7493 14.667C11.2096 14.667 11.5827 14.2939 11.5827 13.8337C11.5827 13.3734 11.2096 13.0003 10.7493 13.0003C10.2891 13.0003 9.91602 13.3734 9.91602 13.8337C9.91602 14.2939 10.2891 14.667 10.7493 14.667Z"
                fill="#474747"
              />
            </svg>
            Fale Conosco
          </a>
        </div>
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
