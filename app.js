const product = [
  {
    image: "https://i.ibb.co/TP7Z9jp/2.jpg",
    name: "郭雪芙 One boy 衝鋒衣",
    count: 1,
    price: 3999
  },
  {
    image: "https://i.ibb.co/RPgZ8h1/image.jpg",
    name: "周曉涵 All in one 輕峰衣",
    count: 1,
    price: 1299
  },
  {
    image:
      "https://i.ibb.co/grs20PY/one-boy-1601450187-a71bfb76-progressive.jpg",
    name: "One boy 輕量防風薄衝鋒衣 ",
    count: 1,
    price: 2999
  }
];
const navIcon = document.querySelector(".hamburger-icon");
const menu = document.querySelector(".menu");
const subtotal = document.querySelector(".subtotal-number");
const render = document.querySelector(".render-box");
const btn = document.querySelector(".button-container");
const formParts = document.querySelectorAll(".billing-info");
const steps = document.querySelectorAll(".step");
const nextBtn = document.querySelector(".btn-primary");
const prevBtn = document.querySelector(".btn-outline");
const renderShipping = document.querySelector(".shipping-cost-number");
const partB = document.querySelector(".part-b");
let step = 0;
let shipCost = 0;

renderProduct(product);
renderShipCost();
totalPrice();

function renderProduct(item) {
  let content = "";

  for (i = 0; i < item.length; i = i + 1) {
    content += `<div class="product-item">
      <div class="product-photo">
        <img src="${item[i].image}" alt="">
      </div>
      <div class="product-info">
        <h5 class="item-name">${item[i].name}</h5>

        <div class="item-count"><i class="fas fa-plus-circle"></i> <span>${item[i].count}</span> <i class="fas fa-minus-circle"></i></div>
        <div class="item-price" data-price="${item[i].price}"> ${item[i].price}</div>
      </div>
    </div>`;
  }
  render.innerHTML = content;
}

function renderShipCost() {
  if (shipCost === 0) {
    renderShipping.innerHTML = "限時免費!";
  } else {
    renderShipping.innerHTML = `$ ${shipCost}`;
  }
}

function totalPrice() {
  let sum = 0;

  let subtotal = document.querySelector(".subtotal-number");

  let price = document.querySelectorAll(".item-price");

  for (i = 0; i < price.length; i = i + 1) {
    sum += parseInt(price[i].innerHTML);
  }

  sum += shipCost;

  subtotal.innerHTML = `$ ${sum}`;
}

function setBtnStyle() {
  if (step === 0) {
    prevBtn.classList.add("d-none");
    nextBtn.classList.add("active");
    btn.classList.add("active");
  } else {
    nextBtn.classList.remove("active");
    prevBtn.classList.remove("d-none");
    btn.classList.remove("active");
  }
  if (step === 2) {
    nextBtn.innerHTML = "確認下單";
  } else {
    nextBtn.innerHTML = "下一步 →";
  }
}

navIcon.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.toggle("active");
});

btn.addEventListener("click", function (event) {
  event.preventDefault();

  let nowStep = steps[step];

  if (
    event.target.classList.contains("btn-primary") &&
    event.target.innerHTML === "下一步 →"
  ) {
    let nextStep = steps[step + 1];

    nowStep.classList.remove("active");
    nowStep.classList.add("checked");
    nextStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step + 1].classList.toggle("d-none");
    step = step + 1;
  } else if (event.target.classList.contains("btn-outline")) {
    let prevStep = steps[step - 1];
    console.log(prevStep);
    nowStep.classList.remove("active");
    prevStep.classList.remove("checked");
    prevStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step - 1].classList.toggle("d-none");

    step = step - 1;
  }
  setBtnStyle();
});

render.addEventListener("click", function (event) {
  let target = event.target;

  if (
    target.classList.contains("fa-plus-circle") ||
    target.classList.contains("fa-minus-circle")
  ) {
    let countbox = target.parentElement.children[1];
    let pricebox = target.parentElement.nextElementSibling;
    let priceBase = parseInt(
      target.parentElement.nextElementSibling.dataset.price
    );

    let count = parseInt(countbox.innerHTML);
    let price = parseInt(pricebox.innerHTML);
    if (target.classList.contains("fa-plus-circle")) {
      count = count + 1;

      price = count * priceBase;
    } else if (target.classList.contains("fa-minus-circle")) {
      count = count - 1;

      price = count * priceBase;
    }

    if (count < 1) {
      target.parentElement.parentElement.parentElement.remove();
    }

    countbox.innerHTML = count;
    pricebox.innerHTML = price;
    totalPrice();
    if (document.querySelectorAll(".product-item").length === 0) {
      render.innerHTML = `<h1 class="empty-cart">Oops 您的購物車是空的!</h1>`;
    }
  }
});

partB.addEventListener("click", function (event) {
  let target = event.target;
  if (target.id === "shipping-standard" || target.id === "shipping-express") {
    shipCost = parseInt(target.value);

    totalPrice();
    renderShipCost();
  }
});
