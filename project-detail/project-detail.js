
// Projec-detail //
//  Board 進度條 //

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollableHeight = docHeight - winHeight;
  const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
  const bar1 = document.getElementById('scrollIndicator');
  if (bar1) bar1.style.width = scrollPercent + '%';
}

function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollableHeight = docHeight - winHeight;
  const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
  const bar2 = document.getElementById('stepProgressFill');
  if (bar2) bar2.style.width = scrollPercent + '%';
}

document.addEventListener('DOMContentLoaded', function() {
  function onScrollOrResize() {
    handleScroll();
    updateScrollProgress();
    handleMobileSticky();
  }
  window.addEventListener('scroll', onScrollOrResize);
  window.addEventListener('resize', onScrollOrResize);
  onScrollOrResize();
});

// 完全新增的函式
function handleMobileSticky() {
    // 只在 375px 以下裝置執行
    if (window.innerWidth <= 375) {
        const teamBoard = document.getElementById('teamInfoBoard');
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // 當滾動超過 50px 時，添加 scrolled 類別
        if (scrollTop > 50) {
            teamBoard.classList.add('scrolled');
        } else {
            teamBoard.classList.remove('scrolled');
        }
    }
}


