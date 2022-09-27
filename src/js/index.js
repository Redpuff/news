import "./imports";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NewsList from "../components/NewsList";
import MoreLoading from "../components/MoreLoading";
import { NEWS_TYPE } from "../data";
import servicse from "../servicse";
import pageLoading from "../components/pageLoading";
import { scrollToBottom } from "../libs/utils";
((doc) => {
    //获取App的dom节点
    const oApp = doc.querySelector("#app");
    //初始化
    const init = async () => {

        render();
        await setNewsList();
        bindEvent();
    };
    //存入wrapper的html内容
    let oListWrapper = null;

    let time = null;
    //类型
    const config = {
        type: "top",
        count: 10,
        pageNum: 0,
        isLoading: false,
    };
    //请求暂存
    const newsData = {};
    //传入数据,而后渲染出list,插入wrapper
    function renderList(data) {
        const { pageNum } = config;
        const newsListTpl = NewsList.tpl({
            data,
            pageNum,
        });
        MoreLoading.remove(oListWrapper)
        //把listTpl的html塞入到wrapper里
        oListWrapper.innerHTML += newsListTpl;
        config.isLoading = false;
        NewsList.imgShow();
    }
    //用于初始化的时候执行
    function bindEvent() {

        //给NavBar传递setType
        NavBar.bindEvent(setType);

        window.addEventListener("scroll", scrollToBottom.bind(null, getMoreList));

        NewsList.bindEvent(oListWrapper, setCurrentNews)
    }
    //执行render 将各个模板渲染出来
    function render() {
        //渲染Header模板，并将数据传入其中
        const headerTpl = Header.tpl({
            url: "/",
            title: "新闻头条",
            showLeftIcon: false,
            showRightIcon: true,
        });

        const navBarTpl = NavBar.tpl(NEWS_TYPE);
        const listWrapper = NewsList.wrapperTpl(82);
        oApp.innerHTML += headerTpl + navBarTpl + listWrapper;
        oListWrapper = document.querySelector(".news-list");
    }
    //设置请求与缓存数据
    async function setNewsList() {
        const { type, count, pageNum } = config;
        //如果newsData有这个属性就跳过，没有就申请
        if (newsData[type]) {
            renderList(newsData[type][pageNum]);
            return;
        }
        //在数据List没有出来之前让wrapper显示loading图标
        oListWrapper.innerHTML = pageLoading.tpl()
        newsData[type] = await servicse.getNewsList(type, count);
        setTimeout(() => {
            oListWrapper.innerHTML = ""
            renderList(newsData[type][pageNum])
        }, 1500)
    }
    //设置config中的配置参数
    function setType(type) {
        config.type = type;
        config.pageNum = 0;
        config.isLoading = false;
        oListWrapper.innerHTML = "";
        //重新执行请求数据
        setNewsList()
    }
    //根据是否滑动到底部来添加 loading 加载新闻
    function getMoreList() {
        if (!config.isLoading) {
            config.pageNum++
            clearTimeout(time)
            const { type, pageNum } = config
            if (pageNum >= newsData[type].length) {
                MoreLoading.add(oListWrapper, false)
            } else {
                config.isLoading = true;
                MoreLoading.add(oListWrapper, true)
                time = setTimeout(() => {
                    setNewsList()
                }, 1000)
            }

        }
    }
    //获取点击跳转新闻的数据位置,并存入到localStorage
    function setCurrentNews(options) {
        const { idx, pageNum } = options;
        const currentNew = newsData[config.type][pageNum][idx]
        localStorage.setItem("currentNew", JSON.stringify(currentNew))
    }
    init();
})(document);
