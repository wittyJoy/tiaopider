import request from '@/utils/request';

export default {
  /** @登录网易云  */
  loginMusic: param => {
    return request({
      url: `/login/cellphone?phone=${param.phone}&password=${param.password}`,
      method: 'get',
    });
  },
  /** @每日推荐 获取每日推荐的歌曲数据 */
  getRecommendList: () => {
    return request({
      url: '/recommend/songs',
      method: 'get',
    });
  },
  /** @获取歌词 */
  getlyric: id => {
    return request({
      url: `/like?id=${id}`,
      method: 'get',
    });
  },
  /** @喜欢音乐 */
  likeMusic: id => {
    return request({
      url: `/lyric?id=${id}`,
      method: 'get',
    });
  },
  /** @搜索 */
  likeMusic: param => {
    return request({
      url: `/cloudsearch?keywords=${param.keywords}`,
      method: 'get',
    });
  },
};
