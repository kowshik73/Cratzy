/* =================================
   CARTZY JAVASCRIPT
================================= */

let cart = [];

let currentCategory = "all";


/* =================================
   MOBILE MENU
================================= */

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    navbar.classList.toggle("show");

}


/* Close mobile menu after clicking link */

document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function() {

        document.getElementById("navbar").classList.remove("show");

    });

});


/* =================================
   LOGIN / SIGNUP
================================= */

function openLogin() {

    document.getElementById("login-modal").style.display = "flex";

}


function openSignup() {

    document.getElementById("signup-modal").style.display = "flex";

}


function closeModal(id) {

    document.getElementById(id).style.display = "none";

}


function switchToSignup() {

    closeModal("login-modal");

    openSignup();

}


function switchToLogin() {

    closeModal("signup-modal");

    openLogin();

}


/* =================================
   SIGNUP
================================= */

function signup(event) {

    event.preventDefault();

    const name =
        document.getElementById("signup-name").value.trim();

    const email =
        document.getElementById("signup-email").value.trim();

    const password =
        document.getElementById("signup-password").value;


    const user = {

        name: name,
        email: email,
        password: password

    };


    localStorage.setItem(
        "cartzyUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully! You can now login."
    );


    closeModal("signup-modal");


    document.getElementById("signup-name").value = "";

    document.getElementById("signup-email").value = "";

    document.getElementById("signup-password").value = "";

}


/* =================================
   LOGIN
================================= */

function login(event) {

    event.preventDefault();


    const email =
        document.getElementById("login-email").value.trim();

    const password =
        document.getElementById("login-password").value;


    const savedUser =
        localStorage.getItem("cartzyUser");


    if (!savedUser) {

        alert(
            "No Cartzy account found. Please sign up first."
        );

        return;
    }


    const user = JSON.parse(savedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        alert(
            "Login successful! Welcome, " +
            user.name +
            "!"
        );


        closeModal("login-modal");


        document.getElementById("login-email").value = "";

        document.getElementById("login-password").value = "";


    } else {

        alert("Invalid email or password.");

    }

}


/* =================================
   PRODUCT SEARCH
================================= */

function searchProducts() {

    const searchText =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product-card");


    let visibleProducts = 0;


    products.forEach(function(product) {

        const productName =
            product
                .getAttribute("data-name")
                .toLowerCase();


        const productCategory =
            product
                .getAttribute("data-category");


        const matchesSearch =
            productName.includes(searchText);


        const matchesCategory =
            currentCategory === "all" ||
            productCategory === currentCategory;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    const noProducts =
        document.getElementById("no-products");


    if (visibleProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}


/* =================================
   PRODUCT CATEGORY FILTER
================================= */

function filterProducts(category) {

    currentCategory = category;


    const categoryButtons =
        document.querySelectorAll(".category");


    categoryButtons.forEach(function(button) {

        button.classList.remove("active");

    });


    categoryButtons.forEach(function(button) {

        const buttonText =
            button.textContent
                .trim()
                .toLowerCase();


        if (
            (category === "all" && buttonText === "all") ||
            buttonText === category
        ) {

            button.classList.add("active");

        }

    });


    searchProducts();

}


/* =================================
   ADD TO CART
================================= */

function addToCart(name, price) {

    const existingProduct =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();


    alert(
        name + " has been added to your cart!"
    );

}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    const totalItemsElement =
        document.getElementById("cart-total-items");


    let totalItems = 0;

    let totalPrice = 0;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒 Your cart is empty.
                <br>
                Add some products to get started!
            </div>
        `;

    }


    cart.forEach(function(item, index) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${index}, -1)"
                    aria-label="Decrease quantity"
                >
                    −
                </button>


                <strong>
                    ${item.quantity}
                </strong>


                <button
                    onclick="changeQuantity(${index}, 1)"
                    aria-label="Increase quantity"
                >
                    +
                </button>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                    aria-label="Remove product"
                >
                    ✕
                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    cartCount.textContent = totalItems;

    totalItemsElement.textContent = totalItems;

    cartTotal.textContent =
        totalPrice.toLocaleString("en-IN");

}


/* =================================
   CHANGE QUANTITY
================================= */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =================================
   REMOVE FROM CART
================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =================================
   OPEN CART
================================= */

function openCart() {

    updateCart();

    document.getElementById("cart-modal").style.display = "flex";

}


/* =================================
   CHECKOUT
================================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert(
        "Thank you for shopping with Cartzy! " +
        "Your order has been placed successfully."
    );


    cart = [];


    updateCart();


    closeModal("cart-modal");

}


/* =================================
   CONTACT FORM
================================= */

function sendMessage(event) {

    event.preventDefault();


    const name =
        document.getElementById("contact-name").value;


    alert(
        "Thank you, " +
        name +
        "! Your message has been received."
    );


    document.querySelector(".contact-form").reset();

}


/* =================================
   CLOSE MODALS
   WHEN CLICKING OUTSIDE
================================= */

window.addEventListener("click", function(event) {

    const modals =
        document.querySelectorAll(".modal");


    modals.forEach(function(modal) {

        if (event.target === modal) {

            modal.style.display = "none";

        }

    });

});


/* =================================
   ESC KEY CLOSES MODALS
================================= */

window.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".modal")
            .forEach(function(modal) {

                modal.style.display = "none";

            });

    }

});


/* =================================
   INITIAL CART
================================= */

updateCart();
