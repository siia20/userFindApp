
Router.configure({
    layoutTemplate: 'layout', //layout templatae
    loadingTemplate: 'loading', //loading template
    notFoundTemplate: "notFound",//notFound template
    waitOn: function () {
        if (Meteor.userId()) {
            return Meteor.subscribe('getUserData');
        }
    }
});


Router.map(function () {

    this.route('staticHomePage', {
        path: '/',
        fastRender: true,
    });

});

