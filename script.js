// 搜索功能
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const siteItems = document.querySelectorAll('.site-item');

// 收集所有网站数据
const sitesData = Array.from(siteItems).map(item => ({
    title: item.querySelector('h3').textContent,
    description: item.querySelector('p').textContent,
    url: item.href,
    category: item.closest('.category').querySelector('h2').textContent
}));

// 点击搜索按钮执行搜索
searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm.length < 1) {
        searchResults.classList.remove('show');
        return;
    }

    const filteredSites = sitesData.filter(site =>
        site.title.toLowerCase().includes(searchTerm) ||
        site.description.toLowerCase().includes(searchTerm) ||
        site.category.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(filteredSites);
});

// 按下回车键也可执行搜索
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// 监听搜索框内容变化，为空时隐藏搜索结果
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm.length < 1) {
        searchResults.classList.remove('show');
    }
});

function displaySearchResults(sites) {
    searchResults.innerHTML = '';
    if (sites.length === 0) {
        searchResults.innerHTML = '<div class="result-item">没有找到匹配的网站</div>';
        searchResults.classList.add('show');
        return;
    }

    sites.forEach(site => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <a href="${site.url}" target="_blank">
                <strong>${site.title}</strong>
                <p>${site.description}</p>
                <small>分类: ${site.category}</small>
            </a>
        `;
        searchResults.appendChild(resultItem);
    });

    searchResults.classList.add('show');
}

// 点击页面其他地方关闭搜索结果
document.addEventListener('click', function(event) {
    // 检查点击的元素是否在搜索框或搜索结果内
    if (!event.target.closest('.search-box') && !event.target.closest('#search-results')) {
        searchResults.classList.remove('show');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 固定搜索栏功能
const searchBox = document.querySelector('.search-box');
const fixedSearchContainer = document.getElementById('fixed-search-container');
const fixedSearchInput = document.getElementById('fixed-search-input');
const fixedSearchBtn = document.getElementById('fixed-search-btn');
const fixedSearchResults = document.getElementById('fixed-search-results');

// 同步两个搜索框的内容
searchInput.addEventListener('input', function() {
    fixedSearchInput.value = this.value;
});

fixedSearchInput.addEventListener('input', function() {
    searchInput.value = this.value;
    const searchTerm = this.value.toLowerCase().trim();
    if (searchTerm.length < 1) {
        fixedSearchResults.classList.remove('show');
    }
});

// 固定搜索框的搜索按钮点击事件
fixedSearchBtn.addEventListener('click', function() {
    const searchTerm = fixedSearchInput.value.toLowerCase().trim();
    if (searchTerm.length < 1) {
        fixedSearchResults.classList.remove('show');
        return;
    }

    const filteredSites = sitesData.filter(site =>
        site.title.toLowerCase().includes(searchTerm) ||
        site.description.toLowerCase().includes(searchTerm) ||
        site.category.toLowerCase().includes(searchTerm)
    );

    displayFixedSearchResults(filteredSites);
});

// 固定搜索框的回车键事件
fixedSearchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fixedSearchBtn.click();
    }
});

// 显示固定搜索结果
function displayFixedSearchResults(sites) {
    fixedSearchResults.innerHTML = '';
    if (sites.length === 0) {
        fixedSearchResults.innerHTML = '<div class="result-item">没有找到匹配的网站</div>';
        fixedSearchResults.classList.add('show');
        return;
    }

    sites.forEach(site => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <a href="${site.url}" target="_blank">
                <strong>${site.title}</strong>
                <p>${site.description}</p>
                <small>分类: ${site.category}</small>
            </a>
        `;
        fixedSearchResults.appendChild(resultItem);
    });

    fixedSearchResults.classList.add('show');
}

// 点击页面其他地方关闭固定搜索结果
document.addEventListener('click', function(event) {
    if (!event.target.closest('.fixed-search-box') && !event.target.closest('#fixed-search-results')) {
        fixedSearchResults.classList.remove('show');
    }
});

