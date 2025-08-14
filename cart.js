document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartContainer = document.getElementById('cart-container');
  const totalPriceEl = document.querySelector('.drink-total-price'); // 取得顯示總價元素
  const threshold = 50;
  const maxSlide = 106;

  let isDown = false;
  let startY;
  let scrollTop;

  cartContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startY = e.pageY;
  scrollTop = cartContainer.scrollTop;
  cartContainer.classList.add('active');
  });
  cartContainer.addEventListener('mouseleave', () => {
  isDown = false;
  cartContainer.classList.remove('active');
  });

  cartContainer.addEventListener('mouseup', () => {
  isDown = false;
  cartContainer.classList.remove('active');
  });

  cartContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const deltaY = e.pageY - startY;
  cartContainer.scrollTop = scrollTop - deltaY * 1.5;
  });


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
  let dragStarted = false; // 是否真正開始拖曳
  const threshold = 50;
  const maxSlide = 106;

  // 判斷是否禁止拖曳（點擊加減按鈕或垃圾桶區）
  function isDragForbidden(target) {
    return (
      target.closest('.plus-btn') ||
      target.closest('.minus-btn') ||
      target.closest('.left-slide-box') ||
      target.closest('.garbage-icon')
    );
  }

  // Touch Events
  card.addEventListener('touchstart', e => {
    if (isDragForbidden(e.target)) return;
    startX = e.touches[0].clientX;
    dragging = true;
    dragStarted = false;
    card.style.transition = 'none';
  });

  card.addEventListener('touchmove', e => {
    if (!dragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (!dragStarted && Math.abs(deltaX) > 5) {
      dragStarted = true;
    }

    if (dragStarted) {
      if (deltaX < 0 && deltaX >= -maxSlide) {
        card.style.transform = `translateX(${deltaX}px)`;
      }
      e.preventDefault(); // 防止頁面滾動
    }
  });

  card.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;

    if (!dragStarted) {
      // 沒有拖曳，恢復初始位置
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'translateX(0)';
      card.classList.remove('slid-left');
      return;
    }

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
    if (isDragForbidden(e.target)) return;
    startX = e.clientX;
    dragging = true;
    dragStarted = false;
    card.style.transition = 'none';
    e.preventDefault();
  });

  card.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentX = e.clientX;
    const deltaX = currentX - startX;

    if (!dragStarted && Math.abs(deltaX) > 5) {
      dragStarted = true;
    }

    if (dragStarted) {
      if (deltaX < 0 && deltaX >= -maxSlide) {
        card.style.transform = `translateX(${deltaX}px)`;
      }
      e.preventDefault();
    }
  });

  card.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;

    if (!dragStarted) {
      // 沒有拖曳，恢復初始位置
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'translateX(0)';
      card.classList.remove('slid-left');
      return;
    }

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

  // 鼠標離開時取消拖曳，避免滑出範圍拖曳未結束
  card.addEventListener('mouseleave', () => {
    if (!dragging) return;
    dragging = false;

    if (!dragStarted) {
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'translateX(0)';
      card.classList.remove('slid-left');
      return;
    }

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
  deleteBtn.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    card.classList.add('removing');
    setTimeout(() => {
      card.remove();
      cartItems = cartItems.filter(ci => ci.name !== item.name);
      updateLocalStorage();
    }, 300);
  });

  const deleteArea = card.querySelector('.left-slide-box');
  deleteArea.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    card.classList.add('removing');
    setTimeout(() => {
      card.remove();
      cartItems = cartItems.filter(ci => ci.name !== item.name);
      updateLocalStorage();
    }, 300);
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
document.querySelector('.back-arrow').addEventListener('click', () => {
  const previousPage = localStorage.getItem('previousPage') || 'menu.html';
  window.location.href = previousPage;
});