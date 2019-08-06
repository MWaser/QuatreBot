"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path = require("path");
const index_1 = require("./routes/index");
const user_1 = require("./routes/user");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/users', user_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// ******************************************************************************************
console.log('Starting up steembot4 . . . .');
var steem = require("steem");
//steem.api.setOptions({ url: 'wss://steemd-int.steemit.com' });
steem.api.setOptions({ url: 'https://api.steemit.com' });
var watcher;
var restarts = 0;
var createWatcher = function () {
    watcher = require('child_process').fork(`${__dirname}/watch.js`);
    watcher.on('message', (m) => {
        console.log((new Date()) + ": received " + m.message + ", restarts = " + restarts);
        createWatcher();
    });
};
createWatcher();
var checkWatcher = function () {
    console.log("RESTARTS = " + restarts);
};
var intId = setInterval(checkWatcher, 60000);
// ******************************************************************************************
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=app.js.map