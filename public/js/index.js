import axios from 'axios'

//hamburger
const bars = document.querySelectorAll('div.bars')
const menu = document.querySelector('div.menu')
const closeButton = document.querySelector('div.close')

if (closeButton) closeButton.addEventListener('click', closeMenu)

function closeMenu() {
    bars.forEach((bar) => {
        bar.classList.remove('open')
    })
    menu.classList.remove('open')
}

const ham = document.querySelector('div.ham')
if (ham) ham.addEventListener('click', openMenu)

function openMenu() {
    bars.forEach((bar) => {
        bar
            .classList
            .add('open')
    })
    menu
        .classList
        .add('open')
}

//utils
function redirect(dest) {
    window
        .location
        .href('/')
}

//product slideshow
const slides = document
    .querySelectorAll('.slide-img')
const main_image = document
    .querySelector('.main_image')

slides.forEach((slide) => {

    slide.addEventListener('click', () => {

        let secSrc = slide.getAttribute('src')
        main_image
            .setAttribute('src', secSrc)
    })
})

//add to cart
const addToCartBtn = document.querySelector('#add_to_cart_btn')

if (addToCartBtn) addToCartBtn.addEventListener('click', addToCart)

async function addToCart(e) {
    e.preventDefault()

    const productId = addToCartBtn.dataset.product
    const colors = document.getElementsByName('color')
    const size = document.querySelector('#size')
    let color

    for (let i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
            color = colors[i].value
        }
    }

    if (size.value === '' || color === '' || color === undefined) {
        alert('please select a valid a color and size')
        return
    }

    this.classList.add('show_loading')
    this.disabled = true
    try {
        await axios.post('/cart', { cart: { _id: productId, color, size: size.value } })
        const cartCounter = document.querySelector('.cart_counter')
        const successBadge = document.querySelector('.success_badge')
        successBadge.classList.add('show')
        this.classList.remove('show_loading')
        this.disabled = false

        setTimeout(() => {
            successBadge
                .classList
                .remove('show')
        }, 2500)

    } catch (error) {
        console.log(error);
        const errorBadge = document.querySelector('.error_badge')
        errorBadge.classList.add('show')
        this.classList.remove('show_loading')
        this.disabled = false

        setTimeout(() => {
            errorBadge
                .classList
                .remove('show')
        }, 2500)
    }
}

//product page
const descBadge = document.querySelector('.desc-badge')
if (descBadge) descBadge.addEventListener('click', () => {
    const desc = document.querySelector('.desc')
    const descChev = document.querySelector('.desc_chev')
    desc.classList.toggle('open')
    descChev.classList.toggle('open')
})

const careBadge = document.querySelector('.care-badge')
if (careBadge) careBadge.addEventListener('click', () => {
    const care = document.querySelector('.care')
    const careChev = document.querySelector('.care_chev')
    care.classList.toggle('open')
    careChev.classList.toggle('open')
})

const continueTPaymentBtn = document.querySelector("#continue_to_payment_btn")
continueTPaymentBtn.addEventListener('click', continueToPayment)

function continueToPayment(e) {
    e.preventDefault()
    const form = document.querySelector('#address_form')
    let formData = new FormData(form)
    let formObject = {}

    for (let [key, value] of formData.entries()) {
        if (value === "") {
            alert(`Please add a valid ${key}`)
            return
        }
        formObject[key] = value
    }
    if (!Object.keys(formObject).length) {
        return
    }
    const address = `${formObject.addressLine1}, ${formObject.addressLine2}, ${formObject.landmark}, ${formObject.state}-${formObject.pin}, ${formObject.country}`
    const customerName = formObject.name
    const customerTel = formObject.tel

    window.localStorage.setItem('address', JSON.stringify({ address, customerName, customerTel }))
    alert('added')
}
