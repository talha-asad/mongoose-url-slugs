[![Build Status](https://travis-ci.org/mindblaze/mongoose-url-slugs.png?branch=master)](https://travis-ci.org/mindblaze/mongoose-url-slugs)
[![Dependency Status](https://www.versioneye.com/user/projects/5478679560944d12df000046/badge.svg)](https://www.versioneye.com/user/projects/5478679560944d12df000046)
[![NPM version](https://badge.fury.io/js/mongoose-url-slugs.svg)](http://badge.fury.io/js/mongoose-url-slugs)

[![NPM stats](https://nodei.co/npm/mongoose-url-slugs.png?downloads=true)](https://www.npmjs.org/package/mongoose-url-slugs)

# Mongoose URL Slugs

A simple URL based slug generator for mongoose models.


## Installation

```
$ npm install mongoose-url-slugs
```


## Example Usage


### Example 1: Using default options and using 2 fields for slug generation.

```js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    URLSlugs = require('mongoose-url-slugs');

var testSchema = new Schema({
  first_name: {type: String, default: '', trim: true},
  last_name: {type: String, default: '', trim: true},
  rev: {type: String, default: '', trim: true}
});

testSchema.plugin(URLSlugs('first_name last_name'));
```

### Example 2: Using 'myslug' key for storing slug.

```js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    URLSlugs = require('mongoose-url-slugs');

var testSchema = new Schema({
  first_name: {type: String, default: '', trim: true},
  last_name: {type: String, default: '', trim: true},
  rev: {type: String, default: '', trim: true}
});

// Save slugs to 'myslug' field.
testSchema.plugin(URLSlugs('first_name last_name', {field: 'myslug'}));
```


## Default options

* **field** (Default: 'slug') - Slug field to use for storage.
* **addField** (Default: True) - Add slug field to mongoose schema.
* **separator** (Default: '-') - Separator to use for invalid characters.
* **generator(text, separator)** (Default: lowercases and then replaces all non alphanumeric characters to seperator) - Function to generate slug.
* **maxLength** (Default: null) - If set, restricts slug length to specified value.
* **update** (Default: False) - Update slug when slug building fields change.
* **index** (Default: True) - Mark slug field as index in mongoose schema.
* **index_type** (Default: String) - Mongoose schema slug index type.
* **index_default** (Default: '') - Mongoose schema slug index default value.
* **index_trim** (Default: True) - Mongoose schema slug index trim value.
* **index_unique** (Default: True) - Mongoose schema slug index unique value.
* **index_required** (Default: True) - Mongoose schema slug index required value.
* **index_sparse** (Default: False) - Mongoose schema slug index sparse value.


## History

* v0.1.4 (2015-09-15) -- Dependencies updated.
* v0.1.3 (2014-04-23) -- Dependencies updated.
* v0.1.2 (2014-12-09) -- Fixed an issue with index_sparse.
* v0.1.1 (2014-12-09) -- Fixed an issue due to maxLength.
* v0.1.0 (2014-11-28) -- Added index_sparse, maxLength options.
* v0.0.10 (2014-10-14) -- Dependencies updated.
* v0.0.9 (2014-06-14) -- findBySlug bug fixed.
* v0.0.8 (2014-06-10) -- slug generation improved.
* v0.0.6 (2014-06-10) -- incremented slug generation bug fix and minor optimizations.
* v0.0.5 (2014-06-10) -- Initial release.


## License

The MIT License (MIT)

Copyright (c) 2015 Talha Asad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.