console.log("/////////////////////Перший варіант////////////////////////");

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

console.log("/////////////////////Другий варіант через Медіатор/////////////////////");

class Bear {
  constructor(name) {
    this.name = name;
    this.room = null;
  }

  send(message, to) {
    this.room.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

class Chat {
  constructor() {
    this.users = {};
  }

  register(user) {
    this.users[user.name] = user;
    user.room = this;
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      Object.keys(this.users).forEach(key => {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from);
        }
      })
    }
  }
}

const billyMeditor = new Bear('Billy');
const jackMeditor = new Bear('Jack');
const roseMeditor = new Bear('Rose');

const room = new Chat();

room.register(billyMeditor);
room.register(jackMeditor);
room.register(roseMeditor);

jackMeditor.send('Hello Rose, i like you', roseMeditor);
roseMeditor.send('Hello Billy', billyMeditor);
billyMeditor.send('I need to run, bye', roseMeditor);