(function($, window) {

  window.Slumbr = (function() {

    // This is the length of a sleep cycle, expressed in milliseconds
    //var cycle = 90 * 60000;


    var Clock = {
      dateTime: new Date(),
      hour: null,
      minutes: null,
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
      },
      // If user sets a time to sleep/wake up
      wakeUp: function() {
        //Retrieve times from person
        Clock.hour = parseInt($('#hourInput').val(), 10);
        Clock.minutes = parseInt($('#minInput').val(), 10);

        if (!Clock.validInputs(Clock.hour, Clock.minutes)) {
          return false;
        }
        // If it is PM, then make sure to add 12 to hourInput
        if (!$('#am-pm').is(':checked')) {
          Clock.hour += 12;
          Clock.period = 'pm';
        }
        // Create a date object based on the inputs
        Clock.dateTime = new Date(0, 0, 0, Clock.hour, Clock.minutes);
        Clock.setToWake = View.sleepWake.checked;
        this.generateTimes();
        View.pushToDOM();
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
      initialize: function() {
        this.clearTimeSlot();
        $.getElementById('go').addEventListener('click', function() {

          Controller.wakeUp();
        });
        $.getElementById('sleepnow').addEventListener('click', function() {
          Controller.sleepNow();
        });
      },
      sleepWake: function() {
        $.getElementById('sleep-wake')
      },
      // Takes date object, makes conversions, then adds to DOM
      pushToDOM: function() {
        Clock.listOfTimes.forEach(function(time, i) {
          var dd = setAM_PM(time.getHours());
          var h = convertHour(time.getHours());
          var m = convertMin(time.getMinutes());
          $.getElementById(i).html = h + ":" + m + " " + dd;
        });
      },
      clearTimeSlot: function() {
        $.getElementsByClassName('time-slot')[0].html = '';
      },
    };

    // Clock.initialize();
    // View.initialize();
  
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