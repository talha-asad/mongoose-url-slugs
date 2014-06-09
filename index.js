var extend = require('extend'),
    inspect = require('util').inspect;

function defaultURLSlugGeneration(text) {
  return text.toLowerCase().replace(/([^a-z0-9\-\_]+)/g, '-').replace(/\-{2,}/g, '-');
}

var defaultOptions = {
  key: 'slug',
  generator: defaultURLSlugGeneration,
  index: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true
  }
};
  
module.exports = function(slugProperty, options) {
  options = extend(true, defaultOptions, options);
  
  if (slugProperty.indexOf(' ') > -1) {
    slugProperty = slugProperty.split(' ');
  }
  
  return (function (schema) {
    var schemaField = {};
    schemaField[options.key] = {type: options.index.type, trim: options.index.trim, index: options.index.index, unique: options.index.unique, required: options.index.required};
    schema.add(schemaField);

    schema.methods.ensureUniqueSlug = function (doc, slug, cb) {
      if (!options.index.unique) return cb(null, true);
      var model = doc.constructor;
      var q = {};
      q[options.key] = slug;
      model.findOne(q, {_id: 1}).exec(function (e, doc) {
        if (e) return cb(e);
        else if (!doc) cb(null, true);
        else cb(null, false);
      });
    }

    schema.pre('validate', function (next) {
      var doc = this;
      if (doc.get(options.key)) return next();
      
      var toSlugify = '';
      if (slugProperty instanceof Array) {
        for (var i = 0; i < slugProperty.length; i++) {
          toSlugify += doc.get(slugProperty[i]) + ' ';
        }
        toSlugify = toSlugify.substr(0, toSlugify.length-1);
      } else {
        toSlugify = doc.get(slugProperty);
      }

      function uniqueSlugGeneration(slugCount, cb) {
        if (typeof slugCount == 'function') {
          cb = slugCount;
          slugCount = undefined;
        }
        slugCount = slugCount || 1;
        var tmpSlug = options.generator(toSlugify + ((slugCount > 1)? ' ' + slugCount : ''));
        schema.methods.ensureUniqueSlug(doc, tmpSlug, function (e, unique) {
          if (e) cb(e);
          if (!unique) return uniqueSlugGeneration(++slugCount, cb);
          else cb(null, tmpSlug);
        });
      }
      
      uniqueSlugGeneration(function (e, finalSlug) {
        if (e) return next(e);
        doc.set(options.key, finalSlug);
        next();
      });
      
    });
  });
};