document.addEventListener('DOMContentLoaded', function() {
    // WELCOME CONTENTS
    document.getElementById('welcomeTitle').innerHTML = "Welcome to Taylor Swift's Official Website";
    document.getElementById('welcomeText').innerHTML = "Explore the latest news, music, and events from Taylor Swift.";
});

//SIGNUP

function submitForm() {
    var honorific = document.getElementById("honorific").value;
    var firstname = document.getElementById("firstname").value.trim();
    var middlename = document.getElementById("middlename").value.trim();
    var lastname = document.getElementById("lastname").value.trim();
    var address = document.getElementById("address").value.trim();

    // VALIDATION
    if (!firstname || !lastname || !address) {
        alert('Please fill out all required fields (First Name, Last Name, Address) before submitting.');
        return;
    }
    
    // Format names to title case
    firstname = convertToTitleCase(firstname);
    middlename = middlename ? convertToTitleCase(middlename) : '';
    lastname = convertToTitleCase(lastname);
    address = convertToTitleCase(address);

    var output = document.getElementById("output");
    output.innerHTML = '<p style="font-size: 18px; color: #333; line-height: 1.6;">Welcome <strong>' + honorific + ' ' + 
        '<strong>' + firstname + '</strong> ' + 
        (middlename ? '<strong>' + middlename.charAt(0) + '. </strong>' : '') + 
        '<strong>' + lastname + '</strong>' + 
        '</strong>! Thank you for signing up from <strong>' + address + '</strong>. ' + 
        'We are thrilled to have you join the Taylor Swift community. Stay tuned for exciting updates on new albums, tours, exclusive merchandise, and more. ' + 
        'Keep an eye on your inbox for the latest news and offers tailored just for you. If you have any questions or need assistance, please do not hesitate to contact us. ' + 
        'Once again, welcome aboard, and we hope you enjoy the journey with us!</p>';
}

function convertToTitleCase(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}



/*PLAYLIST PAGE SCRIPT FUNCTIONS----------------------------*/

function goBack() {
    window.history.back();
}


function generatePlaylist() {

    const checkboxes = document.querySelectorAll('.playlist-form input[type="checkbox"]:checked');
    const selectedSongs = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (selectedSongs.length < 5) {
        alert('Please select at least 5 songs.');
        return;
    }

        // user iNFO POP UP FORM
        const userName = prompt('Please enter your name:');
        if (!userName) {
            alert('Please enter your name to continue.');
            return;
        }

    // Result container Display for Playlist on top 
    document.querySelector('.playlist-form').style.display = 'none';
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    resultContainer.style.display = 'block';
    resultContainer.style.padding = '20px';
    resultContainer.style.border = '1px solid #ccc';
    resultContainer.style.marginTop = '20px';
    resultContainer.style.position = 'relative'; 

    resultContainer.innerHTML = `
        <h3 style="font-size: 1.5em;">Your Taylor Swift Eras Tour Playlist</h3>
        <h4 style= margin-bottom: 10px;> ${userName}'s Version!</h4>
        <img class="overlay-img" src="eras.jpg" alt="Taylor Swift The Eras Tour" style="max-width: 100%; height: auto; margin-bottom: 10px; position: absolute; top: -20px; right: -20px; z-index: 1; transform: rotate(-10deg); border-radius: 10px;" />
        <ul style="list-style-type: none; padding: 0; margin-bottom: 10px;">${selectedSongs.map(song => `<li>${song}</li>`).join('')}</ul>
        <div class="result-buttons">
            <button style="padding: 10px 20px; margin-right: 10px;" onclick="saveToSpotify()">Save to Spotify</button>
            <button style="padding: 10px 20px;" onclick="saveToAppleMusic()">Save to Apple Music</button>
        </div>
        <button style="padding: 10px 20px; margin-top: 10px;" onclick="tryAgain()">Try Again</button>
    `;

    document.querySelector('.playlist-main').appendChild(resultContainer);
}

function saveToSpotify() {
    alert('Playlist saved to Spotify!'); 
}

function saveToAppleMusic() {
    alert('Playlist saved to Apple Music!'); 
}

function tryAgain() {
    document.querySelector('.result-container').remove();
    document.querySelector('.playlist-form').style.display = 'block';
}

// product pages---------------

function changeQuantity(amount) {
    let quantityElement = document.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity + amount > 0) {
        quantityElement.textContent = currentQuantity + amount;
    }
}

function addToCart(productName) {
    alert('Product added to cart: ' + productName);
}


document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-button');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});


// CART FUNCTION ----------------------

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('cart.html')) {
        displayCart();
    }

    const quantityButtons = document.querySelectorAll('.quantity-button');
    let quantity = 1;

    quantityButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '+') {
                changeQuantity(1);
            } else {
                changeQuantity(-1);
            }
        });
    });

    function changeQuantity(delta) {
        quantity += delta;
        if (quantity < 1) quantity = 1;
        document.querySelector('.quantity').textContent = quantity;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = button.getAttribute('data-product-price');

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = { id: productId, name: productName, price: productPrice, quantity: quantity };

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        });
    });

    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.getElementById('cart-total-price');

        cartList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <div class="cart-item-details">
                    <p>${product.name} - Quantity: ${product.quantity}</p>
                    <p>Price: ${product.price}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="delete-cart-item" onclick="deleteCartItem(${index})">Delete</button>
                </div>
            `;
            cartList.appendChild(productElement);
            totalPrice += parseFloat(product.price) * product.quantity;
        });

        cartTotalPrice.textContent = totalPrice.toFixed(2);
    }

    window.deleteCartItem = function(index) {
        if (confirm('Are you sure you want to delete this item from your cart?')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart(); 
        }
    }
});
