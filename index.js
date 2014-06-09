var extend = require('extend');

function defaultURLSlugGeneration(text) {
  return text.toLowerCase().replace(/([^a-z0-9\-\_]+)/g, '-').replace(/\-{2,}/g, '-');
}

var defaultOptions = {
  key: 'slug',
  generator: defaultURLSlugGeneration,
  type: String,
  trim: true,
  required: true,
  index: true,
  unique: true,
};
  
module.exports = function(slugProperty, options) {
  options = extend(true, defaultOptions, options);
  
  if (slugProperty.indexOf(' ') > -1) {
    slugProperty = slugProperty.split(' ');
  }
  return (function (schema) {
    var schemaField = {};
    schemaField[options.key] = {type: options.type, trim: options.trim, index: options.index, unique: options.unique, required: options.required};
    schema.add(schemaField);

    schema.methods.ensureUniqueSlug = function (slug, cb) {
      var model = this.model(this.constructor.modelName);
      var q = {};
      q[options.key] = slug;
      model.findOne(q, {_id: 1}).exec(function (e, doc) {
        if (e) return cb(e);
        else if (!doc) cb(null, true);
        else cb(null, false);
      });
    }

    schema.pre('save', function (next) {
      if (this.get([options.key])) next();
      var self = this;

      var toSlugify = '';
      if (slugProperty instanceof Array) {
        for (var i = 0; i < slugProperty.length; i++) {
          toSlugify += this.get(slugProperty[i]) + ' ';
        }
        toSlugify = toSlugify.substr(0, toSlugify.length-1);
      } else {
        toSlugify = this.get(slugProperty);
      }

      function uniqueSlugGeneration(slugCount) {
        slugCount = slugCount || 1;
        var tmpSlug = options.generator(toSlugify + ((slugCount > 1)? ' ' + slugCount : ''));
        schema.methods.ensureUniqueSlug(tmpSlug, function (e, unique) {
          if (e) next(e);
          if (!unique) return uniqueSlugGeneration(++slugCount);
          else return tmpSlug;
        });
      }

      this.set(options.key, uniqueSlugGeneration());
      next();
    });
  });
};