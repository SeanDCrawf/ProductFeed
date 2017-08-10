///<reference path="../Store/StoreService.ts"/>

module Scroll {
    "use strict";

    export var Events = {
        SCROLL_TOP: 'scroll_top'
    };

    export class ScrollService {

        // The frequency and quantity of the throttle tick
        private _inc: number = 20;

        // Stores the current throttle value
        private _timer: number = 0;

        constructor(private $window, private $timeout, private $flux) {
            this.$window.onscroll = (ev) => this._handleScroll(ev);

            this.$flux.subscribe({
                type: Events.SCROLL_TOP,
                action: (data) => this.scrollTop()
            });
        }

        /**
         * Begins the throttling of the JS scroll event
         * @param ev {ScrollEvent}    The scroll event
         */
        private _handleScroll(ev): void {
            this._timer += this._inc;

            if(this._timer == this._inc){
                this._tickTimer();
            }
        }

        /**
         * Handles to counting down of the throttle value _timer.
         */
        private _tickTimer(): void {
            this._timer -= (this._inc/2);
            if(this._timer > 0){
                this.$timeout(() => this._tickTimer(), this._inc);
            } else {
                this._timer = 0;
                this._scrollEnd();
            }
        }

        /**
         * Dispatches the most recent value of the scrollY value to the store.
         */
        private _scrollEnd(): void {
            this.$flux.dispatch({
                type: Store.Events.SET,
                payload: {
                    key: 'scrollY',
                    value: window.scrollY || window.pageYOffset || document.documentElement.scrollTop
                }
            });
        }

        /**
         * Scrolls the window to the top.
         */
        public scrollTop(): void {
            this.$window.scrollTo(0,0);
        }

    }

    angular.module(App.name)
        .factory('$scroll', [
            '$window', '$timeout', '$flux',
            ($window, $timeout, $flux) => new ScrollService($window, $timeout, $flux)
        ]);
}
