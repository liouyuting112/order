document.addEventListener("DOMContentLoaded", () => {
  // 保留貓咪卡片滑動功能
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

  // 初始化 Swiper 飲料卡片滑動功能
  new Swiper(".coffee-swiper", {
  initialSlide: 1, // 👈 這裡設定為第 2 張卡片（從 0 開始算）
  slidesPerView: "auto",
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
});
