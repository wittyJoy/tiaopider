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
};
