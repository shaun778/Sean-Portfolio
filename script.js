
// Prodect 作品專案操作輪播
document.addEventListener('DOMContentLoaded', function() {
  const group = document.querySelector('.project-group');
  const cards = group.querySelectorAll('.p-item');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const sliderInfo = document.querySelector('.slider-info');
  let currentIndex = 0; // 初始從第0張開始

  // 算每一格寬度
  function cardWidth() {
    return cards[0].offsetWidth + parseInt(getComputedStyle(group).gap || 0, 10);
  }

  // 更新按鈕/數字的狀態
  function updateUI() {
    sliderInfo.textContent = `${currentIndex + 1}/${cards.length}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
    prevBtn.classList.toggle("disabled", currentIndex === 0);
    nextBtn.classList.toggle("disabled", currentIndex === cards.length - 1);
  }

  // 滾動效果
  function scrollToCard(index) {
    group.scrollTo({ left: cardWidth() * index, behavior: 'smooth' });
    currentIndex = index;
    updateUI();
  }

  // 按鈕事件
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) scrollToCard(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function() {
    if (currentIndex < cards.length - 1) scrollToCard(currentIndex + 1);
  });


  // **滑動時監控 scroll 位置也要跟著變**
  group.addEventListener('scroll', function() {
    const perCard = cardWidth();
    // 用 Math.round 讓吸附 snap 效果剛好對位
    const newIndex = Math.round(group.scrollLeft / perCard);
    if (newIndex !== currentIndex){
        currentIndex = newIndex;
        updateUI();
    }

  });

  // 初始設定
  updateUI();
});

// --------------

// FAQ 展開內容邏輯 //
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    const faqContent = question.querySelector('.faq-content');
    faqContent.addEventListener('click', () => {
      const isOpen = question.classList.contains('open');

      // 關閉所有 faq
      faqQuestions.forEach(q => {
        q.classList.remove('open');
        const ans = q.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null; // revert 回 collapsed 狀態
      });

      // 若原本沒開，就開啟目標
      if (!isOpen) {
        question.classList.add('open');
        const ans = question.querySelector('.faq-answer');
        if (ans) {
          ans.style.maxHeight = ans.scrollHeight + "px";
        }
      }
    });
  });

  // 頁面初始確保答案是收合狀態
  document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
});


// 雷達分佈圖
const data = {
  labels: ['UI','UXD', 'UXR', '前端','AI', 'A11y'],
  datasets: [{
    label: '熟練度',
    data: [100, 100, 60, 50, 60, 80],
    backgroundColor: 'rgba(206,206,206,0.3)',
    borderColor: 'rgba(0,0,0,0)',
    pointBackgroundColor: 'rgba(206,206,206,1)',
    pointBorderColor: '#fff',
    pointRadius: 6
  }]
};
const config = {
  type: 'radar',
  data: data,
  options: {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
          stepSize: 35
        },
        angleLines: { color: '#BBB' },
        grid: { color: '#d9d9d9' },
        pointLabels: { 
          font: { 
            size: 18, 
            weight: 'normal' }, 
            color: '#222',
          }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
};
new Chart(document.getElementById('myRadar'), config);


// --------------

// 來自於合作夥伴的回饋 //
(function () {
  const feedbacks = [
    {
      text: [
        "跨部門協作能力強：在與軟體溝通時很順暢，同時也能以品牌角度告知品牌原則協助找到 Middle Ground。",
        "好眼力：自己有時候看不出哪裡跟設計稿不一樣，問他準沒錯，馬上一眼看穿。",
        "幽默的好同事：自帶偶像圖體包袱的幽默感，工作過程時不時能提供歡樂。"
      ],
      author: "設計主管"
    },
    {
      text: [
        "謝謝專案上的幫忙與建議，希望你可以繼續保持專業跟細心，之後希望可以聽到你主動地分享自己的觀點和建議，一起讓專案有更多創新的用戶體驗~",
        "1. 可以把專案相關協作的內容，理性的分析可行性跟提供作法建議",
        "2. 在介面相關的設計，很認真的關注用戶體驗跟對細節的追求令人敬佩"
      ],
      author: "前端工程師"
    },
    {
      text: [
        "1. 懂得使用新的工具來減少前端與設計之間的語言隔閡，例如 Figma 的新功能或自行規劃的樣式標準。",
        "2. 圖稿大部分都非常詳盡，在初期稿件規劃好的時候，也會先找前端討論這樣的 Use Flow 或 UI 會不會造成開發上的困難。"
      ],
      author: "前端工程師"
    },
    {
      text: [
        "具備同理心，會想辦法在協作上讓他人更輕鬆好溝通",
        "會持續研究他人的做法，保持技術上的精進",
        "希望 Sean 可以越來越厲害，有能力掌握更大的專案，但需要多多碰觸 UIUX 領域以外的東西，" +
        "我自己會建議可以先從閱讀一些設計行銷類型的書，會對設計 UX 方面更有方向"
      ],
      author: "設計主管"
    }
  ];

  let groupSize = window.innerWidth <= 375 ? 1 : 2;
  let currentGroup = 0;
  let totalGroups = Math.ceil(feedbacks.length / groupSize);

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // --- RWD 監聽 ---
  window.addEventListener('resize', function () {
    const newSize = window.innerWidth >= 375 ? 1 : 1;
    if (newSize !== groupSize) {
      groupSize = newSize;
      totalGroups = Math.ceil(feedbacks.length / groupSize);
      currentGroup = 0;
      const wrappers = document.querySelectorAll('.feedback-group-wrapper');
      renderGroup(wrappers[0], currentGroup);
      wrappers[0].classList.add('current');
      wrappers[1].classList.remove('current');
      wrappers[1].classList.add('next');
      wrappers[1].innerHTML = '';
      wrappers[0].style.transform = '';
      wrappers[1].style.transform = '';
      renderDots();
      updateButtons();
    }
  });

  function renderGroup(wrapper, groupIndex) {
    wrapper.innerHTML = '';
    const start = groupIndex * groupSize;
    const end = start + groupSize;
    feedbacks.slice(start, end).forEach(item => {
      const div = document.createElement('div');
      div.className = 'feedback-item';
      // 正確處理多段文字
      div.innerHTML = `
        <div class="feedback-content">
           ${item.text.map(line => `<p>${line}</p>`).join('')}
        </div>
        <span class="feedback-author">${item.author}</span>
      `;
      wrapper.appendChild(div);
    });
  }

  function renderDots() {
    const dotsWrapper = document.querySelector('.dots');
    if (!dotsWrapper) return;
    dotsWrapper.innerHTML = '';
    for (let i = 0; i < totalGroups; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentGroup ? ' active' : '');
      dot.onclick = () => {
        if (i === currentGroup) return;
        const dir = i > currentGroup ? 'left' : 'right'; // 往後左滑，往前右滑
        slideAndChange(i, dir);
      };
      dotsWrapper.appendChild(dot);
    }
  }

  function updateButtons() {
    prevBtn.disabled = currentGroup === 0;
    nextBtn.disabled = currentGroup === totalGroups - 1;
    prevBtn.classList.toggle('disabled', prevBtn.disabled);
    nextBtn.classList.toggle('disabled', nextBtn.disabled);
  }

  function slideAndChange(nextIndex, direction) {
    if (nextIndex < 0 || nextIndex >= totalGroups || nextIndex === currentGroup) return;
    const currentWrapper = document.querySelector('.feedback-group-wrapper.current');
    const nextWrapper = document.querySelector('.feedback-group-wrapper.next');
    renderGroup(nextWrapper, nextIndex);

    // 根據傳入方向設定位移（固定規則不變）
    const from = direction === 'left' ? '100%' : '-100%';  // 新頁初始位置
    const to   = direction === 'right' ? '-100%' : '100%';  // 舊頁滑出的方向

    nextWrapper.style.transform = `translateX(${from})`;
    void nextWrapper.offsetWidth;
    currentWrapper.style.transform = `translateX(${to})`;
    nextWrapper.style.transform    = 'translateX(0)';

    setTimeout(() => {
      currentWrapper.classList.remove('current');
      currentWrapper.classList.add('next');
      currentWrapper.style.transform = `translateX(${from})`;
      nextWrapper.classList.remove('next');
      nextWrapper.classList.add('current');
      currentGroup = nextIndex;
      renderDots();
      updateButtons();
    }, 500);
  }

  // --- 初始化 ---
  document.addEventListener("DOMContentLoaded", function () {
    const wrappers = document.querySelectorAll('.feedback-group-wrapper');
    renderGroup(wrappers[0], currentGroup);
    wrappers[0].classList.add('current');
    wrappers[1].classList.add('next');
    renderDots();
    updateButtons();

    // 固定方向，不因 index 判斷而變化
    prevBtn.onclick = () => slideAndChange(currentGroup - 1, 'right');
    nextBtn.onclick = () => slideAndChange(currentGroup + 1, 'left');
  });
})();


// ========== 進度條 & 內容區切換 ==========

let currentTheme = 0;
const totalThemes = 3;

// 節流函式（需要先定義）
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 滾動進度條（只保留一個版本）
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 同時支援兩種進度條元素
    const progressBar1 = document.querySelector('.scroll-progress-bar');
    const progressBar2 = document.getElementById('scrollIndicator');
    
    if (progressBar1) progressBar1.style.width = scrollPercent + '%';
    if (progressBar2) progressBar2.style.width = scrollPercent + '%';
}

// 主題和圖片切換
function switchTheme(themeIndex) {
    if (themeIndex === currentTheme) return;
    
    document.querySelectorAll('.image-slide').forEach((slide, index) => {
        if (index === themeIndex) slide.classList.add('active');
        else slide.classList.remove('active');
    });
    
    document.querySelectorAll('.image-caption').forEach((caption, index) => {
        if (index === themeIndex) caption.classList.add('active');
        else caption.classList.remove('active');
    });
    
    currentTheme = themeIndex;
}

// 移動端卡片疊放動畫
function handleMobileStackAnimation() {
    if (window.innerWidth <= 768) {
        const sections = document.querySelectorAll('.text-section');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const stickyTop = parseInt(getComputedStyle(section).top) || 0;
            const isSticky = rect.top <= stickyTop;
            
            if (isSticky) {
                section.style.transform = `scale(${Math.max(0.95, 1 - (index * 0.02))})`;
            } else {
                section.style.transform = '';
            }
        });
    }
}

// 主滾動偵測函式
function handleScroll() {
    console.log('handleScroll triggered'); // 移到函式內部
    updateScrollProgress();
    handleMobileStackAnimation();

    // 桌面端切換主題
    if (window.innerWidth > 768) {
        const windowHeight = window.innerHeight;
        const textSections = document.querySelectorAll('.text-section');
        let newTheme = 0;
        
        textSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const threshold = windowHeight * 0.5;
            
            console.log(`section ${index} top: ${rect.top.toFixed(2)}, threshold: ${threshold.toFixed(2)}`);
            
            if (rect.top <= threshold && rect.bottom > threshold) {
                newTheme = index;
            }
        });
        
        switchTheme(newTheme);
    }
}

// 統一初始化（只保留一個）
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // 綁定滾動事件（使用節流）
    window.addEventListener('scroll', throttle(handleScroll, 16));
    // 綁定視窗大小變化事件
    window.addEventListener('resize', throttle(handleScroll, 100));
    
    // 初始化
    handleScroll();
    switchTheme(0);
    
    console.log('Initialization complete');
});


/* Ad-bar 自動輪播*/
const adInner = document.querySelector('.ad-inner');
let position = 0;
const speed = 1; // px per frame, 可調整速度

function loopTicker() {
  position -= speed;
  // 若已經全部移到左邊（超出），重新複製並接在後面
  if (-position >= adInner.scrollWidth / 2) {
    position = 0;
  }
  adInner.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(loopTicker);
}

// 輪播文字需至少2倍內容，複製一份
adInner.innerHTML += adInner.innerHTML;

loopTicker();


const menuToggleBtn = document.getElementById('menu-Toggle');
const mobileDropdown = document.getElementById('mobileDropdownMenu');

menuToggleBtn.addEventListener('click', () => {
  menuToggleBtn.classList.toggle('open');           // 切換 open 狀態 (改變icon)
  mobileDropdown.classList.toggle('show');          // 顯示或隱藏下拉選單
});

// 如果需要點選下拉選項後關閉選單，也要加：
function closeMobileMenu() {
  menuToggleBtn.classList.remove('open');
  mobileDropdown.classList.remove('show');
}

// Video 控制 //
const video = document.querySelector('.h-image video');
video.muted = true;
video.loop = true;
video.playsInline = true;
video.autoplay = true;
video.load();  // 重新加載影片
video.play().catch(error => {
  console.log('Auto-play prevented:', error);
});










