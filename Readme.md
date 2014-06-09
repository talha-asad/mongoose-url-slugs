# Mongoose URL Slugs

A simple URL based slugs generation for mongoose models.


## Installation

```
$ npm install mongoose-url-slugs
```


## Example Usage


### Example 1: Using default options and merging 2 fields for slug generation.

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
testSchema.plugin(URLSlugs('first_name last_name', {key: 'myslug'}));
```


## Defaults and Configurables

* **key** (Default: 'slug') - Parts that are uploaded simultaneously.
* **generator(text)** (Default: lowercases and then replaces all alphanumeric characters to '-') - Function to generate slug.
* **index** - key schema settings. (see below)
* - **index.type** (Default: String) - Mongoose schema property type.
* - **index.trim** (Default: true) - Mongoose schema property trim.
* - **index.index** (Default: true) - Mongoose schema property index.
* - **index.unique** (Default: true) - Mongoose schema property unique.
* - **index.required** (Default: true) - Mongoose schema property required.


## History
* v0.0.3 (2014-06-09) -- Initial release.


## License

The MIT License (MIT)

Copyright (c) 2014 Talha Asad

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