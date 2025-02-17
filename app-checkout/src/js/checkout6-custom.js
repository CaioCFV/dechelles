$('[href*="checkout-custom.css"]').remove()
const toMoney = function (e) {
  return (parseInt(e).toFixed() * 0.01).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
}
const shareCart = function () {
  const buttonContinuarComprando = document.querySelector('.link-choose-more-products-wrapper')
  buttonContinuarComprando.insertAdjacentHTML(
    'beforeend',
    '\
		<div class="wrapper-copy">\
			<div class="wrapper-input">\
				<input type="text" class="copy-input" />\
				<button>Compartilhar carrinho</button>\
			</div>\
		</div>\
	'
  )
  vtexjs.checkout.getOrderForm().done(function (response) {
    const copyFieldElement = document.querySelector('.wrapper-copy .copy-input')
    const copyButtonElement = document.querySelector('.wrapper-copy button')
    copyFieldElement.value =
      'https://www.duloren.com.br/checkout/?orderFormId=' + response.orderFormId
    copyButtonElement.addEventListener('click', function () {
      copyFieldElement.focus()
      copyFieldElement.select()
      document.execCommand('copy')
      copyButtonElement.textContent = 'Copiado!'
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
const freeShipping = function () {
  const freeShipping = 20000
  const calc = function (value) {
    const calcPercent = 100 * (value / freeShipping)
    const rest = freeShipping - value
    const contains = freeShipping - rest
    if (calcPercent >= 100) {
      $('.free-shipping__text--success').show()
      $('.free-shipping__text--progress, .free-shipping__price').hide()
    } else {
      $('.free-shipping__text--success').hide()
      $('.free-shipping__text--progress, .free-shipping__price').show()
    }
    $('.free-shipping__price').text(calcPercent >= 100 ? '0' : toMoney(rest))
    $('.free-shipping__progress').text(toMoney(contains))
    $('.free-shipping__progress').css('width', calcPercent + '%')
  }
  $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    var totalizers = orderForm.totalizers.filter(function (item) {
      return item.name == 'Total dos Itens'
    })
    if (totalizers.length) {
      calc(totalizers[0].value)
    } else {
      calc(orderForm.value)
    }
  })
}
const sellerCode = function () {
  var vendedor = vendedor || {}
  vendedor.init = function () {
    vendedor.formAdd()
    vendedor.acao()
    vendedor.closeModal()
    vendedor.removeError()
    vendedor.checkVendedor()
    console.log('init')
  }
  vendedor.formAdd = function () {
    var sellerCode = `
        <div class="seller-code">
          <div class="seller-code-label">
            <label for="sellerCode">Código do vendedor</label>
          </div>
            <form action="" class="seller-code-form">
                <div class="seller-code-input">
                    <input type="text" name="sellerCode" id="sellerCode" placeholder="Código">
                    <button type="submit" id="seller-code-btn" class="btn">OK</button>
                </div>
                <div class="seller-code-result">
                    <div class="seller-code-result-name">
                    </div>
                    <button class="seller-code-result-fechar">
                        <i class="icon-close"></i>
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

    var url = '/universoenfim/dataentities/CV/'
    $.ajax({
      url: '/api/dataentities/VD/search?codigo=' + idConsulta + '&_fields=codigo,nome',
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      success: function (response) {
        if (response.length) {
          var nomeVendedor = response[0].nome
          var codigoVendedor = response[0].codigo
          if (idConsulta == codigoVendedor) {
            vtexjs.checkout.getOrderForm().then(function (orderForm) {
              var newMarketingData = orderForm.marketingData

              if (newMarketingData == null) {
                newMarketingData = {
                  utmiCampaign: 'descontovendedor'
                }
              } else {
                newMarketingData.utmiCampaign = 'descontovendedor'
              }
              vtexjs.checkout.sendAttachment('openTextField', {
                value: 'Vendedor - nome:' + nomeVendedor + ' / código: ' + codigoVendedor
              })
              vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
                localStorage.setItem('sellercode', JSON.stringify(response[0]))
                vendedor.showVendedor(codigoVendedor)
                $('.loading.loading-bg').css('display', 'none')
              })
            })
          }
        } else {
          vendedor.error()

          $('.loading.loading-bg').css('display', 'none')
        }
      },
      error: function (err) {
        vendedor.error()
        console.error('Erro:', err.responseText)
      }
    })
  }

  vendedor.showVendedor = function (codigo) {
    $('input#sellerCode').val(codigo)
    $('.seller-code-input').hide()
    $('.seller-code-result').css('display', 'inline-flex')
    $('.seller-code-result-name').html(codigo)
  }

  vendedor.removeVendedor = function () {
    $('.loading.loading-bg').css('display', 'block')
    $('.seller-code-input input').val('')
    $('.seller-code-result').hide()
    $('.seller-code-input').show()
    // Cookies.remove('cdv');
    vtexjs.checkout.getOrderForm().then(function (orderForm) {
      var newMarketingData = orderForm.marketingData
      const utmiEmptyMessage = 'Sem vendedor'

      newMarketingData.utmiCampaign = utmiEmptyMessage
      newMarketingData.utmiPart = utmiEmptyMessage

      vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
        localStorage.removeItem('sellercode')

        $('.loading.loading-bg').css('display', 'none')

        vtexjs.checkout.getOrderForm().then(function (orderForm) {
          return vtexjs.checkout.sendAttachment('openTextField', { value: null })
        })
      })
    })
  }

  vendedor.acao = function () {
    console.log('Ação')

    $(document).on('click', '#seller-code-btn', function (e) {
      e.preventDefault()

      var idConsulta = $(document).find('.seller-code-input input').val().toLowerCase()
      var origem = 'btn'

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

  vendedor.error = function () {
    $('.seller-code-form').append(
      '<span class="seller-code-error">Código inválido. Por favor, tente novamente.</span>'
    )
  }

  vendedor.removeError = function () {
    $('.seller-code-input input').on('focus', function () {
      $('.seller-code-error').remove()
      $('#seller-code-btn').removeAttr('disabled')
    })
  }

  vendedor.showModal = function () {
    var showModal =
      '<div class="seller-code-modal"><div class="seller-code-modal--content"><span>Com esse código VOCÊ GANHOU</span><p>FRETE GRÁTIS</p></div></div>'
    $('.seller-code').append(showModal)
    console.log('modal')

    setTimeout(function () {
      $('.seller-code-modal').remove().fadeIn()
      vtexjs.checkout.getOrderForm().done(function (orderForm) {
        var prodid = orderForm.items[0].id
        var prodqtd = orderForm.items[0].quantity
        var prodqseller = orderForm.items[0].seller
        var requestProduct =
          '/checkout/cart/add?sku=' +
          prodid +
          '&qty=' +
          prodqtd +
          '&seller=' +
          prodqseller +
          '&redirect=false&sc=1'
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
    var objVendedor = JSON.parse(localStorage.getItem('sellercode'))
    if (objVendedor) {
      vendedor.showVendedor(objVendedor.codigo)
    }
  }

  var checkelementsTimer = function () {
    $('.body-cart .checkout-container .cart-template .coupon-form .coupon-value')
      .attr('placeholder', 'Cupom')
      .attr('name', 'cart-coupon')

    // var subTotalHtml = '<div class="subtotal-price"><div class="subtotal-price-label"><span>Subtotal</span></div><div class="subtotal-price-value"></div></div>';
    // $('.body-cart .checkout-container .cart-template .summary').prepend(subTotalHtml);

    // var subTotal = $('.body-cart .checkout-container .cart-template .totalizers-list .monetary').html();
    // $('.subtotal-price-value').html(subTotal);

    var monetary = $('.link-choose-more-products').text().length > 0
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
    //syncronize
    const items = document.querySelectorAll('.available-gift-item')
    const target = document.querySelector('.cart-more-options .cart-select-gift-placeholder')
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        const dataItemIndex = item.getAttribute('data-item-index')
        target
          .querySelector('.available-gift-item[data-item-index="' + dataItemIndex + '"]')
          .click()
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
const emptyCart = function () {
  const emptyCartContainer = document.querySelector('.empty-cart-content[style="display: block;"]')
  if (emptyCartContainer) {
    document.querySelector('body').classList.add('emptycart')
  }
}
const disableDecementButton = function (orderForm) {
  orderForm.items.forEach(function (item) {
    if (item.quantity <= 1) {
      const productItem = document.querySelector('.product-item[data-sku="' + item.id + '"]')
      if (productItem) {
        productItem.classList.add('disablebtn')
      }
    }
  })
}
const resizeImage = function () {
  const productItem = document.querySelectorAll('.product-image img')
  productItem.forEach(function (item) {
    const src = item.getAttribute('src')
    if (window.innerWidth < 767) {
      const newSrc = src.replace('-55-55', '-150-190')
      item.setAttribute('src', newSrc)
    } else {
      const newSrc = src.replace('-55-55', '-70-90')
      item.setAttribute('src', newSrc)
    }
    item.classList.add('active')
  })
}
const dataLayerToDispatchEvents = setInterval(function () {
  const dataLayerCartLoaded = window.dataLayer.filter(function (item) {
    return item.event == 'gtm.load'
  })
  if (dataLayerCartLoaded.length) {
    setTimeout(function () {
      activeDiscountButton()
      setInterval(function () {
        resizeImage()
      }, 1000)
      // shareCart();
      changeSteps()
      // freeShipping();
      // giftPack();
      // copyProductGiftElement();
      emptyCart()
    }, 1000)
    clearInterval(dataLayerToDispatchEvents)
  }
}, 500)

$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
  emptyCart()
  setTimeout(function () {
    emptyCart()
  }, 1000)
})
