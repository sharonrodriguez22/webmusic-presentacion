
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const total = slides.length;
  const $progress = document.getElementById("progressFill");
  const $counter = document.getElementById("slideCounter");
  const $prev = document.getElementById("prevBtn");
  const $next = document.getElementById("nextBtn");
  let current = 0;

  const goTo = (i) => {
    if (i < 0 || i >= total) return;
    slides[current].classList.remove("active");
    current = i;
    slides[current].classList.add("active");
    $progress.style.width = `${((current + 1) / total) * 100}%`;
    $counter.textContent = `${current + 1} / ${total}`;
  };

  $prev.addEventListener("click", () => goTo(current - 1));
  $next.addEventListener("click", () => goTo(current + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goTo(current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
    if (e.key === "Home") { e.preventDefault(); goTo(0); }
    if (e.key === "End") { e.preventDefault(); goTo(total - 1); }
  });

  let touchStartX = 0;
  document.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
  document.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); }
  });

  goTo(0);
});
