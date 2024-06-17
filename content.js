const app = document.querySelector('ytd-app');
if (app) {
    main();
}

function main() {
    new MutationObserver((mutations, observer) => {
        const player = app.querySelector('div#movie_player');
        if (!player) {
            return;
        }

        const time_current = player.querySelector('span.ytp-time-current');
        const video = player.querySelector('video.video-stream');
        if (time_current && video) {
            observer.disconnect();
            apply_extention(time_current, video);
        }
    }).observe(app, { childList: true, subtree: true });

    function apply_extention(time_current, video) {
        time_current.setAttribute('contenteditable', 'plaintext-only');

        time_current.addEventListener('click', e => {
            video.pause();
        });

        time_current.addEventListener('blur', e => {
            const parts = time_current.textContent.split(':').map(v => parseInt(v));
            if (parts.length === 1 && !isNaN(parts[0])) {
                video.currentTime = parts[0];
            } else if (parts.length === 2) {
                video.currentTime = parts[0] * 60 + parts[1];
            } else if (parts.length === 3) {
                video.currentTime = parts[0] * 3600 + parts[1] * 60 + parts[2];
            }

            video.play();
        });

        time_current.addEventListener('keydown', e => {
            if (document.activeElement === time_current) {
                e.stopImmediatePropagation();
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                time_current.blur();
            }
        });
    }
}