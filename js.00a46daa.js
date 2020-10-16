// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Joystick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Joystick = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Joystick = /*#__PURE__*/function () {
  function Joystick(element) {
    _classCallCheck(this, Joystick);

    this.element = element;
    this.CIR_OFFSET_X = 23;
    this.CIR_OFFSET_Y = 25;
    this.RANGE = 2;
    this.ROTATE_RANGE = 2.5;
    this.joyCoordinates = {
      x: this.element.getBoundingClientRect().left + this.CIR_OFFSET_X,
      y: this.element.getBoundingClientRect().top + this.CIR_OFFSET_Y
    };
    this.ORIGIN_JOY_COORDINATES = this.joyCoordinates;
    this.isActive = false;
    this.countLeft = 0;
    this.countRight = 0;
  }

  _createClass(Joystick, [{
    key: "update",
    value: function update(mouse, self, screen, moveScreen) {
      if (self.isActive) {
        var offsetX = (self.joyCoordinates.x - mouse.x) / -self.RANGE;
        var offsetY = (self.joyCoordinates.y - mouse.y) / -self.RANGE;
        var rotateY = offsetX * self.ROTATE_RANGE;
        var rotateX = offsetY * -self.ROTATE_RANGE;
        console.log(offsetX, offsetY);
        self.element.style.transform = "translateX(".concat(offsetX, "px) translateY(").concat(offsetY, "px) rotateY(").concat(rotateY, "deg) rotateX(").concat(rotateX, "deg) perspective(5000rem)");
        self.updateCoordinates(self);

        if (offsetX >= 5) {
          if (self.countRight >= 20) {
            moveScreen.right(screen);
            self.countRight = 0;
          }

          self.countRight++;
        } else if (offsetX <= -6) {
          if (self.countLeft >= 20) {
            moveScreen.left(screen);
            self.countLeft = 0;
          }

          self.countLeft++;
        }
      } else {
        self.element.style.transform = '';
        self.joyCoordinates.x = self.ORIGIN_JOY_COORDINATES.x;
        self.joyCoordinates.y = self.ORIGIN_JOY_COORDINATES.y;
        self.countLeft = 0;
        self.countRight = 0;
      }
    }
  }, {
    key: "updateCoordinates",
    value: function updateCoordinates(self) {
      self.joyCoordinates.x = self.element.getBoundingClientRect().left + self.CIR_OFFSET_X;
      self.joyCoordinates.y = self.element.getBoundingClientRect().top + self.CIR_OFFSET_Y;
    }
  }]);

  return Joystick;
}();

