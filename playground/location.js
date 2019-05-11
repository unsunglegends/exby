/* var geoip = require('geoip-lite');
 
var ip = "207.97.227.239";
var geo = geoip.lookup(ip);
console.log(geo) */
const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(expressip().getIpInfoMiddleware);


app.set("PORT", PORT);

app.get('/', function (req, res) {
  const ipInfo = req.ipInfo;
  var message = JSON.stringify(ipInfo);
  res.send(message);
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});