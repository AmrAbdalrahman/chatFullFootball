const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const http = require('http');
const container = require('./container');


container.resolve(function (users) {

    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function () {
            console.log('Listening on port 3000');
        });
        ConfigureExpress(app);

        //Setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }


    function ConfigureExpress(app) {
        //Handle Middleware
        app.engine('handlebars', exphbs({
            defaultLayout: 'main'
        }));
        app.use(express.static('public'));
        app.set('view engine', 'handlebars');

        //Body Parser Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
    }


});
