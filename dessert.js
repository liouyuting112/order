// 購物袋圖示跳轉到 cart.html
document.querySelector('.bag-icon').addEventListener('click', () => {
  window.location.href = 'cart.html';
});
document.addEventListener("DOMContentLoaded", () => {
  const cardToPageMap = {
    "card-meowbu": "meowbu.html",
    "card-kity": "kity.html",
    "card-jimu": "jimu.html",
    "card-captain": "captain.html",
    "card-shasha": "shasha.html",
  };

  const wrapper = document.getElementById("scroll-wrapper");

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let wasDragging = false;
  let dragStarted = false;

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    wasDragging = false;
    dragStarted = false;
    wrapper.classList.add("active");
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  function stopDrag() {
    if (!isDown) return;
    isDown = false;
    wrapper.classList.remove("active");
    setTimeout(() => {
      wasDragging = false;
      dragStarted = false;
    }, 100);
  }

  wrapper.addEventListener("mouseleave", stopDrag);
  wrapper.addEventListener("mouseup", stopDrag);

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const deltaX = x - startX;

    // 超過門檻才開始拖動且改變 scrollLeft
    if (!dragStarted && Math.abs(deltaX) > 5) {
      dragStarted = true;
      wasDragging = true;
    }

    if (dragStarted) {
      wrapper.scrollLeft = scrollLeft - deltaX * 1.5;
    }
  });

  wrapper.addEventListener("click", (e) => {
    if (wasDragging) {
      e.preventDefault();
      return;
    }
    const card = e.target.closest(".cat-card-intro");
    if (!card) return;
    const page = cardToPageMap[card.id];
    if (page) {
      window.location.href = page;
    }
  });
});

  // 初始化 Swiper 飲料卡片滑動功能
  new Swiper(".coffee-swiper", {
  slidesPerView: "auto",
  initialSlide: 1, // 👈 這裡設定為第 2 張卡片（從 0 開始算）
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  on: {
    init() {
      setActiveSlideEffect();
    },
    slideChangeTransitionStart() {
      setActiveSlideEffect();
    }
  }
});



function setActiveSlideEffect() {
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide) => {
    slide.style.transform = "scale(0.87)";
    slide.style.opacity = "0.3";
    slide.style.zIndex = "1";
  });

  const active = document.querySelector(".swiper-slide-active");
  if (active) {
    active.style.transform = "scale(1)";
    active.style.opacity = "1";
    active.style.zIndex = "10";

    // 置中處理（以 375px 寬計算）
    const containerWidth = 375;
    const slideWidth = 197;
    const offset = (containerWidth - slideWidth) / 2;
    document.querySelector(".coffee-swiper .swiper-wrapper").style.transform = `translateX(-${active.offsetLeft - offset}px)`;
  }
}
 document.querySelectorAll('.coffee-combo').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('drink-panel').classList.add('active');
    });
  });

const panel = document.getElementById('drink-panel');
const coffeeTitleImg = panel.querySelector('.coffee-title-img');
const priceBlock = panel.querySelector('.price');
const descBlock = panel.querySelector('.drink-desc');

const coffeeLabelText = panel.querySelector('.coffee-label-text');
const coffeeLabelBg = panel.querySelector('.coffee-label-bg');
// 點擊卡片：開啟面板並更新內容
document.querySelectorAll(".coffee-combo").forEach(card => {
  card.addEventListener("click", () => {
    const titleImg = card.getAttribute('data-title-img');
    const price = card.getAttribute('data-price');
    const desc = card.getAttribute('data-desc');
    const label = card.getAttribute('data-label');
    const labelWidth = card.getAttribute('data-label-width');
    const labelRight = card.getAttribute('data-label-right');
    const labelLeft = card.getAttribute('data-label-left');
    const labelFontSize = card.getAttribute('data-label-font-size');
    const priceLeft = card.getAttribute('data-price-left');

    // 基本內容設定
    if (titleImg && coffeeTitleImg) coffeeTitleImg.src = titleImg;
    if (price && priceBlock) priceBlock.innerText = `NT$${price}`;
    if (desc && descBlock) descBlock.innerText = desc;
    if (label && coffeeLabelText) coffeeLabelText.innerText = label;
    if (labelFontSize && coffeeLabelText) {
      coffeeLabelText.style.fontSize = labelFontSize;
    } else if (coffeeLabelText) {
      coffeeLabelText.style.fontSize = '';
    }
    // 背景寬度設定
    if (labelWidth && coffeeLabelBg) coffeeLabelBg.style.width = labelWidth;
    else if (coffeeLabelBg) coffeeLabelBg.style.width = ''; // 還原預設

    // 文字位置設定（靠左）
    if (labelLeft && coffeeLabelText) {
      coffeeLabelText.style.textAlign = 'left';
      coffeeLabelText.style.marginLeft = labelLeft;
    } else if (coffeeLabelText) {
      coffeeLabelText.style.textAlign = '';
      coffeeLabelText.style.marginLeft = '';
    }

if (price && priceBlock) {
  priceBlock.innerText = `NT$${price}`;
  priceBlock.style.marginLeft = priceLeft ?? ''; // 空字串為重設
}
    // 開啟面板
    panel.classList.add("active");

  });
});
// ESC 鍵關閉面板
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    panel.classList.remove('active');
    panel.style.transform = '';
  }
});

