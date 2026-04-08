// PRODUCTOS
const products = [
  { id: 1, title: "Street Runner - Modelo 1", price: 79.99, img: "assets/images/model1.jpg" },
  { id: 2, title: "Street Runner - Modelo 2", price: 99.99, img: "assets/images/model2.jpg" },
  { id: 3, title: "Street Runner - Modelo 3", price: 119.99, img: "assets/images/model3.jpg" }
];

let cart = [];
const cartCountEl = document.getElementById("cart-count");

// RENDER PRODUCTOS
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button class="buy" data-id="${p.id}">Comprar</button>
    `;
    list.appendChild(card);
  });

  document.querySelectorAll(".buy").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      const product = products.find((p) => p.id === id);
      addToCart(product);
    })
  );
}

// AÑADIR AL CARRITO
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartCount();
  openCart();
  renderCart();
}

// CONTADOR
function updateCartCount() {
  const total = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCountEl.textContent = total;
}

// RENDER CARRITO
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.img}">
      <div class="cart-item-info">
        <strong>${item.title}</strong><br>
        $${item.price.toFixed(2)}
      </div>

      <div class="cart-item-controls">
        <button class="cart-btn-small" onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.qty}</span>
        <button class="cart-btn-small" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;

    container.appendChild(div);
  });

  updateTotal();
}

// CAMBIAR CANTIDAD
function changeQty(id, amount) {
  const item = cart.find((p) => p.id === id);

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  renderCart();
  updateCartCount();
}

// TOTAL
function updateTotal() {
  const total = cart.reduce((acc, p) => acc + p.qty * p.price, 0);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// MODAL
const modal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const buyBtn = document.getElementById("buy-btn");

function openCart() {
  modal.style.display = "block";
}

closeCartBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// SIMULAR COMPRA
buyBtn.onclick = () => {
  alert("Compra simulada exitosamente 🎉");
  cart = [];
  renderCart();
  updateCartCount();
  modal.style.display = "none";
};

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  // Abrir carrito desde el botón del nav
  document.getElementById("cart-btn").addEventListener("click", openCart);
});
