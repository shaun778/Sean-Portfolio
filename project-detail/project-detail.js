
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


// 圖片點擊展開 // 
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.img-popup');
  const popupImg = popup.querySelector('img');
  const closeBtn = popup.querySelector('.close-btn');

  document.querySelectorAll('.zoom-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      const imgSrc = this.getAttribute('data-img-src');
      popupImg.src = imgSrc;
      popup.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    popup.classList.remove('active');
  });

  popup.addEventListener('click', function() {
    popup.classList.remove('active');
  });
});

 // 數字動畫函數
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 使用緩動函數讓動畫更自然
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = start + (target - start) * easeOutQuart;
                
                element.textContent = current.toFixed(1);
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toFixed(1);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }

        // 檢查元素是否在視窗中
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // 檢查元素是否部分可見
        function isPartiallyInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.bottom > 0 &&
                rect.right > 0 &&
                rect.top < windowHeight &&
                rect.left < windowWidth
            );
        }

        // 主要的滾動監聽邏輯
        let hasAnimated = false;
        const statsContainer = document.getElementById('statsContainer');
        const counters = document.querySelectorAll('.counter');

        function handleScroll() {
            if (!hasAnimated && isPartiallyInViewport(statsContainer)) {
                // 添加動畫類別
                statsContainer.classList.add('animate');
                
                // 延遲啟動數字動畫，讓容器先出現
                setTimeout(() => {
                    counters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    });
                }, 300);
                
                hasAnimated = true;
            }
        }

        // 監聽滾動事件
        window.addEventListener('scroll', handleScroll);
        
        // 頁面載入時檢查一次
        window.addEventListener('load', handleScroll);

        // 節流函數優化性能
        function throttle(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // 使用節流版本的滾動監聽
        window.addEventListener('scroll', throttle(handleScroll, 16));
