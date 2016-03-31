Template.registerHelper('flikerProfile', function () {
    //first time only visible 5 profile 
    Meteor.defer(function () {
        var index = 0
        $('.userList').css('display', 'none');
        $('.userList' + index).css('display', 'block');
    });
});