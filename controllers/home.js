module.exports =  function () {

    return {

        SetRouting: function (router) {

            router.all('/*', (req, res, next) => {

                req.app.locals.layout = 'main';
                next();
            });

            router.get('/home', this.homePage);
        },


        homePage: function (req, res) {
            return res.render('home');
        }
    }
}