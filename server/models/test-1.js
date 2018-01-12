'use strict';

module.exports = function(Test1) {
  Test1.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };

  Test1.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );

  Test1.getName = function(testId, cb) {
    Test1.findById( testId, function (err, instance) {
        var response = instance;
        cb(null, response);
        console.log(response);
    });
  };

  Test1.remoteMethod(
    'getName',
    {
      http: {path: '/getname', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
      returns: {arg: 'name', type: 'string'}
    }
  );

  Test1.getWhere = function(testPrice,testLimit, cb) {
    Test1.find({
    where: {price: {lt: testPrice}},
    order: 'price ASC',
    limit: testLimit
  }, function(err, test1) {
      cb(null, test1);
    });
  };

  Test1.remoteMethod(
    'getWhere',
    {
      http: {path: '/getwhere', verb: 'get'},
      accepts: [{arg: 'price', type: 'number'}, {arg:'limit',type:'number'}],
      returns: {arg: 'name', type: 'string'}
    }
  );






};