exports.Joystick = Joystick;
},{}],"assets/video/Mario.mp4":[function(require,module,exports) {
module.exports = "/Mario.adde6a2d.mp4";
},{}],"assets/video/Zelda.mp4":[function(require,module,exports) {
module.exports = "/Zelda.67125ac1.mp4";
},{}],"assets/video/1-2.mp4":[function(require,module,exports) {
module.exports = "/1-2.3b9baeae.mp4";
},{}],"assets/video/Arms.mp4":[function(require,module,exports) {
module.exports = "/Arms.39c39c31.mp4";
},{}],"assets/video/Snipperclip.mp4":[function(require,module,exports) {
module.exports = "/Snipperclip.7677fb14.mp4";
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _Joystick = require("./Joystick");

var _Mario = _interopRequireDefault(require("../assets/video/Mario.mp4"));

var _Zelda = _interopRequireDefault(require("../assets/video/Zelda.mp4"));

var _ = _interopRequireDefault(require("../assets/video/1-2.mp4"));

var _Arms = _interopRequireDefault(require("../assets/video/Arms.mp4"));

var _Snipperclip = _interopRequireDefault(require("../assets/video/Snipperclip.mp4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leftJoystick = new _Joystick.Joystick(document.querySelector('.left-joycon .joystick'));
var rightJoystick = new _Joystick.Joystick(document.querySelector('.right-joycon .joystick'));
addEvents(leftJoystick, mouseMove);
addEvents(rightJoystick, mouseMove);
var btnHome = document.querySelector('.right-joycon .button-home');
var btnA = document.querySelector('.right-joycon .button-right');
var btnB = document.querySelector('.right-joycon .button-down');
var screen = document.querySelector('.screen');
var video = document.querySelector('.video');
var audioRun = document.querySelector('.runAudio');
var audioHome = document.querySelector('.homeAudio');
var audioOn = document.querySelector('.onAudio');
var audioOff = document.querySelector('.offAudio');
var mouse = {
  x: 0,
  y: 0
};

function mouseMove(e, joystick) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  requestAnimationFrame(function () {
    return joystick.update(mouse, joystick, screen, {
      right: moveRight,
      left: moveLeft
    });
  });
}

;

function addMouseMove(mouseMove, joystick) {
  joystick.isActive = true;
  joystick.element.addEventListener('mousemove', function (e) {
    mouseMove(e, joystick);
  });
}

;

function addEvents(joystick, mouseMove) {
  joystick.element.addEventListener('mousedown', function () {
    return addMouseMove(mouseMove, joystick);
  });
  removeEvents(mouseMove, joystick);
}

function removeEvents(mouseMove, joystick) {
  joystick.element.addEventListener('mouseup', function () {
    return removeMouseMove(mouseMove, joystick);
  });
  joystick.element.addEventListener('mouseout', function () {
    return removeMouseMove(mouseMove, joystick);
  });
}

function removeMouseMove(mouseMove, joystick) {
  joystick.isActive = false;
  joystick.element.removeEventListener('mousemove', function (e) {
    mouseMove(e, joystick);
  });
  requestAnimationFrame(function () {
    return joystick.update(mouse, joystick);
  });
}

btnHome.addEventListener('click', function (e) {
  if (!screen.classList.contains('opacity')) {
    audioOn.play();
  } else {
    audioOff.play();
  }

  video.pause();
  video.src = '';
  screen.classList.toggle('opacity');
  screen.classList.remove('menu-2', 'menu-3', 'menu-4', 'menu-5');
});
var rightArrow = document.querySelector('.left-joycon .button-arrow-right');
rightArrow.addEventListener('click', function (e) {
  moveRight(screen);
});
var leftArrow = document.querySelector('.left-joycon .button-arrow-left');
leftArrow.addEventListener('click', function (e) {
  moveLeft(screen);
});

function moveRight(screen) {
  if (screen.classList.contains('opacity')) {
    if (!screen.classList.contains('menu-2')) {
      screen.classList.add('menu-2');
    } else {
      if (!screen.classList.contains('menu-3')) {
        screen.classList.add('menu-3');
      } else {
        if (!screen.classList.contains('menu-4')) {
          screen.classList.add('menu-4');
        } else {
          if (!screen.classList.contains('menu-5')) {
            screen.classList.add('menu-5');
          }
        }
      }
    }
  }
}

function moveLeft(screen) {
  if (screen.classList.contains('opacity')) {
    if (screen.classList.contains('menu-5')) {
      screen.classList.remove('menu-5');
    } else {
      if (screen.classList.contains('menu-4')) {
        screen.classList.remove('menu-4');
      } else {
        if (screen.classList.contains('menu-3')) {
          screen.classList.remove('menu-3');
        } else {
          if (screen.classList.contains('menu-2')) {
            screen.classList.remove('menu-2');
          }
        }
      }
    }
  }
}

btnA.addEventListener('click', function (e) {
  if (screen.classList.length === 2) {
    playVideo(_Zelda.default);
  }

  if (screen.classList.length === 3) {
    playVideo(_Mario.default);
  }

  if (screen.classList.length === 4) {
    playVideo(_.default);
  }

  if (screen.classList.length === 5) {
    playVideo(_Arms.default);
  }

  if (screen.classList.length === 6) {
    playVideo(_Snipperclip.default);
  }
});
btnB.addEventListener('click', function (e) {
  video.classList.remove('active');
  video.pause();
  audioHome.play();
  setTimeout(function () {
    video.src = '';
  }, 1000);
});

function playVideo(srcVideo) {
  audioRun.play();
  video.pause();
  video.src = srcVideo;
  video.load();
  setTimeout(function () {
    video.play();
  }, 1000);
  video.classList.add('active');
}
},{"./Joystick":"js/Joystick.js","../assets/video/Mario.mp4":"assets/video/Mario.mp4","../assets/video/Zelda.mp4":"assets/video/Zelda.mp4","../assets/video/1-2.mp4":"assets/video/1-2.mp4","../assets/video/Arms.mp4":"assets/video/Arms.mp4","../assets/video/Snipperclip.mp4":"assets/video/Snipperclip.mp4"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44415" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map