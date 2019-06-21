module.exports = function () {

    return {
        SetRouting: function (router) {

            router.all('/*', (req, res, next) => {

                req.app.locals.layout = 'main';
                next();
            });

            router.get('/latest-football-news', this.footballNews);
            //router.post('/settings/interests', this.postInterestPage);
        },

        footballNews: function (req, res) {
            res.render('news/footballnews', {title: 'Footballkik - Latest News', user: req.user });
        }
}}