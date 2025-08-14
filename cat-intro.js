const wrapper = document.getElementById("scroll-wrapper");

let isDown = false;
let startY;
let scrollTop;
let wasDragging = false;

// 🟡 滑鼠拖曳垂直捲動
wrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  wasDragging = false;
  wrapper.classList.add("active");
  startY = e.pageY;
  scrollTop = wrapper.scrollTop;
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
  const deltaY = e.pageY - startY;
  if (Math.abs(deltaY) > 5) {
    wasDragging = true;
  }
  wrapper.scrollTop = scrollTop - deltaY * 1.5;
});

// 🟡 觸控右滑返回首頁
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 80) {
    window.location.href = "index.html";
  }
});

// 🟡 滑鼠右滑返回首頁
let mouseStartX = 0;
let mouseEndX = 0;
let isMouseDown = false;

document.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  mouseStartX = e.pageX;
});

document.addEventListener("mouseup", function (e) {
  if (!isMouseDown) return;
  isMouseDown = false;
  mouseEndX = e.pageX;
  if (mouseEndX - mouseStartX > 80) {
    window.location.href = "index.html";
  }
});

// 🟡 卡片點擊跳轉（含防止拖動誤觸）
const cardToPageMap = {
  "card-meowbu": "meowbu.html",
  "card-kity": "kity.html",
  "card-jimu": "jimu.html",
  "card-captain": "captain.html",
  "card-shasha": "shasha.html",
};

wrapper.addEventListener("click", function (e) {
  if (wasDragging) return; // 拖曳時不觸發點擊跳轉

  const card = e.target.closest(".cat-card-intro");
  if (!card) return;

  const page = cardToPageMap[card.id];
  if (page) {
    window.location.href = page;
  }
});
