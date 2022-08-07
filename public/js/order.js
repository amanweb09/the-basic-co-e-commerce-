const existingAddressContainer = document.getElementById('existing_address_container')
const address = window.localStorage.getItem('address')
existingAddressContainer.innerText = JSON.parse(address).address

const addNewAddressBtn = document.getElementById('add_new_address_btn')
addNewAddressBtn.addEventListener('click', () => {
    const paymentForm = document.querySelector('#address_form')
    paymentForm.classList.add('open')
})

if (window.localStorage.getItem('address')) {
    const localAddressContainer = document.getElementById('local_address_container')
    localAddressContainer.style.display = 'flex'
}

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
    const addressStr = `${formObject.addressLine1}, ${formObject.addressLine2}, ${formObject.landmark}, ${formObject.state}-${formObject.pin}, ${formObject.country}`
    const address = {
        addressLine1: formObject.addressLine1,
        addressLine2: formObject.addressLine2,
        landmark: formObject.landmark,
        state: formObject.state,
        pin: formObject.pin,
        country: formObject.country,
    }
    const customerName = formObject.name
    const customerTel = formObject.tel

    const localAddress = window.localStorage.getItem('address')
    // if (!localAddress || localAddress === '' || localAddress == null) {
    window.localStorage.setItem('address', JSON.stringify({
        addressObj: JSON.stringify(address),
        address: addressStr,
        customerName,
        customerTel
    }))
    // }

    form.submit()
}


const useThisAddressBtn = document.getElementById('use_this_address_btn')
if (useThisAddressBtn) useThisAddressBtn.addEventListener('click', async function (e) {
    e.preventDefault()

    const local_form = document.getElementById('existing_address_form')

    if (!address || address === '' || address == undefined) {
        alert('Please Try Adding a New Address')
        return
    }

    const addressObj = JSON.parse(address).addressObj
    const name = JSON.parse(address).customerName
    const tel = JSON.parse(address).customerTel

    function createInput(name, value) {
        const input = document.createElement('input')
        input.value = value
        input.name = name
        input.type = 'hidden'
        local_form.appendChild(input)
    }
    createInput('name', name)
    createInput('tel', tel)
    createInput('addressString', addressObj)

    local_form.submit()
})

function showOverlay() {
    const codOrderOverlay = document.getElementById('cod_order_placement_overlay')
    codOrderOverlay.classList.add('open')
}
// const submitOrderBtn = document.getElementById('order_submit_btn')
// submitOrderBtn.addEventListener('click', (e) => {
//     e.preventDefault()
//     const addressObj = window.localStorage.getItem('addressObj') || ''
//     const addressInput = document.getElementById('address_hidden')
//     const paymentForm = document.getElementById('cod_order_placement_form')

//     addressInput.value = addressObj

//     paymentForm.submit()
// })

document.getElementById('order_cancel_btn').addEventListener('click', closeOrder)
function closeOrder(e) {
    e.preventDefault()

    const codOrderOverlay = document.getElementById('cod_order_placement_overlay')
    codOrderOverlay.classList.remove('open')

}
// const codBtn = document.getElementById('cod_option_btn')
// codBtn.onclick = function() {
//     alert('clicked')
// }
