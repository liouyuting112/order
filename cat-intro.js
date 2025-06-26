const wrapper = document.getElementById("scroll-wrapper");

let isDown = false;
let startY;
let scrollTop;

wrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  wrapper.classList.add("active"); // 你可以用這個 class 來改變 cursor 樣式
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
  wrapper.scrollTop = scrollTop - deltaY * 1.5; // 拖動距離倍率可以調整
});
// 觸控裝置 - 右滑偵測
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 80) {
    // 右滑超過 80px，跳轉回首頁
    window.location.href = "index.html";
  }
});

// 滑鼠裝置 - 右滑偵測
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
// 點擊第一張卡片跳轉至 meowbu.html
document.addEventListener("DOMContentLoaded", () => {
  const meowbuCard = document.getElementById("card-meowbu");
  if (meowbuCard) {
    meowbuCard.addEventListener("click", () => {
      window.location.href = "meowbu.html";
    });
  }
});
