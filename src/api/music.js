import request from '@/utils/request';

export default {
  /** @登录网易云  */
  loginMusic: param => {
    return request({
      url: `c-api/login/cellphone?phone=${param.phone}&password=${param.password}`,
      method: 'get',
    });
  },
  /** @新音乐推荐 */
  getNewSongs: () => {
    return request({
      url: 'c-api/personalized/newsong',
      method: 'get',
    });
  },
  /** @每日推荐 获取每日推荐的歌曲数据 */
  getRecommendList: () => {
    return request({
      url: 'c-api/recommend/songs',
      method: 'get',
    });
  },
  /** @获取歌词 */
  getlyric: id => {
    return request({
      url: `c-api/like?id=${id}`,
      method: 'get',
    });
  },
  /** @喜欢音乐 */
  likeMusic: id => {
    return request({
      url: `c-api/lyric?id=${id}`,
      method: 'get',
    });
  },
  /** @搜索 */
  likeMusic: param => {
    return request({
      url: `c-api/cloudsearch?keywords=${param.keywords}`,
      method: 'get',
    });
  },
};
