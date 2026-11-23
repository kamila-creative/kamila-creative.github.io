// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
});

links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  })
);

// Email button: copy the address too, since mailto does nothing without a mail app
const emailBtn = document.getElementById('emailBtn');
if (emailBtn) {
  const showCopied = () => {
    emailBtn.textContent = 'Email copied ✓';
    setTimeout(() => { emailBtn.textContent = 'Email me →'; }, 2500);
  };
  const fallbackCopy = (text) => {
    const t = document.createElement('textarea');
    t.value = text;
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    try { if (document.execCommand('copy')) showCopied(); } catch (e) {}
    t.remove();
  };
  emailBtn.addEventListener('click', () => {
    const address = emailBtn.getAttribute('href').replace('mailto:', '');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(address).then(showCopied).catch(() => fallbackCopy(address));
    } else {
      fallbackCopy(address);
    }
  });
}

// Fade sections in as they scroll into view
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}
