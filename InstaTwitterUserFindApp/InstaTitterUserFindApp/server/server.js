
/* Accounts package config */
Meteor.startup(function () {
//twitter api node package
    Twit = Meteor.npmRequire('twit');    

    //set variable in environment
    if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
        for (var variableName in Meteor.settings.env) {
            process.env[variableName] = Meteor.settings.env[variableName];
        }
    }

});

