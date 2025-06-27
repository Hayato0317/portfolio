window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  const scrollDown = document.getElementById('scroll-down');
  const body = document.body;

  // 3秒ローディング
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      scrollDown.style.display = 'block';

      // スクロールイベントを監視
      let revealed = false;
      function revealOnScroll() {
        if (!revealed && window.scrollY > 100) {
          body.classList.add('show-content');
          scrollDown.style.display = 'none';
          revealed = true;
          window.removeEventListener('scroll', revealOnScroll);
        }
      }
      window.addEventListener('scroll', revealOnScroll, { passive: true });
    }, 600);
  }, 3000);
});

document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
