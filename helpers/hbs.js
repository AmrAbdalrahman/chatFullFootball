const express_handlebars_sections = require('express-handlebars-sections');

let register = function (Handlebars) {
    let helpers = {
        section: express_handlebars_sections(),
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (let prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);
