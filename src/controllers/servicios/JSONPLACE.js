var request = require("request");


var options = { method: 'POST',
  url: process.env.URLJSONPLACE,
  headers: 
   {  'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: { id: '18', algo: 'algo' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
