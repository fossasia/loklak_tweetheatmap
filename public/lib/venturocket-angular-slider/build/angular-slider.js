/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inputtypes-load
 */
;



window.AngularSlider = (function( window, document, undefined ) {

    var version = '2.7.1',

    AngularSlider = {},


    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  = document.createElement('input')  ,

    smile = ':)',

    toString = {}.toString,    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName,



    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }


    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }
    function webforms() {
                            AngularSlider['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                                                    if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                                        bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                                                                                  (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                                                                                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                                        bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        }
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            AngularSlider[featureName] = tests[feature]();

            classes.push((AngularSlider[featureName] ? '' : 'no-') + featureName);
        }
    }

    AngularSlider.input || webforms();


     AngularSlider.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             AngularSlider.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( AngularSlider[feature] !== undefined ) {
                                              return AngularSlider;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         AngularSlider[feature] = test;

       }

       return AngularSlider; 
     };


    setCss('');
    modElem = inputElem = null;


    AngularSlider._version      = version;


    return AngularSlider;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
AngularSlider.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
;

/*
 angular-slider
 (c) 2013-2014 Venturocket, Inc. http://github.com/Venturocket
 License: MIT
 */

angular.module('vr.directives.slider', ['ngTouch']).directive('slider',
	['$timeout', '$document', '$interpolate', '$swipe', 
	 	function($timeout, $document, $interpolate, $swipe) {

            /**
             * How sticky the knobs feel...ew
             * @type {number}
             */
            var KNOB_STICKINESS = 3;

            /**
             * You want custom start and end symbols? You can have custom start and end symbols
             * @type {string}
             */
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol();

            /**
             * Convert a regular element to an angular element...Oh fancy! *waves hands*
             * @param {object} element
             * @returns {object} the new element
             */
            function angularize(element) {
                return angular.element(element);
            }

            /**
             * Adds 'px' to the end of a number...Yes, that's really all it does.
             * @param {(string|Number)} position
             * @returns {string}
             */
            function pixelize(position) {
                return "" + position + "px";
            }

            /**
             * I'm not completely sure what this does, but I have a feeling it has something to do with opacity
             * @param {object} element
             * @param {Number} opacity
             * @returns {object} the element
             */
            function setOpacity(element, opacity) {
                return element.css({
                    opacity: opacity
                });
            }

            /**
             * Sets the element's opacity to 0
             * @param {object} element
             * @returns {object} the element
             */
            function hide(element) {
                return setOpacity(element, 0);
            }

            /**
             * Sets the element's opacity to 1
             * @param {object} element
             * @returns {object} the element
             */
            function show(element) {
                return setOpacity(element, 1);
            }

            /**
             * offsets the element from the left the given amount
             * @param {object} element
             * @param {Number|string} position
             * @returns {object} the element
             */
            function offset(element, position) {
                return element.css({
                    left: position
                });
            }

            /**
             * Determines the width of the element...somehow
             * @param {object} element
             * @returns {number}
             */
            function width(element) {
                var width = parseFloat(element.css('width'));
                return isNaN(width) ? element[0].offsetWidth : width;
            }

            /**
             * You wouldn't believe me if I told you, but this will tell you how wide half of the given element is!
             * @param {object} element
             * @returns {number}
             */
            function halfWidth(element) {
                return width(element) / 2;
            }

            /**
             * Determine the amount of space to the left of the element
             * @param {object} element
             * @returns {Number}
             */
            function offsetLeft(element) {
                try {return element.offset().left;} catch(e) {}
                return element[0].getBoundingClientRect().left; // + scrollX;
            }

            /**
             * Compute the gap between the two given elements
             * @param {object} element1
             * @param {object} element2
             * @returns {number}
             */
            function gap(element1, element2) {
                if(offsetLeft(element1) > offsetLeft(element2)) {
                    return offsetLeft(element1) - offsetLeft(element2) - width(element2);
                }
                return offsetLeft(element2) - offsetLeft(element1) - width(element1);
            }

            /**
             * Binds the given html string to the given element
             * @param {object} element
             * @param {string} html
             * @returns {object} the element
             */
            function bindHtml(element, html) {
                return element.attr('ng-bind-template', html);
            }

            /**
             * Computes the nearest full step
             * @param {Number} [value = 0]
             * @param {Number} [precision = 0]
             * @param {Number} [step = 1/Math.pow(10, precision)]
             * @param {Number} [floor = 0]
             * @param {Number} [ceiling]
             * @returns {Number}
             */
            function roundToStep(value, precision, step, floor, ceiling) {

                // precision is optional
                if(angular.isUndefined(precision) || !precision) {
                    precision = 0;
                }

                // step is optional
                if(angular.isUndefined(step) || !step || step == 0) {
                    step = 1 / Math.pow(10, precision);
                }

                // floor is optional
                if(angular.isUndefined(floor) || !floor) {
                    floor = 0;
                }

                // value is optional
                if(angular.isUndefined(value) || !value) {
                    value = 0;
                }

                // how far from a step is the value
                var remainder = (value - floor) % step;

                // round the value to a step
                var roundedValue = remainder > (step / 2) ? value + step - remainder : value - remainder;

                // ceiling is optional
                if(angular.isUndefined(ceiling) || !ceiling) {
                    ceiling = roundedValue;
                }

                // bring the value back in range
                roundedValue = Math.min(Math.max(roundedValue, floor), ceiling);

                // set the precision
                return parseFloat(roundedValue.toFixed(precision));
            }

			/**
			 * Round the given number to an arbitrary step
			 * @param {number} value
			 * @param {number} step
			 * @returns {number}
			 */
			function roundTo(value, step) {
				return Math.floor((value / step) + 0.5) * step;
			}

            /**
             * Rounds the buffer up to the nearest full step
             * @param {Number} step
             * @param {Number} buffer
             * @returns {Number}
             */
            function stepBuffer(step, buffer) {
                if(step > 0 && !isNaN(buffer)) {
                    return Math.ceil(buffer / step) * step;
                }
                return buffer;
            }

            /**
             * Wraps the given expression in whatever start and end symbol this app uses
             * @param {string} exp
             * @returns {string}
             */
            function expression(exp) {
                return startSymbol + " " + exp + " " + endSymbol;
            }

            return {
                restrict: 'EA',
				require: 'ngModel',
                scope: {
                    floor            	: '@',   // the minimum possible value
                    ceiling          	: '@',   // the maximum possible value
                    step             	: '@',   // how wide is each step, omit or set to 0 for no steps
					stepWidth			: '@',   // alias of step to avoid collisions
                    precision        	: '@',   // how many decimal places do we care about
                    buffer           	: '@',   // how close can the two knobs of a dual knob slider get?
                    stickiness      	: '@',   // how sticky should the knobs feel...seriously, how did this get all sticky? gross
                    showSteps        	: '@',   // show the step value bubbles?
                    ngModel          	: '=',   // single knob/dual know low value binding
                    ngModelRange     	: '=',   // dual knob high value binding
					ngDisabled		 	: '=',   // should the slider be disabled?
					ngChange			: '&',   // what should we do when a value is changed
                    translateFn   	 	: '&',   // how to translate the values displayed in the bubbles
                    translateRangeFn   	: '&',   // how to translate the range bubble
                    translateCombinedFn	: '&',   // how to translate the combined bubble 
                    scaleFn          	: '&',   // how to scale the values
                    inverseScaleFn   	: '&'    // how to unscale the values
                },
                template: // bar background
                    "<span class='bar full'></span>" + // secondary bars used for dual knobs
                    "<span class='bar steps'><span class='bubble step' ng-repeat='step in stepBubbles()'></span></span>" + // step bubbles
                    "<span class='bar selection'></span><span class='bar unselected low'></span><span class='bar unselected high'></span>" + // the knobs
                    "<span class='pointer low'></span><span class='pointer high'></span>" + // current value bubbles
                    "<span class='bubble low'></span><span class='bubble high'></span><span class='bubble middle'></span><span class='bubble selection'></span>" + // low, high, middle and selection bubbles
                    "<span class='bubble limit floor'></span><span class='bubble limit ceiling'></span>" + // upper and lower limit bubbles
                    "<input type='range' class='input low' /><input type='range' class='input high' /><input type='range' class='input selection' />", // range sliders used for browsers that support them

                compile: function(element, attributes) {
                    // are we gonna show the step bubbles?
                    var showSteps = attributes.showSteps;
					
					// are we using 'step' or 'step-width'?
					var stepWidth = attributes.stepWidth?'stepWidth':'step';

                    // dual knob?
                    var isDualKnob = attributes.ngModelRange != null,

                    // init element references
                        refs = {},

                    // which properties do we want to use?
                        refLow = 'ngModel', refHigh = 'ngModelRange', refSel = 'selectBar',

                    // which properties to we want to watch for changes?
                        watchables = ['floor', 'ceiling', 'stickiness', refLow];

                    /**
                     * Get references to all the children of the given element
                     * @param {object} [el = element]
                     * @returns {Array} the children of el
                     */
                    function getReferences(el) {
                        if(!el) {
                            el = element;
                        }
                        var refs = [];
                        angular.forEach(el.children(), function(el) {
                            refs.push(angularize(el));
                        });
                        return refs;
                    }

                    /**
                     * Set the references for use later
                     * @param {Array} refs
                     * @param {Boolean} [dual = false] is this a dual knob slider?
                     * @param {Boolean} [inputs = false] are we using range inputs?
                     */
                    function setReferences(refs, dual, inputs) {
                        return {
                            fullBar     : refs[0],                                        // background bar
                            stepBubs    : refs[1],                                        // the steps bubbles
                            selBar      : dual ? refs[2] : null,                          // dual knob: the bar between knobs
                            unSelBarLow : dual ? refs[3] : null,                          // dual knob: the bar to the left of the low knob
                            unSelBarHigh: dual ? refs[4] : null,                          // dual knob: the bar to the right of the high knob
                            minPtr      : dual ? refs[5] : refs[2],                       // single knob: the knob, dual knob: the low knob
                            maxPtr      : dual ? refs[6] : null,                          // dual knob: the high knob
                            lowBub      : dual ? refs[7] : refs[3],                       // single knob: the value bubble, dual knob: the low value bubble
                            highBub     : dual ? refs[8] : null,                          // dual knob: the high value bubble
                            cmbBub      : dual ? refs[9] : null,                          // dual knob: the range values bubble
                            selBub      : dual ? refs[10] : null,                         // dual knob: the range width bubble
                            flrBub      : dual ? refs[11] : refs[4],                      // the lower limit bubble
                            ceilBub     : dual ? refs[12] : refs[5],                      // the upper limit bubble
                            minInput    : inputs ? (dual ? refs[13] : refs[6]) : null,    // single knob: the actual slider input, dual knob: the low value slider input
                            maxInput    : inputs ? (dual ? refs[14] : null) : null,       // dual knob: the high value slider input
                            selInput    : inputs ? (dual ? refs[15] : null) : null        // dual knob: the selection slider input
                        };
                    }

                    // set up the references
                    refs = (function() {

                        var _ref = getReferences();
                        var _results = [];
                        for(var _i = 0, _len = _ref.length; _i < _len; _i++) {
                            var e = _ref[_i];
                            e = angularize(e);
                            e.css({
                                'white-space': 'nowrap',
                                position     : 'absolute',
                                display      : 'block',
                                'z-index'    : 1
                            });
                            _results.push(e);
                        }
                        return _results;
                    })();
                    refs = setReferences(refs, true, true);

                    // set up the translation function
                    if(attributes.translateFn) {
                        attributes.$set('translateFn', "" + attributes.translateFn + "(value)");
                    }

                    // set up the translation function for the range bubble
                    if(attributes.translateRangeFn) {
                        attributes.$set('translateRangeFnFn', "" + attributes.translateRangeFn + "(low,high)");
                    }

                    // set up the translation function for the center bubble
                    if(attributes.translateCombinedFn) {
                        attributes.$set('translateCombinedFnFn', "" + attributes.translateCombinedFn + "(low,high)");
                    }

                    // set up the encoding function
                    if(attributes.scaleFn) {
                        attributes.$set('scaleFn', "" + attributes.scaleFn + "(value)");
                    }

                    // set up the decoding function
                    if(attributes.inverseScaleFn) {
                        attributes.$set('inverseScaleFn', "" + attributes.inverseScaleFn + "(value)");
                    }

                    // set up the background bar so it fills the entire width of the slider
                    refs.fullBar.css({
                        left : 0,
                        right: 0
                    });

                    // set up range inputs
                    if(AngularSlider.inputtypes.range) {
                        // we can use range inputs

                        /**
                         * default range input styles
                         * @type {{position: string, margin: number, padding: number, opacity: number, height: string}}
                         */
                        var inputStyles = {
                            position: 'absolute',
                            margin  : 0,
                            padding : 0,
                            opacity : 0,
                            height  : '100%'
                        };

                        // set up the low value range input
                        refs.minInput.attr('step', expression("inputSteps()"));  // set the number of steps
                        refs.minInput.attr('min', expression("floor"));          // set the minimum possible value
                        refs.minInput.css(inputStyles);                          // apply the default styles
                        refs.minInput.css('left', 0);                            // stick it to the left

                        if(isDualKnob) {
                            // this is a dual knob slider

                            refs.minInput.attr('max', expression("ngModelRange - (buffer / 2)")); // set the maximum value of the low range input so it doesn't overlap the high range input's minimum value

                            // set up the high value range input
                            refs.maxInput.attr('step', expression("inputSteps()"));              // set the number of steps
                            refs.maxInput.attr('min', expression("ngModel + (buffer / 2)"));  // set the minimum value of the high range input so it doesn't overlap the low range input's maximum value
                            refs.maxInput.attr('max', expression("ceiling"));                    // set the maximum possible value
                            refs.maxInput.css(inputStyles);                                      // apply the default styles

                            // set up the selection range input
                            refs.selInput.attr('step', expression("inputSteps()"));  // set the number of steps
                            refs.selInput.attr('min', expression("ngModel"));     // set up the minimum value
                            refs.selInput.attr('max', expression("ngModelRange"));    // set up the maximum falue
                            refs.selInput.css(inputStyles);                          // apply the default styles
                        } else {
                            // this is single knob slider

                            refs.minInput.attr('max', expression("ceiling"));    // set the maximum possible value
                            refs.minInput.css({ width: '100%' });                // make sure it fills the entire slider
                            refs.maxInput.remove();                              // get rid of the high value range input
                            refs.selInput.remove();                              // get rid of the selection value range input
                        }
                    } else {
                        // we can't use range inputs :(
                        refs.minInput.remove();
                        refs.maxInput.remove();
                        refs.selInput.remove();
                    }

                    // set up bubbles
                    bindHtml(refs.stepBubs.children().eq(0), expression("translation(step)"));
                    bindHtml(refs.ceilBub, expression("translation(ceiling)"));
                    bindHtml(refs.flrBub, expression("translation(floor)"));
                    bindHtml(refs.selBub, expression("rangeTranslation(" + refLow + "," + refHigh + ")"));
                    bindHtml(refs.lowBub, expression("translation(" + refLow + ")"));
                    bindHtml(refs.highBub, expression("translation(" + refHigh + ")"));
                    bindHtml(refs.cmbBub, expression("combinedTranslation(" + refLow + "," + refHigh + ")"));

                    // start to compile watchables
                    if(isDualKnob) {
                        // dual knob so also watch the high value and buffer
                        watchables.push(refHigh);
                        watchables.unshift('buffer');
                    } else {
                        // single knob so get rid of what we don't need
                        var _ref1 = [refs.selBar, refs.unSelBarLow, refs.unSelBarHigh, refs.maxPtr, refs.selBub, refs.highBub, refs.cmbBub];
                        for(var _i = 0, _len = _ref1.length; _i < _len; _i++) {
                            element = _ref1[_i];
                            element.remove();
                        }
                    }
                    // make sure the precision and step are first in the list
                    watchables.unshift('precision', stepWidth);
                    
                    if(!showSteps) {
                        // we're not displaying the step bubbles this time
                        refs.stepBubs.children().remove();
                    }

                    return {
                        post: function(scope, element, attributes, ctrl) {
                            // re-set references locally to avoid any cross contamination and disassociation when using transcluded scopes (namely ng-repeat)
                            var refs = setReferences(getReferences(element), isDualKnob, AngularSlider.inputtypes.range);

                            /**
                             * Save the decoded values so we don't have to decode every...single...time....ugh
                             * @type {{floor: number, ceiling: number, step: number, precision: number, buffer: number, stickiness: number, ngModel: number, ngModel: number, ngModelRange: number}}
                             */
                            scope.decodedValues = {
                                floor      	: 0,
                                ceiling    	: 0,
                                step  		: 0,
								stepWidth	: 0,
                                precision  	: 0,
                                buffer     	: 0,
                                stickiness 	: 0,
                                ngModel    	: 0,
                                ngModelRange: 0
                            };

                            /**
                             * Apply the supplied translation function if necessary
                             * @param {(string|Number)} value
                             * @returns {string}
                             */
                            scope.translation = function(value) {
                                value = parseFloat(value).toFixed(scope.precision);
                                if(angular.isUndefined(attributes.translateFn)) {
                                    return '' + value;
                                }
                                return scope.translateFn({value: value});
                            };

                            /**
                             * Apply the supplied translation function for the range if necessary
                             * @param {(string|Number)} low
                             * @param {(string|number)} high
                             * @returns {string}
                             */
                            scope.rangeTranslation = function(low, high) {
                                if(angular.isUndefined(attributes.translateRangeFn)) {
                                    return "Range: " + scope.translation((high - low).toFixed(scope.precision));
                                }
                                return scope.translateRangeFn({low: low, high: high});
                            };

                            /**
                             * Apply the supplied translation function for the center if necessary
                             * @param {(string|Number)} low
                             * @param {(string|number)} high
                             * @returns {string}
                             */
                            scope.combinedTranslation = function(low, high) {
                                if(angular.isUndefined(attributes.translateCombinedFn)) {
                                    return scope.translation(low) + " - " + scope.translation(high);
                                }
                                return scope.translateCombinedFn({low: low, high: high});
                            };

                            /**
                             * Encode the value given
                             * @param {number} value
                             * @returns {number}
                             */
                            scope.encode = function(value) {
                                if(angular.isUndefined(attributes.scaleFn) || attributes.scaleFn == '') {
                                    return value;
                                }
                                return scope.scaleFn({value: value});
                            };

                            /**
                             * Decode the value given
                             * @param {number} value
                             * @returns {number}
                             */
                            scope.decode = function(value) {
                                if(angular.isUndefined(attributes.inverseScaleFn) || attributes.inverseScaleFn == '') {
                                    return value;
                                }
                                return scope.inverseScaleFn({value: value});
                            };
                            
                            if(Math.round(scope.encode(scope.decode(1))) != 1 || Math.round(scope.encode(scope.decode(100))) != 100) {
                                console.warn("The scale and inverseScale functions are not perfect inverses: 1 = "+scope.encode(scope.decode(1))+"  100 = "+scope.encode(scope.decode(100)));
                            }

                            /**
                             * Decode the value of the given reference
                             * @param {string} ref
                             * @returns {number}
                             */
                            scope.decodeRef = function(ref) {
                                return scope.decode(scope[ref]);
                            };

                            /**
                             * How precise do the range inputs need to be?
                             * @returns {number}
                             */
                            scope.inputSteps = function() {
                                return Math.pow(10, scope.precision * -1);
                            };

                            /**
                             * The width of the background bar
                             * @type {number}
                             */
                            var barWidth = 0;

                            /**
                             * Half the width of the knob/bar in use
                             * @type {number}
                             */
                            var pointerHalfWidth = 0;

                            /**
                             * Left most possible position
                             * @type {number}
                             */
                            var minOffset = 0;

                            /**
                             * Right most possible position
                             * @type {number}
                             */
                            var maxOffset = 0;

                            /**
                             * How much width do we have to work with
                             * @type {number}
                             */
                            var offsetRange = 0;

                            /**
                             * The minimum value of the slider
                             * @type {number}
                             */
                            var minValue = 0;

                            /**
                             * The minimum value of the slider (decoded)
                             * @type {number}
                             */
                            var minValueDecoded = 0;

                            /**
                             * The maximum value of the slider
                             * @type {number}
                             */
                            var maxValue = 0;

                            /**
                             * The maximum value of the slider (decoded)
                             * @type {number}
                             */
                            var maxValueDecoded = 0;

                            /**
                             * The total range of the slider
                             * @type {number}
                             */
                            var valueRange = 0;

                            /**
                             * The total range of the slider (decoded)
                             * @type {number}
                             */
                            var valueRangeDecoded = 0;

							/**
							 * The normalized width in percent of a step
							 * @type {number}
							 */
							var stepRange = 1;

                            /**
                             * How far from a step is the low knob?
                             * @type {number}
                             */
                            var stickyOffsetLow = 0;

                            /**
                             * How far from a step is the high knob?
                             * @type {number}
                             */
                            var stickyOffsetHigh = 0;

                            /**
                             * Have the events been bound to the necessary inputs/elements
                             * @type {boolean}
                             */
                            var eventsBound = false;

                            /**
                             * Update the necessary dimensions
                             */
                            function dimensions() {

                                // make sure the watchables are all valid
                                angular.forEach(watchables, function(watchable) {
                                    
                                    // parse them to floats
                                    scope[watchable] = parseFloat(scope[watchable]);

                                    if(watchable == refLow || watchable == refHigh) {
                                        // this is the low or high value so bring them back in line with the steps
                                        scope[watchable] = roundToStep(scope[watchable], scope.precision, scope[stepWidth], scope.floor, scope.ceiling);
                                    } else if(watchable == 'buffer') {
                                        if(!scope.buffer || isNaN(scope.buffer) || scope.buffer < 0) {
                                            // the buffer is not valid, so set to 0
                                            scope.buffer = 0;
                                        } else {
                                            // this is the buffer so make sure it aligns with the steps
                                            scope.buffer = stepBuffer(scope[stepWidth], scope.buffer);
                                        }
                                    } else if(watchable == 'precision') {
                                        // make sure the precision is valid
                                        if(!scope.precision || isNaN(scope.precision)) {
                                            scope.precision = 0;
                                        } else {
                                            scope.precision = parseInt(scope.precision);
                                        }
                                    } else if(watchable == stepWidth) {
                                        // make sure the step is valid
                                        if(!scope[stepWidth] || isNaN(scope[stepWidth])) {
                                            scope[stepWidth] = 1 / Math.pow(10, scope.precision);
                                        } else {
                                            scope[stepWidth] = parseFloat(scope[stepWidth].toFixed(scope.precision));
                                        }
                                    } else if(watchable == 'stickiness') {
                                        // make sure the stickiness is valid
                                        if(isNaN(scope.stickiness)) {
                                            scope.stickiness = KNOB_STICKINESS;
                                        } else if(scope.stickiness < 1) {
                                            scope.stickiness = 1;
                                        }
                                    }
                                    
                                    // save the decoded values
                                    scope.decodedValues[watchable] = scope.decodeRef(watchable);

                                });

                                if(isDualKnob) {
                                    // if this is a dual knob slider

                                    // make sure the low value is actually lower than the high value
                                    if(scope[refHigh] < scope[refLow]) {
                                        var temp = scope[refHigh];
                                        scope[refHigh] = scope[refLow];
                                        scope[refLow] = temp;
                                    }

                                    // get the difference between the knobs, but make sure it's rounded to a step
                                    var diff = roundToStep(scope[refHigh] - scope[refLow], scope.precision, scope[stepWidth]);

                                    if(scope.buffer > 0 && diff < scope.buffer) {
                                        // we need a buffer but the difference is smaller than the required buffer

                                        // so find the middle
                                        var avg = scope.encode((scope.decodedValues[refLow] + scope.decodedValues[refHigh]) / 2);

                                        // and set the knobs so they straddle the middle with the required amount of buffer
                                        scope[refLow] = roundToStep(avg - (scope.buffer / 2), scope.precision, scope[stepWidth], scope.floor, scope.ceiling);
                                        scope[refHigh] = scope[refLow] + scope.buffer;

                                        if(scope[refHigh] > scope.ceiling) {
                                            // the high value is out of range

                                            // so set the high value to the maximum
                                            scope[refHigh] = scope.ceiling;
                                            // but keep the buffer correct
                                            scope[refLow] = scope.ceiling - scope.buffer;
                                        }
                                    }
                                }

                                // save the various dimensions we'll need
                                barWidth = width(refs.fullBar);
                                pointerHalfWidth = halfWidth(refs.minPtr);

                                minOffset = offsetLeft(refs.fullBar);
                                maxOffset = minOffset + barWidth - width(refs.minPtr);
                                offsetRange = maxOffset - minOffset;

                                minValue = scope.floor;
                                minValueDecoded = scope.decodedValues.floor;
                                maxValue = scope.ceiling;
                                maxValueDecoded = scope.decodedValues.ceiling;
                                valueRange = maxValue - minValue;
                                valueRangeDecoded = maxValueDecoded - minValueDecoded;
								
								stepRange = roundTo(valueRangeDecoded, scope.decodedValues[stepWidth]);
                            }

                            /**
                             * Lets make everything look good
                             */
                            function updateDOM() {

                                var dragRange,      // is the user dragging the entire range and not just one knob?
                                    lowValueOffset,      // where did the low knob start
                                    highValueOffset,     // where did the high knob start
                                    pointer,        // which knob/bar is being dragged
                                    ref;            // which value should we be changing

                                // update the dimensions
                                dimensions();

                                // set the limit bubble positions
                                offset(refs.flrBub, 0);
                                offset(refs.ceilBub, pixelize(barWidth - width(refs.ceilBub)));

                                /**
                                 * Get the offset percentage from the given absolute offset
                                 * @param {number} offset
                                 * @returns {number}
                                 */
                                function percentFromOffset(offset) {
                                    return ((offset - minOffset) / offsetRange) * 100;
                                }

                                /**
                                 * Get the decoded value from the given offset
                                 * @param {number} offset
                                 * @returns {number}
                                 */
                                function decodedValueFromOffset(offset) {
                                    return percentFromOffset(offset)/100 * valueRangeDecoded + minValueDecoded;
                                }

                                /**
                                 * Get the value from the given offset
                                 * @param {number} offset
                                 * @returns {number}
                                 */
                                function valueFromOffset(offset) {
                                    return scope.encode(decodedValueFromOffset(offset));
                                }

                                /**
                                 * Get the absolute offset from the given decoded value
                                 * @param {number} value
                                 * @returns {number}
                                 */
                                function offsetFromDecodedValue(value) {
									return ((value - minValueDecoded) * offsetRange) + minOffset;
                                }

                                /**
                                 * Get the absolute offset from the given value
                                 * @param {number} value
                                 * @returns {number}
                                 */
                                function offsetFromValue(value) {
                                    return offsetFromDecodedValue(scope.decode(value));
                                }

                                /**
                                 * Get the offset percentage from the given decoded value
                                 * @param {number} value
                                 * @returns {number}
                                 */
                                function percentFromDecodedValue(value) {
									var percent = value - minValueDecoded;
									if(valueRange == valueRangeDecoded) {
										percent = roundTo(percent, scope.decodedValues[stepWidth]) / stepRange;
									} else {
										percent /= valueRangeDecoded;
									}
                                    return percent * 100;
                                }

                                /**
                                 * Get the offset percentage from the given value
                                 * @param {number} value
                                 * @returns {number}
                                 */
                                function percentFromValue(value) {
                                    return percentFromDecodedValue(scope.decode(value));
                                }

                                /**
                                 * Get the absolute offset (in px) from the given offset percentage
                                 * @param {number} percent
                                 * @returns {string}
                                 */
                                function offsetFromPercent(percent) {
                                    return pixelize(percent * offsetRange / 100);
                                }

                                /**
                                 * Bring the offset back in range of the slider
                                 * @param {number} offset
                                 * @returns {number}
                                 */
                                function bringOffsetInRange(offset) {
                                    return Math.min(Math.max(offset, minOffset), maxOffset);
                                }

                                /**
                                 * Bring the element back within the confines of the slider
                                 * @param {object} element
                                 * @returns {Object}
                                 */
                                function fitToBar(element) {
                                    return offset(element, offsetFromPercent(percentFromOffset(bringOffsetInRange(offsetLeft(element)))));
                                }

                                /**
                                 * Compute the amount of stretch
                                 * @param {number} percent the mouse offset from the start position
                                 * @param {number} [maxPercent = 100] the maximum stretch
                                 * @param {boolean} [end = false] are we beyond the max stretch?
                                 * @returns {number}
                                 */
                                function percentStretch(percent, maxPercent, end) {

                                    // which direction?
                                    var sign = percent > 0 ? 1 : -1;

                                    // if the maxPercent is 0 or not given apply no limit (i.e. set it to 100)
                                    maxPercent = !maxPercent ? 100 : maxPercent;

                                    if(end) {
                                        // compute the max stretch amount
                                        return (
                                                   Math.sin((
                                                                Math.min(Math.abs(percent / maxPercent), 1) * Math.PI
                                                                ) - (Math.PI / 2)) + 1
                                                   ) * sign * maxPercent / 6;
                                    }

                                    // compute the current stretch amount
                                    return (
                                        sign * Math.pow(Math.min(Math.abs(percent / maxPercent * 2), 1), scope.stickiness) * maxPercent / 2
                                        );
                                }

                                /**
                                 * Update the pointers in the DOM
                                 */
                                function setPointers() {

                                    /**
                                     * The base percent for the low knob
                                     * @type {number}
                                     */
                                    var rawLowPercent = percentFromDecodedValue(scope.decodedValues[refLow]);

                                    /**
                                     * The width in percent of a step above the low value
                                     * @type {number}
                                     */
                                    var stepWidthPercentAboveLow = percentFromValue(scope[refLow] + scope[stepWidth]) - rawLowPercent;

                                    /**
                                     * The width in percent of a step below the low value
                                     * @type {number}
                                     */
                                    var stepWidthPercentBelowLow = rawLowPercent - percentFromValue(scope[refLow] - scope[stepWidth]);

                                    /**
                                     * The width in percent of the buffer above the low value
                                     * @type {number}
                                     */
                                    var bufferWidthPercentLow = percentFromValue(scope[refLow] + scope.buffer) - rawLowPercent;

                                    /**
                                     * The width in percent of the pointer
                                     * @type {number}
                                     */
                                    var ptrHalfWidthPercent = percentFromOffset(pointerHalfWidth + minOffset);

                                    /**
                                     * The percent for the low knob after the stretch has been applied
                                     * @type {number}
                                     */
                                    var stretchedLowPercent = rawLowPercent + percentStretch(stickyOffsetLow, stickyOffsetLow > 0?stepWidthPercentAboveLow:stepWidthPercentBelowLow);

                                    // set the low knob's and bubble's new positions
                                    offset(refs.minPtr, offsetFromPercent(stretchedLowPercent));
                                    offset(refs.lowBub,
                                        offsetFromPercent(percentFromOffset(offsetLeft(refs.minPtr) - halfWidth(refs.lowBub) + pointerHalfWidth)));

                                    if(isDualKnob) {
                                        // dual knob slider

                                        /**
                                         * The base percent for the high knob
                                         * @type {number}
                                         */
                                        var rawHighPercent = percentFromDecodedValue(scope.decodedValues[refHigh]);

                                        /**
                                         * The width in percent of a step above the high value
                                         * @type {number}
                                         */
                                        var stepWidthPercentAboveHigh = percentFromValue(scope[refHigh] + scope[stepWidth]) - rawHighPercent;

                                        /**
                                         * The width in percent of a step below the high value
                                         * @type {number}
                                         */
                                        var stepWidthPercentBelowHigh = rawHighPercent - percentFromValue(scope[refHigh] - scope[stepWidth]);

                                        /**
                                         * The width in percent of the buffer below the high value
                                         * @type {number}
                                         */
                                        var bufferWidthPercentHigh = rawHighPercent - percentFromValue(scope[refHigh] - scope.buffer);

                                        /**
                                         * The percent for the high knob after the stretch has been applied
                                         * @type {number}
                                         */
                                        var stretchedHighPercent = rawHighPercent + percentStretch(stickyOffsetHigh, stickyOffsetHigh > 0?stepWidthPercentAboveHigh:stepWidthPercentBelowHigh);

                                        if(stretchedLowPercent > rawHighPercent - bufferWidthPercentHigh) {
                                            // if the low knob has reached its maximum

                                            // get the new stretch amount for the low knob
                                            stretchedLowPercent = rawLowPercent + percentStretch(stickyOffsetLow, bufferWidthPercentLow, true);

                                            // and re-set the low knob's and bubble's new positions
                                            offset(refs.minPtr, offsetFromPercent(stretchedLowPercent));
                                            offset(refs.lowBub, offsetFromPercent(percentFromOffset(offsetLeft(refs.minPtr) - halfWidth(refs.lowBub) +
                                                                                                    pointerHalfWidth)));
                                        }

                                        if(stretchedHighPercent < rawLowPercent + bufferWidthPercentLow) {
                                            // if the high knob has reached its minimum

                                            // get the new stretch amount for the high knob
                                            stretchedHighPercent = rawHighPercent + percentStretch(stickyOffsetHigh, bufferWidthPercentHigh, true);
                                        }

                                        // set the high knob's and bubble's new positions
                                        offset(refs.maxPtr, offsetFromPercent(stretchedHighPercent));
                                        offset(refs.highBub, offsetFromPercent(percentFromOffset(offsetLeft(refs.maxPtr) - halfWidth(refs.highBub) +
                                                                                                 pointerHalfWidth)));

                                        // set the selection bar's new position and width
                                        offset(refs.selBar, offsetFromPercent(stretchedLowPercent + ptrHalfWidthPercent));
                                        refs.selBar.css({
                                            width: offsetFromPercent(stretchedHighPercent - stretchedLowPercent)
                                        });

                                        // set the selection bubbles' new positions
                                        offset(refs.selBub, offsetFromPercent(((stretchedLowPercent + stretchedHighPercent) / 2) - percentFromOffset(halfWidth(refs.selBub) + minOffset) + ptrHalfWidthPercent));
                                        offset(refs.cmbBub, offsetFromPercent(((stretchedLowPercent + stretchedHighPercent) / 2) - percentFromOffset(halfWidth(refs.cmbBub) + minOffset) + ptrHalfWidthPercent));

                                        // set the low unselected bar's new position and width
                                        refs.unSelBarLow.css({
                                            left : 0,
                                            width: offsetFromPercent(stretchedLowPercent + ptrHalfWidthPercent)
                                        });

                                        // set the high unselected bar's new position and width
                                        offset(refs.unSelBarHigh, offsetFromPercent(stretchedHighPercent + ptrHalfWidthPercent));
                                        refs.unSelBarHigh.css({
                                            right: 0
                                        });

                                        if(AngularSlider.inputtypes.range) {
                                            // we're using range inputs
                                            
                                            var ptrWidth = ptrHalfWidthPercent * 2;
                                            
                                            // get the high input's new position
                                            var highInputLeft = stretchedLowPercent + (bufferWidthPercentLow / 2);
											var highInputWidth = 100 - highInputLeft;
											highInputLeft += ptrWidth;
                                            
                                            // get the low input's new width
                                            var lowInputWidth = stretchedHighPercent - (bufferWidthPercentHigh / 2);
											
											// get the selection inputs new position and width;
											var selInputLeft = stretchedLowPercent + ptrWidth;
											var selInputWidth = stretchedHighPercent - stretchedLowPercent - ptrWidth;
											
											if(stretchedHighPercent <= stretchedLowPercent + ptrWidth) {												
												selInputLeft = stretchedLowPercent;
												selInputWidth = stretchedHighPercent + ptrWidth - stretchedLowPercent;
											}
                                            
                                            // set the low input's new width
                                            refs.minInput.css({
                                                width: offsetFromPercent(lowInputWidth)
                                            });

                                            // set the high input's new position and width
                                            refs.maxInput.css({
                                                left : offsetFromPercent(highInputLeft),
                                                width: offsetFromPercent(highInputWidth)
                                            });

                                            // set the selection input's new position and width
                                            refs.selInput.css({
                                                left : offsetFromPercent(selInputLeft),
                                                width: offsetFromPercent(selInputWidth)
                                            });
                                        }
                                    }
                                }

                                /**
                                 * Update the bubbles in the DOM
                                 */
                                function adjustBubbles() {

                                    /**
                                     * The bubble to use for dual knobs
                                     * @type {object}
                                     */
                                    var bubToAdjust = refs.lowBub;

                                    // make sure the low value bubble is actually within the slider
                                    fitToBar(refs.lowBub);

                                    if(isDualKnob) {
                                        // this is a dual knob slider

                                        // make sure the high value and selection value bubbles are actually within the slider
                                        fitToBar(refs.highBub);
                                        fitToBar(refs.selBub);

                                        if(gap(refs.lowBub, refs.highBub) < 10) {
                                            // the low and high bubbles are overlapping

                                            // so hide them both
                                            hide(refs.lowBub);
                                            hide(refs.highBub);

                                            // and show the center bubble
                                            show(refs.cmbBub);

                                            // and make sure the center bubble is actually within the slider
                                            fitToBar(refs.cmbBub);

                                            // the center bubble is the bubble we care about now
                                            bubToAdjust = refs.cmbBub;
                                        } else {
                                            // the low and high bubbles aren't overlapping

                                            // so show the low and high bubbles
                                            show(refs.lowBub);
                                            show(refs.highBub);

                                            // and hide the center bubble
                                            hide(refs.cmbBub);
                                            bubToAdjust = refs.highBub;
                                        }
                                    }

                                    if(gap(refs.flrBub, refs.lowBub) < 5) {
                                        // the low bubble overlaps the floor bubble

                                        // so hide the floor bubble
                                        hide(refs.flrBub);
                                    } else {
                                        // the low bubble doesn't overlap the floor bubble

                                        if(isDualKnob) {
                                            // this is a dual knob slider

                                            if(gap(refs.flrBub, bubToAdjust) < 5) {
                                                // the bubble overlaps the floor bubble

                                                // so hide the floor bubble
                                                hide(refs.flrBub);
                                            } else {
                                                // no overlap

                                                // so show the floor bubble
                                                show(refs.flrBub);
                                            }
                                        } else {
                                            // single knob slider

                                            // so show the floor slider
                                            show(refs.flrBub);
                                        }
                                    }

                                    if(gap(refs.lowBub, refs.ceilBub) < 5) {
                                        // the low bubble overlaps the ceiling bubble

                                        // so hide the ceiling bubble
                                        hide(refs.ceilBub);
                                    } else {
                                        // the low bubble doesn't overlap the ceiling bubble

                                        if(isDualKnob) {
                                            // dual knob slider

                                            if(gap(bubToAdjust, refs.ceilBub) < 5) {
                                                // the bubble overlaps the ceiling bubble

                                                // so hide the ceiling bubble
                                                hide(refs.ceilBub);
                                            } else {
                                                // no overlap

                                                // so show the ceiling bubble
                                                show(refs.ceilBub);
                                            }
                                        } else {
                                            // no overlap

                                            // so show the ceiling bubble
                                            show(refs.ceilBub);
                                        }
                                    }
                                }

                                /**
                                 * What to do when dragging ends
                                 */
                                function onEnd() {

                                    // reset the offsets
                                    stickyOffsetLow = 0;
                                    stickyOffsetHigh = 0;

                                    if(pointer) {
                                        // if we have a pointer reference

                                        // update all the elements in the DOM
                                        setPointers();
                                        adjustBubbles();

                                        // the pointer is no longer active
                                        pointer.removeClass('active');
                                    }

                                    // reset the references
                                    pointer = null;
                                    ref = null;
                                    dragRange = false;
                                }

                                /**
                                 * What to do when the knob/bar is moved
                                 * @param {object} event
                                 */
                                function onMove(event) {
                                    if(pointer) {
                                        // we have a reference to a knob/bar

                                        scope.$apply(function() {

                                            /**
                                             * The current x position of the mouse/finger/etc.
                                             * @type {number}
                                             */
                                            var currentX = event.clientX || event.x;

                                            if(dragRange) {
                                                // the entire range is being dragged

                                                /**
                                                 * The new offset for the low knob
                                                 * @type {number}
                                                 */
                                                var newLowValue = valueFromOffset(currentX) - lowValueOffset;

                                                /**
                                                 * The new offset for the high knob
                                                 * @type {number}
                                                 */
                                                var newHighValue = valueFromOffset(currentX) + highValueOffset;

                                                if(newLowValue < minValue) {
                                                    // the new low is outside of the slider

                                                    // so bring the values back within range
                                                    newHighValue += minValue - newLowValue;
                                                    newLowValue = minValue;
                                                } else if(newHighValue > maxValue) {
                                                    // the new high value is outside of the slider

                                                    // so bring the values back within range
                                                    newLowValue -= newHighValue - maxValue;
                                                    newHighValue = maxValue;
                                                }

                                                // get the offset percentages
                                                var newLowPercent = percentFromValue(newLowValue);
                                                var newHighPercent = percentFromValue(newHighValue);

                                                // save the temporary sticky offset
                                                stickyOffsetLow = newLowPercent;
                                                stickyOffsetHigh = newHighPercent;

                                                // round the raw values to steps and assign them to the knobs
                                                scope[refLow] = newLowValue = roundToStep(newLowValue, scope.precision, scope[stepWidth], scope.floor, scope.ceiling);
                                                scope[refHigh] = newHighValue = roundToStep(newHighValue, scope.precision, scope[stepWidth], scope.floor, scope.ceiling);

                                                // keep the difference between both knobs the same
                                                stickyOffsetLow = stickyOffsetLow - percentFromValue(newLowValue);
                                                stickyOffsetHigh = stickyOffsetHigh- percentFromValue(newHighValue);
                                            } else {
                                                // only one knob is being dragged

                                                /**
                                                 * The new offset for the knob being dragged
                                                 * @type {number}
                                                 */
                                                var newOffset = bringOffsetInRange(currentX + minOffset - offsetLeft(element) - halfWidth(pointer));

                                                /**
                                                 * The new offset percent for the knob being dragged
                                                 * @type {number}
                                                 */
                                                var newPercent = percentFromOffset(newOffset);

                                                /**
                                                 * The new value for the knob being dragged
                                                 * @type {number}
                                                 */
                                                var newValue = scope.encode(minValueDecoded + (valueRangeDecoded * newPercent / 100.0));

                                                // set the sticky offset for the low knob
                                                stickyOffsetLow = newPercent;

                                                if(isDualKnob) {
                                                    // dual knob slider

                                                    if(scope.buffer > 0) {
                                                        // we need to account for the buffer

                                                        if(ref === refLow) {
                                                            // the low knob is being dragged

                                                            if(newValue > scope[refHigh] - scope.buffer) {
                                                                // the new value cuts into the buffer

                                                                // so make the value respect the buffer
                                                                newValue = scope[refHigh] - scope.buffer
                                                            }
                                                        } else {
                                                            // the high knob is being dragged

                                                            if(newValue < scope[refLow] + scope.buffer) {
                                                                // the new value cuts into the buffer

                                                                // so make the value respect the buffer
                                                                newValue = scope[refLow] + scope.buffer;
                                                            }
                                                        }
                                                    } else {
                                                        // we don't have to worry about a buffer

                                                        if(ref === refLow) {
                                                            // the low knob is being dragged

                                                            if(newValue > scope[refHigh]) {
                                                                // the new value is greater then the value of the high knob

                                                                // so set the low value to what the high used to be
                                                                scope[refLow] = scope[refHigh];
                                                                
                                                                // make sure the decoded values are updated
                                                                scope.decodedValues[refLow] = scope.decodeRef(refLow);

                                                                // switch the value reference
                                                                ref = refHigh;
                                                                
                                                                // swap the element references
                                                                var temp = refs.minPtr;
                                                                refs.minPtr = refs.maxPtr;
                                                                refs.maxPtr = temp;

                                                                // and the classes
                                                                refs.maxPtr.removeClass('active').removeClass('high').addClass('low');
                                                                refs.minPtr.addClass('active').removeClass('low').addClass('high');
                                                            }
                                                        } else {
                                                            // the high knob is being dragged

                                                            if(newValue < scope[refLow]) {
                                                                // the new value is less than the value of the low knob

                                                                // so set the high value to what the low used to be
                                                                scope[refHigh] = scope[refLow];
                                                                
                                                                // make sure the decoded values are updated
                                                                scope.decodedValues[refHigh] = scope.decodeRef(refHigh);

                                                                // switch the value reference
                                                                ref = refLow;
                                                                
                                                                // swap the element references
                                                                var temp = refs.minPtr;
                                                                refs.minPtr = refs.maxPtr;
                                                                refs.maxPtr = temp;

                                                                // and the classes
                                                                refs.minPtr.removeClass('active').removeClass('low').addClass('high');
                                                                refs.maxPtr.addClass('active').removeClass('high').addClass('low');
                                                            }
                                                        }
                                                    }
                                                }

                                                // round the new value and assign it
                                                scope[ref] = newValue = roundToStep(newValue, scope.precision, scope[stepWidth], scope.floor, scope.ceiling);
                                                
                                                // update the decoded value
                                                scope.decodedValues[ref] = scope.decodeRef(ref);

                                                if(ref === refLow) {
                                                    // the low knob is being dragged

                                                    // so update the sticky offset for the low knob
                                                    stickyOffsetLow = stickyOffsetLow - percentFromValue(newValue);
                                                    
                                                    // and ensure the high knob stays put
                                                    stickyOffsetHigh = 0;
                                                } else {
                                                    // the high knob is being dragged

                                                    // so update the sticky offset for the high knob
                                                    stickyOffsetHigh = stickyOffsetLow - percentFromValue(newValue);

                                                    // and ensure the low knob stays put
                                                    stickyOffsetLow = 0;
                                                }
                                            }
											
											if(scope.ngChange) {
												scope.ngChange();
											}
											ctrl.$setViewValue(scope[refLow]);

                                            // update the DOM
                                            setPointers();
                                            adjustBubbles();

                                        });
                                    }
                                }

                                /**
                                 * What to do when a knob/bar is starting to be dragged
                                 * @param {object} event
                                 * @param {object} ptr
                                 * @param {string} rf
                                 */
                                function onStart(event, ptr, rf) {
									
									if(scope.ngDisabled && scope.ngDisabled == true) return;

									/**
									 * The current x position of the mouse/finger/etc.
									 * @type {number}
									 */
									var currentX = event.clientX || event.x;

                                    // save the pointer reference
                                    pointer = ptr;

                                    // save the a reference to the model
                                    ref = rf;

                                    // set the knob/bar to active
                                    pointer.addClass('active');

                                    if(ref == refSel) {
                                        // the selection bar is being dragged

                                        // so tell everyone else this is the case
                                        dragRange = true;
                                        
                                        var startValue = valueFromOffset(currentX);

                                        // and save the start positions
                                        lowValueOffset = startValue - scope[refLow];
                                        highValueOffset = scope[refHigh] - startValue;
                                    }

                                    onMove(event);
                                }

                                /**
                                 * Bind the various events to the various DOM elements
                                 */
                                function setBindings() {
                                    if(AngularSlider.inputtypes.range) {
                                        // we're using range inputs

                                        /**
                                         * Bind the events necessary for a range input
                                         * @param {object} elem
                                         * @param {object} ptr
                                         * @param {string} rf
                                         */
                                        function bindSlider(elem, ptr, rf) {

                                            // make sure the element has all the methods and properties we'll need
                                            elem = angularize(elem);

                                            /**
                                             * Start event
                                             * @param {event} ev
                                             */
                                            function start(ev) {
                                                onStart(ev, ptr, rf);
                                            }

                                            /**
                                             * End event
                                             * @param {event} ev
                                             */
                                            function end(ev) {
                                                onMove(ev);
                                                onEnd();
                                            }

                                            // bind events to the range input
											$swipe.bind(elem, {
												start : start,
												move  : onMove,
												end   : end,
												cancel: onEnd
											});
                                        }

                                        // bind the events to the low value range input
                                        bindSlider(refs.minInput, refs.minPtr, refLow);

                                        if(isDualKnob) {
                                            // bind the events to the high value range input
                                            bindSlider(refs.maxInput, refs.maxPtr, refHigh);
                                            // bind the events to the selection bar range input
                                            bindSlider(refs.selInput, refs.selBar, refSel);
                                        }
                                    } else {
                                        // we're using normal DOM elements

                                        /**
                                         * Start event
                                         * @param {object} elem
                                         * @param {string} rf
                                         * @param {object} [ptr]
                                         */
                                        function bindSwipeStart(elem, rf, ptr) {

                                            // make sure the element has all the methods and properties we'll need
                                            elem = angularize(elem);

                                            // if no pointer reference is supplied, reference the element given
                                            if(angular.isUndefined(ptr)) {
                                                ptr = elem;
                                            } else {
                                                ptr = angularize(ptr);
                                            }

                                            // bind the swipe start event to the element
                                            $swipe.bind(elem, {
                                                start: function(ev) {
                                                    onStart(ev, ptr, rf);
                                                }
                                            });
                                        }

                                        /**
                                         * Move event
                                         * @param {object} elem
                                         */
                                        function bindSwipe(elem) {

                                            // make sure the element has all the methods and properties we'll need
                                            elem = angularize(elem);

                                            // bind the swipe move, end, and cancel events
                                            $swipe.bind(elem, {
                                                move  : onMove,
                                                end   : function(ev) {
                                                    onMove(ev);
                                                    onEnd();
                                                },
                                                cancel: onEnd
                                            });
                                        }

                                        // bind the common events to the various common elements
                                        bindSwipe($document);
                                        bindSwipeStart(refs.minPtr, refLow);
                                        bindSwipeStart(refs.lowBub, refLow);
                                        bindSwipeStart(refs.flrBub, refLow, refs.minPtr);
                                        if(isDualKnob) {
                                            // bind the dual knob specific events to the dual knob specific elements
                                            bindSwipeStart(refs.maxPtr, refHigh);
                                            bindSwipeStart(refs.highBub, refHigh);
                                            bindSwipeStart(refs.ceilBub, refHigh, refs.maxPtr);
                                            bindSwipeStart(refs.selBar, refSel);
                                            bindSwipeStart(refs.selBub, refSel, refs.selBar);
                                            bindSwipeStart(refs.unSelBarLow, refLow, refs.minPtr);
                                            bindSwipeStart(refs.unSelBarHigh, refHigh, refs.maxPtr);
                                        } else {
                                            // bind the single knob specific events to the single knob specific elements
                                            bindSwipeStart(refs.ceilBub, refLow, refs.minPtr);
                                            bindSwipeStart(refs.fullBar, refLow, refs.minPtr);
                                        }
                                    }
                                }

                                // update the DOM
                                setPointers();
                                adjustBubbles();

                                if(!eventsBound) {
                                    // the events haven't been bound yet

                                    // so bind the events, damnit!
                                    setBindings();
                                    eventsBound = true;
                                }
                            }

                            // update the DOM when one of the watchables changes
                            for(var i = 0; i < watchables.length; i++) {
                                scope.$watch(watchables[i], function() {
                                    updateDOM();
                                });
                            }

                            // update the DOM when the window resizes
                            angularize(window).bind("resize", function() {
                                updateDOM();
                            });

                            // listen for a refresh event
                            scope.$on('refreshSlider', function() {
                                // update the DOM, but make sure everything has been digested first
                                $timeout(function() {
                                    updateDOM();
                                });
                            });

                            // wait for everything to be digested then set up the DOM
                            $timeout(function() {
                                updateDOM();
                            });
                        }
                    };
                }
            }
        }
	]);
