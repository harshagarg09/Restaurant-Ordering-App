import { menuArray } from './data'

const menu = document.getElementById('menu')
const modal = document.getElementById('payment-modal')
const form = document.getElementById('form')

let order = []

function getMenuItemsHtml() {
    return menuArray.map(menuItem => (
        `
        <div class="menu-item">
                <p class="img-item">${menuItem.emoji}</p>
                <div>
                    <p class="menu-item-name">${menuItem.name}</p>
                    <p class="menu-item-desc">${menuItem.ingredients}</p>
                    <p class="menu-item-price">$${menuItem.price}</p>
                </div>
                <button class="add-item" data-item-id=${menuItem.id}>+</button>
        </div>
        `
    )).join('')
}


menu.innerHTML = getMenuItemsHtml()

document.getElementById("menu").addEventListener('click', function(e) {
    let itemId = e.target.dataset.itemId
    if (itemId) {
        const menuItem = menuArray.filter(item => item.id == itemId)[0]
        order.push(menuItem)
        renderOrder()
    } 
})

function renderOrder() {
    
    document.getElementById("order-successful").style.display = 'none'
    
    let total = 0
    let orderEle = document.getElementById('order')
    if(order.length == 0) {
        orderEle.style.display = 'none'
        return
    } else {
        orderEle.style.display = 'block'
        let orderHtml = order.map(item => {
        
        total += item.price
        
        return (
        `
        <div class="order-detail">
            <p class="order-item-name">${item.name}</p>
            <button class="remove-item" data-remove-item-id=${item.id}>REMOVE</button>
            <p class="order-item-price">$${item.price}</p>
        </div>
        `
        )}).join('')
        
        document.getElementById('order-details').innerHTML = orderHtml
        document.getElementById('order-item-price').textContent = `$${total}`
    }
    
}

document.getElementById("order").addEventListener('click', function(e) {
    let itemId = e.target.dataset.removeItemId
    if (itemId) {
        const newOrder = order.filter(item => item.id != itemId)
        order = newOrder
        renderOrder()
    } 
})

document.getElementById("complete-order-btn").addEventListener('click', function() {
    console.log("Modal display")
    modal.style.display = 'block'
})

form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log("Form submitted")
    const formData = new FormData(form)
    const name = formData.get("customerName")
    renderAck(name)
})

function renderAck(name) {
    console.log(name)
    modal.style.display = 'none'
    document.getElementById("display-msg").textContent = `Thanks, ${name}! Your order is on its way!`
    document.getElementById("order-successful").style.display = 'block'
    document.getElementById('order').style.display = 'none'
    order = []
}