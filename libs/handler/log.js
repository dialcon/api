var fs = require('fs');
const path = require('path');

fs.appendFileSync(path.join(_path, '/public/error.log'), '' + ` Start Server ${process.env.NODE_ENV} ${process.env.SERVER_MODE_ENV}` + "\n");

if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', function (err) {
    console.error(err.stack);
    //let trace = err.stack.split("\n");
    fs.appendFileSync(path.join(_path, '/public/error.log'), '' + ` Start Server ${process.env.NODE_ENV} ${process.env.SERVER_MODE_ENV} ` + err.stack + "\n");

    // sendError(err, function () {
    //   console.error((new Date()).toString(), err, err.stack);
    // });
  });
}

module.exports = (err, req, res, next) => {
  console.error((new Date()).toString(), err, err.stack);
  next(err);
};
