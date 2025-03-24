import(chrome.runtime.getURL('common.js')).then(common => {
    if (!common.isLiveChat(location.href)) {
        main(document.querySelector('ytd-app') ?? document.body);
    }
});

function main(app) {
    let time_current_confirm;
    let prev_textContent;
    let prev_paused;

    const detect_interval = setInterval(() => {
        const player = app.querySelector('div#movie_player');
        if (!player) {
            return;
        }

        const time_current = player.querySelector('span.ytp-time-current');
        if (!time_current) {
            return;
        }

        const video = player.querySelector('video.video-stream');
        if (!video) {
            return;
        }

        clearInterval(detect_interval);

        time_current.setAttribute('contenteditable', 'plaintext-only');

        time_current.addEventListener('focusin', () => {
            time_current.classList.add('_jump_time_edit');

            prev_textContent = time_current.textContent;

            prev_paused = video.paused;
            video.pause();
        });

        time_current.addEventListener('focusout', e => {
            time_current.classList.remove('_jump_time_edit');

            if (time_current_confirm) {
                const parts = time_current.textContent.split(':').map(v => Math.trunc(v));
                if (parts.length === 1 && !isNaN(parts[0])) {
                    video.currentTime = parts[0];
                } else if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    video.currentTime = parts[0] * 60 + parts[1];
                } else if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
                    video.currentTime = parts[0] * 3600 + parts[1] * 60 + parts[2];
                } else {
                    time_current.innerText = prev_textContent;
                }
            } else {
                time_current.innerText = prev_textContent;
            }

            if (!prev_paused) {
                video.play();
            }
        });

        time_current.addEventListener('keydown', e => {
            e.stopImmediatePropagation();

            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    time_current_confirm = true;
                    time_current.blur();
                    break;
                case 'Escape':
                    time_current_confirm = false;
                    time_current.blur();
                    break;
                default:
                    time_current_confirm = true;
            }
        });
    }, 500);
}