var gradients = [];

var flyGradiend = {
  init: function init() {
    this.createGradient();
    this.setStartPosition();
    this.changePosition();
  },
  createGradient: function createGradient() {
    for (var i = 0; i < 10; i++) {
      gradients.push({
        tpl: "radial-gradient(circle farthest-side at $POSITION,\n\t\t\t\trgba(173,0,255,.3), rgba(173,0,255,0) 30%)"
      });
    }
  },
  element: document.getElementById('bg'),
  setStartPosition: function setStartPosition() {
    var _this = this;

    gradients.map(function (item) {
      item.position = _this.getNewPosition();
    });
    this.updateGradirntToElement();
  },
  getNewPosition: function getNewPosition() {
    var x = Math.round(Math.random() * 300) - 100;
    var y = Math.round(Math.random() * 300) - 100;
    return {
      x: x,
      y: y,

      get str() {
        return "".concat(this.x, "% ").concat(this.y, "%");
      }

    };
  },
  updateGradirntToElement: function updateGradirntToElement() {
    this.element.style.backgroundImage = this.getGradients();
  },
  getGradients: function getGradients() {
    return gradients.map(function (item) {
      return item.tpl.split('$POSITION').join(item.position.str);
    }).join(',');
  },
  changePosition: function changePosition() {
    var _this2 = this;

    gradients.map(function (item) {
      item.nextPosition = _this2.getNewPosition();
      item.speed = {
        x: (item.nextPosition.x - item.position.x) / 500,
        y: (item.nextPosition.y - item.position.y) / 500
      };

      _this2.animateGradientPosition(item);
    });
  },
  animateGradientPosition: function animateGradientPosition(item) {
    if (Math.abs(item.nextPosition.x - item.position.x) <= 1) {
      this.clearItemsTimeout();
      this.changePosition();
    } else {
      item.position.x = item.position.x + item.speed.x;
      item.position.y = item.position.y + item.speed.y;
      this.updateGradirntToElement();
      item.timeout = setTimeout(this.animateGradientPosition.bind(this), 25, item);
    }
  },
  clearItemsTimeout: function clearItemsTimeout() {
    gradients.map(function (item) {
      clearTimeout(item.timeout);
    });
  }
};
flyGradiend.init();
