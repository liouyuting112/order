document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartContainer = document.getElementById('cart-container');
  const totalPriceEl = document.querySelector('.drink-total-price'); // 取得顯示總價元素
  const threshold = 50;
  const maxSlide = 106;

  cartItems.forEach(item => {
    const card = createProductCard(item);
    cartContainer.appendChild(card);
    attachCardEvents(card, item);
  });
  
  // 初始化時計算一次總價
  updateTotalPrice();

function updateTotalPrice() {
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }
  totalPriceEl.textContent = `NT$${total}`;
}


function createProductCard(item) {
  const card = document.createElement('div');
  card.className = 'product-card';

  // 判斷描述顯示內容
  let descText = '';
  if (item.ice !== undefined && item.sweetness !== undefined) {
    descText = `Ice：${item.ice}｜Sweetness：${item.sweetness}`;
  } else if (item.descCart) {
    descText = item.descCart;
  } else {
    descText = '';
  }

  card.innerHTML = `
    <div class="left-slide-box">
      <img src="images/garbage.png" alt="Garbage" class="garbage-icon" />
    </div>
    <img class="product-img" src="${item.imgCart}" alt="${item.name}" />
    <div class="product-info">
      <div class="product-top-row">
        <div class="product-name">${item.name}</div>
        <div class="product-price">NT$<span class="price-value">${item.price * item.quantity}</span></div>
      </div>
      <div class="product-desc">${descText}</div>
      <div class="quantity-control">
        <img src="images/Plus01.png" alt="Plus" class="plus-btn" />
        <div class="quantity-number">${item.quantity}</div>
        <img src="images/Minus01.png" alt="Minus" class="minus-btn" />
      </div>
    </div>
  `;
  return card;
}

  function attachCardEvents(card, item) {
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    // Touch Events
    card.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      dragging = true;
      card.style.transition = 'none';
    });

    card.addEventListener('touchmove', e => {
      if (!dragging) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      if (deltaX < 0 && deltaX >= -maxSlide) {
        card.style.transform = `translateX(${deltaX}px)`;
      }
    });

    card.addEventListener('touchend', () => {
      dragging = false;
      const deltaX = currentX - startX;
      card.style.transition = 'transform 0.3s ease';
      if (deltaX <= -threshold) {
        card.style.transform = `translateX(${-maxSlide}px)`;
        card.classList.add('slid-left');
      } else {
        card.style.transform = 'translateX(0)';
        card.classList.remove('slid-left');
      }
    });

    // Mouse Events
    card.addEventListener('mousedown', e => {
      if (e.target.closest('.plus-btn') || e.target.closest('.minus-btn')) return;
      startX = e.clientX;
      dragging = true;
      card.style.transition = 'none';
      e.preventDefault();
    });

    // 綁定事件到 card，並設定只作用於該卡片
    card.addEventListener('mousemove', e => {
      if (!dragging) return;
      currentX = e.clientX;
      const deltaX = currentX - startX;
      if (deltaX < 0 && deltaX >= -maxSlide) {
        card.style.transform = `translateX(${deltaX}px)`;
      }
    });

    card.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      const deltaX = currentX - startX;
      card.style.transition = 'transform 0.3s ease';
      if (deltaX <= -threshold) {
        card.style.transform = `translateX(${-maxSlide}px)`;
        card.classList.add('slid-left');
      } else {
        card.style.transform = 'translateX(0)';
        card.classList.remove('slid-left');
      }
    });

    // 垃圾桶刪除
    const deleteBtn = card.querySelector('.garbage-icon');
    deleteBtn.addEventListener('click', () => {
  card.classList.add('removing'); // CSS 動畫 class
  setTimeout(() => {
    card.remove();
    cartItems = cartItems.filter(ci => ci.name !== item.name);
    updateLocalStorage();  // 這裡改成呼叫 updateLocalStorage()，裡面會更新localStorage和總價
  }, 300);
});

const deleteArea = card.querySelector('.left-slide-box');
deleteArea.addEventListener('click', (e) => {
  e.stopPropagation();
  e.preventDefault();
  card.remove();
  cartItems = cartItems.filter(ci => ci.name !== item.name);
  updateLocalStorage(); // 同樣改成呼叫 updateLocalStorage()
});
    // 數量控制
    const plusBtn = card.querySelector('.plus-btn');
    const minusBtn = card.querySelector('.minus-btn');
    const numberElem = card.querySelector('.quantity-number');
    const priceElem = card.querySelector('.price-value'); // 顯示價格的 span

    plusBtn.addEventListener('click', () => {
  let count = parseInt(numberElem.textContent);
  count++;
  numberElem.textContent = count;
  item.quantity = count;
  priceElem.textContent = item.price * count;
  console.log('plus click, update total price');
  updateLocalStorage();
});

minusBtn.addEventListener('click', () => {
  let count = parseInt(numberElem.textContent);
  if (count > 1) {
    count--;
    numberElem.textContent = count;
    item.quantity = count;
    priceElem.textContent = item.price * count;
    console.log('minus click, update total price');
    updateLocalStorage();
  } else {
    card.remove();
    cartItems = cartItems.filter(ci => ci.name !== item.name);
    updateLocalStorage();
  }
});

   function updateLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateTotalPrice();
}
  }
});
