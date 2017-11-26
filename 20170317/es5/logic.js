/**
 * Created by zhigang.zhang on 17-3-20.
 */
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n                <div class="item">\n                    <div class="icon">', '</div>\n                    <div class="info">\n                        <div class="from">\n                            <p class="time">', '</p>\n                            <p class="city">', '</p>\n                        </div>\n                        <div class="during">\n                            <p class="usetime">', '</p>\n                            <p class="seperate"></p>\n                            <p>', '</p>\n                        </div>\n                        <div class="to">\n                            <p class="time">', '</p>\n                            <p class="city">', '</p>\n                        </div>\n                    </div>\n                    <div class="price">\n                        <span>&yen;</span>', '\n                    </div>\n                </div>'], ['\n                <div class="item">\n                    <div class="icon">', '</div>\n                    <div class="info">\n                        <div class="from">\n                            <p class="time">', '</p>\n                            <p class="city">', '</p>\n                        </div>\n                        <div class="during">\n                            <p class="usetime">', '</p>\n                            <p class="seperate"></p>\n                            <p>', '</p>\n                        </div>\n                        <div class="to">\n                            <p class="time">', '</p>\n                            <p class="city">', '</p>\n                        </div>\n                    </div>\n                    <div class="price">\n                        <span>&yen;</span>', '\n                    </div>\n                </div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

{
    (function () {
        var initSuggest = function initSuggest() {
            var suggests = [].concat(_toConsumableArray(document.querySelectorAll('[data-role="suggest"]')));
            //出发 到达用一个cache
            var cache = new SuggestCache();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = suggests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var suggest = _step.value;

                    new Suggest(suggest, { cache: cache });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };

        var repeat = function repeat(data) {
            var strArr = [];
            return function (strs) {
                for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    params[_key - 1] = arguments[_key];
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    var _loop = function _loop() {
                        var i = _step2.value;

                        strArr.push(String.raw.apply(String, [{ raw: strs }].concat(_toConsumableArray(params.map(function (item) {
                            return i[item];
                        })))));
                    };

                    for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return strArr.join('');
            };
        };

        var renderItem = function renderItem(data) {
            var str = repeat(data)(_templateObject, 'type', 'startTime', 'startCity', 'duration', 'number', 'arriveTime', 'arriveCity', 'price');
            return str;
        };

        var renderList = function renderList(data) {
            var arr = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var container = _step3.value;

                    var item = renderItem(container.items);
                    arr.push('\n                    <div class=\'container\'>\n                        ' + item + '\n                    </div>');
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            document.querySelector('[data-role="list"]').innerHTML = arr.join('');
        };

        var bindEvents = function bindEvents() {
            var suggetInput = [].concat(_toConsumableArray(document.querySelectorAll('[data-role="input"]')));
            var cityList = [].concat(_toConsumableArray(document.querySelectorAll('[data-role="citylist"]')));
            //换
            document.querySelector('[action-type="exchange"]').onclick = function (e) {
                e.preventDefault();

                var _ref = [].concat(_toConsumableArray(suggetInput.map(function (item) {
                    return item.value;
                })));

                suggetInput[1].value = _ref[0];
                suggetInput[0].value = _ref[1];
            };
            document.querySelector(':root').onclick = function () {
                cityList.forEach(function (item, index) {
                    if (!item.classList.contains('hide')) {
                        var active = item.querySelector('.active');
                        if (!active.classList.contains('error')) {
                            suggetInput[index].value = active.innerHTML;
                            suggetInput[index].parentNode.classList.remove('invaild');
                        } else {
                            suggetInput[index].value = '';
                        }
                        item.classList.add('hide');
                    }
                });
            };
            document.querySelector('[data-role="search"]').onclick = function (e) {
                var params = [];
                var flag = true;
                suggetInput.forEach(function (item) {
                    if (!item.value) {
                        item.parentNode.classList.add('invaild');
                        flag = false;
                        return false;
                    }
                    params.push(item.getAttribute('name') + '=' + item.value);
                });
                if (flag) {
                    fetch(listUrl + '?' + params.join('&')).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                            return renderList(data);
                        });
                }
            };
        };

        var init = function init() {
            initSuggest();
            bindEvents();

            //test code
            renderList([{
                'items': [{
                    'type': '火车',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '11.4'
                }, {
                    'type': '飞机',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '12'
                }, {
                    'type': '轮船',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '50'
                }]
            }, {
                'items': [{
                    'type': '火车',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '11.4'
                }, {
                    'type': '飞机',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '12'
                }]
            }, {
                'items': [{
                    'type': '火车',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '11.4'
                }, {
                    'type': '飞机',
                    'startTime': '11:44',
                    'startCity': '北京',
                    'duration': '22时44分',
                    'number': 'K44',
                    'arriveTime': '02:23',
                    'arriveCity': '乌鲁木齐',
                    'price': '12'
                }]
            }]);
        };

        var listUrl = '';

        init();
    })();
}
