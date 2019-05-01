module.exports = function () {

    return {
        SetRouting: function (router) {

            router.all('/*', (req, res, next) => {

                req.app.locals.layout = 'main';
                next();
            });

            router.get('/group/:name', this.groupPage);
        },

        groupPage: function (req, res) {
            const name = req.params.name;

            res.render('groupChat/group', {title: 'Footballkik - Group',
                groupName: name, user: req.user});
        }
    }

}