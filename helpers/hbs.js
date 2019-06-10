const express_handlebars_sections = require('express-handlebars-sections');

let register = function (Handlebars) {
    let helpers = {
        section: express_handlebars_sections(),
        inc: function (value, options) {
             parseInt(value) + 1;
        },
        setVar: function(varName, varValue, options) {
            options.data.root[varName] = parseInt(varValue);
        },
        ifCond : function(v1, v2, options) {
            if(v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
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
