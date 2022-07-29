//hamburger
const bars = document.querySelectorAll('div.bars')
const menu = document.querySelector('div.menu')

document
    .querySelector('div.close')
    .addEventListener('click', closeMenu)

function closeMenu() {
    bars.forEach((bar) => {
        bar.classList.remove('open')
    })
    menu.classList.remove('open')
}

document
    .querySelector('div.ham')
    .addEventListener('click', openMenu)

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
const addToCartBtn = document
    .querySelector('#add_to_cart_btn')
addToCartBtn
    .addEventListener('click', addToCart)

async function addToCart(e) {
    e.preventDefault()

    const productId = addToCartBtn
        .dataset
        .product
    const productPrice = addToCartBtn
        .dataset
        .price
    const colors = document
        .getElementsByName('color')
    let color


    for (let i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
            color = colors[i].value
        }
    }

    //cart = {items: {_id: {color, size, qty}}, _id: {color, size, qty}}, totalQty, totalPrice}

    const cart = window
        .localStorage
        .getItem('cart')
    let _cart = cart

    if (!cart || cart == null) {
        _cart = {
            items: {},
            totalQty: 0
        }
    }
    else {
        _cart = JSON
            .parse(cart)
    }

    if (document.querySelector('#size').value === '' || color === '' || color === undefined) {
        alert('please select a valid a color and size')
        return
    }

    if (!_cart.items[productId]) {
        _cart.items[productId] = {
            size: document
                .querySelector('#size')
                .value,
            color: color,
            qty: 1
        }
        _cart.totalQty += 1
    }
    else {
        _cart
            .items[productId]
            .qty += 1
        _cart
            .totalQty += 1
    }

    window
        .localStorage
        .setItem('cart', JSON.stringify(_cart))

    const cartCounter = document.querySelector('.cart_counter')

    if (cart) {
        let totalItems = JSON.parse(cart).totalQty
        cartCounter.innerText = totalItems + 1
    }
    else {
        cartCounter.innerText = 1
    }


    const successBadge = document
        .querySelector('.success_badge')
    successBadge
        .classList
        .add('show')

    setTimeout(() => {
        successBadge
            .classList
            .remove('show')
    }, 2500)
}

const descBadge = document.querySelector('.desc-badge')
descBadge.addEventListener('click', () => {
    const desc = document.querySelector('.desc')
    const descChev = document.querySelector('.desc_chev')
    desc.classList.toggle('open')
    descChev.classList.toggle('open')
})

const careBadge = document.querySelector('.care-badge')
careBadge.addEventListener('click', () => {
    const care = document.querySelector('.care')
    const careChev = document.querySelector('.care_chev')
    care.classList.toggle('open')
    careChev.classList.toggle('open')
})