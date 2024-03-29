/** 初始化"渲染器" */
let RENDERER = {
  /** 点の间距 */
  POINT_INTERVAL: 5,
  /** 鱼の数量 */
  FISH_COUNT: 3,
  /** 最大间隔数 */
  MAX_INTERVAL_COUNT: 50,
  /** 初始高度/百分比 */
  INIT_HEIGHT_RATE: 0.5,
  /** 门槛 */
  THRESHOLD: 50,

  init: function() {
    this.setParameters();
    this.reconstructMethods();
    this.setup();
    this.bindEvent();
    this.render();
  },

  /** 设置参数 */
  setParameters: function() {
    this.$window = window;
    this.$document = document.body;
    this.$container = document.getElementById('jsi-flying-fish-container');
    this.$canvas = document.createElement('canvas');
    this.$container.appendChild(this.$canvas);
    this.context = this.$canvas.getContext('2d');
    this.points = [];
    this.fishes = [];
    this.watchIds = [];
  },

  /** 创建表面点 */
  createSurfacePoints: function() {
    let count = Math.round(this.width / this.POINT_INTERVAL);
    this.pointInterval = this.width / (count - 1);
    this.points.push(new SURFACE_POINT(this, 0));

    for (let i = 1; i < count; i++) {
      let point = new SURFACE_POINT(this, i * this.pointInterval),
        previous = this.points[i - 1];

      point.setPreviousPoint(previous);
      previous.setNextPoint(point);
      this.points.push(point);
    }
  },

  /** 重建方法 */
  reconstructMethods: function() {
    this.watchWindowSize = this.watchWindowSize.bind(this);
    this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
    this.startEpicenter = this.startEpicenter.bind(this);
    this.moveEpicenter = this.moveEpicenter.bind(this);
    this.reverseVertical = this.reverseVertical.bind(this);
    this.render = this.render.bind(this);
  },
  setup: function() {
    this.points.length = 0;
    this.fishes.length = 0;
    this.watchIds.length = 0;
    this.intervalCount = this.MAX_INTERVAL_COUNT;
    this.width = this.$container.offsetWidth;
    // this.height = this.$container.offsetHeight;
    this.height = 140;
    this.fishCount = (((this.FISH_COUNT * this.width) / 500) * this.height) / 500;
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;
    this.reverse = false;

    this.fishes.push(new FISH(this));
    this.createSurfacePoints();
  },

  /** 观察窗口大小 */
  watchWindowSize: function() {
    this.clearTimer();
    this.tmpWidth = this.$window.outerWidth;
    this.tmpHeight = this.$window.outerHeight;
    this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL));
  },
  clearTimer: function() {
    while (this.watchIds.length > 0) {
      clearTimeout(this.watchIds.pop());
    }
  },

  /** 转到停止调整大小 */
  jdugeToStopResize: function() {
    let width = this.$window.outerWidth,
      height = this.$window.outerHeight,
      stopped = (width == this.tmpWidth) && (height == this.tmpHeight);

    this.tmpWidth = width;
    this.tmpHeight = height;

    if (stopped) {
      this.setup();
    }
  },
  bindEvent: function() {
    this.$window.onresize = this.watchWindowSize;
    // this.$container.onclick = this.reverseVertical;
    this.$container.onmouseenter = this.startEpicenter;
    // this.$container.addEventListener('onmousemove', this.moveEpicenter);
    this.$container.onmousemove = this.moveEpicenter;
  },
  getAxis: function(event) {
    let offset = this.getOffset(this.$container);
    return {
      x: event.clientX - offset.left + this.$document.scrollLeft,
      y: event.clientY - offset.top + this.$document.scrollTop,
    };
  },

  getOffset: function(Node, offset) {
    if (!offset) {
      offset = {};
      offset.top = 0;
      offset.left = 0;
    }
    if (Node == document.body) {
      //当该节点为body节点时，结束递归
      return offset;
    }
    offset.top += Node.offsetTop;
    offset.left += Node.offsetLeft;
    return this.getOffset(Node.parentNode, offset); //向上累加offset里的值
  },

  /** 开始中心 */
  startEpicenter: function(event) {
    this.axis = this.getAxis(event);
  },

  /** 移动中心 */
  moveEpicenter: function(event) {
    let axis = this.getAxis(event);

    if (!this.axis) {
      this.axis = axis;
    }
    this.generateEpicenter(axis.x, axis.y, axis.y - this.axis.y);
    this.axis = axis;
  },

  /** 生成中心 */
  generateEpicenter: function(x, y, velocity) {
    if (y < this.height / 2 - this.THRESHOLD || y > this.height / 2 + this.THRESHOLD) {
      return;
    }
    let index = Math.round(x / this.pointInterval);

    if (index < 0 || index >= this.points.length) {
      return;
    }
    this.points[index].interfere(y, velocity);
  },

  /** 翻转 */
  reverseVertical: function() {
    this.reverse = !this.reverse;

    for (let i = 0, count = this.fishes.length; i < count; i++) {
      this.fishes[i].reverseVertical();
    }
  },

  /** 控制状态 */
  controlStatus: function() {
    for (let i = 0, count = this.points.length; i < count; i++) {
      this.points[i].updateSelf();
    }
    for (let i = 0, count = this.points.length; i < count; i++) {
      this.points[i].updateNeighbors();
    }
    if (this.fishes.length < this.fishCount) {
      if (--this.intervalCount == 0) {
        this.intervalCount = this.MAX_INTERVAL_COUNT;
        this.fishes.push(new FISH(this));
      }
    }
  },
  /** 渲染 */
  render: function() {
    /** 请求动画帧 */
    requestAnimationFrame(this.render);
    this.controlStatus();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'hsla(0, 0%, 95%, 1)';

    for (let i = 0, count = this.fishes.length; i < count; i++) {
      this.fishes[i].render(this.context);
    }
    this.context.save();
    this.context.globalCompositeOperation = 'xor';
    this.context.beginPath();
    this.context.moveTo(0, this.reverse ? 0 : this.height);

    for (let i = 0, count = this.points.length; i < count; i++) {
      this.points[i].render(this.context);
    }
    this.context.lineTo(this.width, this.reverse ? 0 : this.height);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  },
};

