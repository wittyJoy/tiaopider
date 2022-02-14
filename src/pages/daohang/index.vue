<template>
  <div class="page">
    <!--视频头部背景-->
    <div class="banner-video">
      <!--视频来自阿里云首页，有需要请自行更换-->
      <!-- <video autoplay loop muted>
        <source
          src="https://cdn.jsdelivr.net/gh/5iux/uploads/pic/3840-banner.mp4"
          type="video/mp4"
        />
      </video> -->
      <!--注释掉图片可换成视频版本-->
      <!-- <img
        src="https://cn.bing.com//th?id=OHR.HuntsMesa_JA-JP3140979616_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
        alt=""
      /> -->
      <div class="bottom-cover" style="background-image: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(244 248 251 / 0.6) 50%, rgb(244 248 251) 100%)"></div>
    </div>

    <!-- 1234567890 -->
    <div class="container" style="margin-top: 100px; position: relative; z-index: 100">
      <!--搜索开始-->
      <!-- <div id="search" class="s-search">
        <div id="search-list" class="hide-type-list">
          <div
            class="search-group group-a s-current"
            style="padding-left: 20px"
          >
            <ul class="search-type">
              <li>
                <input
                  checked=""
                  hidden=""
                  type="radio"
                  name="type"
                  id="type-baidu"
                  value="https://www.baidu.com/s?wd="
                  data-placeholder="百度一下"
                /><label for="type-baidu"
                  ><span style="color: #2100e0">百度</span></label
                >
              </li>
              <li>
                <input
                  hidden=""
                  type="radio"
                  name="type"
                  id="type-google"
                  value="https://www.google.com.hk/search?hl=zh-CN&q="
                  data-placeholder="谷歌搜索"
                /><label for="type-google"
                  ><span style="color: #3b83fa">G</span
                  ><span style="color: #f3442c">o</span
                  ><span style="color: #ffc300">o</span
                  ><span style="color: #4696f8">g</span
                  ><span style="color: #2cab4e">l</span
                  ><span style="color: #f54231">e</span></label
                >
              </li>
              <li>
                <input
                  hidden=""
                  type="radio"
                  name="type"
                  id="type-duck"
                  value="https://duckduckgo.com/?q="
                  data-placeholder="Duckduckgo搜索"
                /><label for="type-duck"
                  ><span style="color: #b1870b">Duck</span></label
                >
              </li>
              <li>
                <input
                  hidden=""
                  type="radio"
                  name="type"
                  id="type-quan"
                  value="https://temai.m.taobao.com/search.html?pid=mm_30753570_11166349_39936732&union_lens=recoveryid%3A201_11.23.94.254_301551_1614246723242%3Bprepvid%3A201_11.23.94.254_301551_1614246723242&q="
                  data-placeholder="搜索淘宝优惠券"
                /><label for="type-quan"
                  ><span style="color: #ff5722">搜券</span></label
                >
              </li>
            </ul>
          </div>
        </div>
        <form
          action="https://www.baidu.com/s?wd="
          method="get"
          target="_blank"
          id="super-search-fm"
        >
          <input
            type="text"
            id="search-text"
            placeholder="百度一下"
            style="outline: 0"
            autocomplete="off"
          />
          <button class="submit" type="submit">
            <svg
              style="width: 20px; height: 20px; margin: 7px 0; color: #29f"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-sousuo"></use></svg
            ><span></span>
          </button>
          <ul id="word" style="display: none"></ul>
        </form>
        <div class="set-check hidden-xs">
          <input
            type="checkbox"
            id="set-search-blank"
            class="bubble-3"
            autocomplete="off"
          />
        </div>
      </div> -->
      <!--搜索结束-->
      <ul class="mylist row" v-for="(list, index) in urlList" :key="index">
        <!------>
        <li class="title">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${list.code}`"></use>
          </svg>
          {{ list.name }}
        </li>
        <li class="col-3 col-sm-3 col-md-3 col-lg-1" v-for="(urlink, urlinx) in list.urlList" :key="urlinx">
          <a rel="nofollow" :href="urlink.url" target="_blank"
            ><svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${urlink.code}`"></use></svg
            ><span>{{ urlink.name }}</span></a
          >
        </li>
      </ul>
      <div class="footer">
        <div class="info">
          <span>互联网ICP备案：<a href="http://beian.miit.gov.cn/" target="_blank">鄂ICP备19021491号-1</a></span>
        </div>
      </div>
    </div>

    <!-- 阿里图标库 -->
    <remote-script src="https://at.alicdn.com/t/font_1230786_ewprpwrczvj.js"></remote-script>
  </div>
</template>

<script>
import urlList from './url.js';
import '@/utils/importJs';
export default {
  name: '',
  props: [''],
  data() {
    return {
      urlList,
    };
  },

  components: {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style scoped lang="css">
.page {
  /* padding-bottom: 140px; */
}
svg.icon {
  width: 14px;
  height: 14px;
  margin: 0 5px 0 8px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.mylist {
  list-style: none;
  padding: 10px 20px;
  position: relative;
  z-index: 1000;
  margin: 20px 0;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 0.5rem 0.625rem #d4d4d44d;
}
.mylist li.col-3 {
  display: inline-block;
  width: 96px;
  transition: 0.3s all linear;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 0;
  border-radius: 10px;
}
.mylist li.col-3 svg {
  display: block;
  width: 45px;
  height: 45px;
  padding: 8px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 0 auto;
}
.mylist li.col-3:hover {
  background: #eee;
}
.mylist li.col-3 span {
  width: 100%;
  display: block;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 13px;
}

.mylist li a {
  color: #555;
  display: block;
}
.mylist li.title {
  width: 100%;
  min-width: auto;
  margin: 0;
  height: 35px;
  font-size: 16px;
  line-height: 33px;
  padding: 0 20px 0 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.banner-video {
  position: absolute;
  width: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  max-height: 750px;
}
.banner-video video {
  width: 2048px;
  float: left;
}
.banner-video img {
  width: 1920px;
  float: left;
}
.bottom-cover {
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0px;
  z-index: 10;
}
.container {
  /* width: 100%; */
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 30vw;
  color: #999;
  font-size: 12px;
  background: url('../../assets/img/warp-bg/footer.png') no-repeat;
  background-size: contain;
  background-position: center 0;
}
.footer .info {
  padding: 20px;
}

a:link {
  color: #999;
}
a:visited {
  color: #999;
}
/* --------------------- */

@media screen and (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
  .mylist li.col-3 {
    min-width: 132px;
  }
}
@media screen and (max-width: 992px) {
  .container {
    max-width: 960px;
  }
  .banner-video video {
    width: 1200px;
  }
  .banner-video img {
    width: 1200px;
  }
  div#navbarsExample05 {
    background: rgba(0, 0, 0, 0.8);
    padding: 10px 30px;
    border-radius: 20px;
  }
}
@media screen and (max-width: 767px) {
  .container {
    max-width: 720px;
  }
  .banner-video video {
    width: 960px;
  }
  .banner-video img {
    width: 960px;
  }
  .mylist {
    border-radius: 8px;
  }
  .mylist li.col-3 {
    margin: 5px 0 5px;
  }
  .mylist li.col-3 svg {
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
  }
  .mylist li.col-3 span {
    font-size: 12px;
  }
}
@media screen and (max-width: 560px) {
  .container {
    max-width: 540px;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background: #eee;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

::-webkit-scrollbar-corner {
  background: #ddd;
}
</style>
