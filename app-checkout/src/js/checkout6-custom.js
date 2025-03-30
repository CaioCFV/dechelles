import { Header, Footer } from './templates-checkout'

Header()
Footer()

setInterval(function () {
  $('#payment-group-payMeePaymentGroup').children().html('Transferência Bancária')
}, 100)
$('[href*="checkout-custom.css"]').remove()
const emptyCart = function () {
  const emptyCartContainer = document.querySelector('.empty-cart-content[style="display: block;"]')
  if (emptyCartContainer) {
    document.querySelector('body').setAttribute('id', 'emptycart')
  } else {
    document.querySelector('body').setAttribute('id', '')
  }
}
const toMoney = function (e) {
  return (parseInt(e).toFixed() * 0.01).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
}
const shareCart = function () {
  const wrapperElement = $('.summary-totalizers')
  wrapperElement.prepend(`
        <style>
            .wrapper-input button{
                min-width: 82px;
            }
        </style>
        <div class="wrapper-copy">
            <p>Compartilhe a Sacola</p>
            <div class="wrapper-input">
                <input type="text" class="copy-input" />
                <button>Copiar</button>
            </div>
        </div>
    `)
  vtexjs.checkout.getOrderForm().done(function (response) {
    const copyFieldElement = document.querySelectorAll('.wrapper-copy .copy-input')
    const copyButtonElement = document.querySelectorAll('.wrapper-copy button')
    copyFieldElement.forEach(function (item) {
      item.value = `https://www.lennyniemeyer.com.br/checkout?orderFormId=${response.orderFormId}`
    })

    copyButtonElement.forEach(function (item) {
      item.addEventListener('click', function () {
        item.focus()
        item.previousElementSibling.select()
        document.execCommand('copy')
        item.textContent = 'Copiado!'
      })
    })
  })
}
const activeDiscountButton = function () {
  const buttonAddCoupon = document.querySelector('a#cart-link-coupon-add')
  if (buttonAddCoupon) {
    buttonAddCoupon.click()
  }
}
const changeSteps = function () {
  const stepsList = ['step-cart', 'step-email', 'step-profile', 'step-shipping', 'step-payment']
  const wrapperList = document.querySelector('body')
  const clearClass = function () {
    stepsList.forEach((item) => {
      wrapperList.classList.remove(item)
    })
  }
  clearClass()
  const change = function () {
    clearClass()
    const url = window.location.href
    switch (true) {
      case url.indexOf('#/cart') > 1:
        return wrapperList.classList.add(stepsList[0])
      case url.indexOf('#/email') > 1:
        return wrapperList.classList.add(stepsList[1])
      case url.indexOf('#/profile') > 1:
        return wrapperList.classList.add(stepsList[2])
      case url.indexOf('#/shipping') > 1:
        return wrapperList.classList.add(stepsList[3])
      case url.indexOf('#/payment') > 1:
        return wrapperList.classList.add(stepsList[4])
      default:
    }
  }
  window.onpopstate = function () {
    change()
  }
  change()
}
const sellerCode = function () {
  var vendedor = vendedor || {}
  vendedor.init = function () {
    vendedor.formAdd()
    vendedor.acao()
    vendedor.closeModal()
    vendedor.removeError()
    vendedor.checkVendedor()
  }
  vendedor.formAdd = function () {
    const sellerCode = `
        <div class="seller-code">
            <form action="" class="seller-code-form">
                <div class="seller-code-label">
                    <label for="sellerCode">Código da Vendedora</label>
                </div>
                <div class="seller-code-input">
                    <input type="text" name="sellerCode" id="sellerCode" placeholder="Código">
                    <button type="submit" id="seller-code-btn" class="btn">Aplicar</button>
                </div>
                <div class="seller-code-result">
                    <div class="seller-code-result-name">
                    </div>
                    <button class="seller-code-result-fechar">
                        excluir
                    </button>
                </div>
            </form>
        </div>`

    if (!$('.seller-code').length) {
      $(
        '.body-cart .checkout-container .cart-template .span5.totalizers.summary-totalizers.cart-totalizers.pull-right .coupon-column'
      ).prepend(sellerCode)
    }
  }
  vendedor.consulta = function (idConsulta, origem) {
    $('.loading.loading-bg').css('display', 'block')

    const url = '/api/dataentities/VD/'
    $.ajax({
      url: `${url}search?cod=${idConsulta}&_fields=ativo,name,cod`,
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      success(response) {
        if (response.length > 0 && response[0].ativo) {
          const nomeVendedor = response[0].name
          const codigoVendedor = response[0].cod.toLowerCase()
          if (idConsulta == codigoVendedor) {
            vtexjs.checkout.getOrderForm().then(function (orderForm) {
              let newMarketingData = orderForm.marketingData
              if (newMarketingData == null) {
                newMarketingData = {
                  utmiCampaign: 'vendedoraslny',
                  utmiPart: codigoVendedor
                }
              } else {
                newMarketingData.utmiCampaign = 'vendedoraslny'
                newMarketingData.utmiPart = codigoVendedor
              }

              vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
                localStorage.setItem('sellerInfo', JSON.stringify(response[0]))
                vendedor.showVendedor(nomeVendedor)
                $('.loading.loading-bg').css('display', 'none')
              })
            })
          }
        } else {
          vendedor.error(idConsulta)

          $('.loading.loading-bg').css('display', 'none')
        }
      },
      error(err) {
        vendedor.error(idConsulta)
        console.error('Erro:', err.responseText)
      }
    })
  }
  vendedor.showVendedor = function (nomeVendedor) {
    $('.seller-code-input').hide()
    $('.seller-code-result').css('display', 'inline-flex')
    $('.seller-code-result-name').html(nomeVendedor)
  }
  vendedor.removeVendedor = function () {
    $('.loading.loading-bg').css('display', 'block')
    $('.seller-code-input input').val('')
    $('.seller-code-result').hide()
    $('.seller-code-input').show()
    // Cookies.remove('cdv');
    vtexjs.checkout.getOrderForm().then(function (orderForm) {
      const newMarketingData = orderForm.marketingData
      const utmiEmptyMessage = 'Sem vendedor'

      newMarketingData.utmiCampaign = utmiEmptyMessage
      newMarketingData.utmiPart = utmiEmptyMessage

      vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
        localStorage.removeItem('sellerInfo')

        $('.loading.loading-bg').css('display', 'none')

        vtexjs.checkout.getOrderForm().then(function (orderForm) {
          return vtexjs.checkout.sendAttachment('openTextField', { value: null })
        })
      })
    })
  }
  vendedor.acao = function () {
    $(document).on('click', '#seller-code-btn', function (e) {
      e.preventDefault()

      const idConsulta = $(document).find('.seller-code-input input').val().toLowerCase()
      const origem = 'btn'

      if (idConsulta.length > 0) {
        vendedor.consulta(idConsulta, origem)
        $(document).find('.seller-code-error').remove()
      }

      return false
    })

    $(document).on('click', '.seller-code-result-fechar', function () {
      vendedor.removeVendedor()
      return false
    })
  }
  vendedor.error = function (cod) {
    alert('Código ' + cod + ' inválido')
    //$('.seller-code-form').append('<span class="seller-code-error">Código inválido. Por favor, tente novamente.</span>')
  }
  vendedor.removeError = function () {
    $('.seller-code-input input').on('focus', function () {
      $('.seller-code-error').remove()
      $('#seller-code-btn').removeAttr('disabled')
    })
  }
  vendedor.showModal = function () {
    const showModal =
      '<div class="seller-code-modal"><div class="seller-code-modal--content"><span>Com esse código VOCÊ GANHOU</span><p>FRETE GRÁTIS</p></div></div>'
    $('.seller-code').append(showModal)

    setTimeout(function () {
      $('.seller-code-modal').remove().fadeIn()
      vtexjs.checkout.getOrderForm().done(function (orderForm) {
        const prodid = orderForm.items[0].id
        const prodqtd = orderForm.items[0].quantity
        const prodqseller = orderForm.items[0].seller
        const requestProduct = `/checkout/cart/add?sku=${prodid}&qty=${prodqtd}&seller=${prodqseller}&redirect=false&sc=1`
        $.ajax(requestProduct).done(function (rest) {
          vtexjs.checkout.getOrderForm()
        })
      })
    }, 2200)
  }
  vendedor.closeModal = function () {
    $(document).on('click', function () {
      $('.seller-code-modal').remove().fadeIn()
    })
  }
  vendedor.checkVendedor = function () {
    if (
      vtexjs.checkout.orderForm.marketingData &&
      vtexjs.checkout.orderForm.marketingData.utmiCampaign == 'vendedoraslny'
    ) {
      vendedor.consulta(vtexjs.checkout.orderForm.marketingData.utmiPart)
    }
  }
  const checkelementsTimer = function () {
    $('.body-cart .checkout-container .cart-template .coupon-form .coupon-value')
      .attr('placeholder', 'Cupom')
      .attr('name', 'cart-coupon')

    const monetary = $('.link-choose-more-products').text().length > 0
    if (monetary) {
      clearInterval(checkElements)
    }
  }
  var checkElements = setInterval(function () {
    checkelementsTimer()
    vendedor.init()
  }, 1000)
}
const copyProductGiftElement = function () {
  const container = document.querySelector('.cart-template-holder')
  const productGift = document.querySelector('.cart-select-gift-placeholder')
  const attachListner = function () {
    // syncronize
    const items = document.querySelectorAll('.available-gift-item')
    const target = document.querySelector('.cart-more-options .cart-select-gift-placeholder')
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        const dataItemIndex = item.getAttribute('data-item-index')
        target.querySelector(`.available-gift-item[data-item-index="${dataItemIndex}"]`).click()
        setTimeout(function () {
          clone()
        }, 500)
      })
    })
  }
  const clone = function () {
    if (productGift) {
      const productGiftCopy = productGift.cloneNode(true)
      container.insertAdjacentHTML('beforeend', '<div class="product-gift"></div>')
      document.querySelector('.product-gift').innerHTML = productGiftCopy.innerHTML
      attachListner()
    }
  }
  clone()
}
const resizeImage = function () {
  const productItem = document.querySelectorAll('.product-image img')
  productItem.forEach(function (item) {
    const src = item.getAttribute('src')
    const newSrc = src.replace('-115-170', '-85-130')
    item.setAttribute('src', newSrc)
    item.classList.add('active')
  })
}
const dataLayerToDispatchEvents = setInterval(function () {
  const dataLayerCartLoaded = window.dataLayer.filter(function (item) {
    return item.event == 'cartLoaded'
  })
  if (dataLayerCartLoaded.length) {
    setTimeout(function () {
      shareCart()
      changeSteps()
      copyProductGiftElement()
      sellerCode()
      emptyCart()
    }, 2000)
    clearInterval(dataLayerToDispatchEvents)
  }
}, 500)
$(document).on('ajaxStop', function () {
  emptyCart()
  resizeImage()
})
$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
  emptyCart()
  setTimeout(function () {
    //disableDecementButton(orderForm);
  }, 1000)
})
