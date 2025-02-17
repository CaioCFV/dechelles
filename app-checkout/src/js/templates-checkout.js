import ADV_HEADER from '../templates/header.html'
import ADV_FOOTER from '../templates/footer.html'

export function Header() {
  setTimeout(() => {
    const header = document.getElementById('header-ui-adv')
    header.outerHTML = ADV_HEADER
  }, 1000)
}

export function Footer() {
  setTimeout(() => {
    const footer = document.getElementById('footer-ui-adv')
    footer.outerHTML = ADV_FOOTER
  }, 1000)
}
