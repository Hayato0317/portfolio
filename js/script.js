// ハンバーガーメニュー
(function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('main-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // リンクをタップしたら閉じる
    nav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
})();

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

  // 送信結果をURLパラメータから取得して表示
  const params = new URLSearchParams(window.location.search);
  const errorMsg = params.get('error');
  const sent = params.get('sent');
  const formError = document.getElementById('form-error');
  if (formError) {
    if (sent === '1') {
      formError.style.color = '#4dff88';
      formError.textContent = 'メッセージを送信しました。ありがとうございます！';
    } else if (errorMsg) {
      formError.textContent = errorMsg;
    }
  }
});

// スムーズスクロール
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

// コンタクトフォームのクライアントサイドバリデーション
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const formError = document.getElementById('form-error');
        const errors = [];

        if (!name) errors.push('お名前を入力してください。');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('有効なメールアドレスを入力してください。');
        }
        if (!subject) errors.push('件名を入力してください。');
        if (!message) errors.push('メッセージを入力してください。');

        if (errors.length > 0) {
            e.preventDefault();
            formError.style.color = '#ff4d4d';
            formError.textContent = errors.join(' ');
            formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            formError.textContent = '';
        }
    });
}