// 滚动监听，控制固定搜索栏的显示和隐藏
window.addEventListener('scroll', function() {
    const searchBoxRect = searchBox.getBoundingClientRect();
    // 当原始搜索栏完全不在视口内时显示固定搜索栏
    if (searchBoxRect.bottom < 0) {
        fixedSearchContainer.classList.add('show');
    } else {
        fixedSearchContainer.classList.remove('show');
    }
});

// 夜间模式切换功能
// 创建夜间模式切换按钮
const darkModeToggle = document.createElement('dark-mode-toggle');
darkModeToggle.textContent = '🌙';
document.body.appendChild(darkModeToggle);

// 检查用户偏好或之前的设置
const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                   (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 
                    !localStorage.getItem('darkMode'));

// 初始化夜间模式
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

// 夜间模式切换事件
 darkModeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
});

// 随机切换header背景图片
// 预加载图片数组
const backgroundImages = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg'
];

// 已预加载的图片缓存
const preloadedImages = [];
let imagesLoaded = 0;
let isAllImagesLoaded = false;

// 预加载函数
function preloadImages() {
    backgroundImages.forEach((imageSrc, index) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            preloadedImages[index] = img;
            imagesLoaded++;
            if (imagesLoaded === backgroundImages.length) {
                isAllImagesLoaded = true;
                // 所有图片加载完成后设置背景
                setRandomHeaderBackground();
            }
        };
        img.onerror = () => {
            imagesLoaded++;
            if (imagesLoaded === backgroundImages.length) {
                isAllImagesLoaded = true;
                // 即使有图片加载失败，也尝试设置背景
                setRandomHeaderBackground();
            }
        };
    });
}

function setRandomHeaderBackground() {
    const header = document.querySelector('header');
    
    if (isAllImagesLoaded && preloadedImages.length > 0) {
        // 从预加载的图片中随机选择
        const randomIndex = Math.floor(Math.random() * preloadedImages.length);
        const randomImage = backgroundImages[randomIndex];
        header.style.backgroundImage = `url('${randomImage}')`;
    } else {
        // 如果图片尚未加载完成，使用默认背景
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const randomImage = backgroundImages[randomIndex];
        header.style.backgroundImage = `url('${randomImage}')`;
    }
    
    // 添加半透明遮罩，确保文字清晰可见
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    header.style.backgroundBlendMode = 'overlay';
}

// 在DOM加载完成后立即开始预加载图片
document.addEventListener('DOMContentLoaded', preloadImages);

// 页面加载完成后确保背景已设置
window.addEventListener('load', () => {
    if (!isAllImagesLoaded) {
        setRandomHeaderBackground();
    }
});

