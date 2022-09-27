import FastClick from './fastclick'
//点击延迟初始化
window.addEventListener("load", function () {
    FastClick.attach(this.document.body)
}, false)

document.documentElement.addEventListener("touchmove", function (e) {
    if (e.touches.length > 1) {
        e.preventDefault()
    }
}, false)

document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + "px"