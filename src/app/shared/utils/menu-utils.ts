
export function toggleMenu(): void {
  const menuBar = document.getElementById('menuMobile');
  const backDrop = document.getElementById('blurBack');
  if (menuBar && backDrop) {
    menuBar.classList.toggle('expanded');
    backDrop.classList.toggle('expanded');
  }
}
