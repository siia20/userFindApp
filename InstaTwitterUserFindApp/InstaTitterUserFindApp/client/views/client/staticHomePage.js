var postIntervalIndex = 0;
Template.staticHomePage.onCreated(function () {

});

Template.staticHomePage.onRendered(function () {

});

Template.staticHomePage.helpers({
    allUsers: function () {
        //get all user from session
        var allMedia = Session.get('allUsers');
        //logic to display only 5 users at a time
        allMedia.forEach(function (d, i) {
            d['index'] = parseInt(i / 5);
        });
        // start function to get particular user's post
        getUserPost(allMedia, 0)
        return allMedia;
    }
});

Template.staticHomePage.events({

});

function getUserPost(allUser, index) {
    if (allUser[index]['type'] == 'Instagram') {
        Meteor.call('getUserPost', allUser[index]['id'], function (err, res) {
            
            index = index + 1;
            if (res.response == undefined) {
                $('#' + res.id).empty();
                res.data.data.forEach(function (d, i) {
                    if (d.caption != null && d.images != undefined) {
                        $('#' + d.user.id).append('<div class="userPost userPost' + i + '"><img src="' + d.images.thumbnail.url + '"><p>' + d.caption.text + '</p></div>')
                    }
                });
            }
            else {
                console.log(res)
                $('#' + res.id).parent().parent().remove();
            }
            if (allUser.length != index) {
                getUserPost(allUser, index)
            }
            else {
                var index3 = 0
                var interval = setInterval(function () {
                    if (parseInt((allUser.length - 1) / 5) >= index3) {
                        $('.userList').css('display', 'none');
                        $('.userList' + index3).css('display', 'block');
                        index3++;
                    }
                    else {
                        index3 = 0;
                    }
                }, 1000 * 5)
            }
        });
    }
}
