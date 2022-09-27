import './imports'
import Header from '../components/Header'
import NewsList from '../components/NewsList'
import NoDataTip from '../components/NoDataTip'
    ; ((doc) => {
        const oApp = doc.querySelector("#app");
        //读取localStorage里的数据
        const followedList = JSON.parse(localStorage.getItem("followedList") || [])
        //声明wrapper
        let oListWrapper = null
        function init() {
            render();
            bindEvent()
        }
        //渲染header页面
        function render() {
            const headerTpl = Header.tpl({
                url: "/",
                title: "我的新闻",
                showLeftIcon: true,
                showRightIcon: false

            });
            //本地存储有数据才进行渲染
            if (followedList.length) {
                const listWrapperTpl = NewsList.wrapperTpl(44)
                oApp.innerHTML += headerTpl + listWrapperTpl
                oListWrapper = oApp.querySelector(".news-list")
                renderList(followedList)
            } else {
                const NoDataTipTpl = NoDataTip.tpl()
                oApp.innerHTML += headerTpl + NoDataTipTpl
            }

        }
        function renderList(data) {
            const newsListTpl = NewsList.tpl({
                data,
                pageNum: -1
            })
            oListWrapper.innerHTML += newsListTpl;
            NewsList.imgShow()
        }
        function bindEvent() {
            followedList.length && NewsList.bindEvent(oListWrapper, setCurrentNews)
        }
        function setCurrentNews(options) {
            const { idx } = options;
            const currentNews = followedList[idx]
            localStorage.setItem("currentNew", JSON.stringify(currentNews))
        }
        init()
    })(document)