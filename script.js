// JavaScript 只增强手机导航；正文、锚点跳转均由 HTML/CSS 完成。
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

if (menuButton && navLinks) {
  document.documentElement.classList.add('js');
  menuButton.hidden = false;

  // 同步菜单显示状态与辅助技术读取的展开状态。
  function setMenuOpen(open) {
    navLinks.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '收起导航' : '展开导航';
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  // 切换到桌面布局时重置手机菜单，避免返回窄屏后意外展开。
  const mobileLayout = window.matchMedia('(max-width: 700px)');
  mobileLayout.addEventListener('change', (event) => {
    if (!event.matches) setMenuOpen(false);
  });

  // 键盘用户可用 Escape 关闭手机菜单并回到触发按钮。
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}
