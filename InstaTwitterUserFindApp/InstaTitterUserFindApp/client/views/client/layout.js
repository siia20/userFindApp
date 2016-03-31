var count = 0;
var instaUser = [];
var twitterUser = [];
var allUser = [];
Template.layout.events({
    //search icon click event
    'click #btnSearch': function () {
        $("#mainLoader").addClass('active');
        //call server side method to call API and get similar user
        Meteor.call('serchInstaUser', $("#user").val(), function (err, res) {

            res.data.data.forEach(function (d) {
                d['type'] = 'Instagram';
            });
            instaUser = res.data.data;
            //get only 20 users
            instaUser.splice(20, instaUser.length);

            allUser = instaUser.concat(twitterUser);
            $("#mainLoader").removeClass('active');
            //set all user in session to use in staticHomePage template
            Session.set('allUsers', allUser);

        });

    }
});
