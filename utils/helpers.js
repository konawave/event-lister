const handlebars = require('handlebars');
const { format } = require('date-fns');

handlebars.registerHelper('format', function (date, formatString) {
  return format(date, formatString);
});

module.exports = {
    handlebars: handlebars
  };