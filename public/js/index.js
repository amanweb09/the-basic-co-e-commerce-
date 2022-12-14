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

const shippingSelectBox = document.getElementById('shipping')
shippingSelectBox.addEventListener('change', async (e) => {

    const shippingOption = e.target.value

    try {
        await axios.post('/cart/shipping', { type: shippingOption })
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
})

const removeProductButton = document.querySelectorAll('.remove_product_btn')
removeProductButton.forEach((btn) => {
    btn.addEventListener('click', sendProductDeleteRequest)
})

async function sendProductDeleteRequest() {

    const confirmation = confirm('Are You Sure You Want to Delete This Product?')

    if (!confirmation) { return }

    const size = this.dataset.size
    const color = this.dataset.color
    const _id = this.dataset._id
    const qty = this.dataset.qty

    try {
        await axios.post('/cart/remove', { _id, color, size, qty })
        window.location.reload()

    } catch (error) {
        console.log(error.response.data);
    }
}

const proceedToCheckoutBtn = document.querySelector('button.proceed_to_checkout')
proceedToCheckoutBtn.addEventListener('click', () => window.location.href = '/checkout')

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

async function applyPromoCode() {
    const codeInput = document.getElementById('promo_code_input')

    if (codeInput.value === '') {
        alert('Please Enter a Valid Code1')
        return
    }
    try {
        const { data } = await axios.post('/promo/apply', { code: codeInput.value })
        console.log(data.message);
    } catch (error) {
        console.log(error.response.data.err);
    }
}

const removePromoBtn = document.getElementById('remove_promo_btn')
removePromoBtn.onclick = removePromo

async function removePromo() {
    try {
        await axios.post('/promo/delete')
        window.location.reload()
    } catch (error) {
        console.log(error.response);
        alert('Something went wrong!')
    }
}

const decrementBtn = document.querySelectorAll('button.decrement_btn')
const incrementBtn = document.querySelectorAll('button.increment_btn')

decrementBtn.forEach((btn) => {
    decrementBtn.addEventListener('click', () => { updateProductQty('decrement') })
})
incrementBtn.forEach((btn) => {
    incrementBtn.addEventListener('click', () => { updateProductQty('increment') })
})

async function updateProductQty(type) {

    const size = this.dataset.size
    const color = this.dataset.color
    const _id = this.dataset._id

    try {
        await axios.post(`/cart/qty/${type}`, { _id, color, size })
        window.location.reload()

    } catch (error) {
        console.log(error.response.data);
    }
}
// async function changeQty(type, _id, color, size) {
//     try {
//         await axios.post(`/cart/qty/${type}`, { _id, color, size })
//         window.location.reload()
//     } catch (error) {
//         console.log(error);
//         alert(error.response.data.err)
//     }
// }
// const pid = document.getElementById('hidden_product_id')
// const color = document.getElementById('hidden_product_color')
// const size = document.getElementById('hidden_product_size')
// decrementBtn.onclick = () => {changeQty('decrement', pid.value, color.value, size.value)}
// incrementBtn.onclick = () => {changeQty('increment', pid.value, color.value, size.value)}