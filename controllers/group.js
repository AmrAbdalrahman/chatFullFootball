module.exports = function (Users, async) {

    return {
        SetRouting: function (router) {

            router.all('/*', (req, res, next) => {

                req.app.locals.layout = 'main';
                next();
            });

            router.get('/group/:name', this.groupPage);
            router.post('/group/:name', this.groupPostPage);
        },

        groupPage: function (req, res) {
            const name = req.params.name;

            res.render('groupChat/group', {
                title: 'Footballkik - Group',
                groupName: name, user: req.user
            });
        },

        groupPostPage: function (req, res) {
            async.parallel([
                function (callback) {
                    if (req.body.receiveName) {
                        Users.updateOne({
                                'username': req.body.receiveName,
                                'request.userId': {$ne: req.user._id},
                                'friendsList.friendId': {$ne: req.user._id},
                            },
                            {
                                $push: {
                                    request: {
                                        userId: req.user._id,
                                        username: req.user.username
                                    }
                                },
                                $inc: {totalRequest: 1}
                            }, (err, count) => {
                                callback(err, count);
                            })
                    }
                },
                function (callback) {
                    if (req.body.receiveName) {
                        Users.updateOne({
                            'username': req.user.username,
                            'sentRequest.username': {$ne: req.body.receiveName},
                        }, {
                            $push: {sentRequest: {
                                    username: req.body.receiveName
                                }}
                        },(err,count)=>{
                            callback(err, count);
                        })
                    }
                }
            ],(err, results) => {
                res.redirect('/group/'+req.params.name);
            });
        }
    }

};