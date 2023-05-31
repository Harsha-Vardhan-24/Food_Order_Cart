// Importing menu items from data.js
import { menuArray } from "./data.js"

const menuList = document.getElementById("menu-list")
const addItem = document.getElementById("add-item")
const cart = document.getElementById("cart")
const addCart = document.getElementById("add-items")
const totalCartPrice = document.getElementById("cart-price")
const submitBtn = document.getElementById("submit-btn")
const orderDetails = document.getElementById("order-details")
const formData = document.getElementById("order-btn")
const thankYouMsg = document.getElementById("thank-you-msg")

let targetId = ""
let removeId = ""
let targetItem = ""
let orderName = ""
let cartPrice = 0
let cartItems = []
let itemsInCart = false

// Pushing data into HTML.
function render() {
    menuArray.forEach(function(menuItem){    
        menuList.innerHTML += `
            <div class="menu-container">
                <h1 class="no-margin emoji">${menuItem.emoji}</h1>
                <div class="item-info">
                    <h1 class="no-margin item-name">${menuItem.name}</h1>
                    <p class="no-margin item-description">${menuItem.ingredients}</p>
                    <h1 class="no-margin item-price">\$${menuItem.price}</h1>
                </div>
                <div>
                    <button id="add-item" class="add-item-btn" data-item-id="${menuItem.id}">+</button>
                </div>
            </div>
        `
    })
}

render()

// Checking which element got clicked and getting the ID for the item.

document.addEventListener("click", function(e) {
    if (e.target.dataset.itemId) {
        targetId = e.target.dataset.itemId    
        getItem(targetId)
        // renderCart()
    }
    
    if (e.target.dataset.removeItemId) {
        removeId = e.target.dataset.removeItemId
        removeItem(removeId)
    }
    
    if(e.target.id === "order-btn") {
        orderDetails.style.display = "flex"
    }
    
    if (e.target.id === "submit-btn") {
        handleForm(e)
    }
    
})

// Gets the exact item and stores in a variable

function getItem(targetID) {
    
    targetItem = menuArray.filter(function(menuItem){
        return targetID == menuItem.id
    })
    
    renderCart(targetID, targetItem)
    
    cartPrice += targetItem[0].price
}

// This code is to run the cart functionality.

function renderCart(targetID, targetItem) {
    
    itemsInCart = !itemsInCart
    
        if(itemsInCart) {
            cart.style.display = "block"
            itemsInCart = !itemsInCart
        }
    
    
    if(cartItems.length === 0){
        
        cartItems.unshift({
            name: targetItem[0].name,
            price: targetItem[0].price,
            id: targetID
        })
        
    } else {
            let alreadyInCart = ""
            
            cartItems.forEach(function(item) {
                alreadyInCart = cartItems.some(function(item) {
                    return item.id === targetID;
                })
            })
            
            if (!alreadyInCart) {
                    cartItems.unshift({
                    name: targetItem[0].name,
                    price: targetItem[0].price,
                    id: targetID
                })
            }
    }
    
    addItemsToCart()
    
}

// This function is to add the items into the cart.

function addItemsToCart() {
    
    addCart.innerHTML = ""
    
    cartItems.forEach(function(item) {
        addCart.innerHTML += `
            <div class="cart-price">
                <p class="no-margin cart-item">${item.name} <button class="item-remove-btn" data-remove-item-id="${item.id}">remove</button></p>
                <p class="no-margin cart-item-price">\$${item.price}</p>
            </div>
        `
    })
    
    updateCartPrice()
    
}

// Removes items inside of the cart when the remove button is clicked.

function removeItem(removeId) {
    let removeItemFromCart = cartItems.filter(function (item) {
        if(removeId !== item.id) {
            return item
        }
    })
    cartItems = removeItemFromCart
    addItemsToCart()
    updateCartPrice()
}

// Updating the cart price.

function updateCartPrice() {
    cartPrice = 0
    cartItems.forEach(function(item) {
        cartPrice += item.price
    })
    
    totalCartPrice.textContent = cartPrice
    
    // This line of code to not show the cart if the total price is 0.
    if(cartPrice === 0) {
        cart.style.display = "none"
    }
}

// To handle the form submit and get the data from the from.
function handleForm(e) {
    
    if(orderDetails.checkValidity()) {
        e.preventDefault()
        const orderEl = new FormData(orderDetails)
        const userName = orderEl.get("user-name")
        orderName = userName
        orderDetails.reset()
        orderDetails.style.display = "none"
        cart.style.display = "none"
        goodBye()
    }
}

// To render the message
function goodBye() {
    thankYouMsg.innerHTML = `
        <h1>Thanks, ${orderName}! Your order is on its way!</h1>
    `
    thankYouMsg.style.display = "block"
}