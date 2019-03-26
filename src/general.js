window.addEventListener('load', function () {
    const setting = document.getElementById('setting');
    const settingInner = document.getElementById('settingInner');
    setting.addEventListener('click', function (ev) {
        settingInner.classList.toggle('settings__inner_visible');
        ev.stopPropagation();
    });
    window.addEventListener('click', function () {
        settingInner.classList.remove('settings__inner_visible');
    });

    //message modal window
    const messageWrapper = document.getElementById('messageWrapper');
    messageWrapper.addEventListener('click', function () {
        messageWrapper.classList.remove('message_visible');
    });
});

function setMessage(message) {
    const messageEl = document.getElementById('message');
    const messageWrapper = document.getElementById('messageWrapper');
    if (messageWrapper.classList.contains('message_visible')) {
        messageEl.innerHTML = messageEl.innerText + '<p>' + message;
    } else {
        messageEl.innerHTML = message;
    }
    messageWrapper.classList.add('message_visible');
}