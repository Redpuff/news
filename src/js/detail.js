import './imports'
import Header from '../components/Header'
import NewsFrame from '../components/Iframe'
import Follow from '../components/Follow';
import { getUrlQueryValue } from '../libs/utils';
((doc) => {

    const oApp = doc.querySelector("#app");
    //详情页的list信息
    const currentNews = JSON.parse(localStorage.getItem("currentNew"));
    //收藏页的list信息
    const followedList = JSON.parse(localStorage.getItem("followedList") || "[]")
    const init = () => {
        render()
        bindEvent()
    }
    function render() {
        const headerTpl = Header.tpl({
            url: getUrlQueryValue("path"),
            title: "我的新闻",
            showLeftIcon: true,
            showRightIcon: false
        })
        const FollowTpl = createFollowTpl()
        const iframe = NewsFrame.tpl(currentNews.url)
        oApp.innerHTML += (headerTpl + iframe + FollowTpl)
    }
    //用于检测当前的页面是否在被收藏,也就是当前页面的key在不在local storage里,以此判断页面是渲染是否收藏
    function createFollowTpl() {
        const isExist = followedList.find(item => item.uniquekey === currentNews.uniquekey)

        return isExist ? Follow.follow() : Follow.unfollow()
    }
    function bindEvent() {
        Follow.bindEvent(doFollow)
    }
    function doFollow(status) {
        let followedList = JSON.parse(localStorage.getItem('followedList') || '[]');

        if (status) {
            followedList.push(currentNews);
        } else {
            followedList = followedList.filter(item => item.uniquekey !== currentNews.uniquekey);
        }

        localStorage.setItem('followedList', JSON.stringify(followedList));
    }
    init()
})(document)

