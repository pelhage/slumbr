    var now = new Date(); //Gets current Time
    var cycle = 90 * 60000; //This is the length of a sleep cycle, expressed in milliseconds

    function convertHour(h) {
      if (h >= 12) {
        return h - 12;
      } else if (h == 0) {
        return 12;
      } else {
        return h
      }
    }

    function convertMin(m) {
      return (m < 10) ? "0" + m : m
    }

    function setAM_PM(h) {
      return (h == 0) ? 'PM' : 'AM'
    }

    function pushToDOM(d) {
      var h = convertHour(d.getHours());
      var m = convertMin(d.getMinutes());
      var dd = setAM_PM(h);
      $("#" + i).html(h + ":" + m + " " + dd);
    }

    function sleepNow() {
      $(".time-slot").html('');
      for (i = 1; i < 7; i++) {
        var d = new Date(now.getTime() + 900000 + i * cycle); //Adding a cycle for each loop
        pushToDOM(d);
        //document.getElementById(i).innerHTML = h + ":" + m + " " + dd;
      }
    }

    function wakeUp() {

      //RETRIEVE TIMES FROM PERSON
      var hourInput = parseInt($('#hourInput').val(), 10)
      var minInput = parseInt($('#minInput').val(), 10);

      //CHECKING TO MAKE SURE INPUTS ARE CORRECT
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