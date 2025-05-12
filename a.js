let menuJson = []
document
  .querySelectorAll('.dechelles-commercegrowth-custom-0-x-menu__item')
  .forEach(function (item) {
    const menu = {}
    menu.__editorItemTitle = item.querySelector('a').textContent
    menu.href = item.querySelector('a').getAttribute('href')

    menu.columns = []
    item
      .querySelectorAll(
        '.dechelles-commercegrowth-custom-0-x-menu__item__submenu__links li'
      )
      .forEach(function (subitem) {
        const submenu = {}
        console.log(subitem.classList.contains('title'))
        if (
          subitem.classList.contains(
            'dechelles-commercegrowth-custom-0-x-menu__item__submenu__title'
          )
        ) {
          submenu.__editorItemTitle = subitem.textContent
          submenu.isTitle = true
        } else {
          console.log(subitem)
          submenu.__editorItemTitle = subitem.querySelector('a').textContent
          submenu.href = subitem.querySelector('a').getAttribute('href')
        }
        menu.columns.push(submenu)
      })

    menuJson.push(menu)
  })

document.querySelector('body').innerHTML = JSON.stringify(menuJson)
