document.addEventListener('DOMContentLoaded', function() {

    // 页面加载动画
    const elements = document.querySelectorAll('.section, header, footer');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const welcomeText = document.querySelector('.welcome-text h2');
    welcomeText.addEventListener('click', function() {
        this.classList.remove('bounce');
        void this.offsetWidth; // 触发重绘
        this.classList.add('bounce');
    });

    const body = document.querySelector('body');
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    
    const isInBlogFolder = window.location.pathname.includes('/blog/');
    const prefix = isInBlogFolder ? '../' : '';
    
    contextMenu.innerHTML = `
        <ul>
            <li><a href="${prefix}index.html">首页</a></li>
            <li><a href="${prefix}blog.html">博客</a></li>
            <li><a href="${prefix}index.html#contact">关于我</a></li>
        </ul>
    `;
    body.appendChild(contextMenu);

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        contextMenu.style.display = 'block';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
    });

    document.addEventListener('click', function() {
        contextMenu.style.display = 'none';
    });
}); 