// 點擊白底外的區域關閉
document.addEventListener('click', (e) => {
  if (
    panel.classList.contains('active') &&
    !panel.contains(e.target) &&
    !e.target.closest('.coffee-combo')
  ) {
    panel.classList.remove('active');
    panel.style.transform = '';
  }
});

// 拖曳相關變數
let startY = 0;
let currentY = 0;
let deltaY = 0;
let isDragging = false;

// 手機觸控拖曳
panel.addEventListener('touchstart', (e) => {
  if (!panel.classList.contains('active')) return;
  startY = e.touches[0].clientY;
  isDragging = true;
  panel.style.transition = 'none';
});

panel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentY = e.touches[0].clientY;
  deltaY = currentY - startY;
  if (deltaY > 0) {
    panel.style.transform = `translateY(${deltaY}px)`;
  }
});

panel.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  panel.style.transition = 'transform 0.3s ease';
  if (deltaY > 60) {
    panel.classList.remove('active');
    panel.style.transform = '';
  } else {
    panel.style.transform = 'translateY(0)';
  }
});

// 滑鼠拖曳
panel.addEventListener('mousedown', (e) => {
  if (!panel.classList.contains('active')) return;
  startY = e.clientY;
  isDragging = true;
  panel.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentY = e.clientY;
  deltaY = currentY - startY;
  if (deltaY > 0) {
    panel.style.transform = `translateY(${deltaY}px)`;
  }
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  panel.style.transition = 'transform 0.3s ease';
  if (deltaY > 60) {
    panel.classList.remove('active');
    panel.style.transform = '';
  } else {
    panel.style.transform = 'translateY(0)';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('drink-panel');
  const countButtons = document.querySelectorAll('.count-button');
  const amountNumber = document.querySelector('.amount-number');
  const addToBtn = document.querySelector('.add-to-bag');

  let count = parseInt(amountNumber.textContent, 10) || 1;

  // 數量加減按鈕
  countButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (idx === 0) {
        count++;
      } else if (idx === 1 && count > 1) {
        count--;
      }
      amountNumber.textContent = count;
    });
  });

  // 🔧 工具：取得購物車小圖
  function getCartImage(name) {
    switch (name.toUpperCase()) {
      case 'MEOWCARONT': return 'images/meowcarontcart.png';
      case 'PAWCOOKIE': return 'images/pawcookiecart.png';
      case 'BROWNIE': return 'images/browniecart.png';
      default: return 'images/defaultcart.png';
    }
  }

  // ✅ 加入購物車按鈕
  addToBtn?.addEventListener('click', () => {
  if (!panel.classList.contains('active')) return;
  const label = panel.querySelector('.coffee-label-text')?.textContent.trim() || 'MATCHA';
  const activeCard = document.querySelector(`.coffee-combo[data-label="${label}"]`);
  const cartName = activeCard?.getAttribute('data-cart') || label;
  const descCart = activeCard?.getAttribute('data-desc-cart') || '';
  const quantity = parseInt(panel.querySelector('.amount-number')?.textContent, 10) || 1;
  const priceText = panel.querySelector('.price')?.textContent.replace('NT$', '') || '120';

  const item = {
    name: cartName,
    price: parseInt(priceText, 10),
    descCart: descCart,
    quantity: quantity,
    imgCart: getCartImage(label),
  };

  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existing = cart.find(i => i.name === item.name && i.price === item.price);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem('cartItems', JSON.stringify(cart));

  alert(`${item.name} x${item.quantity} 已加入購物車！`);
  slideDownAndClosePanel();
  console.log(`已加入 ${item.name} x${item.quantity} 到購物車`);
});
  // 🔧 面板動畫關閉函式
  function slideDownAndClosePanel() {
    panel.style.transition = 'none';
    panel.style.transform = 'translateY(0)';
    panel.style.opacity = '1';

    // 強制重繪
    panel.offsetHeight;

    panel.style.transition = 'transform 0.2s ease, opacity 0.2s ease 0.1s';
    panel.style.transform = 'translateY(150px)';
    panel.style.opacity = '0';

    panel.addEventListener('transitionend', function handler() {
      panel.classList.remove('active');
      panel.style.transform = '';
      panel.style.opacity = '';
      panel.style.transition = '';
      panel.removeEventListener('transitionend', handler);
    }, { once: true });
  }
});
