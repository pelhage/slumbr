(function(document, window, undefined) {

  /* Micro Library for DOM selection */
  window.$ = function(el) {
    var d = {
      '#': 'getElementById',
      '.': 'getElementsByClassName'
    }[el[0]];
    return document[d](el.slice(1));
  };

  /* Slumbr.in - Patrick El-Hage */
  window.Slumbr = (function() {
    // This is the length of a sleep cycle, expressed in milliseconds
    //var cycle = 90 * 60000;
    var Clock = {
      dateTime: new Date(),
      isMilitary: (localStorage.getItem('military') === 'true') || false,
      setToWake: true,
      listOfTimes: [],
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
      validInputs: function(hrInput, minInput, isMilitary) {
        if ( (isNaN(hrInput) || isNaN(minInput) ) || // Invalid Times
          (isMilitary && (hrInput > 12 || hrInput <= 0)) ||  // Invalid 12hr
          (isMilitary && (hrInput > 23 || hrInput < 0)) || // Invalid 24hr
          (minInput < 0 || minInput > 59) || hrInput < 0) { // Invalid Mins
          return false;
        } else {
          return true;
        }
      },
    };

    var Controller = {
      /**
       * If user chooses to calculate wake up times 
       * based if sleeps now:
       */
      sleepNow: function() {
        Clock.dateTime = new Date();
        View.clearTimeSlot();
        Clock.listOfTimes = this.calcSleepTimes();
        View.render();
      },
      /**
       * If user sets a time to sleep/wake up 
       */
      wakeUp: function() {
        // Retrieve times from person
        var hour = parseInt($('#hourInput').value, 10);
        var mins = parseInt($('#minInput').value, 10);
        // Validate Inputs
        if (!Clock.validInputs(hour, mins, Clock.isMilitary)) {
          View.showError();
          return false;
        } else if (View.errorVisible) {
          View.hideError();
        }
        // If 12 hour clock make sure to adjust for PM
        if (!Clock.isMilitary && View.amPmBtn.checked) {
          hour += 12;
        }
        // Create a date object based on the inputs
        Clock.dateTime = new Date(0, 0, 0, hour, mins);
        Clock.setToWake = View.sleepWake.checked;
        this.generateTimes();
        View.render();
        return true;
      },
      /**
       * Create list of times to sleep/wake up 
       * based on user input
       */
      generateTimes: function() {
        if (Clock.setToWake) {
          Clock.listOfTimes = this.calcWakeTimes();
        } else if (!Clock.setToWake) {
          Clock.listOfTimes = this.calcSleepTimes();
        }
      },
      /**
       * Calculate times user should wake up if going
       * to bed by a certain time
       */
      calcWakeTimes: function(dateTime) {
        var timesList = [];
        var dateTime = dateTime || Clock.dateTime.getTime();
        for (var i = 6; i > 1; i--) {
          var d = new Date(dateTime - i * 90 * 60000);
          timesList.push(d);
        }
        return timesList;
      },
      /**
       * Calculate times user should go to sleep if
       * trying to go to wake up by a specific time
       */
      calcSleepTimes: function(dateTime) {
        var dateTime = dateTime || Clock.dateTime.getTime();
        var timesList = [];
        for (var j = 2; j < 7; j++) {
          var d = new Date(dateTime + j * 90 * 60000);
          timesList.push(d);
        }
        return timesList;
      },
    };

    var View = {
      /**
       * UI elements
       */
      clockInterface: $('#contain'),
      clockResults: $('#results'),
      sleepWake: $('#sleep-wake'),
      goBtn: $('#go'),
      sleepNowBtn: $('#sleepnow'),
      goBackBtn: $('#back'),
      amPmBtn: $('#switch__am-pm'),
      errorMsg: $('#alert'),
      errorVisible: false,
      /**
       * Initializes the View and adds event listeners
       */
      initialize: function() {
        this.toggleAmPm();

        this.goBtn.addEventListener('click', function() {
          if (Controller.wakeUp()) {
            this.fadeOut(this.clockInterface, function() {
              this.fadeIn(this.clockResults);
            }.bind(this));
          }
        }.bind(this));

        this.sleepNowBtn.addEventListener('click', function() {
          Controller.sleepNow();
          this.fadeOut(this.clockInterface, function() {
            this.fadeIn(this.clockResults);
          }.bind(this));
        }.bind(this));

        this.goBackBtn.addEventListener('click', function() {
          this.fadeOut(this.clockResults, function() {
            this.fadeIn(this.clockInterface);
          }.bind(this));
        }.bind(this));
      },
      toggleAmPm: function() {
        if (Clock.isMilitary) {
          View.fadeOut(View.amPmBtn);
        } else {
          View.fadeIn(View.amPmBtn, 'inline-block');
        }
      },
      showError: function() {
        this.errorVisible = true;
        this.fadeIn(this.errorMsg);
      },
      hideError: function() {
        this.errorVisible = false;
        this.fadeOut(this.errorMsg);
      },
      /**
       * Renders the list of dates in their appropriate views
       */
      render: function() {
        Clock.listOfTimes.forEach(function(time, i) {
          if (!Clock.isMilitary) {
            var dd = Clock.setAM_PM(time.getHours());
            var h = Clock.convertHour(time.getHours());
          } else {
            var dd = '';
            var h = time.getHours();
          }
          var m = Clock.convertMin(time.getMinutes());
          $('#'+i).innerHTML = h + ":" + m + " " + dd;
        });
      },
      /**
       * Fade out an element
       * @param {object} el - ement
       * @callback cb - callback after fade
       **/
      fadeOut: function(el, cb){
        el.style.opacity = 1;
        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
        setTimeout(cb, 500);
      },
      /**
       * Fade In an Element
       * @param {object} el - ement
       * @param {string} display - display type of el
       **/
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
      /**
       * Delete the user inputs in the clock interface
       **/
      clearTimeSlot: function() {
        $('.time-slot')[0].html = '';
      },
    };
    /**
     * User can choose between 12 hour and
     * 24 hour time presentations
     */
    var Settings = {
      renderSettings: function() {
        Array.prototype.forEach.call($('#clock-type').children, function(el){
          if (el.getAttribute('data-military') == String(Clock.isMilitary)) {
            el.className = 'clock-type__active';
          } else {
            el.className = 'clock-type__inactive';
          }
        });
      },
      initialize: function() {
        this.renderSettings();

        $('#clock-type').addEventListener('click', function(e) {
          if (e.target && e.target.nodeName == 'SPAN') {
            if ( (e.target.getAttribute('data-military') !== String(Clock.isMilitary)) ) {
              Clock.isMilitary = !Clock.isMilitary;
              localStorage.setItem('military', Clock.isMilitary);
              View.toggleAmPm();
              this.renderSettings();
              View.render();
            }
          }
        }.bind(this));
      },
    };
    
    View.initialize();
    Settings.initialize();
    setTimeout(function(){View.fadeIn(document.body)}, 500);

    return {
      convertHour: Clock.convertHour,
      convertMin: Clock.convertMin,
      setAM_PM: Clock.setAM_PM,
      validInputs: Clock.validInputs,
      calcWakeTimes: Controller.calcWakeTimes,
      calcSleepTimes: Controller.calcSleepTimes,
      viewInit: View.initialize,
      settingsInit: Settings.initialize
    };
  })();

})(document, window);