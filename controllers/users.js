'use strict';

module.exports = function (_, passport, User) {

    return {

        SetRouting: function (router) {

            router.all('/*', (req, res, next) => {

                req.app.locals.layout = 'main';
                next();
            });

            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);


            router.get('/auth/facebook', this.getFacebookLogin);
            router.get('/auth/facebook/callback', this.facebookLogin);
            router.get('/auth/google', this.getGoogleLogin);
            router.get('/auth/google/callback', this.googleLogin);


            //login
            router.post('/', User.LoginValidation, this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignUp);


            //logout
            router.get('/logout', this.userLogout);


        },

        indexPage: function (req, res) {
            const errors = req.flash('error');
            return res.render('index', {title: 'Footballkk | login', messages: errors, hasErrors: errors.length > 0})
        },

        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true

        }),


        getSignUp: function (req, res) {
            const errors = req.flash('error');
            return res.render('signup', {title: 'Footballkk | SignUp', messages: errors, hasErrors: errors.length > 0});
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true

        }),

        getFacebookLogin: passport.authenticate('facebook', {
            scope: 'email'
        }),

        facebookLogin: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        getGoogleLogin: passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login',
                    'https://www.googleapis.com/auth/plus.profile.emails.read']
        }),

        googleLogin: passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true

        }),

        userLogout: function (req, res) {
            res.clearCookie("key");
            res.redirect('/');
            /*cookie = req.cookies;
            for (let prop in cookie) {
                if (!cookie.hasOwnProperty(prop)) {
                    continue;
                }
                res.cookie(prop, '', {expires: new Date(0)});
            }
            res.redirect('/')*/
        },

    }
};