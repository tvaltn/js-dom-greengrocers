const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.15,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.25,
      type: "vegetable"
    }
  ],
  cart: [],
  filter: "all",
  sort: "id"
};

const storeList = document.querySelector(".store--item-list")
const cartList = document.querySelector(".cart--item-list")
const totalNumber = document.querySelector(".total-number")

// -------- STORE -----------
function renderStoreItems() {
  while (storeList.firstChild) storeList.removeChild(storeList.firstChild)

  if (state.sort === "id") state.items.sort((a, b) => a.id.localeCompare(b.id))
  if (state.sort === "price") state.items.sort((a, b) => a.price - b.price)
  if (state.sort === "name") state.items.sort((a, b) => a.name.localeCompare(b.name))

  state.items.map((item) => {
    if (item.type === state.filter || state.filter === "all") {
      let li = renderStoreItem(item)
      storeList.appendChild(li)
    }
  })
}

// Renders a store item from the state items list
function renderStoreItem(storeItem) {
  const li = document.createElement("li")
  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")
  const img = document.createElement("img")
  if ("imgurl" in storeItem) {
    img.setAttribute("src", storeItem.imgurl)
  } else {
    img.setAttribute("src", "assets/icons/" + storeItem.id + ".svg")
  }
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

function filterButtons() {
  const filterBtns = document.querySelector(".filter-btns")

  const allButton = document.createElement("button")
  allButton.innerText = "All"
  allButton.addEventListener("click", () => {
    state.filter = "all"
    renderStoreItems()
  })

  const fruitButton = document.createElement("button")
  fruitButton.innerText = "Fruits"
  fruitButton.addEventListener("click", () => {
    state.filter = "fruit"
    renderStoreItems()
  })

  const vegetableButton = document.createElement("button")
  vegetableButton.innerText = "Vegetables"
  vegetableButton.addEventListener("click", () => {
    state.filter = "vegetable"
    renderStoreItems()
  })

  filterBtns.appendChild(allButton)
  filterBtns.appendChild(fruitButton)
  filterBtns.appendChild(vegetableButton)
}

function sortButtons() {
  const sortBtns = document.querySelector(".sort-btns")

  const regularSort = document.createElement("button")
  regularSort.innerText = "Regular Sort"
  regularSort.addEventListener("click", () => {
    state.sort = "id"
    renderStoreItems()
  })

  const priceSort = document.createElement("button")
  priceSort.innerText = "Price Sort"
  priceSort.addEventListener("click", () => {
    state.sort = "price"
    renderStoreItems()
  })

  const nameSort = document.createElement("button")
  nameSort.innerText = "Name Sort"
  nameSort.addEventListener("click", () => {
    state.sort = "name"
    renderStoreItems()
  })

  sortBtns.appendChild(regularSort)
  sortBtns.appendChild(priceSort)
  sortBtns.appendChild(nameSort)
}

function submitNewItemButton() {
  const submitButton = document.getElementById("create-item-button")
  submitButton.addEventListener("click", () => {
    createNewItem()
  })
}

function createNewItem() {
  const namee = document.getElementById("create-item-name").value
  const price = parseFloat(document.getElementById("create-item-price").value)
  const type = document.getElementById("create-item-type").value
  const imgurl = document.getElementById("create-item-imgurl").value

  if (namee && price && type && imgurl) {
    const item = 
    {
      id: "0" + state.items.length + "-" + namee,
      name: namee,
      price: price,
      type: type,
      imgurl: imgurl
    }
    state.items.push(item)
    renderStoreItems()
  }
}


// -------- CART -----------
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
  if ("imgurl" in storeItem) {
    img.setAttribute("src", storeItem.imgurl)
  } else {
    img.setAttribute("src", "assets/icons/" + storeItem.id + ".svg")
  }
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
filterButtons()
sortButtons()
submitNewItemButton()