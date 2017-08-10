
describe('Service: Scroll', function() {

    var scroll;

    beforeEach(function(){
        module(App.name);

        inject(function($scroll) {
            scroll = $scroll;
        });
    });

    it('should exist', function() {
        expect(scroll).toBeTruthy();
    });

});
