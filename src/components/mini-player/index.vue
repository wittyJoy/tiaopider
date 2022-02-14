<template>
  <div class="player">
    <div class="player__top">
      <div class="player-cover">
        <transition-group :name="transitionName">
          <div
            class="player-cover__item"
            v-for="track in tracks"
            :key="track.id"
            v-show="track.id === currentTrackIndex"
            :style="track.id === currentTrackIndex ? { backgroundImage: `url(${track.cover})` } : {}"
          ></div>
        </transition-group>
      </div>
      <div class="player-controls">
        <div class="player-controls__item -favorite" :class="{ active: currentTrack.favorited }" @click="favorite">
          <svg-icon icon="heart-o" icon-class="icon" />
        </div>
        <a :href="currentTrack.url" target="_blank" class="player-controls__item">
          <svg-icon icon="link" icon-class="icon" />
        </a>
        <div class="player-controls__item" @click="prevTrack">
          <svg-icon icon="prev" icon-class="icon" />
        </div>
        <div class="player-controls__item" @click="nextTrack">
          <svg class="icon">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
        <div class="player-controls__item -xl js-play" @click="play">
          <svg-icon icon="pause" icon-class="icon" v-if="isTimerPlaying" />
          <svg-icon icon-class="icon" icon="play" v-else />
        </div>
      </div>
    </div>
    <div class="progress" ref="progress">
      <div class="progress__top">
        <div class="album-info" v-if="currentTrack">
          <div class="album-info__name" :key="currentTrack.artist">{{ currentTrack.artist }}</div>
          <div class="album-info__track" :key="currentTrack.name">{{ currentTrack.name }}</div>
        </div>
        <div class="progress__duration" :key="duration">{{ duration }}</div>
      </div>
      <div class="progress__bar" @click="clickProgress">
        <div class="progress__current" :style="{ width: barWidth }"></div>
      </div>
      <div class="progress__time" :key="currentTime">{{ currentTime }}</div>
    </div>
    <div v-cloak></div>
  </div>
</template>

