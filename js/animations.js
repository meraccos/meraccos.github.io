document.querySelectorAll('[data-animation-path]').forEach((container) => {
    lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: container.dataset.animationPath,
    });
});
