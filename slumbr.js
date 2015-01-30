    //Obtaining current Time
    var now = new Date(); //Gets current Time
    var cycle = 90 * 60000; //This is the length of a sleep cycle, expressed in milliseconds
    function sleepNow() {
      $(".time-slot").html('');
        for (i = 1; i < 7; i++) {
            var d = new Date(now.getTime() + 900000 + i * cycle); //Adding a cycle for each loop
            var hh = d.getHours();
            var m = d.getMinutes();
            var dd = 'AM';
            var h = hh;
            if (h >= 12) {
                h = hh - 12;
                dd = 'PM';
            }
            if (h == 0) {
                h = 12;
            }
            if (m < 10) {
                m = "0" + m;
            }
            
            $("#" + i).html(h + ":" + m + " " + dd);
            //document.getElementById(i).innerHTML = h + ":" + m + " " + dd;
        }
    }

    function wakeUp() {

      //RETRIEVE TIMES FROM PERSON
        var hourInput = parseInt($('#hourInput').val(), 10)
        var minInput = parseInt($('#minInput').val(), 10);
      
      //MAKE SURE IT IS EMPTY EACH TIME YOU ARE PRESSING CALC
        $(".time-slot").html('');

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
                var hh = d.getHours();
                var m = d.getMinutes();
                var dd = 'AM';
                var h = hh;
                if (h >= 12) {
                    h = hh - 12;
                    dd = 'PM';
                }
                if (h == 0) {
                    h = 12;
                }
                if (m < 10) {
                    m = "0" + m;
                }

                $("#" + i).html(h + ":" + m + " " + dd);
                //document.getElementById(i).innerHTML = h + ":" + m + " " + dd;
            }
        }
        //IF SET TO SLEEP, THEN DO THIS
        if (!$('#myonoffswitch2').is(':checked')) {
            for (i = 1; i < 7; i++) {
                var d = new Date(wakeTime.getTime() + i * cycle);
                var hh = d.getHours();
                var m = d.getMinutes();
                var dd = 'AM';
                var h = hh;
 
                if (h >= 12) {
                    h = hh - 12;
                    dd = 'PM';
                }
                if (h == 0) {
                    h = 12;
                }
                if (m < 10) {
                    m = "0" + m;
                }

                $("#" + i).html(h + ":" + m + " " + dd);
                //document.getElementById(i).innerHTML = h + ":" + m + " " + dd;
            }
        }
    }
