(function($, window, undefined) {

  window.Slumbr = (function() {
    // This is the length of a sleep cycle, expressed in milliseconds
    //var cycle = 90 * 60000;
    var Clock = {
      dateTime: new Date(),
      clockType: '12hr',
      period: null,
      setToWake: true,
      listOfTimes: [],
      initialize: function() {
        console.log('Clock initialized');
      },
      // Takes the date object's hour, and converts to 12 hour time
      convertHour: function(h) {
        var hour = h;
        if (hour >= 12) {
            hour -= 12;;
        }
        if (hour == 0) {
            return 12;
        }
        return hour;
      },
      // Takes the date object's minute, and adds a zero if less than 10
      convertMin: function(m) {
        return (m < 10) ? "0" + m : m
      },
      // Takes hour and returns PM if equal to zero, and AM if not
      setAM_PM: function(h) {
        return (h < 24 && h >= 12) ? 'PM' : 'AM';
      },
      // Validate inputs, break out of function if invalid
      validInputs: function(hrInput, minInput) {
        if (isNaN(hrInput) || isNaN(minInput) ||
          hrInput > 12 || minInput < 0 || minInput > 59 || 
          !hrInput || !minInput || hrInput <= 0) {
          return false;
        } else {
          return true;
        }
      },
    };

    var Controller = {
      // If user chooses to calculate wake up time based if sleeps now:
      sleepNow: function() {
        Clock.dateTime = new Date();
        View.clearTimeSlot();
        Clock.listOfTimes = this.calcSleepTimes();
        View.render();
      },
      // If user sets a time to sleep/wake up
      wakeUp: function() {
        //Retrieve times from person
        var hour = parseInt($('#hourInput').val(), 10);
        var mins = parseInt($('#minInput').val(), 10);

        if (!Clock.validInputs(hour, mins)) {
          return false;
        }
        // If it is PM, then make sure to add 12 to hourInput
        if (!$('#am-pm').is(':checked')) {
          hour += 12;
          period = 'pm';
        }
        // Create a date object based on the inputs
        Clock.dateTime = new Date(0, 0, 0, hour, mins);
        Clock.setToWake = View.sleepWake.checked;
        this.generateTimes();
        View.render();
      },
      generateTimes: function() {
        if (Clock.setToWake) {
          Clock.listOfTimes = this.calcWakeTimes();
        } else if (!Clock.setToWake) {
          Clock.listOfTimes = this.calcSleepTimes();
        }
      },
      calcWakeTimes: function(dateTime) {
        var timesList = [];
        var dateTime = dateTime || Clock.dateTime.getTime();
        for (var i = 6; i > 0; i--) {
          var d = new Date(dateTime - i * 90 * 60000);
          timesList.push(d);
        }
        return timesList;
      },
      calcSleepTimes: function(dateTime) {
        var dateTime = dateTime || Clock.dateTime.getTime();
        var timesList = [];
        for (var j = 1; j < 7; j++) {
          var d = new Date(dateTime + j * 90 * 60000);
          timesList.push(d);
        }
        return timesList;
      },
    };

    var View = {
      clockInterface: $.getElementById('contain'),
      clockResults: $.getElementById('results'),
      sleepWake: $.getElementById('sleep-wake'),
      goBtn: $.getElementById('go'),
      sleepNowBtn: $.getElementById('sleepnow'),
      goBackBtn: $.getElementById('back'),
      /**
       * Initializes the View and adds event listeners
       */
      initialize: function() {
        this.goBtn.addEventListener('click', function() {
          Controller.wakeUp();
          this.fadeOut(this.clockInterface);
        }.bind(this));

        this.sleepNowBtn.addEventListener('click', function() {
          Controller.sleepNow();
          this.fadeOut(this.clockInterface);
        }.bind(this));

        this.goBackBtn.addEventListener('click', function() {
          this.fadeOut(this.clockResults);
          this.fadeIn(this.clockInterface);
        }.bind(this));
      },
      /**
       * Renders the list of dates in their appropriate views
       */
      render: function() {
        Clock.listOfTimes.forEach(function(time, i) {
          if (Clock.clockType === '12hr') {
            var dd = Clock.setAM_PM(time.getHours());
            var h = Clock.convertHour(time.getHours());
            var m = Clock.convertMin(time.getMinutes());
          } else {
            var dd = '';
            var h = time.getHours();
            var m = time.getMinutes();
          }
          console.log(time, i);
          $.getElementById(i + 2).innerHTML = h + ":" + m + " " + dd;
        });
      },
      /** Fade out an element **/
      fadeOut: function(el){
        el.style.opacity = 1;
        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
      },
      /** Fade In an Element **/
      fadeIn: function(el, display){
        el.style.opacity = 0;
        el.style.display = display || "block";
        (function fade() {
          var val = parseFloat(el.style.opacity);
          if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
          }
        })();
      },
      /** Delete the user inputs in the clock interface **/
      clearTimeSlot: function() {
        $.getElementsByClassName('time-slot')[0].html = '';
      },
    };

    Clock.initialize();
    View.initialize();
  
    return {
      convertHour: Clock.convertHour,
      convertMin: Clock.convertMin,
      setAM_PM: Clock.setAM_PM,
      validInputs: Clock.validInputs,
      calcWakeTimes: Controller.calcWakeTimes,
      calcSleepTimes: Controller.calcSleepTimes
    };
  })();

})(document, window);