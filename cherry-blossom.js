document.addEventListener('DOMContentLoaded', function() {
    // 创建樱花容器
    const container = document.createElement('div');
    container.classList.add('cherry-blossom-container');
    document.body.appendChild(container);

    // 生成樱花
    function createCherryBlossom() {
        const cherryBlossom = document.createElement('div');
        cherryBlossom.classList.add('cherry-blossom');

        // 随机大小
        const size = Math.random() * 10 + 5;
        cherryBlossom.style.width = `${size}px`;
        cherryBlossom.style.height = `${size}px`;

        // 随机位置
        cherryBlossom.style.left = `${Math.random() * 100}vw`;
        // 确保从屏幕外顶部开始
        cherryBlossom.style.top = `-${Math.random() * 50 + 20}px`;

        // 随机动画持续时间 (加快速度)
        const duration = Math.random() * 5 + 5;
        cherryBlossom.style.animationDuration = `${duration}s`;

        // 随机延迟
        cherryBlossom.style.animationDelay = `${Math.random() * 5}s`;

        // 随机水平移动幅度
        const translateX = Math.random() * 100 - 50;
        cherryBlossom.style.transform = `translateX(${translateX}px)`;

        // 添加到容器
        container.appendChild(cherryBlossom);

        // 动画结束后移除
        setTimeout(() => {
            cherryBlossom.remove();
        }, (duration + 2) * 1000);
    }

    // 定时生成樱花 (增加频率)
    setInterval(createCherryBlossom, 200);

    // 初始生成一批樱花 (增加数量)
    for (let i = 0; i < 50; i++) {
        setTimeout(createCherryBlossom, i * 100);
    }
});