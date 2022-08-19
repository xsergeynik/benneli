(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});
/**
 * jQuery Spincrement plugin
 *
 * Plugin structure based on: http://blog.jeremymartin.name/2008/02/building-your-first-jquery-plugin-that.html
 * Leveraging of jQuery animate() based on: http://www.bennadel.com/blog/2007-Using-jQuery-s-animate-Method-To-Power-Easing-Based-Iteration.htm
 * Easing function from jQuery Easing plugin: http://gsgd.co.uk/sandbox/jquery/easing/
 * Thousands separator code: http://www.webmasterworld.com/forum91/8.htm
 *
 * @author John J. Camilleri
 * @version 1.2
 */

/* global jQuery */

(function ($) {
  // Custom easing function
  $.extend($.easing, {
    // This is ripped directly from the jQuery easing plugin (easeOutExpo), from: http://gsgd.co.uk/sandbox/jquery/easing/
    spincrementEasing: function (x, t, b, c, d) {
      return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    }
  })

  // Spincrement function
  $.fn.spincrement = function (opts) {
    // Default values
    var defaults = {
      from: 0,
      to: null,
      decimalPlaces: null,
      decimalPoint: '.',
      thousandSeparator: ',',
      duration: 1000, // ms; TOTAL length animation
      leeway: 50, // percent of duraion
      easing: 'spincrementEasing',
      fade: true,
      complete: null
    }
    var options = $.extend(defaults, opts)

    // Function for formatting number
    var re_thouSep = new RegExp(/^(-?[0-9]+)([0-9]{3})/)
    function format (num, dp) {
      num = num.toFixed(dp) // converts to string!

      // Non "." decimal point
      if ((dp > 0) && (options.decimalPoint !== '.')) {
        num = num.replace('.', options.decimalPoint)
      }

      // Thousands separator
      if (options.thousandSeparator) {
        while (re_thouSep.test(num)) {
          num = num.replace(re_thouSep, '$1' + options.thousandSeparator + '$2')
        }
      }
      return num
    }

    // Apply to each matching item
    return this.each(function () {
      // Get handle on current obj
      var obj = $(this)

      // Set params FOR THIS ELEM
      var from = options.from
      if (obj.attr('data-from')) {
        from = parseFloat(obj.attr('data-from'))
      }

      var to
      if (obj.attr('data-to')) {
        to = parseFloat(obj.attr('data-to'))
      } else if (options.to !== null) {
        to = options.to
      } else {
        var ts = $.inArray(options.thousandSeparator, ['\\', '^', '$', '*', '+', '?', '.']) > -1 ? '\\' + options.thousandSeparator : options.thousandSeparator
        var re = new RegExp(ts, 'g')
        to = parseFloat(obj.text().replace(re, ''))
      }

      var duration = options.duration
      if (options.leeway) {
        // If leeway is set, randomise duration a little
        duration += Math.round(options.duration * ((Math.random() * 2) - 1) * options.leeway / 100)
      }

      var dp
      if (obj.attr('data-dp')) {
        dp = parseInt(obj.attr('data-dp'), 10)
      } else if (options.decimalPlaces !== null) {
        dp = options.decimalPlaces
      } else {
        var ix = obj.text().indexOf(options.decimalPoint)
        dp = (ix > -1) ? obj.text().length - (ix + 1) : 0
      }

      // Start
      obj.css('counter', from)
      if (options.fade) obj.css('opacity', 0)
      obj.animate(
        {
          counter: to,
          opacity: 1
        },
        {
          easing: options.easing,
          duration: duration,

          // Invoke the callback for each step.
          step: function (progress) {
            obj.html(format(progress * to, dp))
          },
          complete: function () {
            // Cleanup
            obj.css('counter', null)
            obj.html(format(to, dp))

            // user's callback
            if (options.complete) {
              options.complete(obj)
            }
          }
        }
      )
    })
  }
})(jQuery)

