describe('Service: Products', function() {

    var _$products;

    beforeEach(function(){
        module(App.name);

        inject(function($products) {
            _$products = $products;
        });

    });

    it('should exist', function() {
        expect(_$products).toBeTruthy();
    });


});
