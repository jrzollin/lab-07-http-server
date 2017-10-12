'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const responder = require('./lib/responder.js');

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);

  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    responder(res, 200, cowsay.say({text: req.url.query}));
  }

  if(req.method === 'GET' && req.url.pathname === '/'){
    responder(res, 200, cowsay.say({text: 'Oy! Whatcha lookin at?'}));
  }

  if(req.method === 'POST' && req.url.pathname === '/'){
    let body = '';

    req.on('data', function(data){
      body += data.toString();
    });

    req.on('end', function(){
      let json;
      
      try {
        json = JSON.parse(body);
        console.log(json);
      } catch(e) {
        return responder(res, 400, cowsay.say({text: 'That was some bad JSON.'}));
      }

      responder(res, 200, 'Got it');
    });
  }


  responder(res, 400, cowsay.say({text: 'Bad request'}));

});


server.listen(3000);
