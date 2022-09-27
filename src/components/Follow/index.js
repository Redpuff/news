import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/utils';

export default {
  name: 'Follow',
  //渲染收藏时的元素
  follow() {
    return tplReplace(tpl, {
      star: 'star'
    })
  },
  //渲染取消收藏时的元素
  unfollow() {
    return tplReplace(tpl, {
      star: 'star-o'
    })
  },
  //绑定事件,传入一个回调函数(doFollow用来决定删除还是添加local storage),操作follow标签
  bindEvent(doFollow) {
    const oFollow = document.querySelector('.follow');
    oFollow.addEventListener('click', this._setFollow.bind(this, oFollow, doFollow));
  },
  //获取收藏页面的class
  _setFollow(oFollow, doFollow) {
    const className = oFollow.className;
    oFollow.className = 'follow iconfont icon-';

    switch (className) {
      case 'follow iconfont icon-star':
        oFollow.className += 'star-o';
        doFollow(false);
        break;
      case 'follow iconfont icon-star-o':
        oFollow.className += 'star';
        doFollow(true);
        break;
      default:
        break;
    }
  }
}