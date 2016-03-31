var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');

//twitter api key settings
var T = new Twit({
    consumer_key: 'S78g0srvJE4ozWUTOZu7Po2h0', // API key
    consumer_secret: 'IrPmNvHndkJeqvtzMiNttoxUFPQQPDGCycikZy9FgmbcqBJr5t', // API secret
    access_token: '740243730-Nr6fPfOJMuGCw2d0RDHwHxBLXvFBVhSqZufTX6Zr',
    access_token_secret: 'mellmN1nQ1Rvm5GlGe6btsgHv0l5qGHa3P48Kw3PQmrDG'
});

Meteor.methods({
    //search instagrma user
    serchInstaUser: function (userText) {

        var accessToken = "992211654.1fb234f.5064b611bf4347ab98a6a3bedb458812";  //public instagram token to access all user's details
        var btSerchInstaUser = new Future();
        var reqURL = "https://api.instagram.com/v1/users/search?q=" + userText + "&access_token=" + accessToken;
        //call instagram api
        Meteor.http.get(reqURL, function (error, result) {
            //console.log(error, result);
            if (error) {
                //return error
                btSerchInstaUser.return(error);
            } else {
                //return result
                btSerchInstaUser.return(result);
            }
        });
        //wait till get all search user's details
        return btSerchInstaUser.wait();
    },
    //search twitter user
    serchTwitterUser: function (userText) {
        var btSerchTwitterUser = new Future();
        //call twitter api from node twitter package
        T.get('users/search',
            {
                q: userText
            },
            function (err, data, response) {
                //return all the searched twitter user
                btSerchTwitterUser.return(data);
            }
            );
        //wait till get all search user's details
        return btSerchTwitterUser.wait();
    },
    //get particular instagram user's post
    getUserPost: function (userID) {

        var accessToken = "992211654.1fb234f.5064b611bf4347ab98a6a3bedb458812"; //public token
        var btinstaUserSelf = new Future();
        //call instagram api to get particualr user's post
        Meteor.http.get("https://api.instagram.com/v1/users/" + userID + "/media/recent?access_token=" + accessToken, function (error, result) {
            //console.log(error, result);
            if (error) {
                //return error
                error.id = userID;
                btinstaUserSelf.return(error);
            } else {
                //return user's post
                result.id = userID;
                btinstaUserSelf.return(result);
            }
        });
        //wait till get all user's post details
        return btinstaUserSelf.wait();
    },
    //get particular twitter user's post
    getTwitterUserPost: function (userId) {
        var btTwitterUserPost = new Future();

        console.log(userId);
        //call twitter api to get user's post
        T.get('statuses/user_timeline',
            {
                user_id: userId
            },
            function (err, data, response) {
                console.log(err, data, response);
                //retun result data
                btTwitterUserPost.return(data);
            }
            );
        //wait till get all user's post details
        return btTwitterUserPost.wait();
    },


});