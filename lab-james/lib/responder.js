'use strict';

const responder = module.exports = function(res, status, body){
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(body, function(){
    res.end();
  });
};
