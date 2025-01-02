let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");
let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});

listProductHTML.addEventListener("click", (e) => {
    if (e.target.classList.contains("addCart")) {
        let product_id = e.target.parentElement.dataset.id;
        addToCart(product_id);
    }
});

listCartHTML.addEventListener("click", (e) => {
    if (e.target.classList.contains("minus") || e.target.classList.contains("plus")) {
        let product_id = e.target.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (e.target.classList.contains("plus")) {
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
});

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex(cart => cart.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity++;
                break;
            case 'minus':
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                }
                else {
                    carts.splice(positionItemInCart, 1);
                }
                break;

            default:
                break;
        }
    }
    saveData();
    addcartToHTML();
}

const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src=${product.image} alt="product">
                <h2>${product.name}</h2>
                <div class="price">₹${product.price}</div>
                <button class="addCart">Add to Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
}

const saveData = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
}

const addcartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement("div");
            newCart.classList.add("item");
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex(product => product.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                    <div class="image">
                        <img src=${info.image} alt="product">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">₹${info.price * cart.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">></span>
                    </div>
            `;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
    saveData();
}

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex(cart => cart.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }
    else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }
    else {
        carts[positionThisProductInCart].quantity++;
    }
    addcartToHTML();
}

const initApp = () => {
    // Get data from json
    fetch("products.json").
        then(response => response.json()).
        then(data => {
            listProducts = data;
            console.log(listProducts);
            addDataToHTML();
            if (localStorage.getItem("cart")) {
                carts = JSON.parse(localStorage.getItem("cart"));
                addcartToHTML();
            }
        });
}

initApp();