/** 初始化"表面点" */
let SURFACE_POINT = function(renderer, x) {
  this.renderer = renderer;
  this.x = x;
  this.init();
};
SURFACE_POINT.prototype = {
  SPRING_CONSTANT: 0.03,
  SPRING_FRICTION: 0.9,
  WAVE_SPREAD: 0.3,
  ACCELARATION_RATE: 0.01,

  init: function() {
    this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
    this.height = this.initHeight;
    this.fy = 0;
    this.force = { previous: 0, next: 0 };
  },

  /** 设置上一点 */
  setPreviousPoint: function(previous) {
    this.previous = previous;
  },

  /** 设置下一个点 */
  setNextPoint: function(next) {
    this.next = next;
  },

  /** 干涉 */
  interfere: function(y, velocity) {
    this.fy = this.renderer.height * this.ACCELARATION_RATE * (this.renderer.height - this.height - y >= 0 ? -1 : 1) * Math.abs(velocity);
  },

  /** 更新自己 */
  updateSelf: function() {
    this.fy += this.SPRING_CONSTANT * (this.initHeight - this.height);
    this.fy *= this.SPRING_FRICTION;
    this.height += this.fy;
  },

  /** 更新邻居 */
  updateNeighbors: function() {
    if (this.previous) {
      this.force.previous = this.WAVE_SPREAD * (this.height - this.previous.height);
    }
    if (this.next) {
      this.force.next = this.WAVE_SPREAD * (this.height - this.next.height);
    }
  },

  /** 渲染 */
  render: function(context) {
    if (this.previous) {
      this.previous.height += this.force.previous;
      this.previous.fy += this.force.previous;
    }
    if (this.next) {
      this.next.height += this.force.next;
      this.next.fy += this.force.next;
    }
    context.lineTo(this.x, this.renderer.height - this.height);
  },
};

