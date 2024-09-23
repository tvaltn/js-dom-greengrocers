const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const storeList = document.querySelector(".store--item-list")
const cartList = document.querySelector(".cart--item-list")
const totalNumber = document.querySelector(".total-number")

function renderStoreItems() {
  state.items.map((item) => {
    let li = renderStoreItem(item)
    storeList.appendChild(li)
  })
}

// Renders a store item from the state items list
function renderStoreItem(storeItem) {
  const li = document.createElement("li")
  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")
  const img = document.createElement("img")
  img.setAttribute("src", "assets/icons/" + storeItem.id + ".svg")
  img.setAttribute("alt", storeItem.name)

  const button = document.createElement("button")
  button.innerText = "Add to cart"
  button.addEventListener("click", () => {
    addItemToCart(storeItem)
  })

  div.appendChild(img)
  li.appendChild(div)
  li.appendChild(button)

  return li
}

function renderCartItems() {
  while (cartList.firstChild) cartList.removeChild(cartList.firstChild)

  totalNumber.textContent = "£0.00"
  let newTotal = 0

  state.cart.map((item) => {
    let li = renderCartItem(item)
    cartList.appendChild(li)
    newTotal += item.price * item.quantity
  })

  totalNumber.textContent = `£${newTotal.toFixed(2)}`
}

function addItemToCart(storeItem) {
  if (state.cart.includes(storeItem)) {
    increaseCartItem(storeItem)
  } else {
    storeItem.quantity = 1
    state.cart.push(storeItem)
    renderCartItems()
  }
}

function removeItemFromCart(storeItem) {
  const index = state.cart.indexOf(storeItem)
  if (index > -1) {
    state.cart.splice(index, 1)
    renderCartItems()
  }
}

function renderCartItem(storeItem) {
  const li = document.createElement("li")
  const img = document.createElement("img")
  img.setAttribute("class", "cart--item-icon")
  img.setAttribute("src", "assets/icons/" + storeItem.id + ".svg")
  img.setAttribute("alt", storeItem.name)

  const p = document.createElement("p")
  p.innerText = storeItem.name

  const buttonRemove = document.createElement("button")
  buttonRemove.setAttribute("class", "quantity-btn remove-btn center")
  buttonRemove.innerText = "-"
  buttonRemove.addEventListener("click", () => {
    decreaseCartItem(storeItem)
  })

  const span = document.createElement("span")
  span.setAttribute("class", "quantity-text center")
  span.innerText = storeItem.quantity

  const buttonAdd = document.createElement("button")
  buttonAdd.setAttribute("class", "quantity-btn add-btn center")
  buttonAdd.innerText = "+"
  buttonAdd.addEventListener("click", () => {
    increaseCartItem(storeItem)
  })

  li.appendChild(img)
  li.appendChild(p)
  li.appendChild(buttonRemove)
  li.appendChild(span)
  li.appendChild(buttonAdd)

  return li
}

function decreaseCartItem(storeItem) {
  storeItem.quantity -= 1
  if (storeItem.quantity <= 0) {
    removeItemFromCart(storeItem)
  }
  renderCartItems()
}

function increaseCartItem(storeItem) {
  storeItem.quantity += 1
  renderCartItems()
}

renderStoreItems()