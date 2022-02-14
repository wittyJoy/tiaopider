<template>
  <div class="wrapper">
    <mini-player ref="musicRef" :list="tracks" />
    <dance-girl />
    <!-- <div v-if="!isLogin" class="loginModel">
      <div class="loginBox">
        <div class="login-title">账号登录</div>
        <div class="number-login">
          <input v-model="loginParam.phone" type="text" placeholder="手机号码" /><br />
          <input v-model="loginParam.password" type="password" placeholder="密码" />
        </div>
        <div class="btn-login" @click="login">登录</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import musicApi from '@/api/music.js';
import danceGirl from '@/components/dance-girl.vue';
import miniPlayer from '@/components/mini-player';

export default {
  name: 'music-player',
  data() {
    return {
      isLogin: false,
      loginParam: {},
      /** 歌曲播放清单 */
      tracks: [],
    };
  },

  components: { danceGirl, miniPlayer },

  async created() {
    await this.getNewSongs();
    // this.$refs.musicRef.tracks = this.tracks;
  },

  async mounted() {
    // let loginParam = {};
    // loginParam.phone = prompt('手机号码?');
    // loginParam.password = prompt('密码?', '请在这里输入密码');
    // await musicApi.loginMusic(loginParam);
    if (Cookies.get('__remember_me')) {
      this.isLogin = true;
    }
  },

  methods: {
    async login() {
      const { code, message } = await musicApi.loginMusic(this.loginParam);
      if (code === 200) {
        this.$router.push('music').catch(err => {
          err;
        });
      } else {
        console.error(message);
      }
    },
    /** 获取推荐新音乐 */
    async getNewSongs() {
      const { code, result: data, message } = await musicApi.getNewSongs();
      if (code === 200) {
        this.tracks = data.map((item, index) => {
          return {
            id: index,
            name: item.name,
            artist: item.song.artists[0].name,
            cover: item.picUrl,
            source: `https://music.163.com/song/media/outer/url?id=${item.id}`,
            url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
            favorited: true,
          };
        });
      } else {
        console.error(message);
      }
    },
    /** 获取每日推荐歌曲 */
    async getRecommendList() {
      const { code, result: data, message } = await musicApi.getRecommendList();
      if (code === 200) {
        this.tracks = data.map((item, index) => {
          return {
            id: index,
            name: item.name,
            artist: item.song.artists[0].name,
            cover: item.picUrl,
            source: `https://music.163.com/song/media/outer/url?id=${item.id}`,
            url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
            favorited: true,
          };
        });
      } else {
        console.error(message);
      }
    },
    /** 获取歌词 */
    async getLjjjj() {},
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
.loginModel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .loginBox {
    position: relative;
    border: 1px solid #555555;
    border-radius: 5px;
    width: 300px;
    height: 400px;
    background-image: linear-gradient(135deg, #8bc5ff, #abfffb);
    // background-color: #ffffff;
    /** ----------------------------------------------------------- */

    .login-title {
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 24px;
      color: #ff6700;
    }
    .number-login {
      width: 80%;
      margin: auto;
      input {
        border: 1px solid #e8e8e8;
        border-radius: 5px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        outline: none;
        text-indent: 20px;
        margin-top: 20px;
      }
    }
    .btn-login {
      border-radius: 5px;
      width: 80%;
      height: 40px;
      margin: auto;
      margin-top: 20px;
      background-color: #ff6700;
      color: white;
      text-align: center;
      line-height: 40px;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>
