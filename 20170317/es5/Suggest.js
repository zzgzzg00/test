/**
 * Created by zhigang.zhang on 17-3-20.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhigang.zhang on 17-3-17.
 */
{
    (function () {
        var throwError = function throwError() {
            var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            throw new Error(str);
        };

        var suggestUrl = 'http://train.qunar.com/qunar/chezhanSuggest.jsp';
        var suggertErrorTip = '<p class="active error">暂无收录</p>';

        var SuggestCache = function () {
            function SuggestCache() {
                _classCallCheck(this, SuggestCache);

                this.cache = {};
            }

            _createClass(SuggestCache, [{
                key: 'put',
                value: function put(key, value) {
                    this.cache[key] = value;
                }
            }, {
                key: 'get',
                value: function get(key) {
                    return this.cache[key];
                }
            }]);

            return SuggestCache;
        }();

        var Suggest = function () {
            function Suggest() {
                var containerDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwError('containerDom is required');

                var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var _ref$cache = _ref.cache;
                var cache = _ref$cache === undefined ? new SuggestCache() : _ref$cache;
                var _ref$timeInterval = _ref.timeInterval;
                var timeInterval = _ref$timeInterval === undefined ? 50 : _ref$timeInterval;
                var _ref$countPerAge = _ref.countPerAge;
                var countPerAge = _ref$countPerAge === undefined ? 5 : _ref$countPerAge;

                _classCallCheck(this, Suggest);

                this.inputDom = containerDom.querySelector('[data-role="input"]');
                this.station = this.inputDom.dataset.station;
                this.listDom = containerDom.querySelector('[data-role="citylist"]');
                this.cache = cache;
                this.timeHandle = null;
                this.timeInterval = timeInterval;
                this.countPerAge = countPerAge;
                this.bindEvents();
            }

            _createClass(Suggest, [{
                key: 'fetchData',
                value: function fetchData(v) {
                    var _this = this;

                    var me = this;
                    var value = this.cache.get(v);

                    //test code
                    value = v ? Array.from({ length: 21 }, function (item, index) {
                        return 'test' + index;
                    }) : '';
                    //  value=[];

                    if (value) {
                        return Promise.resolve(value);
                    }
                    return fetch(suggestUrl + '?key=' + v + '&station=' + me.station).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                            _this.cache.put(data);return data;
                        });
                }
            }, {
                key: 'createList',
                value: function createList() {
                    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                    var me = this;
                    var items = data.slice(page * me.countPerAge, (page + 1) * me.countPerAge).map(function (item, index) {
                        return '<p class=' + (index == 0 ? 'active' : '') + '>' + item + '</p>';
                    }).join('');
                    var pages = Math.ceil(data.length / me.countPerAge);
                    var pagesStr = pages > 1 ? Array.from({ length: pages }, function (item, index) {
                        return '<a href=\'javascript:void(0);\' class=' + (index == page ? 'disabled' : 'js-page') + '>' + (index + 1) + '</a>';
                    }).join('') : '';
                    this.listDom.classList.remove('hide');
                    this.listDom.innerHTML = items + pagesStr || suggertErrorTip;
                }
            }, {
                key: 'renderList',
                value: function renderList(v) {
                    var _this2 = this;

                    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                    this.fetchData(v).then(function (data) {
                        return _this2.createList(data, page);
                    }).catch(function (data) {
                            return _this2.listDom.innerHTML = suggertErrorTip;
                        });
                }
            }, {
                key: 'bindEvents',
                value: function bindEvents() {
                    var me = this;
                    var inputDom = this.inputDom,
                        listDom = this.listDom;
                    inputDom.oninput = inputDom.onpropertychange = function (e) {
                        var v = this.value;
                        if (me.timeHandle) {
                            window.clearTimeout(me.timeHandle);
                        }
                        me.timeHandle = window.setTimeout(me.renderList.bind(me, v), me.timeInterval);
                    };
                    listDom.onclick = function (e) {
                        var target = e.target;
                        e.stopPropagation();
                        if (target.tagName.toLowerCase() == 'p') {
                            if (!target.classList.contains('error')) {
                                me.inputDom.value = target.innerHTML;
                                me.inputDom.parentNode.classList.remove('invaild');
                            } else {
                                me.inputDom.value = '';
                            }

                            me.listDom.classList.add('hide');
                        } else if (target.classList.contains('js-page')) {
                            var page = target.innerHTML - 1;
                            me.renderList(inputDom.value, page);
                        }
                    };
                    listDom.onmouseover = function (e) {
                        var target = e.target;
                        if (target.tagName.toLowerCase() == 'p') {
                            [].concat(_toConsumableArray(this.querySelectorAll('p'))).forEach(function (item) {
                                return item.classList.remove('active');
                            });
                            target.classList.add('active');
                        }
                    };
                }
            }]);

            return Suggest;
        }();

        window.SuggestCache = SuggestCache;
        window.Suggest = Suggest;
    })();
}
