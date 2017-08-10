angular.module(App.name).run(["$templateCache", function($templateCache) {

  'use strict';

  $templateCache.put('pipeline/Components/Loader/Loader.html',
    "<div class=\"text-center loader\"> <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL --> <svg width=\"120\" height=\"30\" viewbox=\"0 0 120 30\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#fff\"> <circle cx=\"15\" cy=\"15\" r=\"15\" fill=\"#CCC\"> <animate attributename=\"r\" from=\"15\" to=\"15\" begin=\"0s\" dur=\"0.8s\" values=\"15;9;15\" calcmode=\"linear\" repeatcount=\"indefinite\"> <animate attributename=\"fill-opacity\" from=\"1\" to=\"1\" begin=\"0s\" dur=\"0.8s\" values=\"1;.5;1\" calcmode=\"linear\" repeatcount=\"indefinite\"> </circle> <circle cx=\"60\" cy=\"15\" r=\"9\" fill=\"#CCC\" fill-opacity=\"0.3\"> <animate attributename=\"r\" from=\"9\" to=\"9\" begin=\"0s\" dur=\"0.8s\" values=\"9;15;9\" calcmode=\"linear\" repeatcount=\"indefinite\"> <animate attributename=\"fill-opacity\" from=\"0.5\" to=\"0.5\" begin=\"0s\" dur=\"0.8s\" values=\".5;1;.5\" calcmode=\"linear\" repeatcount=\"indefinite\"> </circle> <circle cx=\"105\" cy=\"15\" r=\"15\" fill=\"#CCC\"> <animate attributename=\"r\" from=\"15\" to=\"15\" begin=\"0s\" dur=\"0.8s\" values=\"15;9;15\" calcmode=\"linear\" repeatcount=\"indefinite\"> <animate attributename=\"fill-opacity\" from=\"1\" to=\"1\" begin=\"0s\" dur=\"0.8s\" values=\"1;.5;1\" calcmode=\"linear\" repeatcount=\"indefinite\"> </circle> </svg> </div>"
  );


  $templateCache.put('pipeline/Components/Product/Product.html',
    "<div class=\"product col-xs-12\" ng-class=\"{ 'col-sm-4 col-md-3':view == 'list' }\"> <div class=\"panel panel-default\" ng-class=\"{ 'panel-rollver': rollover }\" ng-click=\"controller.goToProduct()\" ng-mouseenter=\"controller.rollover()\" ng-mouseleave=\"controller.rollover(false)\" ng-if=\"view == 'list'\"> <div class=\"panel-body\"> <div class=\"panel-image\"> <img class=\"full-width\" ng-src=\"{{ productData.imageURL }}\" alt=\"{{ productData.name }}\"> </div> <h5><strong>{{ productData.name }}</strong></h5> <div class=\"pull-left\"> <em>{{ productData.currency }} {{ productData.price }}</em> </div> <div class=\"pull-right\"> <span class=\"label label-default\" ng-repeat=\"category in productData.categories\">{{ category }}</span> </div> </div> </div> <div ng-if=\"view == 'single'\"> <div class=\"row\"> <div class=\"col-xs-12 col-sm-9 pull-right\"> <h3><strong>{{ productData.name }}</strong></h3> <div class=\"h3\"> <em>{{ productData.currency }} {{ productData.price }}</em> </div> </div> <div class=\"col-xs-12 col-sm-3\"> <img class=\"img-thumbnail\" ng-src=\"{{ productData.imageURL }}\" alt=\"{{ productData.name }}\"> </div> <div class=\"col-xs-12 col-sm-9 pull-right\"> <br> <p style=\"white-space: pre-wrap\">{{ productData.description }}</p> <br> <div class=\"pull-right\"><strong>Categories:</strong> <span class=\"label label-default\" ng-repeat=\"category in productData.categories\">{{ category }}</span></div> <br> <br> </div> </div> </div> </div>"
  );


  $templateCache.put('pipeline/Components/UIMessage/UIMessage.html',
    "<div class=\"ui-message-container\"> <div class=\"text-right\" ng-repeat=\"msgObj in messages\"> <div class=\"alert alert-danger\" ng-class=\"{ 'active': msgObj.life > 1000 }\"> {{ msgObj.message }} </div> </div> </div>"
  );


  $templateCache.put('pipeline/Routes/Home/Home.html',
    "<div ng-controller=\"Routes.HomeController\"> <div ng-form name=\"product_search\"> <div class=\"form-group\"> <div class=\"input-group\"> <div class=\"input-group-addon\" ng-click=\"controller.submit()\"><i class=\"glyphicon glyphicon-search\"></i></div> <input type=\"text\" ng-keypress=\"controller.keypress($event)\" class=\"form-control input-lg\" id=\"product_url\" ng-model=\"model.product_url\" name=\"product_url\" placeholder=\"http://pf.tradetracker.net/...\"> <div class=\"input-group-addon hidden-xs\" ng-if=\"products.length > 0\">{{ products.length }} results</div> </div> </div> </div> <div class=\"product-list row\"> <div product ng-repeat=\"product in products\" product-data=\"product\" view=\"list\"></div> <div loader ng-show=\"loading\"></div> </div> <div class=\"text-center\"> <hr ng-if=\"products.length > 0\"> <div class=\"btn btn-primary\" ng-style=\"{ 'opacity': (scrollY > 0)?1:0 }\" ng-click=\"controller.toTop();\"><i class=\"glyphicon glyphicon-chevron-up\"></i>&nbsp;Back to top</div> </div> <br> </div>"
  );


  $templateCache.put('pipeline/Routes/Product/Product.html',
    "<div ng-controller=\"Routes.ProductController\"> <div class=\"btn btn-default\" ng-click=\"controller.goBack()\"> <i class=\"glyphicon glyphicon-chevron-left\"></i>&nbsp;Back </div> <a class=\"btn btn-success pull-right\" href=\"{{ product.productURL }}\"><i class=\"glyphicon glyphicon-ok\"></i>&nbsp;Visit Website</a> <hr> <div class=\"product-list row\"> <div product product-data=\"product\" view=\"single\"></div> <div loader ng-show=\"loading\"></div> </div> </div>"
  );


}]);