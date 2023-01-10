/*!
 * ScrollTrigger 3.11.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
import {Observer as Observer2, _getTarget, _vertical, _horizontal, _scrollers, _proxies, _getScrollFunc, _getProxyProp, _getVelocityProp} from "../unoptimized/Observer.js";
var gsap, _coreInitted, _win, _doc, _docEl, _body, _root, _resizeDelay, _toArray, _clamp, _time2, _syncInterval, _refreshing, _pointerIsDown, _transformProp, _i, _prevWidth, _prevHeight, _autoRefresh, _sort, _suppressOverwrites, _ignoreResize, _normalizer, _ignoreMobileResize, _baseScreenHeight, _baseScreenWidth, _fixIOSBug, _context, _scrollRestoration, _limitCallbacks, _startup = 1, _getTime = Date.now, _time1 = _getTime(), _lastScrollTime = 0, _enabled = 0, _pointerDownHandler = function _pointerDownHandler2() {
  return _pointerIsDown = 1;
}, _pointerUpHandler = function _pointerUpHandler2() {
  return _pointerIsDown = 0;
}, _passThrough = function _passThrough2(v) {
  return v;
}, _round = function _round2(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
}, _windowExists = function _windowExists2() {
  return typeof window !== "undefined";
}, _getGSAP = function _getGSAP2() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
}, _isViewport = function _isViewport2(e) {
  return !!~_root.indexOf(e);
}, _getBoundsFunc = function _getBoundsFunc2(element) {
  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport(element) ? function() {
    _winOffsets.width = _win.innerWidth;
    _winOffsets.height = _win.innerHeight;
    return _winOffsets;
  } : function() {
    return _getBounds(element);
  });
}, _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
  var d = _ref.d, d2 = _ref.d2, a = _ref.a;
  return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
    return a()[d];
  } : function() {
    return (isViewport ? _win["inner" + d2] : scroller["client" + d2]) || 0;
  };
}, _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
    return _winOffsets;
  };
}, _maxScroll = function _maxScroll2(element, _ref2) {
  var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
  return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? (_docEl[s] || _body[s]) - (_win["inner" + d2] || _docEl["client" + d2] || _body["client" + d2]) : element[s] - element["offset" + d2];
}, _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
  for (var i = 0; i < _autoRefresh.length; i += 3) {
    (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
  }
}, _isString = function _isString2(value) {
  return typeof value === "string";
}, _isFunction = function _isFunction2(value) {
  return typeof value === "function";
}, _isNumber = function _isNumber2(value) {
  return typeof value === "number";
}, _isObject = function _isObject2(value) {
  return typeof value === "object";
}, _callIfFunc = function _callIfFunc2(value) {
  return _isFunction(value) && value();
}, _combineFunc = function _combineFunc2(f1, f2) {
  return function() {
    var result1 = _callIfFunc(f1), result2 = _callIfFunc(f2);
    return function() {
      _callIfFunc(result1);
      _callIfFunc(result2);
    };
  };
}, _endAnimation = function _endAnimation2(animation, reversed, pause) {
  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
}, _callback = function _callback2(self, func) {
  if (self.enabled) {
    var result = func(self);
    result && result.totalTime && (self.callbackAnimation = result);
  }
}, _abs = Math.abs, _scrollLeft = "scrollLeft", _scrollTop = "scrollTop", _left = "left", _top = "top", _right = "right", _bottom = "bottom", _width = "width", _height = "height", _Right = "Right", _Left = "Left", _Top = "Top", _Bottom = "Bottom", _padding = "padding", _margin = "margin", _Width = "Width", _Height = "Height", _px = "px", _getComputedStyle = function _getComputedStyle2(element) {
  return _win.getComputedStyle(element);
}, _makePositionable = function _makePositionable2(element) {
  var position = _getComputedStyle(element).position;
  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
}, _setDefaults = function _setDefaults2(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }
  return obj;
}, _getBounds = function _getBounds2(element, withoutTransforms) {
  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), bounds = element.getBoundingClientRect();
  tween && tween.progress(0).kill();
  return bounds;
}, _getSize = function _getSize2(element, _ref3) {
  var d2 = _ref3.d2;
  return element["offset" + d2] || element["client" + d2] || 0;
}, _getLabelRatioArray = function _getLabelRatioArray2(timeline) {
  var a = [], labels = timeline.labels, duration = timeline.duration(), p;
  for (p in labels) {
    a.push(labels[p] / duration);
  }
  return a;
}, _getClosestLabel = function _getClosestLabel2(animation) {
  return function(value) {
    return gsap.utils.snap(_getLabelRatioArray(animation), value);
  };
}, _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
  var snap = gsap.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b) {
    return a2 - b;
  });
  return a ? function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var i;
    if (!direction) {
      return snap(value);
    }
    if (direction > 0) {
      value -= threshold;
      for (i = 0; i < a.length; i++) {
        if (a[i] >= value) {
          return a[i];
        }
      }
      return a[i - 1];
    } else {
      i = a.length;
      value += threshold;
      while (i--) {
        if (a[i] <= value) {
          return a[i];
        }
      }
    }
    return a[0];
  } : function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var snapped = snap(value);
    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
  };
}, _getLabelAtDirection = function _getLabelAtDirection2(timeline) {
  return function(value, st) {
    return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
  };
}, _multiListener = function _multiListener2(func, element, types, callback) {
  return types.split(",").forEach(function(type) {
    return func(element, type, callback);
  });
}, _addListener = function _addListener2(element, type, func, nonPassive, capture) {
  return element.addEventListener(type, func, {
    passive: !nonPassive,
    capture: !!capture
  });
}, _removeListener = function _removeListener2(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
}, _wheelListener = function _wheelListener2(func, el, scrollFunc) {
  return scrollFunc && scrollFunc.wheelHandler && func(el, "wheel", scrollFunc);
}, _markerDefaults = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, _defaults = {
  toggleActions: "play",
  anticipatePin: 0
}, _keywords = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, _offsetToPx = function _offsetToPx2(value, size) {
  if (_isString(value)) {
    var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
    if (~eqIndex) {
      value.indexOf("%") > eqIndex && (relative *= size / 100);
      value = value.substr(0, eqIndex - 1);
    }
    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
  }
  return value;
}, _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
  var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
  var e = _doc.createElement("div"), useFixedPosition = _isViewport(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
  e._isStart = isStart;
  e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
  e.style.cssText = css;
  e.innerText = name || name === 0 ? type + "-" + name : type;
  parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
  e._offset = e["offset" + direction.op.d2];
  _positionMarker(e, 0, direction, isStart);
  return e;
}, _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
  var vars = {
    display: "block"
  }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
  marker._isFlipped = flipped;
  vars[direction.a + "Percent"] = flipped ? -100 : 0;
  vars[direction.a] = flipped ? "1px" : 0;
  vars["border" + side + _Width] = 1;
  vars["border" + oppositeSide + _Width] = 0;
  vars[direction.p] = start + "px";
  gsap.set(marker, vars);
}, _triggers = [], _ids = {}, _rafID, _sync = function _sync2() {
  return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
}, _onScroll = function _onScroll2() {
  if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) {
    _scrollers.cache++;
    if (_normalizer) {
      _rafID || (_rafID = requestAnimationFrame(_updateAll));
    } else {
      _updateAll();
    }
    _lastScrollTime || _dispatch("scrollStart");
    _lastScrollTime = _getTime();
  }
}, _setBaseDimensions = function _setBaseDimensions2() {
  _baseScreenWidth = _win.innerWidth;
  _baseScreenHeight = _win.innerHeight;
}, _onResize = function _onResize2() {
  _scrollers.cache++;
  !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > _win.innerHeight * 0.25) && _resizeDelay.restart(true);
}, _listeners = {}, _emptyArray = [], _softRefresh = function _softRefresh2() {
  return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh2) || _refreshAll(true);
}, _dispatch = function _dispatch2(type) {
  return _listeners[type] && _listeners[type].map(function(f) {
    return f();
  }) || _emptyArray;
}, _savedStyles = [], _revertRecorded = function _revertRecorded2(media) {
  for (var i = 0; i < _savedStyles.length; i += 5) {
    if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
      _savedStyles[i].style.cssText = _savedStyles[i + 1];
      _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
      _savedStyles[i + 3].uncache = 1;
    }
  }
}, _revertAll = function _revertAll2(kill, media) {
  var trigger;
  for (_i = 0; _i < _triggers.length; _i++) {
    trigger = _triggers[_i];
    if (trigger && (!media || trigger._ctx === media)) {
      if (kill) {
        trigger.kill(1);
      } else {
        trigger.revert(true, true);
      }
    }
  }
  media && _revertRecorded(media);
  media || _dispatch("revert");
}, _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
  _scrollers.cache++;
  (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
    return _isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
  });
  _isString(scrollRestoration) && (_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
}, _refreshingAll, _refreshID = 0, _queueRefreshID, _queueRefreshAll = function _queueRefreshAll2() {
  if (_queueRefreshID !== _refreshID) {
    var id = _queueRefreshID = _refreshID;
    requestAnimationFrame(function() {
      return id === _refreshID && _refreshAll(true);
    });
  }
}, _refreshAll = function _refreshAll2(force, skipRevert) {
  if (_lastScrollTime && !force) {
    _addListener(ScrollTrigger, "scrollEnd", _softRefresh);
    return;
  }
  _refreshingAll = ScrollTrigger.isRefreshing = true;
  _scrollers.forEach(function(obj) {
    return _isFunction(obj) && obj.cacheID++ && (obj.rec = obj());
  });
  var refreshInits = _dispatch("refreshInit");
  _sort && ScrollTrigger.sort();
  skipRevert || _revertAll();
  _scrollers.forEach(function(obj) {
    if (_isFunction(obj)) {
      obj.smooth && (obj.target.style.scrollBehavior = "auto");
      obj(0);
    }
  });
  _triggers.slice(0).forEach(function(t) {
    return t.refresh();
  });
  _triggers.forEach(function(t, i) {
    if (t._subPinOffset && t.pin) {
      var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
      t.revert(true, 1);
      t.adjustPinSpacing(t.pin[prop] - original);
      t.revert(false, 1);
    }
  });
  _triggers.forEach(function(t) {
    return t.vars.end === "max" && t.setPositions(t.start, Math.max(t.start + 1, _maxScroll(t.scroller, t._dir)));
  });
  refreshInits.forEach(function(result) {
    return result && result.render && result.render(-1);
  });
  _scrollers.forEach(function(obj) {
    if (_isFunction(obj)) {
      obj.smooth && requestAnimationFrame(function() {
        return obj.target.style.scrollBehavior = "smooth";
      });
      obj.rec && obj(obj.rec);
    }
  });
  _clearScrollMemory(_scrollRestoration, 1);
  _resizeDelay.pause();
  _refreshID++;
  _updateAll(2);
  _triggers.forEach(function(t) {
    return _isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
  });
  _refreshingAll = ScrollTrigger.isRefreshing = false;
  _dispatch("refresh");
}, _lastScroll = 0, _direction = 1, _primary, _updateAll = function _updateAll2(force) {
  if (!_refreshingAll || force === 2) {
    ScrollTrigger.isUpdating = true;
    _primary && _primary.update(0);
    var l = _triggers.length, time = _getTime(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
    _direction = _lastScroll > scroll ? -1 : 1;
    _lastScroll = scroll;
    if (recordVelocity) {
      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
        _lastScrollTime = 0;
        _dispatch("scrollEnd");
      }
      _time2 = _time1;
      _time1 = time;
    }
    if (_direction < 0) {
      _i = l;
      while (_i-- > 0) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
      _direction = 1;
    } else {
      for (_i = 0; _i < l; _i++) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
    }
    ScrollTrigger.isUpdating = false;
  }
  _rafID = 0;
}, _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]), _swapPinOut = function _swapPinOut2(pin, spacer, state) {
  _setState(state);
  var cache = pin._gsap;
  if (cache.spacerIsNative) {
    _setState(cache.spacerState);
  } else if (pin._gsap.swappedIn) {
    var parent = spacer.parentNode;
    if (parent) {
      parent.insertBefore(pin, spacer);
      parent.removeChild(spacer);
    }
  }
  pin._gsap.swappedIn = false;
}, _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
  if (!pin._gsap.swappedIn) {
    var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
    while (i--) {
      p = _propNamesToCopy[i];
      spacerStyle[p] = cs[p];
    }
    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
    cs.display === "inline" && (spacerStyle.display = "inline-block");
    pinStyle[_bottom] = pinStyle[_right] = "auto";
    spacerStyle.flexBasis = cs.flexBasis || "auto";
    spacerStyle.overflow = "visible";
    spacerStyle.boxSizing = "border-box";
    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
    _setState(spacerState);
    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
    pinStyle[_padding] = cs[_padding];
    if (pin.parentNode !== spacer) {
      pin.parentNode.insertBefore(spacer, pin);
      spacer.appendChild(pin);
    }
    pin._gsap.swappedIn = true;
  }
}, _capsExp = /([A-Z])/g, _setState = function _setState2(state) {
  if (state) {
    var style = state.t.style, l = state.length, i = 0, p, value;
    (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1;
    for (; i < l; i += 2) {
      value = state[i + 1];
      p = state[i];
      if (value) {
        style[p] = value;
      } else if (style[p]) {
        style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      }
    }
  }
}, _getState = function _getState2(element) {
  var l = _stateProps.length, style = element.style, state = [], i = 0;
  for (; i < l; i++) {
    state.push(_stateProps[i], style[_stateProps[i]]);
  }
  state.t = element;
  return state;
}, _copyState = function _copyState2(state, override, omitOffsets) {
  var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
  for (; i < l; i += 2) {
    p = state[i];
    result.push(p, p in override ? override[p] : state[i + 1]);
  }
  result.t = state.t;
  return result;
}, _winOffsets = {
  left: 0,
  top: 0
}, _parsePosition = function _parsePosition2(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
  _isFunction(value) && (value = value(self));
  if (_isString(value) && value.substr(0, 3) === "max") {
    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
  }
  var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
  containerAnimation && containerAnimation.seek(0);
  if (!_isNumber(value)) {
    _isFunction(trigger) && (trigger = trigger(self));
    var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
    element = _getTarget(trigger) || _body;
    bounds = _getBounds(element) || {};
    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
      display = element.style.display;
      element.style.display = "block";
      bounds = _getBounds(element);
      display ? element.style.display = display : element.style.removeProperty("display");
    }
    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
    scrollerSize -= scrollerSize - globalOffset;
  } else if (markerScroller) {
    _positionMarker(markerScroller, scrollerSize, direction, true);
  }
  if (marker) {
    var position = value + scrollerSize, isStart = marker._isStart;
    p1 = "scroll" + direction.d2;
    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);
    if (useFixedPosition) {
      scrollerBounds = _getBounds(markerScroller);
      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
    }
  }
  if (containerAnimation && element) {
    p1 = _getBounds(element);
    containerAnimation.seek(scrollerMax);
    p2 = _getBounds(element);
    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
    value = value / containerAnimation._caScrollDist * scrollerMax;
  }
  containerAnimation && containerAnimation.seek(time);
  return containerAnimation ? value : Math.round(value);
}, _prefixExp = /(webkit|moz|length|cssText|inset)/i, _reparent = function _reparent2(element, parent, top, left) {
  if (element.parentNode !== parent) {
    var style = element.style, p, cs;
    if (parent === _body) {
      element._stOrig = style.cssText;
      cs = _getComputedStyle(element);
      for (p in cs) {
        if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
          style[p] = cs[p];
        }
      }
      style.top = top;
      style.left = left;
    } else {
      style.cssText = element._stOrig;
    }
    gsap.core.getCache(element).uncache = 1;
    parent.appendChild(element);
  }
}, _getTweenCreator = function _getTweenCreator2(scroller, direction) {
  var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, lastScroll1, lastScroll2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
    var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
    initialValue = initialValue || getScroll();
    change2 = change1 && change2 || 0;
    change1 = change1 || scrollTo - initialValue;
    tween && tween.kill();
    lastScroll1 = Math.round(initialValue);
    vars[prop] = scrollTo;
    vars.modifiers = modifiers;
    modifiers[prop] = function(value) {
      value = Math.round(getScroll());
      if (value !== lastScroll1 && value !== lastScroll2 && Math.abs(value - lastScroll1) > 3 && Math.abs(value - lastScroll2) > 3) {
        tween.kill();
        getTween2.tween = 0;
      } else {
        value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
      }
      lastScroll2 = lastScroll1;
      return lastScroll1 = Math.round(value);
    };
    vars.onUpdate = function() {
      _scrollers.cache++;
      _updateAll();
    };
    vars.onComplete = function() {
      getTween2.tween = 0;
      onComplete && onComplete.call(tween);
    };
    tween = getTween2.tween = gsap.to(scroller, vars);
    return tween;
  };
  scroller[prop] = getScroll;
  getScroll.wheelHandler = function() {
    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
  };
  _addListener(scroller, "wheel", getScroll.wheelHandler);
  return getTween;
};
export var ScrollTrigger = /* @__PURE__ */ function() {
  function ScrollTrigger2(vars, animation) {
    _coreInitted || ScrollTrigger2.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
    this.init(vars, animation);
  }
  var _proto = ScrollTrigger2.prototype;
  _proto.init = function init(vars, animation) {
    this.progress = this.start = 0;
    this.vars && this.kill(true, true);
    if (!_enabled) {
      this.update = this.refresh = this.kill = _passThrough;
      return;
    }
    vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
      trigger: vars
    } : vars, _defaults);
    var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win), scrollerCache = gsap.core.getCache(scroller), isViewport = _isViewport(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
      return vars.onRefreshInit(self);
    }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap2, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevProgress, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
    _context(self);
    self._dir = direction;
    anticipatePin *= 45;
    self.scroller = scroller;
    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
    scroll1 = scrollFunc();
    self.vars = vars;
    animation = animation || vars.animation;
    if ("refreshPriority" in vars) {
      _sort = 1;
      vars.refreshPriority === -9999 && (_primary = self);
    }
    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
      top: _getTweenCreator(scroller, _vertical),
      left: _getTweenCreator(scroller, _horizontal)
    };
    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
    self.scrubDuration = function(value) {
      scrubSmooth = _isNumber(value) && value;
      if (!scrubSmooth) {
        scrubTween && scrubTween.progress(1).kill();
        scrubTween = 0;
      } else {
        scrubTween ? scrubTween.duration(value) : scrubTween = gsap.to(animation, {
          ease: "expo",
          totalProgress: "+=0.001",
          duration: scrubSmooth,
          paused: true,
          onComplete: function onComplete() {
            return onScrubComplete && onScrubComplete(self);
          }
        });
      }
    };
    if (animation) {
      animation.vars.lazy = false;
      animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
      self.animation = animation.pause();
      animation.scrollTrigger = self;
      self.scrubDuration(scrub);
      snap1 = 0;
      id || (id = animation.vars.id);
    }
    _triggers.push(self);
    if (snap) {
      if (!_isObject(snap) || snap.push) {
        snap = {
          snapTo: snap
        };
      }
      "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
        scrollBehavior: "auto"
      });
      _scrollers.forEach(function(o) {
        return _isFunction(o) && o.target === (isViewport ? _doc.scrollingElement || _docEl : scroller) && (o.smooth = false);
      });
      snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function(value, st) {
        return _snapDirectional(snap.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
      } : gsap.utils.snap(snap.snapTo);
      snapDurClamp = snap.duration || {
        min: 0.1,
        max: 2
      };
      snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
      snapDelayedCall = gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function() {
        var scroll = scrollFunc(), refreshedRecently = _getTime() - lastRefresh < 500, tween = tweenTo.tween;
        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
          var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime() - _time2) * 1e3 || 0, change1 = gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap.inertia === false ? 0 : change1), endValue = _clamp(0, 1, snapFunc(naturalEnd, self)), endScroll = Math.round(start + endValue * change), _snap = snap, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
          if (scroll <= end && scroll >= start && endScroll !== scroll) {
            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
              return;
            }
            if (snap.inertia === false) {
              change1 = endValue - progress;
            }
            tweenTo(endScroll, {
              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
              ease: snap.ease || "power3",
              data: _abs(endScroll - scroll),
              onInterrupt: function onInterrupt() {
                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
              },
              onComplete: function onComplete() {
                self.update();
                lastSnap = scrollFunc();
                snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                onSnapComplete && onSnapComplete(self);
                _onComplete && _onComplete(self);
              }
            }, scroll, change1 * change, endScroll - scroll - change1 * change);
            onStart && onStart(self, tweenTo.tween);
          }
        } else if (self.isActive && lastSnap !== scroll) {
          snapDelayedCall.restart(true);
        }
      }).pause();
    }
    id && (_ids[id] = self);
    trigger = self.trigger = _getTarget(trigger || pin);
    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
    customRevertReturn && (customRevertReturn = customRevertReturn(self));
    pin = pin === true ? trigger : _getTarget(pin);
    _isString(toggleClass) && (toggleClass = {
      targets: trigger,
      className: toggleClass
    });
    if (pin) {
      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
      self.pin = pin;
      pinCache = gsap.core.getCache(pin);
      if (!pinCache.spacer) {
        if (pinSpacer) {
          pinSpacer = _getTarget(pinSpacer);
          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
          pinCache.spacerIsNative = !!pinSpacer;
          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
        }
        pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
        spacer.classList.add("pin-spacer");
        id && spacer.classList.add("pin-spacer-" + id);
        pinCache.pinState = pinOriginalState = _getState(pin);
      } else {
        pinOriginalState = pinCache.pinState;
      }
      vars.force3D !== false && gsap.set(pin, {
        force3D: true
      });
      self.spacer = spacer = pinCache.spacer;
      cs = _getComputedStyle(pin);
      spacingStart = cs[pinSpacing + direction.os2];
      pinGetter = gsap.getProperty(pin);
      pinSetter = gsap.quickSetter(pin, direction.a, _px);
      _swapPinIn(pin, spacer, cs);
      pinState = _getState(pin);
    }
    if (markers) {
      markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
      offset = markerStartTrigger["offset" + direction.op.d2];
      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
      containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));
      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
        _makePositionable(isViewport ? _body : scroller);
        gsap.set([markerStartTrigger, markerEndTrigger], {
          force3D: true
        });
        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
      }
    }
    if (containerAnimation) {
      var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
      containerAnimation.eventCallback("onUpdate", function() {
        self.update(0, 0, 1);
        oldOnUpdate && oldOnUpdate.apply(oldParams || []);
      });
    }
    self.previous = function() {
      return _triggers[_triggers.indexOf(self) - 1];
    };
    self.next = function() {
      return _triggers[_triggers.indexOf(self) + 1];
    };
    self.revert = function(revert, temp) {
      if (!temp) {
        return self.kill(true);
      }
      var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
      if (r !== self.isReverted) {
        if (r) {
          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
          prevProgress = self.progress;
          prevAnimProgress = animation && animation.progress();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.style.display = r ? "none" : "block";
        });
        if (r) {
          _refreshing = 1;
          self.update(r);
        }
        if (pin && (!pinReparent || !self.isActive)) {
          if (r) {
            _swapPinOut(pin, spacer, pinOriginalState);
          } else {
            _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
          }
        }
        r || self.update(r);
        _refreshing = prevRefreshing;
        self.isReverted = r;
      }
    };
    self.refresh = function(soft, force) {
      if ((_refreshing || !self.enabled) && !force) {
        return;
      }
      if (pin && soft && _lastScrollTime) {
        _addListener(ScrollTrigger2, "scrollEnd", _softRefresh);
        return;
      }
      !_refreshingAll && onRefreshInit && onRefreshInit(self);
      _refreshing = 1;
      lastRefresh = _getTime();
      if (tweenTo.tween) {
        tweenTo.tween.kill();
        tweenTo.tween = 0;
      }
      scrubTween && scrubTween.pause();
      invalidateOnRefresh && animation && animation.revert({
        kill: false
      }).invalidate();
      self.isReverted || self.revert(true, true);
      self._subPinOffset = false;
      var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), offset2 = 0, otherPinOffset = 0, parsedEnd = vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow;
      while (i--) {
        curTrigger = _triggers[i];
        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = 1);
        curPin = curTrigger.pin;
        if (curPin && (curPin === trigger || curPin === pin) && !curTrigger.isReverted) {
          revertedPins || (revertedPins = []);
          revertedPins.unshift(curTrigger);
          curTrigger.revert(true, true);
        }
        if (curTrigger !== _triggers[i]) {
          triggerIndex--;
          i--;
        }
      }
      _isFunction(parsedStart) && (parsedStart = parsedStart(self));
      start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -1e-3 : 0);
      _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));
      if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
        if (~parsedEnd.indexOf(" ")) {
          parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
        } else {
          offset2 = _offsetToPx(parsedEnd.substr(2), size);
          parsedEnd = _isString(parsedStart) ? parsedStart : start + offset2;
          parsedEndTrigger = trigger;
        }
      }
      end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -1e-3;
      change = end - start || (start -= 0.01) && 1e-3;
      offset2 = 0;
      i = triggerIndex;
      while (i--) {
        curTrigger = _triggers[i];
        curPin = curTrigger.pin;
        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
          cs2 = curTrigger.end - curTrigger.start;
          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && !_isNumber(parsedStart)) {
            offset2 += cs2 * (1 - curTrigger.progress);
          }
          curPin === pin && (otherPinOffset += cs2);
        }
      }
      start += offset2;
      end += offset2;
      self._pinPush = otherPinOffset;
      if (markerStart && offset2) {
        cs2 = {};
        cs2[direction.a] = "+=" + offset2;
        pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
        gsap.set([markerStart, markerEnd], cs2);
      }
      if (pin) {
        cs2 = _getComputedStyle(pin);
        isVertical = direction === _vertical;
        scroll = scrollFunc();
        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
        if (!max && end > 1) {
          forcedOverflow = (isViewport ? _doc.scrollingElement || _docEl : scroller).style;
          forcedOverflow = {
            style: forcedOverflow,
            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
          };
          forcedOverflow["overflow" + direction.a.toUpperCase()] = "scroll";
        }
        _swapPinIn(pin, spacer, cs2);
        pinState = _getState(pin);
        bounds = _getBounds(pin, true);
        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
        if (pinSpacing) {
          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
          spacerState.t = spacer;
          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
          i && spacerState.push(direction.d, i + _px);
          _setState(spacerState);
          if (pinnedContainer) {
            _triggers.forEach(function(t) {
              if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                t._subPinOffset = true;
              }
            });
          }
          useFixedPosition && scrollFunc(prevScroll);
        }
        if (useFixedPosition) {
          override = {
            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
            boxSizing: "border-box",
            position: "fixed"
          };
          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
          override[_padding] = cs2[_padding];
          override[_padding + _Top] = cs2[_padding + _Top];
          override[_padding + _Right] = cs2[_padding + _Right];
          override[_padding + _Bottom] = cs2[_padding + _Bottom];
          override[_padding + _Left] = cs2[_padding + _Left];
          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
          _refreshingAll && scrollFunc(0);
        }
        if (animation) {
          initted = animation._initted;
          _suppressOverwrites(1);
          animation.render(animation.duration(), true, true);
          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
          pinMoves = Math.abs(change - pinChange) > 1;
          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
          animation.render(0, true, true);
          initted || animation.invalidate(true);
          animation.parent || animation.totalTime(animation.totalTime());
          _suppressOverwrites(0);
        } else {
          pinChange = change;
        }
        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
      } else if (trigger && scrollFunc() && !containerAnimation) {
        bounds = trigger.parentNode;
        while (bounds && bounds !== _body) {
          if (bounds._pinOffset) {
            start -= bounds._pinOffset;
            end -= bounds._pinOffset;
          }
          bounds = bounds.parentNode;
        }
      }
      revertedPins && revertedPins.forEach(function(t) {
        return t.revert(false, true);
      });
      self.start = start;
      self.end = end;
      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
      if (!containerAnimation && !_refreshingAll) {
        scroll1 < prevScroll && scrollFunc(prevScroll);
        self.scroll.rec = 0;
      }
      self.revert(false, true);
      if (snapDelayedCall) {
        lastSnap = -1;
        self.isActive && scrollFunc(start + change * prevProgress);
        snapDelayedCall.restart(true);
      }
      _refreshing = 0;
      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true);
      if (prevProgress !== self.progress || containerAnimation) {
        animation && !isToggle && animation.totalProgress(prevProgress, true);
        self.progress = (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
      }
      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
      onRefresh && !_refreshingAll && onRefresh(self);
    };
    self.getVelocity = function() {
      return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1e3 || 0;
    };
    self.endAnimation = function() {
      _endAnimation(self.callbackAnimation);
      if (animation) {
        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
      }
    };
    self.labelToScroll = function(label) {
      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
    };
    self.getTrailing = function(name) {
      var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
      return (_isString(name) ? a.filter(function(t) {
        return t.vars.preventOverlaps === name;
      }) : a).filter(function(t) {
        return self.direction > 0 ? t.end <= start : t.start >= end;
      });
    };
    self.update = function(reset, recordVelocity, forceFake) {
      if (containerAnimation && !forceFake && !reset) {
        return;
      }
      var scroll = _refreshingAll ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
      if (recordVelocity) {
        scroll2 = scroll1;
        scroll1 = containerAnimation ? scrollFunc() : scroll;
        if (snap) {
          snap2 = snap1;
          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
        }
      }
      anticipatePin && !clipped && pin && !_refreshing && !_startup && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin && (clipped = 1e-4);
      if (clipped !== prevProgress2 && self.enabled) {
        isActive = self.isActive = !!clipped && clipped < 1;
        wasActive = !!prevProgress2 && prevProgress2 < 1;
        toggled = isActive !== wasActive;
        stateChanged = toggled || !!clipped !== !!prevProgress2;
        self.direction = clipped > prevProgress2 ? 1 : -1;
        self.progress = clipped;
        if (stateChanged && !_refreshing) {
          toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
          if (isToggle) {
            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
          }
        }
        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
          return t.endAnimation();
        }));
        if (!isToggle) {
          if (scrubTween && !_refreshing && !_startup) {
            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
            if (scrubTween.resetTo) {
              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
            } else {
              scrubTween.vars.totalProgress = clipped;
              scrubTween.invalidate().restart();
            }
          } else if (animation) {
            animation.totalProgress(clipped, !!_refreshing);
          }
        }
        if (pin) {
          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
          if (!useFixedPosition) {
            pinSetter(_round(pinStart + pinChange * clipped));
          } else if (stateChanged) {
            isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
            if (pinReparent) {
              if (!reset && (isActive || isAtMax)) {
                var bounds = _getBounds(pin, true), _offset = scroll - start;
                _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
              } else {
                _reparent(pin, spacer);
              }
            }
            _setState(isActive || isAtMax ? pinActiveState : pinState);
            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
          }
        }
        snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
        });
        onUpdate && !isToggle && !reset && onUpdate(self);
        if (stateChanged && !_refreshing) {
          if (isToggle) {
            if (isTakingAction) {
              if (action === "complete") {
                animation.pause().totalProgress(1);
              } else if (action === "reset") {
                animation.restart(true).pause();
              } else if (action === "restart") {
                animation.restart(true);
              } else {
                animation[action]();
              }
            }
            onUpdate && onUpdate(self);
          }
          if (toggled || !_limitCallbacks) {
            onToggle && toggled && _callback(self, onToggle);
            callbacks[toggleState] && _callback(self, callbacks[toggleState]);
            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
            if (!toggled) {
              toggleState = clipped === 1 ? 1 : 3;
              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
            }
          }
          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
            _endAnimation(self.callbackAnimation);
            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
          }
        } else if (isToggle && onUpdate && !_refreshing) {
          onUpdate(self);
        }
      }
      if (markerEndSetter) {
        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
        markerEndSetter(n);
      }
      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
    };
    self.enable = function(reset, refresh) {
      if (!self.enabled) {
        self.enabled = true;
        _addListener(scroller, "resize", _onResize);
        _addListener(isViewport ? _doc : scroller, "scroll", _onScroll);
        onRefreshInit && _addListener(ScrollTrigger2, "refreshInit", onRefreshInit);
        if (reset !== false) {
          self.progress = prevProgress = 0;
          scroll1 = scroll2 = lastSnap = scrollFunc();
        }
        refresh !== false && self.refresh();
      }
    };
    self.getTween = function(snap3) {
      return snap3 && tweenTo ? tweenTo.tween : scrubTween;
    };
    self.setPositions = function(newStart, newEnd) {
      if (pin) {
        pinStart += newStart - start;
        pinChange += newEnd - newStart - change;
        pinSpacing === _padding && self.adjustPinSpacing(newEnd - newStart - change);
      }
      self.start = start = newStart;
      self.end = end = newEnd;
      change = newEnd - newStart;
      self.update();
    };
    self.adjustPinSpacing = function(amount) {
      if (spacerState) {
        var i = spacerState.indexOf(direction.d) + 1;
        spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
        _setState(spacerState);
      }
    };
    self.disable = function(reset, allowAnimation) {
      if (self.enabled) {
        reset !== false && self.revert(true, true);
        self.enabled = self.isActive = false;
        allowAnimation || scrubTween && scrubTween.pause();
        prevScroll = 0;
        pinCache && (pinCache.uncache = 1);
        onRefreshInit && _removeListener(ScrollTrigger2, "refreshInit", onRefreshInit);
        if (snapDelayedCall) {
          snapDelayedCall.pause();
          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
        }
        if (!isViewport) {
          var i = _triggers.length;
          while (i--) {
            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
              return;
            }
          }
          _removeListener(scroller, "resize", _onResize);
          _removeListener(scroller, "scroll", _onScroll);
        }
      }
    };
    self.kill = function(revert, allowAnimation) {
      self.disable(revert, allowAnimation);
      scrubTween && !allowAnimation && scrubTween.kill();
      id && delete _ids[id];
      var i = _triggers.indexOf(self);
      i >= 0 && _triggers.splice(i, 1);
      i === _i && _direction > 0 && _i--;
      i = 0;
      _triggers.forEach(function(t) {
        return t.scroller === self.scroller && (i = 1);
      });
      i || _refreshingAll || (self.scroll.rec = 0);
      if (animation) {
        animation.scrollTrigger = null;
        revert && animation.revert({
          kill: false
        });
        allowAnimation || animation.kill();
      }
      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
        return m.parentNode && m.parentNode.removeChild(m);
      });
      _primary === self && (_primary = 0);
      if (pin) {
        pinCache && (pinCache.uncache = 1);
        i = 0;
        _triggers.forEach(function(t) {
          return t.pin === pin && i++;
        });
        i || (pinCache.spacer = 0);
      }
      vars.onKill && vars.onKill(self);
    };
    self.enable(false, false);
    customRevertReturn && customRevertReturn(self);
    !animation || !animation.add || change ? self.refresh() : gsap.delayedCall(0.01, function() {
      return start || end || self.refresh();
    }) && (change = 0.01) && (start = end = 0);
    pin && _queueRefreshAll();
  };
  ScrollTrigger2.register = function register(core) {
    if (!_coreInitted) {
      gsap = core || _getGSAP();
      _windowExists() && window.document && ScrollTrigger2.enable();
      _coreInitted = _enabled;
    }
    return _coreInitted;
  };
  ScrollTrigger2.defaults = function defaults(config) {
    if (config) {
      for (var p in config) {
        _defaults[p] = config[p];
      }
    }
    return _defaults;
  };
  ScrollTrigger2.disable = function disable(reset, kill) {
    _enabled = 0;
    _triggers.forEach(function(trigger) {
      return trigger[kill ? "kill" : "disable"](reset);
    });
    _removeListener(_win, "wheel", _onScroll);
    _removeListener(_doc, "scroll", _onScroll);
    clearInterval(_syncInterval);
    _removeListener(_doc, "touchcancel", _passThrough);
    _removeListener(_body, "touchstart", _passThrough);
    _multiListener(_removeListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
    _multiListener(_removeListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
    _resizeDelay.kill();
    _iterateAutoRefresh(_removeListener);
    for (var i = 0; i < _scrollers.length; i += 3) {
      _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);
      _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
    }
  };
  ScrollTrigger2.enable = function enable() {
    _win = window;
    _doc = document;
    _docEl = _doc.documentElement;
    _body = _doc.body;
    if (gsap) {
      _toArray = gsap.utils.toArray;
      _clamp = gsap.utils.clamp;
      _context = gsap.core.context || _passThrough;
      _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough;
      _scrollRestoration = _win.history.scrollRestoration || "auto";
      gsap.core.globals("ScrollTrigger", ScrollTrigger2);
      if (_body) {
        _enabled = 1;
        Observer2.register(gsap);
        ScrollTrigger2.isTouch = Observer2.isTouch;
        _fixIOSBug = Observer2.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
        _addListener(_win, "wheel", _onScroll);
        _root = [_win, _doc, _docEl, _body];
        if (gsap.matchMedia) {
          ScrollTrigger2.matchMedia = function(vars) {
            var mm = gsap.matchMedia(), p;
            for (p in vars) {
              mm.add(p, vars[p]);
            }
            return mm;
          };
          gsap.addEventListener("matchMediaInit", function() {
            return _revertAll();
          });
          gsap.addEventListener("matchMediaRevert", function() {
            return _revertRecorded();
          });
          gsap.addEventListener("matchMedia", function() {
            _refreshAll(0, 1);
            _dispatch("matchMedia");
          });
          gsap.matchMedia("(orientation: portrait)", function() {
            _setBaseDimensions();
            return _setBaseDimensions;
          });
        } else {
          console.warn("Requires GSAP 3.11.0 or later");
        }
        _setBaseDimensions();
        _addListener(_doc, "scroll", _onScroll);
        var bodyStyle = _body.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap.core.Animation.prototype, bounds, i;
        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
          value: function value() {
            return this.time(-0.01, true);
          }
        });
        bodyStyle.borderTopStyle = "solid";
        bounds = _getBounds(_body);
        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
        _syncInterval = setInterval(_sync, 250);
        gsap.delayedCall(0.5, function() {
          return _startup = 0;
        });
        _addListener(_doc, "touchcancel", _passThrough);
        _addListener(_body, "touchstart", _passThrough);
        _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
        _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
        _transformProp = gsap.utils.checkPrefix("transform");
        _stateProps.push(_transformProp);
        _coreInitted = _getTime();
        _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
        _autoRefresh = [_doc, "visibilitychange", function() {
          var w = _win.innerWidth, h = _win.innerHeight;
          if (_doc.hidden) {
            _prevWidth = w;
            _prevHeight = h;
          } else if (_prevWidth !== w || _prevHeight !== h) {
            _onResize();
          }
        }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize];
        _iterateAutoRefresh(_addListener);
        _triggers.forEach(function(trigger) {
          return trigger.enable(0, 1);
        });
        for (i = 0; i < _scrollers.length; i += 3) {
          _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);
          _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
        }
      }
    }
  };
  ScrollTrigger2.config = function config(vars) {
    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
    var ms = vars.syncInterval;
    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger2.isTouch === 1 && vars.ignoreMobileResize);
    if ("autoRefreshEvents" in vars) {
      _iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none");
      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
    }
  };
  ScrollTrigger2.scrollerProxy = function scrollerProxy(target, vars) {
    var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport(t);
    if (~i) {
      _scrollers.splice(i, isViewport ? 6 : 2);
    }
    if (vars) {
      isViewport ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t, vars);
    }
  };
  ScrollTrigger2.clearMatchMedia = function clearMatchMedia(query) {
    _triggers.forEach(function(t) {
      return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
    });
  };
  ScrollTrigger2.isInViewport = function isInViewport(element, ratio, horizontal) {
    var bounds = (_isString(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
  };
  ScrollTrigger2.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
    _isString(element) && (element = _getTarget(element));
    var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
    return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
  };
  ScrollTrigger2.killAll = function killAll(allowListeners) {
    _triggers.slice(0).forEach(function(t) {
      return t.vars.id !== "ScrollSmoother" && t.kill();
    });
    if (allowListeners !== true) {
      var listeners = _listeners.killAll || [];
      _listeners = {};
      listeners.forEach(function(f) {
        return f();
      });
    }
  };
  return ScrollTrigger2;
}();
ScrollTrigger.version = "3.11.4";
ScrollTrigger.saveStyles = function(targets) {
  return targets ? _toArray(targets).forEach(function(target) {
    if (target && target.style) {
      var i = _savedStyles.indexOf(target);
      i >= 0 && _savedStyles.splice(i, 5);
      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _context());
    }
  }) : _savedStyles;
};
ScrollTrigger.revert = function(soft, media) {
  return _revertAll(!soft, media);
};
ScrollTrigger.create = function(vars, animation) {
  return new ScrollTrigger(vars, animation);
};
ScrollTrigger.refresh = function(safe) {
  return safe ? _onResize() : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
};
ScrollTrigger.update = function(force) {
  return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
};
ScrollTrigger.clearScrollMemory = _clearScrollMemory;
ScrollTrigger.maxScroll = function(element, horizontal) {
  return _maxScroll(element, horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getScrollFunc = function(element, horizontal) {
  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getById = function(id) {
  return _ids[id];
};
ScrollTrigger.getAll = function() {
  return _triggers.filter(function(t) {
    return t.vars.id !== "ScrollSmoother";
  });
};
ScrollTrigger.isScrolling = function() {
  return !!_lastScrollTime;
};
ScrollTrigger.snapDirectional = _snapDirectional;
ScrollTrigger.addEventListener = function(type, callback) {
  var a = _listeners[type] || (_listeners[type] = []);
  ~a.indexOf(callback) || a.push(callback);
};
ScrollTrigger.removeEventListener = function(type, callback) {
  var a = _listeners[type], i = a && a.indexOf(callback);
  i >= 0 && a.splice(i, 1);
};
ScrollTrigger.batch = function(targets, vars) {
  var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
    var elements = [], triggers = [], delay = gsap.delayedCall(interval, function() {
      callback(elements, triggers);
      elements = [];
      triggers = [];
    }).pause();
    return function(self) {
      elements.length || delay.restart(true);
      elements.push(self.trigger);
      triggers.push(self);
      batchMax <= elements.length && delay.progress(1);
    };
  }, p;
  for (p in vars) {
    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
  }
  if (_isFunction(batchMax)) {
    batchMax = batchMax();
    _addListener(ScrollTrigger, "refresh", function() {
      return batchMax = vars.batchMax();
    });
  }
  _toArray(targets).forEach(function(target) {
    var config = {};
    for (p in varsCopy) {
      config[p] = varsCopy[p];
    }
    config.trigger = target;
    result.push(ScrollTrigger.create(config));
  });
  return result;
};
var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
}, _allowNativePanning = function _allowNativePanning2(target, direction) {
  if (direction === true) {
    target.style.removeProperty("touch-action");
  } else {
    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer2.isTouch ? " pinch-zoom" : "") : "none";
  }
  target === _docEl && _allowNativePanning2(_body, direction);
}, _overflow = {
  auto: 1,
  scroll: 1
}, _nestedScroll = function _nestedScroll2(_ref5) {
  var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
  var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || gsap.core.getCache(node), time = _getTime(), cs;
  if (!cache._isScrollT || time - cache._isScrollT > 2e3) {
    while (node && node !== _body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
      node = node.parentNode;
    }
    cache._isScroll = node && node !== target && !_isViewport(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
    cache._isScrollT = time;
  }
  if (cache._isScroll || axis === "x") {
    event.stopPropagation();
    event._gsapAllow = true;
  }
}, _inputObserver = function _inputObserver2(target, type, inputs, nested) {
  return Observer2.create({
    target,
    capture: true,
    debounce: false,
    lockAxis: true,
    type,
    onWheel: nested = nested && _nestedScroll,
    onPress: nested,
    onDrag: nested,
    onScroll: nested,
    onEnable: function onEnable() {
      return inputs && _addListener(_doc, Observer2.eventTypes[0], _captureInputs, false, true);
    },
    onDisable: function onDisable() {
      return _removeListener(_doc, Observer2.eventTypes[0], _captureInputs, true);
    }
  });
}, _inputExp = /(input|label|select|textarea)/i, _inputIsFocused, _captureInputs = function _captureInputs2(e) {
  var isInput = _inputExp.test(e.target.tagName);
  if (isInput || _inputIsFocused) {
    e._gsapAllow = true;
    _inputIsFocused = isInput;
  }
}, _getScrollNormalizer = function _getScrollNormalizer2(vars) {
  _isObject(vars) || (vars = {});
  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
  vars.type || (vars.type = "wheel,touch");
  vars.debounce = !!vars.debounce;
  vars.id = vars.id || "normalizer";
  var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, self, maxY, target = _getTarget(vars.target) || _docEl, smoother = gsap.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer2.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction(momentum) ? function() {
    return momentum(self);
  } : function() {
    return momentum || 2.8;
  }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
    return skipTouchMove = false;
  }, scrollClampX = _passThrough, scrollClampY = _passThrough, updateClamps = function updateClamps2() {
    maxY = _maxScroll(target, _vertical);
    scrollClampY = _clamp(_fixIOSBug ? 1 : 0, maxY);
    normalizeScrollX && (scrollClampX = _clamp(0, _maxScroll(target, _horizontal)));
    lastRefreshID = _refreshID;
  }, removeContentOffset = function removeContentOffset2() {
    content._gsap.y = _round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
    content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
    scrollFuncY.offset = scrollFuncY.cacheID = 0;
  }, ignoreDrag = function ignoreDrag2() {
    if (skipTouchMove) {
      requestAnimationFrame(resumeTouchMove);
      var offset = _round(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
        scrollFuncY.offset = scroll - scrollFuncY.v;
        var y = _round((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
        content._gsap.y = y + "px";
        scrollFuncY.cacheID = _scrollers.cache;
        _updateAll();
      }
      return true;
    }
    scrollFuncY.offset && removeContentOffset();
    skipTouchMove = true;
  }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
    updateClamps();
    if (tween.isActive() && tween.vars.scrollY > maxY) {
      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
    }
  };
  content && gsap.set(content, {
    y: "+=0"
  });
  vars.ignoreCheck = function(e) {
    return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
  };
  vars.onPress = function() {
    var prevScale = scale;
    scale = _round((_win.visualViewport && _win.visualViewport.scale || 1) / initialScale);
    tween.pause();
    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
    startScrollX = scrollFuncX();
    startScrollY = scrollFuncY();
    updateClamps();
    lastRefreshID = _refreshID;
  };
  vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
    scrollFuncY.offset && removeContentOffset();
    if (!wasDragging) {
      onStopDelayedCall.restart(true);
    } else {
      _scrollers.cache++;
      var dur = resolveMomentumDuration(), currentScroll, endScroll;
      if (normalizeScrollX) {
        currentScroll = scrollFuncX();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
        tween.vars.scrollX = scrollClampX(endScroll);
      }
      currentScroll = scrollFuncY();
      endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
      tween.vars.scrollY = scrollClampY(endScroll);
      tween.invalidate().duration(dur).play(0.01);
      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
        gsap.to({}, {
          onUpdate: onResize,
          duration: dur
        });
      }
    }
  };
  vars.onWheel = function() {
    tween._ts && tween.pause();
    if (_getTime() - wheelRefresh > 1e3) {
      lastRefreshID = 0;
      wheelRefresh = _getTime();
    }
  };
  vars.onChange = function(self2, dx, dy, xArray, yArray) {
    _refreshID !== lastRefreshID && updateClamps();
    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
    if (dy) {
      scrollFuncY.offset && removeContentOffset();
      var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
      isTouch && y !== yClamped && (startScrollY += yClamped - y);
      scrollFuncY(yClamped);
    }
    (dy || dx) && _updateAll();
  };
  vars.onEnable = function() {
    _allowNativePanning(target, normalizeScrollX ? false : "x");
    ScrollTrigger.addEventListener("refresh", onResize);
    _addListener(_win, "resize", onResize);
    if (scrollFuncY.smooth) {
      scrollFuncY.target.style.scrollBehavior = "auto";
      scrollFuncY.smooth = scrollFuncX.smooth = false;
    }
    inputObserver.enable();
  };
  vars.onDisable = function() {
    _allowNativePanning(target, true);
    _removeListener(_win, "resize", onResize);
    ScrollTrigger.removeEventListener("refresh", onResize);
    inputObserver.kill();
  };
  vars.lockAxis = vars.lockAxis !== false;
  self = new Observer2(vars);
  self.iOS = _fixIOSBug;
  _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
  _fixIOSBug && gsap.ticker.add(_passThrough);
  onStopDelayedCall = self._dc;
  tween = gsap.to(self, {
    ease: "power4",
    paused: true,
    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    onComplete: onStopDelayedCall.vars.onComplete
  });
  return self;
};
ScrollTrigger.sort = function(func) {
  return _triggers.sort(func || function(a, b) {
    return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
  });
};
ScrollTrigger.observe = function(vars) {
  return new Observer2(vars);
};
ScrollTrigger.normalizeScroll = function(vars) {
  if (typeof vars === "undefined") {
    return _normalizer;
  }
  if (vars === true && _normalizer) {
    return _normalizer.enable();
  }
  if (vars === false) {
    return _normalizer && _normalizer.kill();
  }
  var normalizer = vars instanceof Observer2 ? vars : _getScrollNormalizer(vars);
  _normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
  _isViewport(normalizer.target) && (_normalizer = normalizer);
  return normalizer;
};
ScrollTrigger.core = {
  _getVelocityProp,
  _inputObserver,
  _scrollers,
  _proxies,
  bridge: {
    ss: function ss() {
      _lastScrollTime || _dispatch("scrollStart");
      _lastScrollTime = _getTime();
    },
    ref: function ref() {
      return _refreshing;
    }
  }
};
_getGSAP() && gsap.registerPlugin(ScrollTrigger);
export {ScrollTrigger as default};
