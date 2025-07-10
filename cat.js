document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("bottom-scroll-wrapper");

  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false; // 新增判斷是否真的拖動過

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    isDragging = false;
    wrapper.classList.add("active");
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  document.addEventListener("mouseup", () => {
    if (isDown && isDragging) {
      // 拖曳結束，對齊到最近卡片
      const panelWidth = 375 + 18; // 卡片寬 + 間距
      const index = Math.round(wrapper.scrollLeft / panelWidth);
      wrapper.scrollTo({
        left: panelWidth * index,
        behavior: "smooth"
      });
    }
    isDown = false;
    wrapper.classList.remove("active");
  });

  wrapper.addEventListener("mouseleave", () => {
    if (isDown && isDragging) {
      const panelWidth = 375 + 18;
      const index = Math.round(wrapper.scrollLeft / panelWidth);
      wrapper.scrollTo({
        left: panelWidth * index,
        behavior: "smooth"
      });
    }
    isDown = false;
    wrapper.classList.remove("active");
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.2; // 調小倍率，讓滑動感更自然

    // 判斷是否真的拖動（避免點擊也觸發）
    if (Math.abs(walk) > 5) {
      isDragging = true;
      e.preventDefault();
      wrapper.scrollLeft = scrollLeft - walk;
    }
  });
});

