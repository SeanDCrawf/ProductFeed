var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    'use strict';
    App.name = 'ProductFeed';
    App.Globals = {
        API: {
            url: 'http://localhost/product_feed/backend/public/api'
        },
        Events: {
            ERROR_LOG: 'error_log'
        }
    };
    angular
        .element(document)
        .ready(function () { return angular.bootstrap(document, [App.name]); });
    angular
        .module(App.name, ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                templateUrl: 'pipeline/Routes/Home/Home.html'
            })
                .when('/product/:product_id', {
                templateUrl: 'pipeline/Routes/Product/Product.html'
            });
        }])
        .run(['$store', '$scroll', function ($store, $scroll) { return null; }]);
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Loader;
        (function (Loader) {
            "use strict";
            angular.module(App.name)
                .directive('loader', function () {
                return {
                    replace: true,
                    transclude: true,
                    templateUrl: 'pipeline/Components/Loader/Loader.html',
                    scope: {}
                };
            });
        })(Loader = Components.Loader || (Components.Loader = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Product;
        (function (Product) {
            var ProductController = (function () {
                function ProductController($scope, $location) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.$scope.controller = this;
                }
                ProductController.prototype.goToProduct = function () {
                    this.$location.path('/product/' + this.$scope.productData.productID);
                };
                ProductController.prototype.rollover = function (state) {
                    if (state === void 0) { state = true; }
                    this.$scope.rollover = state;
                };
                return ProductController;
            }());
            Product.ProductController = ProductController;
            Product.ProductControllerExport = [
                '$scope', '$location',
                function ($scope, $location) { return new ProductController($scope, $location); }
            ];
        })(Product = Components.Product || (Components.Product = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Product;
        (function (Product) {
            "use strict";
            angular.module(App.name)
                .directive('product', function () {
                return {
                    replace: true,
                    transclude: true,
                    templateUrl: 'pipeline/Components/Product/Product.html',
                    scope: {
                        productData: '=',
                        view: '@'
                    },
                    controller: Product.ProductControllerExport
                };
            });
        })(Product = Components.Product || (Components.Product = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        var UIMessage;
        (function (UIMessage) {
            var UIMessageController = (function () {
                function UIMessageController($scope, $flux, $timeout) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$flux = $flux;
                    this.$timeout = $timeout;
                    this._lifeTick = 500;
                    this.$scope.controller = this;
                    this.$scope.messages = [];
                    this.$flux.subscribe({
                        type: App.Globals.Events.ERROR_LOG,
                        action: function (msg) { return _this.addMessage(msg); }
                    });
                }
                UIMessageController.prototype._lifeTicks = function () {
                    var _this = this;
                    var remaining = [];
                    this.$scope.ticking = true;
                    this.$scope.messages.forEach(function (msg) {
                        msg.life -= _this._lifeTick;
                        if (msg.life > 0) {
                            remaining.push(msg);
                        }
                    });
                    this.$scope.messages = remaining;
                    if (this.$scope.messages.length > 0) {
                        this.$timeout(function () { return _this._lifeTicks(); }, this._lifeTick);
                    }
                    else {
                        this.$scope.ticking = false;
                    }
                };
                UIMessageController.prototype._messageExists = function (message) {
                    for (var i = 0; i < this.$scope.messages.length; i++) {
                        if (this.$scope.messages[i].message == message) {
                            return true;
                        }
                    }
                    return false;
                };
                UIMessageController.prototype.addMessage = function (msg, type) {
                    if (type === void 0) { type = 'danger'; }
                    var newMsgObj = {
                        message: msg,
                        life: 10000,
                        type: type
                    };
                    !this._messageExists(msg) && this.$scope.messages.push(newMsgObj);
                    if (!this.$scope.ticking) {
                        this._lifeTicks();
                    }
                };
                return UIMessageController;
            }());
            UIMessage.UIMessageController = UIMessageController;
            UIMessage.UIMessageControllerExport = [
                '$scope', '$flux', '$timeout',
                function ($scope, $flux, $timeout) { return new UIMessageController($scope, $flux, $timeout); }
            ];
        })(UIMessage = Components.UIMessage || (Components.UIMessage = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        var UIMessage;
        (function (UIMessage) {
            "use strict";
            angular.module(App.name)
                .directive('uiMessage', function () {
                return {
                    replace: true,
                    transclude: true,
                    templateUrl: 'pipeline/Components/UIMessage/UIMessage.html',
                    scope: {},
                    controller: UIMessage.UIMessageControllerExport
                };
            });
        })(UIMessage = Components.UIMessage || (Components.UIMessage = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var RouteController = (function () {
            function RouteController($scope, $flux) {
                this.$scope = $scope;
                this.$flux = $flux;
                this.$scope.controller = this;
            }
            return RouteController;
        }());
        Routes.RouteController = RouteController;
        angular.module(App.name)
            .controller('Routes.RouteController', [
            '$scope', '$flux',
            function ($scope, $flux) { return new RouteController($scope, $flux); }
        ]);
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
var Store;
(function (Store) {
    "use strict";
    Store.Events = {
        SET: 'STORE_SET',
        UPDATE: 'STORE_UPDATE'
    };
    var StoreService = (function () {
        function StoreService($flux) {
            var _this = this;
            this.$flux = $flux;
            this._store = {};
            this.$flux.subscribe({
                type: Store.Events.SET,
                action: function (storeData) { return _this._set(storeData); }
            });
        }
        StoreService.prototype._set = function (storeData) {
            this._store[storeData.key] = storeData.value;
            this.$flux.dispatch({ type: Store.Events.UPDATE, payload: storeData.key });
        };
        StoreService.prototype.get = function (key) {
            return this._store[key];
        };
        return StoreService;
    }());
    Store.StoreService = StoreService;
    angular.module(App.name)
        .factory('$store', [
        '$flux',
        function ($flux) { return new StoreService($flux); }
    ]);
})(Store || (Store = {}));
var Scroll;
(function (Scroll) {
    "use strict";
    Scroll.Events = {
        SCROLL_TOP: 'scroll_top'
    };
    var ScrollService = (function () {
        function ScrollService($window, $timeout, $flux) {
            var _this = this;
            this.$window = $window;
            this.$timeout = $timeout;
            this.$flux = $flux;
            this._inc = 20;
            this._timer = 0;
            this.$window.onscroll = function (ev) { return _this._handleScroll(ev); };
            this.$flux.subscribe({
                type: Scroll.Events.SCROLL_TOP,
                action: function (data) { return _this.scrollTop(); }
            });
        }
        ScrollService.prototype._handleScroll = function (ev) {
            this._timer += this._inc;
            if (this._timer == this._inc) {
                this._tickTimer();
            }
        };
        ScrollService.prototype._tickTimer = function () {
            var _this = this;
            this._timer -= (this._inc / 2);
            if (this._timer > 0) {
                this.$timeout(function () { return _this._tickTimer(); }, this._inc);
            }
            else {
                this._timer = 0;
                this._scrollEnd();
            }
        };
        ScrollService.prototype._scrollEnd = function () {
            this.$flux.dispatch({
                type: Store.Events.SET,
                payload: {
                    key: 'scrollY',
                    value: window.scrollY || window.pageYOffset || document.documentElement.scrollTop
                }
            });
        };
        ScrollService.prototype.scrollTop = function () {
            this.$window.scrollTo(0, 0);
        };
        return ScrollService;
    }());
    Scroll.ScrollService = ScrollService;
    angular.module(App.name)
        .factory('$scroll', [
        '$window', '$timeout', '$flux',
        function ($window, $timeout, $flux) { return new ScrollService($window, $timeout, $flux); }
    ]);
})(Scroll || (Scroll = {}));
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var Home;
        (function (Home) {
            var HomeController = (function (_super) {
                __extends(HomeController, _super);
                function HomeController($scope, $flux, $products, $store) {
                    var _this = _super.call(this, $scope, $flux) || this;
                    _this.$products = $products;
                    _this.$store = $store;
                    _this.$scope.controller = _this;
                    _this.$scope.products = [];
                    _this.$scope.model = {
                        product_url: 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf8&fid=251713&categoryType=2&additionalType=2&limit=10'
                    };
                    _this.$flux.subscribe({
                        type: Store.Events.UPDATE,
                        action: function (key) {
                            switch (key) {
                                case 'products':
                                    _this._updateProducts();
                                    break;
                                case 'scrollY':
                                    _this._updateScrollY();
                                    break;
                            }
                        }
                    });
                    _this._updateProducts();
                    if (!_this.$scope.products) {
                        _this.submit();
                    }
                    return _this;
                }
                HomeController.prototype.keypress = function (ev) {
                    ev.keyCode === 13 && this.submit();
                };
                HomeController.prototype.toTop = function () {
                    this.$flux.dispatch({ type: Scroll.Events.SCROLL_TOP });
                };
                HomeController.prototype.submit = function () {
                    var _this = this;
                    this.$scope.loading = true;
                    this.$products.list({ url: this.$scope.model.product_url }, function (r) { return _this._storeData(r); }, function (r) { return _this._handleError(r); });
                };
                HomeController.prototype._storeData = function (response) {
                    this.$flux.dispatch({
                        type: Store.Events.SET,
                        payload: {
                            key: 'products',
                            value: response.data
                        }
                    });
                    this.$scope.loading = false;
                };
                HomeController.prototype._handleError = function (response) {
                    for (var i in response.data) {
                        for (var q = 0; q < response.data[i].length; q++) {
                            this.$flux.dispatch({
                                type: App.Globals.Events.ERROR_LOG,
                                payload: response.data[i][q]
                            });
                        }
                    }
                    this.$scope.loading = false;
                };
                HomeController.prototype._updateProducts = function () {
                    this.$scope.products = this.$store.get('products');
                };
                HomeController.prototype._updateScrollY = function () {
                    this.$scope.scrollY = this.$store.get('scrollY');
                };
                return HomeController;
            }(Routes.RouteController));
            Home.HomeController = HomeController;
            angular.module(App.name)
                .controller('Routes.HomeController', [
                '$scope', '$flux', '$products', '$store',
                function ($scope, $flux, $products, $store) { return new HomeController($scope, $flux, $products, $store); }
            ]);
        })(Home = Routes.Home || (Routes.Home = {}));
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var Product;
        (function (Product) {
            var ProductController = (function (_super) {
                __extends(ProductController, _super);
                function ProductController($scope, $flux, $products, $store, $routeParams, $location) {
                    var _this = _super.call(this, $scope, $flux) || this;
                    _this.$products = $products;
                    _this.$store = $store;
                    _this.$routeParams = $routeParams;
                    _this.$location = $location;
                    _this.$scope.controller = _this;
                    _this._updateProduct();
                    return _this;
                }
                ProductController.prototype.goBack = function () {
                    this.$location.path('/');
                };
                ProductController.prototype._updateProduct = function () {
                    var products = this.$store.get('products');
                    for (var i in products) {
                        if (products[i].productID === this.$routeParams.product_id) {
                            return (this.$scope.product = products[i]);
                        }
                    }
                    this.$location.path('/');
                    this.$flux.dispatch({
                        type: App.Globals.Events.ERROR_LOG,
                        payload: 'Can\'t find that product.'
                    });
                };
                return ProductController;
            }(Routes.RouteController));
            Product.ProductController = ProductController;
            angular.module(App.name)
                .controller('Routes.ProductController', [
                '$scope', '$flux', '$products', '$store', '$routeParams', '$location',
                function ($scope, $flux, $products, $store, $routeParams, $location) { return new ProductController($scope, $flux, $products, $store, $routeParams, $location); }
            ]);
        })(Product = Routes.Product || (Routes.Product = {}));
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
var API;
(function (API) {
    var Products;
    (function (Products) {
        "use strict";
        var ProductsService = (function () {
            function ProductsService($http, $flux) {
                this.$http = $http;
                this.$flux = $flux;
            }
            ProductsService.prototype._apiUrl = function (uri) {
                return App.Globals.API.url + uri;
            };
            ProductsService.prototype.list = function (data, success, error) {
                if (data === void 0) { data = {}; }
                this.$http({
                    method: 'POST',
                    url: this._apiUrl('/products'),
                    data: data
                }).then(function (response) { return !!success && success(response); }, function (response) { return !!error && error(response); });
            };
            return ProductsService;
        }());
        Products.ProductsService = ProductsService;
        angular.module(App.name)
            .factory('$products', [
            '$http', '$flux',
            function ($http, $flux) { return new ProductsService($http, $flux); }
        ]);
    })(Products = API.Products || (API.Products = {}));
})(API || (API = {}));
var Flux;
(function (Flux) {
    "use strict";
    var Dispatcher = (function () {
        function Dispatcher() {
            this._subscriptions = {};
        }
        Object.defineProperty(Dispatcher.prototype, "subscriptions", {
            get: function () {
                return this._subscriptions;
            },
            enumerable: true,
            configurable: true
        });
        Dispatcher.prototype._dispatch = function (ev) {
            this._subscriptions[ev.type] && this._subscriptions[ev.type].forEach(function (subscription) {
                subscription(ev.payload);
            });
            return this;
        };
        Dispatcher.prototype.dispatch = function (ev) {
            if (ev.constructor !== Array) {
                return this._dispatch(ev);
            }
            else {
                for (var i in ev) {
                    this._dispatch(ev[i]);
                }
                return this;
            }
        };
        Dispatcher.prototype._subscribe = function (act) {
            (this._subscriptions[act.type] = this._subscriptions[act.type] || []).push(act.action);
            return this;
        };
        Dispatcher.prototype.subscribe = function (act) {
            if (act.constructor !== Array) {
                return this._subscribe(act);
            }
            else {
                for (var i in act) {
                    this._subscribe(act[i]);
                }
                return this;
            }
        };
        return Dispatcher;
    }());
    Flux.Dispatcher = Dispatcher;
    angular.module(App.name)
        .factory('$flux', [function () { return new Dispatcher(); }]);
})(Flux || (Flux = {}));
//# sourceMappingURL=app.js.map