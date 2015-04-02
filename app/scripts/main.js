       // Gets current Time    
      var now = new Date();
       // This is the length of a sleep cycle, expressed in milliseconds
      var cycle = 90 * 60000;

       // Takes the date object's hour, and converts to 12 hour time
      function convertHour(h) {
        if (h >= 12) {
          return h - 12;
        } else if (h == 0) {
          return 12;
        } else {
          return h
        }
      }
       // Takes the date object's minute, and adds a zero if less than 10
      function convertMin(m) {
        return (m < 10) ? "0" + m : m
      }
       // Takes hour and returns PM if equal to zero, and AM if not
      function setAM_PM(h) {
        return (h < 24 && h >= 12) ? 'PM' : 'AM'
      }
       // Takes date object, makes conversions, then adds to DOM
      function pushToDOM(d) {
        var dd = setAM_PM(d.getHours());
        var h = convertHour(d.getHours());
        var m = convertMin(d.getMinutes());
        $("#" + i).html(h + ":" + m + " " + dd);
      }
       // If user chooses to calculate wake up time based if sleeps now:
      function sleepNow() {
        $(".time-slot").html('');
        for (i = 1; i < 7; i++) {
          var d = new Date(now.getTime() + 900000 + i * cycle); //Adding a cycle for each loop
          pushToDOM(d);
          //document.getElementById(i).innerHTML = h + ":" + m + " " + dd;
        }
      }

      function wakeUp() {
        //Retrieve times from person
        var hourInput = parseInt($('#hourInput').val(), 10)
        var minInput = parseInt($('#minInput').val(), 10);

        // Validate inputs
        if ((isNaN(hourInput || minInput)) || (hourInput > 12 || minInput < 0 || minInput > 59 || hourInput === "")) {
          document.getElementById("xxx").innerHTML = "Please use the correct HH:MM format"
        }

        if ($('#myonoffswitch').is(':checked') && hourInput == 12) {
          hourInput = 0;
        }

        var wakeTime = new Date(0, 0, 0, hourInput, minInput);

        //IF SET TO WAKE UP, THEN DO THIS
        if ($('#myonoffswitch2').is(':checked')) {
          for (i = 6; i > 0; i--) {
            var d = new Date(wakeTime.getTime() - i * cycle);
            pushToDOM(d);
          }
        }
        //IF SET TO SLEEP, THEN DO THIS
        if (!$('#myonoffswitch2').is(':checked')) {
          for (i = 1; i < 7; i++) {
            var d = new Date(wakeTime.getTime() + i * cycle);
            pushToDOM(d);
          }
        }
      }