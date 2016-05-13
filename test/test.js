describe('validateInput', function() {
  var app = new window.app.Clock();
  console.log(app.validInputs('',''));
  it('should validate hours and mins', function() {
    // 12 hr
    assert.equal(app.validInputs(5, 10, true), true);
    // 24 hr
    assert.equal(app.validInputs(5, 10, false), true);
  });
  it('should not allow empty values', function() {
    var hour = parseInt('', 10);
    var mins = parseInt('', 10);
    assert.equal(app.validInputs(hour, mins, true), false);
    assert.equal(app.validInputs(hour, mins, false), false);
    assert.equal(app.validInputs(), false);
  });
  it('should not allow missing values', function() {
    assert.equal(app.validInputs(5, parseInt('', 10)), false);
    assert.equal(app.validInputs(parseInt('', 10), 16), false);
    assert.equal(app.validInputs(6), false);
  });
  it('should not allow non-numbers', function() {
    assert.equal(app.validInputs(parseInt('5'), parseInt(''), false), false);
    assert.equal(app.validInputs(parseInt('a'), parseInt({}), false), false);
    assert.equal(app.validInputs(parseInt('a'), parseInt(function(){}), false), false);
  });
  it('should not allow values exceeding bounds', function() {
    assert.equal(app.validInputs(25, 60), false);
    assert.equal(app.validInputs(-1, -10), false);
    assert.equal(app.validInputs(13, 100), false);
  });
});

describe('Time conversions', function() {
  describe('Hour Conversion', function() {
    var app = new window.app.Clock();
    it('should convert hour if exceeding 12', function() {
      assert.equal(app.convertHour(14), 2);
    });
    it('should not convert hour if less than 12', function() {
      assert.equal(app.convertHour(11), 11);
    });
  });

  describe('Minute Conversion', function() {
    var app = new window.app.Clock();
    it('should convert minute if less than 10', function() {
      assert.equal(app.convertMin(9), '09');
    });
  });

  describe('Set Time Period (AM/PM)', function() {
    var app = new window.app.Clock();
    it('should convert hour if exceeding 12', function() {
      assert.equal(app.setAM_PM(14), 'PM');
    });
    it('should not convert hour if less than 12', function() {
      assert.equal(app.setAM_PM(11), 'AM', 'Hello');
    });
  });
});


describe('Calculate Wake Times', function() {
  var app = new window.app.Controller(new window.app.Clock());
  var date = new Date(0, 0, 0, 12, 54);

  it('should have 5 correct times', function() {
    assert.equal(app.calcWakeTimes(date).map(function(obj) {
      return obj.toString();
    }).join(""), 
    ["Sun Dec 31 1899 03:54:00 GMT-0500 (EST)", "Sun Dec 31 1899 05:24:00 GMT-0500 (EST)", 
    "Sun Dec 31 1899 06:54:00 GMT-0500 (EST)", "Sun Dec 31 1899 08:24:00 GMT-0500 (EST)", 
    "Sun Dec 31 1899 09:54:00 GMT-0500 (EST)"].join(""));
  });
});

describe('Calculate Sleep Times', function() {
  var app = new window.app.Controller(new window.app.Clock());
  var date = new Date(0, 0, 0, 12, 54);

  it('should have 5 correct times', function() {
    assert.equal(app.calcSleepTimes(date).map(function(obj) {
      return obj.toString();
    }).join(""), 
    ["Sun Dec 31 1899 09:54:00 GMT-0500 (EST)", "Sun Dec 31 1899 08:24:00 GMT-0500 (EST)",
    "Sun Dec 31 1899 06:54:00 GMT-0500 (EST)", "Sun Dec 31 1899 05:24:00 GMT-0500 (EST)", 
    "Sun Dec 31 1899 03:54:00 GMT-0500 (EST)"].join(""));
  });
});