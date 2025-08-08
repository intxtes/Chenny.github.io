// 搜索功能
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const siteItems = document.querySelectorAll('.site-item');

// 全局变量 - 用于存储网站数据和更新网站数量
let sitesData = [];

// 更新侧边栏网站数量
function updateSiteCount() {
    const siteCountElement = document.querySelector('.sidebar-info p:last-child');
    if (siteCountElement) {
        // 更新网站数量
        siteCountElement.textContent = `已收录 ${sitesData.length} 个网站`;
    }
}

// 加载动画控制逻辑
const loaderContainer = document.getElementById('loader-container');

// 显示加载动画
function showLoader() {
    loaderContainer.classList.remove('hidden');
}

// 隐藏加载动画
function hideLoader() {
    loaderContainer.classList.add('hidden');
    // 移除页面加载类，显示其他内容
    document.body.classList.remove('page-loading');
}

// 在DOM加载完成后初始化网站数据和更新网站数量
document.addEventListener('DOMContentLoaded', function() {
    // 显示加载动画
    showLoader();
    // 收集所有网站数据
    const siteItems = document.querySelectorAll('.site-item');
    sitesData = Array.from(siteItems).map(item => ({
        title: item.querySelector('h3').textContent,
        description: item.querySelector('p').textContent,
        url: item.href,
        category: item.closest('.category').querySelector('h2').textContent
    }));
    
    // 更新网站数量
    updateSiteCount();
});

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
    darkModeToggle.setAttribute('data-tooltip', '切换白天模式');
} else {
    darkModeToggle.setAttribute('data-tooltip', '切换黑暗模式');
}

// 夜间模式切换事件
 darkModeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    darkModeToggle.setAttribute('data-tooltip', isDark ? '切换白天模式' : '切换黑暗模式');
});



// 回到顶部按钮功能
const backToTopBtn = document.getElementById('back-to-top');

// 页面完全加载后隐藏加载动画
window.addEventListener('load', function() {
    // 延迟2秒后隐藏加载动画
    setTimeout(hideLoader, 2000);
});

// 监听页面滚动，控制回到顶部按钮的显示和隐藏
window.addEventListener('scroll', function() {
    // 判断是否滚动超过header的高度(934px)
    if (window.pageYOffset > 934) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// 点击回到顶部按钮，平滑滚动到页面顶部
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 随机切换header背景图片 - 优化版
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

// 使用单例模式和缓存优化图片加载
const BackgroundManager = {
    preloadedImages: [],
    isAllImagesLoaded: false,
    initialized: false,
    currentImage: null,

    init() {
        if (this.initialized) return;
        this.initialized = true;
        this.preloadImages();
    },

    preloadImages() {
        // 检查sessionStorage中是否有已加载的图片标记
        const cachedLoaded = sessionStorage.getItem('backgroundImagesLoaded');

        if (cachedLoaded) {
            // 图片已经加载过，直接随机选择一张新图片
            this.isAllImagesLoaded = true;
            this.currentImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
            this.setHeaderBackground();
            return;
        }

        // 否则开始预加载
        let imagesLoaded = 0;
        backgroundImages.forEach((imageSrc, index) => {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                this.preloadedImages[index] = img;
                imagesLoaded++;
                if (imagesLoaded === backgroundImages.length) {
                    this.isAllImagesLoaded = true;
                    // 存储加载完成的标记
                    sessionStorage.setItem('backgroundImagesLoaded', 'true');
                    // 设置随机背景
                    this.setRandomHeaderBackground();
                }
            };
            img.onerror = () => {
                imagesLoaded++;
                if (imagesLoaded === backgroundImages.length) {
                    this.isAllImagesLoaded = true;
                    sessionStorage.setItem('backgroundImagesLoaded', 'true');
                    this.setRandomHeaderBackground();
                }
            };
        });
    },

    setRandomHeaderBackground() {
        if (this.preloadedImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.preloadedImages.length);
            this.currentImage = backgroundImages[randomIndex];
            sessionStorage.setItem('currentBackgroundImage', this.currentImage);
            this.setHeaderBackground();
        }
    },

    setHeaderBackground() {
        const header = document.querySelector('header');
        if (this.currentImage) {
            header.style.backgroundImage = `url('${this.currentImage}')`;
        } else {
            // 如果没有当前图片，随机选择一个
            this.currentImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
            header.style.backgroundImage = `url('${this.currentImage}')`;
        }
        // 添加半透明遮罩，确保文字清晰可见
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        header.style.backgroundBlendMode = 'overlay';
    }
};

// 在DOM加载完成后初始化背景管理器
document.addEventListener('DOMContentLoaded', () => {
    BackgroundManager.init();
});

// 页面显示时快速设置背景（解决切换回来卡顿问题）
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        BackgroundManager.setHeaderBackground();
    }
});

// 页面加载完成后确保背景已设置
window.addEventListener('load', () => {
    if (!BackgroundManager.isAllImagesLoaded) {
        BackgroundManager.setHeaderBackground();
    }
});



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
    
    // 初始化所有板块的状态 - 全部默认折叠
    toggleBtns.forEach(btn => {
        const categoryTitle = btn.parentElement;
        const category = categoryTitle.parentElement;
        const siteList = category.querySelector('.site-list');
        const categoryId = category.querySelector('h2 span').textContent;
        
        // 强制默认折叠所有板块
        btn.classList.add('collapsed');
        siteList.classList.add('collapsed');
        
        // 添加点击事件
        btn.addEventListener('click', function() {
            // 切换按钮状态
            this.classList.toggle('collapsed');
            
            // 切换站点列表的显示状态
            siteList.classList.toggle('collapsed');
        });
    });
});

// 自定义对话框功能
 document.addEventListener('DOMContentLoaded', function() {
    const codingCommunityLink = document.getElementById('coding-community');
    const customDialog = document.getElementById('custom-dialog');
    const dialogOverlay = document.getElementById('dialog-overlay');
    const btnCancel = document.getElementById('btn-cancel');
    const btnConfirm = document.getElementById('btn-confirm');

    // 显示对话框
    function showDialog() {
        customDialog.style.display = 'block';
        dialogOverlay.style.display = 'block';
        // 防止背景滚动
        document.body.style.overflow = 'hidden';
    }

    // 关闭对话框
    function closeDialog() {
        customDialog.style.display = 'none';
        dialogOverlay.style.display = 'none';
        // 恢复背景滚动
        document.body.style.overflow = 'auto';
    }

    // 点击编程聚集地链接显示对话框
    if (codingCommunityLink) {
        codingCommunityLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDialog();
        });
    }

    // 点击取消按钮关闭对话框
    if (btnCancel) {
        btnCancel.addEventListener('click', closeDialog);
    }

    // 点击确定按钮关闭对话框并跳转
    if (btnConfirm) {
        btnConfirm.addEventListener('click', function() {
            closeDialog();
            window.location.href = 'https://cyj.cmzprep.top/CSP-J.html';
        });
    }

    // 点击对话框背景关闭对话框
    if (dialogOverlay) {
        dialogOverlay.addEventListener('click', closeDialog);
    }

    // 按ESC键关闭对话框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && customDialog.style.display === 'block') {
            closeDialog();
        }
    });
});