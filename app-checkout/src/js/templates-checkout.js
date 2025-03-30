import ADV_HEADER from '../templates/header.html'
import ADV_FOOTER from '../templates/footer.html'

export function Header() {
  setTimeout(() => {
    const header = document.getElementById('header-checkout')
    header.innerHTML = ADV_HEADER

    console.log('HEADER')
  }, 1000)
}

export function Footer() {
  setTimeout(() => {
    const footer = document.getElementById('footer')
    footer.innerHTML = ADV_FOOTER
  }, 1000)
}
