document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.features-track');
  const prevBtn = document.getElementById('prevFeatureBtn');
  const nextBtn = document.getElementById('nextFeatureBtn');
  const visibleCount = 3;
  const itemWidth = 330;

  if (!track || !prevBtn || !nextBtn) return;

  let isAnimating = false;

  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;

    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${itemWidth * visibleCount}px)`;

    setTimeout(() => {
      for (let i = 0; i < visibleCount; i++) {
        const first = track.firstElementChild;
        if (first) track.appendChild(first);
      }
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      void track.offsetWidth;
      isAnimating = false;
    }, 500);
  }

  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;

    for (let i = 0; i < visibleCount; i++) {
      const last = track.lastElementChild;
      if (last) track.insertBefore(last, track.firstElementChild);
    }

    track.style.transition = 'none';
    track.style.transform = `translateX(-${itemWidth * visibleCount}px)`;
    void track.offsetWidth;

    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(0)';

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);
});
