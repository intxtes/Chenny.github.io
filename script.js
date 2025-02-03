document.addEventListener('DOMContentLoaded', function() {

    // 页面加载动画
    const elements = document.querySelectorAll('.section, header, footer');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const welcomeText = document.querySelector('#welcome-message');
    let clickCount = 0;
    let lastClickTime = 0;
    let timeoutId;

    welcomeText.addEventListener('click', function() {
        const currentTime = Date.now();

        // 如果两次点击间隔超过2秒，重置计数
        if (currentTime - lastClickTime > 2000) {
            clickCount = 0;
        }

        clickCount++;
        lastClickTime = currentTime;

        // 清除之前的定时器
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // 设置新的定时器，如果2秒内没有点击，重置计数
        timeoutId = setTimeout(() => {
            clickCount = 0;
        }, 2000);

        if (clickCount === 10) {
            window.location.href = 'secret.html'; // 跳转到新的 HTML 页面
        }

        this.classList.remove('bounce');
        void this.offsetWidth; // 触发重绘
        this.classList.add('bounce');
    });

    // 页面切换功能
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
            history.pushState(null, null, `#${targetPage}`);
        });
    });

    // 处理浏览器前进/后退
    window.addEventListener('popstate', function() {
        const pageId = window.location.hash.substring(1) || 'home';
        showPage(pageId);
    });

    // 初始化页面
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);

    // 创建自定义右键菜单
    const customMenu = document.createElement('div');
    customMenu.id = 'custom-menu';
    customMenu.style.display = 'none';
    customMenu.style.position = 'absolute';
    customMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // 半透明背景
    customMenu.style.backdropFilter = 'blur(10px)'; // 毛玻璃效果
    customMenu.style.border = '1px solid rgba(255, 255, 255, 0.2)'; // 半透明边框
    customMenu.style.borderRadius = '8px'; // 圆角
    customMenu.style.padding = '10px';
    customMenu.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)';
    customMenu.innerHTML = `
        <div style="padding: 5px; cursor: pointer;" id="go-home">首页</div>
        <div style="padding: 5px; cursor: pointer;" id="go-blog">博客</div>
        <div style="padding: 5px; cursor: pointer;" id="go-about">关于我</div>
        <div style="padding: 5px; cursor: pointer;" id="refresh-page">刷新</div>
    `;
    document.body.appendChild(customMenu);

    // 监听右键点击事件
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        customMenu.style.display = 'block';

        // 计算菜单位置
        const menuWidth = customMenu.offsetWidth;
        const menuHeight = customMenu.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let posX = e.pageX;
        let posY = e.pageY;

        // 如果菜单超出右边界，调整位置
        if (posX + menuWidth > windowWidth) {
            posX = windowWidth - menuWidth;
        }

        // 如果菜单超出下边界，调整位置
        if (posY + menuHeight > windowHeight) {
            posY = windowHeight - menuHeight;
        }

        customMenu.style.left = `${posX}px`;
        customMenu.style.top = `${posY}px`;

        // 检查当前页面并更新按钮状态
        const currentPage = window.location.hash || window.location.pathname;

        // 首页
        if (currentPage === '#home' || currentPage.endsWith('index.html')) {
            document.getElementById('go-home').style.color = 'gray'; // 设置为灰色
            document.getElementById('go-home').style.pointerEvents = 'none'; // 禁用点击
        } else {
            document.getElementById('go-home').style.color = ''; // 恢复颜色
            document.getElementById('go-home').style.pointerEvents = 'auto'; // 启用点击
        }

        // 博客
        if (currentPage === '#blog') {
            document.getElementById('go-blog').style.color = 'gray'; // 设置为灰色
            document.getElementById('go-blog').style.pointerEvents = 'none'; // 禁用点击
        } else {
            document.getElementById('go-blog').style.color = ''; // 恢复颜色
            document.getElementById('go-blog').style.pointerEvents = 'auto'; // 启用点击
        }

        // 关于我
        if (currentPage === '#about') {
            document.getElementById('go-about').style.color = 'gray'; // 设置为灰色
            document.getElementById('go-about').style.pointerEvents = 'none'; // 禁用点击
        } else {
            document.getElementById('go-about').style.color = ''; // 恢复颜色
            document.getElementById('go-about').style.pointerEvents = 'auto'; // 启用点击
        }
    });

    // 点击页面其他区域时隐藏菜单
    document.addEventListener('click', function() {
        customMenu.style.display = 'none';
    });

    // 点击"首页"选项
    document.getElementById('go-home').addEventListener('click', function() {
        window.location.href = 'index.html#home'; // 跳转到首页
    });

    // 点击"博客"选项
    document.getElementById('go-blog').addEventListener('click', function() {
        window.location.href = 'index.html#blog'; // 跳转到博客部分
    });

    // 点击"关于我"选项
    document.getElementById('go-about').addEventListener('click', function() {
        window.location.href = 'index.html#about'; // 跳转到关于我部分
    });

    // 点击"刷新"选项
    document.getElementById('refresh-page').addEventListener('click', function() {
        location.reload(); // 刷新页面
    });
}); 