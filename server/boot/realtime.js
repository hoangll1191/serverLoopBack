var es = require('event-stream');
module.exports = function(app) {
  var Test1 = app.models.Test1;
  Test1.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
    // console.log(changes.pipe(es.stringify()).pipe(process.stdout));
    // console.log(es.stringify());
    // console.log(changes);
  });

  // Test1.find(function (err, instance) {
  //     var response = instance;
  //     console.log(response);
  // });

}
