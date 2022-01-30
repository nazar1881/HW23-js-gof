(function ($) {
  var o = $({});
  $.each({
      trigger: "publish",
      on: "subscribe",
      off: "unsubscribe",
    },
    function (key, val) {
      jQuery[val] = function () {
        o[key].apply(o, arguments);
      };
    }
  );
})(jQuery);

let billy = (function () {
  let fromBillyToRose = "fromBillyToRose";
  return {
    subscribe: function () {
      $.subscribe('fromRoseToBilly', function () {
        console.log('Rose : Hey, Billy')
        $.publish(fromBillyToRose)
      })
    }
  }
})();

let jack = (function () {
  let fromJackToRose = 'fromJackToRose';
  return {
    subscribe: function () {
      $.subscribe('fromRoseToJack', function () {
        console.log("Rose: Hello, Jack")
      })
    },
    publish: function () {
      $.publish(fromJackToRose)
    }
  }
})();

let rose = (function () {
  let fromRoseToBilly = 'fromRoseToBilly';
  let fromRoseToJack = 'fromRoseToJack';
  return {
    subscribe: function () {
      $.subscribe('fromJackToRose', function () {
        console.log("Jack : Hi Rose, i like you")
        $.publish(fromRoseToBilly)
      })
      $.subscribe('fromBillyToRose', function () {
        console.log('Billy : RUN!')
        $.publish(fromRoseToJack)
      })
    }
  }
})()

rose.subscribe()
billy.subscribe();
jack.subscribe()
jack.publish();