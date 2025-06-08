const http = require('http');
const fs = require('fs');  
const _ = require('lodash'); 

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //lodash
    const num = _.random(0, 20);
    console.log(num);

    // Set header content type
    res.setHeader('Content-Type', 'text/html');

//     res.write('<head><link rel="stylesheet" href="#"></head>');
//     res.write('<p>Hello,World</p>');
//     res.write('<p>Hello again, World</p>');
//     res.end();
// });

    let path = '';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // Read the file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // Respond with the file content
            res.write(data);
            res.end();
        }
    })
});


server.listen(3003, 'localhost', () => {
    console.log('Server is running on http://localhost:3003');
});