<script>
export default {
  name: 'mini-player',
  props: {
    /** 歌曲播放清单 */
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [],
      currentTrack: {},
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  watch: {
    'list.length'() {
      this.tracks = this.list.map(v => v);
      this.init();
      // this.$forceUpdate();
      // this.$set(
      //   this,
      //   'tracks',
      //   this.list.map(v => v)
      // );
    },
  },

  created() {
    let _this = this;
    this.audio = new Audio();
    this.audio.ontimeupdate = () => {
      _this.generateTime();
    };
    this.audio.onloadedmetadata = () => {
      _this.generateTime();
    };
    this.audio.onended = () => {
      _this.nextTrack();
      this.isTimerPlaying = true;
    };
  },

  mounted() {},

  methods: {
    init() {
      this.currentTrack = this.tracks[0];
      this.audio.src = this.currentTrack.source;

      // 用于预加载图片 (这是可选的)
      for (let index = 0; index < this.tracks.length; index++) {
        const element = this.tracks[index];
        let link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = element.cover;
        link.as = 'image';
        document.head.appendChild(link);
      }
    },
    /** 播放/暂停 */
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    /** 计算时间 */
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      // this.barWidth = width + '%';
      // this.circleLeft = width + '%';
      this.barWidth = `${width}%`;
      this.circleLeft = `${width}%`;
      let durmin = Math.floor(this.audio.duration / 60) || 0;
      let dursec = Math.floor(this.audio.duration - durmin * 60) || 0;
      let curmin = Math.floor(this.audio.currentTime / 60) || 0;
      let cursec = Math.floor(this.audio.currentTime - curmin * 60) || 0;
      if (durmin < 10) {
        // durmin = '0' + durmin;
        durmin = `0${durmin}`;
      }
      if (dursec < 10) {
        // dursec = '0' + dursec;
        dursec = `0${dursec}`;
      }
      if (curmin < 10) {
        // curmin = '0' + curmin;
        curmin = `0${curmin}`;
      }
      if (cursec < 10) {
        // cursec = '0' + cursec;
        cursec = `0${cursec}`;
      }
      // this.duration = durmin + ':' + dursec;
      // this.currentTime = curmin + ':' + cursec;
      this.duration = `${durmin}:${dursec}`;
      this.currentTime = `${curmin}:${cursec}`;
    },

    /** 进度条 */
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      // this.barWidth = percentage + '%';
      // this.circleLeft = percentage + '%';
      this.barWidth = `${percentage}%`;
      this.circleLeft = `${percentage}%`;
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },

    /** 点击进度条 */
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },

    /** 上一首 */
    prevTrack() {
      this.transitionName = 'scale-in';
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },

    /** 下一首 */
    nextTrack() {
      this.transitionName = 'scale-out';
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.$forceUpdate();
      this.resetPlayer();
    },

    /** 重置播放器 */
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },

    /** 收藏 */
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited;
    },
  },
};
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.player {
  display: inline-block;
  background: #eef3f7;
  width: 410px;
  min-height: 480px;
  // box-shadow: 0px 55px 75px -10px rgba(76, 70, 124, 0.5);
  // box-shadow: 0px 55px 105px 10px rgba(76, 70, 124, 0.35);
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  padding: 30px;
  margin: 30px 0 0 30px;
  @media screen and (max-width: 576px), (max-height: 500px) {
    width: 90%;
    min-width: 310px;
    padding: 20px;
    margin: 75px 20px 0;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
  @media screen and (min-width: 576px) {
    margin-left: 75px;
  }
  &__top {
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 4;
    @media screen and (max-width: 576px), (max-height: 500px) {
      flex-wrap: wrap;
    }
  }

  &-cover {
    width: 300px;
    height: 300px;
    margin-left: -70px;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    border-radius: 15px;
    // transform: perspective(512px) translate3d(0, 0, 0);
    // transition: all .4s cubic-bezier(.125, .625, .125, .875);
    z-index: 1;

    @media screen and (max-width: 576px), (max-height: 500px) {
      margin-top: -70px;
      margin-bottom: 25px;
      width: 290px;
      height: 290px;
      margin-left: auto;
      margin-right: auto;
    }

    &__item {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      position: absolute;
      left: 0;
      top: 0;

      &:before {
        content: '';
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 1;
        position: absolute;
        top: 30px;
        transform: scale(0.9);
        filter: blur(10px);
        opacity: 0.9;
        border-radius: 15px;
      }

      &:after {
        content: '';
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 2;
        position: absolute;
        border-radius: 15px;
      }
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
      box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
      user-select: none;
      pointer-events: none;
    }
  }

  &-controls {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 576px), (max-height: 500px) {
      flex-direction: row;
      padding-left: 0;
      width: 100%;
      flex: unset;
    }

    &__item {
      display: inline-flex;
      font-size: 30px;
      padding: 5px;
      margin-bottom: 10px;
      color: #acb8cc;
      cursor: pointer;
      width: 50px;
      height: 50px;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease-in-out;

      @media screen and (max-width: 576px), (max-height: 500px) {
        font-size: 26px;
        padding: 5px;
        margin-right: 10px;
        color: #acb8cc;
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin-bottom: 0;
      }

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #fff;
        transform: scale(0.5);
        opacity: 0;
        box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
        transition: all 0.3s ease-in-out;
        transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
      }

      @media screen and (min-width: 500px) {
        &:hover {
          color: #532ab9;

          &::before {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      }

      @media screen and (max-width: 576px), (max-height: 500px) {
        &:active {
          color: #532ab9;

          &::before {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      }

      .icon {
        position: relative;
        z-index: 2;
      }

      &.-xl {
        margin-bottom: 0;
        font-size: 95px;
        // filter: drop-shadow(0 2px 8px rgba(172, 184, 204, 0.3));
        // filter: drop-shadow(0 9px 6px rgba(172, 184, 204, 0.35));
        filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
        color: #fff;
        width: auto;
        height: auto;
        display: inline-flex;
        @media screen and (max-width: 576px), (max-height: 500px) {
          margin-left: auto;
          font-size: 75px;
          margin-right: 0;
        }
        &:before {
          display: none;
        }
      }

      &.-favorite {
        &.active {
          color: red;
        }
      }
    }
  }
}
[v-cloak] {
  display: none;
}
[v-cloak] > * {
  display: none;
}
.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
  &__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__duration {
    color: #71829e;
    font-weight: 700;
    font-size: 20px;
    opacity: 0.5;
  }
  &__time {
    margin-top: 2px;
    color: #71829e;
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
  }
}
.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}
.progress__current {
  height: inherit;
  width: 0%;
  background-color: #a3b3ce;
  border-radius: 10px;
}

.album-info {
  color: #71829e;
  flex: 1;
  padding-right: 60px;
  user-select: none;

  @media screen and (max-width: 576px), (max-height: 500px) {
    padding-right: 30px;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    line-height: 1.3em;
    @media screen and (max-width: 576px), (max-height: 500px) {
      font-size: 18px;
      margin-bottom: 9px;
    }
  }
  &__track {
    font-weight: 400;
    font-size: 20px;
    opacity: 0.7;
    line-height: 1.3em;
    min-height: 52px;
    @media screen and (max-width: 576px), (max-height: 500px) {
      font-size: 18px;
      min-height: 50px;
    }
  }
}

//scale out

.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}
.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}
.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

//scale in

.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}
.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}
.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}
.scale-in-leave-to {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
</style>
