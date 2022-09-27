import itemTpl from './tpl/item.tpl'
import wrapperTpl from './tpl/index.tpl'
import './index.scss'
import { tplReplace, scrollToTop } from '../../libs/utils'

export default {
    _curIdx: 0,
    name: "NavBar",
    //遍历data,创建多个nav
    tpl(data) {

        let itemList = ''
        data.map((item, index) => {
            itemList += tplReplace(itemTpl, {
                isCurrent: !index ? 'current' : "",
                title: item.title,
                type: item.type
            })
        });
        return tplReplace(wrapperTpl, {
            itemList,
            wrapperW: .6 * data.length
        })



    },
    //给nav绑定事件,当点击nav的时候,触发_setNav函数，
    bindEvent(setType) {
        const oNavBar = document.querySelector(".nav");
        const oNavItems = document.querySelectorAll(".item");
        //传递.item和设置config配置的setType给_setNav
        oNavBar.addEventListener("click", this._setNav.bind(this, oNavItems, setType), false)

    },
    //给item添加current
    _setNav(items, setType) {
        //获取事件对象
        const tar = arguments[2].target
        //给目标dom的className去空格
        const className = tar.className.trim();

        //如果点击的是item
        if (className === "item") {
            //保存item的data-type属性
            const type = tar.dataset.type
            //将type属性传回到config里
            setType(type);
            //回到顶端
            scrollToTop()
            items[this._curIdx].className = "item";
            this._curIdx = [].indexOf.call(items, tar)
            items[this._curIdx].classList.add("current")

        }
    }

}