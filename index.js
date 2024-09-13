$(document).ready(function() {
    // 获取弹框和触发按钮元素
    var modal = $('#myModal');
    var btn = $('#openModal');
    var span = $('.close');

    // 当用户点击按钮时显示弹框
    btn.click(function() {
        modal.show();
    });

    // 当用户点击关闭按钮时隐藏弹框
    span.click(function() {
        modal.hide();
    });

    // 当用户点击弹框外部时隐藏弹框
    $(window).click(function(event) {
        if (event.target.id === 'myModal') {
            modal.hide();
        }
    });
});