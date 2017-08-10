
describe('Component: UIMessage', function() {

    var $scope, controller, flux;

    beforeEach(function(){
        module(App.name);

        inject(function($rootScope, $compile, $flux) {
            var el = angular.element("<div ui-message></div>");
            var flux = $flux;

            $compile(el)($rootScope.$new());
            $rootScope.$digest();

            controller = el.controller("uiMessage");

            for(var i = 0; i < 3; i++){
                flux.dispatch({
                    type: App.Globals.Events.ERROR_LOG,
                    payload: 'Error message goes here'
                });
            }
        });
    });

    it('should exist', function() {
        expect(controller).toBeTruthy();
    });

    describe('addMessage() via Flux Event', function() {
        it('should have a message in the messages array', function() {
            expect(controller.$scope.messages.length > 0).toBeTruthy();
        });

        it('shouldn\'t add the same message more than once', function() {
            expect(controller.$scope.messages.length == 1).toBeTruthy();
        });
    });

});
