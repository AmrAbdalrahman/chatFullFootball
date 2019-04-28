const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container');


//Handlebars Helpers
const {
    cssFiles
} = require('./helpers/hbs')


container.resolve(function (users,_,admin, home) {

    //Map global promise - get rid of warning
    mongoose.Promise = global.Promise;

//Mongoose Connect
    mongoose.connect('mongodb://localhost/footballkik', {useNewUrlParser: true}).then(() => {
        console.log('MongoDB Connected');
    }).catch(err => console.log(err));
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);


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
        admin.SetRouting(router);
        home.SetRouting(router);

        app.use(router);
    }


    function ConfigureExpress(app) {
        require('./passport/passport-local');
        require('./passport/passport-facebook');
        require('./passport/passport-google');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'handlebars');
        //Handle Middleware
        app.engine('handlebars', exphbs({

            helpers: {
              //  cssFiles: cssFiles,
                section: express_handlebars_sections(),  // CONFIGURE 'express_handlebars_sections'
            },
            defaultLayout: 'main'
        }));

        //Body Parser Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));


        app.use(validator());
        app.use(session({
            secret: 'magicanochat',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;
    }


});
