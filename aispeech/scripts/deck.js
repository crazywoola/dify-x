// 初始化 Reveal.js
Reveal.initialize({
    hash: true,
    mouseWheel: false,
    history: true,
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    backgroundTransition: 'fade',
    controls: true,
    progress: true,
    center: true,
    
    // 启用纵向导航的关键设置
    navigationMode: 'default', // 允许二维导航 (左右+上下)
    
    // 幻灯片尺寸配置 (16:9)
    width: 1200,
    height: 675,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0
});