const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
  editIcon: function (commentUser, loggedUser, commentId, floating = true) {
    if (commentUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/comments/edit/${commentId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/comments/edit/${commentId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        'selected="selected"$&'
      );
  },
};
