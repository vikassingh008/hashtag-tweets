var http = require('http');
var pp = '/search.json?q=%23hashtag&rpp=50';
var options = {
    host: 'search.twitter.com',
    path: pp,
    method: 'GET',
    headers: {
    'Authorization': 'Basic '+new Buffer('username:password').toString('base64')
    }
};
setInterval(function() {
var options = {
    host: 'search.twitter.com',
    path: pp,
    method: 'GET',
    headers: {
    'Authorization': 'Basic '+new Buffer('username:password').toString('base64')
    }
};
    var request = http.request(options,function(res) {
        var data = '';
        res.setEncoding('utf8');
        res.on('data',function(chunk) {
            data += chunk; 
        });
        res.on('end', function() {
            try {
                var twit = JSON.parse(data);
                if( twit.next_page != undefined )
                pp = '/search.json'+twit.next_page;
                var len = twit.results_per_page;
            }
            catch(e) {
                 console.log('\nError ' + e + ' Statuscode '+res.statusCode );
            }
            console.log(pp);
            var i = 0; 
            while(i<len) {
                try {
                    console.log('Tweet #'+i+' '+ twit.results[i].text);
                }
                catch(e) {
                    console.log('Error'+ e);
                }   
                i++; 
            }
            console.log('\n'); 
        });
        request.on('error', function(e) {
            console.log('problem with request '+e.message);
        }); 
    });
    request.end();  
}, 15000 );
