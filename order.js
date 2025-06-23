document.addEventListener("DOMContentLoaded", () => {
  // ↓↓↓ 保留貓咪卡片滑動功能 ↓↓↓
  const wrapper = document.getElementById("scroll-wrapper");
  const track = document.getElementById("scroll-track");

  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    wrapper.classList.add("active");
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("mouseleave", () => {
    isDown = false;
    wrapper.classList.remove("active");
  });

  wrapper.addEventListener("mouseup", () => {
    isDown = false;
    wrapper.classList.remove("active");
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // ↓↓↓ 飲料卡輪播功能 ↓↓↓
  const coffeeCards = Array.from(document.querySelectorAll('.coffee-combo'));

  let positions = ['left', 'center', 'right'];

  function updatePositions() {
    coffeeCards.forEach((card, i) => {
      card.classList.remove('coffee-side');
      card.style.zIndex = '5';
      card.style.pointerEvents = 'none';

      if (positions[i] === 'center') {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.transform = 'scale(0.87)';
        card.style.opacity = '0.5';
      }
    });
  }

  // 初始化位置
  updatePositions();

  // 加點擊事件到每張卡片
  coffeeCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const currentCenter = positions.indexOf('center');

      if (index === (currentCenter + 1) % 3) {
        // 點到右邊卡片 → 循環右移
        positions.unshift(positions.pop());
      } else if (index === (currentCenter + 2) % 3) {
        // 點到左邊卡片 → 循環左移
        positions.push(positions.shift());
      }

      updatePositions();
    });
  });
});