/** 初始化"鱼" */
let FISH = function(renderer) {
  this.renderer = renderer;
  this.init();
};
FISH.prototype = {
  GRAVITY: 0.4,

  init: function() {
    this.direction = Math.random() < 0.5;
    this.x = this.direction ? this.renderer.width + this.renderer.THRESHOLD : -this.renderer.THRESHOLD;
    this.previousY = this.y;
    this.vx = this.getRandomValue(4, 10) * (this.direction ? -1 : 1);

    if (this.renderer.reverse) {
      this.y = this.getRandomValue((this.renderer.height * 1) / 10, (this.renderer.height * 4) / 10);
      this.vy = this.getRandomValue(2, 5);
      this.ay = this.getRandomValue(0.05, 0.2);
    } else {
      this.y = this.getRandomValue((this.renderer.height * 6) / 10, (this.renderer.height * 9) / 10);
      this.vy = this.getRandomValue(-5, -2);
      this.ay = this.getRandomValue(-0.2, -0.05);
    }
    this.isOut = false;
    this.theta = 0;
    this.phi = 0;
  },
  /** 获取随机值 */
  getRandomValue: function(min, max) {
    return min + (max - min) * Math.random();
  },
  /** 翻转 */
  reverseVertical: function() {
    this.isOut = !this.isOut;
    this.ay *= -1;
  },
  /** 控制状态 */
  controlStatus: function(context) {
    this.previousY = this.y;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.ay;

    if (this.renderer.reverse) {
      if (this.y > this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
        this.vy -= this.GRAVITY;
        this.isOut = true;
      } else {
        if (this.isOut) {
          this.ay = this.getRandomValue(0.05, 0.2);
        }
        this.isOut = false;
      }
    } else {
      if (this.y < this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
        this.vy += this.GRAVITY;
        this.isOut = true;
      } else {
        if (this.isOut) {
          this.ay = this.getRandomValue(-0.2, -0.05);
        }
        this.isOut = false;
      }
    }
    if (!this.isOut) {
      this.theta += Math.PI / 20;
      this.theta %= Math.PI * 2;
      this.phi += Math.PI / 30;
      this.phi %= Math.PI * 2;
    }
    this.renderer.generateEpicenter(this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD, this.y, this.y - this.previousY);

    if ((this.vx > 0 && this.x > this.renderer.width + this.renderer.THRESHOLD) || (this.vx < 0 && this.x < -this.renderer.THRESHOLD)) {
      this.init();
    }
  },
  /** 渲染 */
  render: function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(Math.PI + Math.atan2(this.vy, this.vx));
    context.scale(1, this.direction ? 1 : -1);
    context.beginPath();
    context.moveTo(-30, 0);
    context.bezierCurveTo(-20, 15, 15, 10, 40, 0);
    context.bezierCurveTo(15, -10, -20, -15, -30, 0);
    context.fill();

    context.save();
    context.translate(40, 0);
    context.scale(0.9 + 0.2 * Math.sin(this.theta), 1);
    context.beginPath();
    context.moveTo(0, 0);
    context.quadraticCurveTo(5, 10, 20, 8);
    context.quadraticCurveTo(12, 5, 10, 0);
    context.quadraticCurveTo(12, -5, 20, -8);
    context.quadraticCurveTo(5, -10, 0, 0);
    context.fill();
    context.restore();

    context.save();
    context.translate(-3, 0);
    context.rotate((Math.PI / 3 + (Math.PI / 10) * Math.sin(this.phi)) * (this.renderer.reverse ? -1 : 1));

    context.beginPath();

    if (this.renderer.reverse) {
      context.moveTo(5, 0);
      context.bezierCurveTo(10, 10, 10, 30, 0, 40);
      context.bezierCurveTo(-12, 25, -8, 10, 0, 0);
    } else {
      context.moveTo(-5, 0);
      context.bezierCurveTo(-10, -10, -10, -30, 0, -40);
      context.bezierCurveTo(12, -25, 8, -10, 0, 0);
    }
    context.closePath();
    context.fill();
    context.restore();
    context.restore();
    this.controlStatus(context);
  },
};

window.onload = () => {
  RENDERER.init();
};
