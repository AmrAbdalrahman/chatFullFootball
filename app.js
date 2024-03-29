const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const SocketIO = require('socket.io');
const  {Users} = require('./helpers/UsersClass');
const  {Global} = require('./helpers/Global');
const helmet = require('helmet');
const compression = require('compression');
const secret = require('./secret/secretFile');
const container = require('./container');



//Handlebars Helpers
/*const {
    ifCond
} = require('./helpers/hbs');*/


container.resolve(function (users,_,admin, home, group,results,privateChat, profile, interests, news) {

    //Map global promise - get rid of warning
    mongoose.Promise = global.Promise;

//Mongoose Connect

    mongoose.connect(secret.mongoURI, {useNewUrlParser: true}).then(() => {
        console.log('MongoDB Connected');
    }).catch(err => console.log(err));

    /*
    //dev
    mongoose.connect('mongodb://localhost/footballkik', {useNewUrlParser: true}).then(() => {
        console.log('MongoDB Connected');
    }).catch(err => console.log(err));

    */

    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);


    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        const io = SocketIO(server);

        server.listen(process.env.PORT || 3000, function () {
            console.log('Listening on port 3000');
        });
        ConfigureExpress(app);

        app.use(compression());
        app.use(helmet());

        require('./socket/groupChat')(io, Users);
        require('./socket/friend')(io);
        require('./socket/globalRoom')(io,Global,_);
        require('./socket/privateMessage')(io);

        //Setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);
        admin.SetRouting(router);
        home.SetRouting(router);
        group.SetRouting(router);
        results.SetRouting(router);
        privateChat.SetRouting(router);
        profile.SetRouting(router);
        interests.SetRouting(router);
        news.SetRouting(router);

        app.use(router);

        app.use(function (req, res) {
            res.render('404');
        })
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

            helpers: require('./helpers/hbs').helpers
             /*   {
              //  cssFiles: cssFiles,
                section: express_handlebars_sections(),
                    compare:

            }*/,
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
