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

            async.parallel([
                function (callback) {
                    Users.findOne({'username': req.user.username})
                        .populate('request.userId')
                        .exec((err, result) => {
                            callback(err, result);
                        })
                }
            ], (err, results) => {
                const result1 = results[0];
                res.render('groupChat/group', {
                    title: 'Footballkik - Group',
                    groupName: name, user: req.user,
                    data: result1
                });

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
                            $push: {
                                sentRequest: {
                                    username: req.body.receiveName
                                }
                            }
                        }, (err, count) => {
                            callback(err, count);
                        })
                    }
                }
            ], (err, results) => {
                res.redirect('/group/' + req.params.name);
            });
        }
    }

};