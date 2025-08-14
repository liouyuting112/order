const logo = document.getElementById("logo");
const splash = document.getElementById("splash");
const catIntro = document.getElementById("catIntro");
const topPanel = document.getElementById("topPanel");

window.addEventListener("load", () => {
  // Splash 出現
  logo.classList.add("appear");

  // 出現後縮小至原比例
  setTimeout(() => {
    logo.classList.add("settle");
  }, 750);

  // 轉場到第二畫面
  setTimeout(() => {
    splash.classList.add("hidden");
    catIntro.classList.add("visible");
  }, 1450);
});

// 點擊上方 Order 區塊切換頁面
topPanel.addEventListener("click", () => {
  window.location.href = "order.html"; // 替換為你的實際頁面名稱
});

const infoBox = document.getElementById('infoBox');

infoBox.style.cursor = 'pointer';  // 滑鼠移過去有手指效果

infoBox.addEventListener('click', () => {
  window.location.href = 'cat-intro.html';  // 改成你要跳轉的檔名
});

