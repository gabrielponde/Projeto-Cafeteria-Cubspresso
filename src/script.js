let quantity = 1;
let cartCount = sessionStorage.getItem("cartCount") ? parseInt(sessionStorage.getItem("cartCount")) : 0;

function increaseQuantity() {
    quantity++;
    document.getElementById("quantity").innerText = quantity;
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById("quantity").innerText = quantity;
    }
}

function addToCart() {
    cartCount += quantity;
    
    const itemText = quantity > 1 ? "itens" : "item";
    alert(quantity + " " + itemText + " adicionado(s) ao carrinho!");

    const cartCounter = document.getElementById("cartCounter");
    cartCounter.innerText = cartCount;

    if (cartCount > 0) {
        cartCounter.style.display = "flex";
    } else {
        cartCounter.style.display = "none";
    }

    sessionStorage.setItem("cartCount", cartCount);
}

window.onload = function() {
    const cartCounter = document.getElementById("cartCounter");
    if (cartCount > 0) {
        cartCounter.style.display = "flex";
        cartCounter.innerText = cartCount;
    } else {
        cartCounter.style.display = "none";
    }
}