// 网站运行时间计算（精确到毫秒）
function updateRunningTime() {
    // 设置开始时间：2025年8月5日00:00:00
    const startTime = new Date(2025, 7, 5, 0, 0, 0).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - startTime;
    
    // 计算天、时、分、秒、毫秒
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    const milliseconds = timeDiff % 1000;
    
    // 格式化显示，确保毫秒显示3位数字
    const runningTimeElement = document.getElementById('running-time');
    if (runningTimeElement) {
        runningTimeElement.textContent = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒 ${milliseconds.toString().padStart(3, '0')}毫秒`;
    }
}

// 初始更新
updateRunningTime();
// 每10毫秒更新一次（平衡精度和性能）
setInterval(updateRunningTime, 10);

// 打字动画效果
function typeAnimation() {
    const mainTitle = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');
    const mainText = '有趣网址导航';
    const subText = '发现互联网上最实用的网站，一站式导航服务';
    let index = 0;
    let isDeleting = false;
    let isSubtitle = false;
    let animationComplete = false;

    // 设置初始透明度
    mainTitle.style.opacity = '0';
    subtitle.style.opacity = '0';

    function type() {
        if (!animationComplete) {
            if (!isSubtitle) {
                if (!isDeleting) {
                    // 打字阶段 - 先淡出
                    mainTitle.style.opacity = '0';
                     
                    setTimeout(() => {
                        // 修改文本内容
                        mainTitle.textContent = mainText.slice(0, index + 1);
                        index++;
                         
                        // 再淡入
                        mainTitle.style.opacity = '1';
                         
                        if (index >= mainText.length) {
                            // 完成打字，准备删除
                            isDeleting = true;
                            setTimeout(type, 1000); // 停留1秒后开始删除
                            return;
                        }
                         
                        // 控制打字速度
                        setTimeout(type, 100);
                    }, 100); // 过渡时间
                } else {
                    // 删除阶段 - 先淡出
                    mainTitle.style.opacity = '0';
                     
                    setTimeout(() => {
                        // 修改文本内容
                        mainTitle.textContent = mainText.slice(0, index - 1);
                        index--;
                         
                        // 再淡入
                        mainTitle.style.opacity = '1';
                         
                        if (index <= 0) {
                            // 完成删除，开始显示副标题
                            isDeleting = false;
                            isSubtitle = true;
                            index = 0;
                            mainTitle.textContent = '';
                            mainTitle.style.opacity = '0'; // 隐藏主标题
                            subtitle.style.opacity = '0'; // 准备显示副标题
                        }
                         
                        // 控制删除速度
                        setTimeout(type, 50);
                    }, 100); // 过渡时间
                }
            } else {
                if (!isDeleting) {
                    // 打副标题 - 先淡出
                    subtitle.style.opacity = '0';
                     
                    setTimeout(() => {
                        // 修改文本内容
                        subtitle.textContent = subText.slice(0, index + 1);
                        index++;
                         
                        // 再淡入
                        subtitle.style.opacity = '1';
                         
                        if (index >= subText.length) {
                            // 完成副标题，准备最终展示
                            isDeleting = true;
                            setTimeout(() => {
                                // 移动副标题并显示主标题
                                subtitle.style.transition = 'margin-top 0.5s ease, opacity 0.5s ease';
                                subtitle.style.marginTop = '20px';
                                 
                                // 主标题淡入
                                mainTitle.style.opacity = '0';
                                mainTitle.textContent = mainText;
                                setTimeout(() => {
                                    mainTitle.style.opacity = '1';
                                    animationComplete = true;
                                }, 100);
                            }, 1000); // 停留1秒后移动
                            return;
                        }
                         
                        // 控制打字速度
                        setTimeout(type, 100);
                    }, 100); // 过渡时间
                }
            }
        }
    }

    // 开始动画
    setTimeout(type, 500); // 延迟开始，让页面有时间加载
}

// 页面加载完成后开始动画
window.addEventListener('load', typeAnimation);

// 禁用浏览器默认的右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// 板块折叠/展开功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有的折叠按钮
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // 检查是否有保存的折叠状态
    const collapsedCategories = JSON.parse(localStorage.getItem('collapsedCategories') || '{}');
    
    // 初始化所有板块的状态
    toggleBtns.forEach(btn => {
        const categoryTitle = btn.parentElement;
        const category = categoryTitle.parentElement;
        const siteList = category.querySelector('.site-list');
        const categoryId = category.querySelector('h2 span').textContent;
        
        // 应用保存的状态，默认为折叠
        if (collapsedCategories[categoryId] !== false) {
            btn.classList.add('collapsed');
            siteList.classList.add('collapsed');
        }
        
        // 添加点击事件
        btn.addEventListener('click', function() {
            // 切换按钮状态
            this.classList.toggle('collapsed');
            
            // 切换站点列表的显示状态
            siteList.classList.toggle('collapsed');
            
            // 保存状态到localStorage
            collapsedCategories[categoryId] = this.classList.contains('collapsed');
            localStorage.setItem('collapsedCategories', JSON.stringify(collapsedCategories));
        });
    });
});
