var mongoose = require('mongoose'),
    expect = require('chai').expect,
    urlSlugs = require('../index');

mongoose.connect('mongodb://localhost/mongoose-url-slugs');

mongoose.connection.on('error', function(err) {
  console.error('MongoDB error: ' + err.message);
  console.error('Make sure a mongoDB server is running and accessible by this application');
});

var maxLength = 20,
    TestObjSchema = new mongoose.Schema({name: String, extra: String}),
    TestObjSparseSchema = new mongoose.Schema({name: String, extra: String});

TestObjSchema.plugin(urlSlugs('name', {maxLength: maxLength}));
TestObjSparseSchema.plugin(urlSlugs('name', {maxLength: maxLength, indexSparse: true}));

var TestObj = mongoose.model('test_obj', TestObjSchema);
var TestSparseObj = mongoose.model('test_sparse_obj', TestObjSparseSchema);

describe('mongoose-url-slugs', function() {
  before(function(done) {
    TestObj.remove(function() {
      TestSparseObj.remove(done);
    });
  });

  describe('maxLength', function() {
    it('ensures slug length is less than maxLength', function(done) {
      TestObj.create({name: 'super duper long content that cannot possibly fit into a url in any meaningful manner'}, function(err, obj) {
        expect(err).to.not.exist;
        expect(obj.slug).length.to.be(maxLength);
        done();
      });
    });

    it('sequential slugs work with maxLength', function(done) {
      TestObj.create({name: 'super duper long content that cannot possibly fit into a url'}, function(err, obj) {
        expect(err).to.not.exist;
        expect(obj.slug).length.to.be(maxLength);
        TestObj.create({name: 'super duper long content that cannot possibly fit into a url'}, function(err, obj2) {
          expect(err).to.not.exist;
          expect(obj2.slug).length.to.be(maxLength);
          done();
        });
      });
    });
  });
  
  describe('numbering', function() {
    it('does not add necessary numbers', function(done) {
      TestObj.create({name: 'Foo Bar'}, function(err, obj) {
        expect(err).to.not.exist;
        expect(obj.slug).to.equal('foo-bar');
        TestObj.create({name: 'Foo'}, function(err, obj2) {
          expect(err).to.not.exist;
          expect(obj2.slug).to.equal('foo');
          expect(obj._id.equals(obj2._id)).to.be.false;
          done();
        });
      });
    });
  });
  
  describe('undefined slug dependent field', function() {
    it('uses undefined when slug field does not exist', function(done) {
      TestObj.create({extra: 'test'}, function(err, obj) {
        expect(err).to.not.exist;
        expect(obj.slug).to.equal('undefined');
        TestObj.create({extra: 'test2'}, function(err, obj2) {
          expect(err).to.not.exist;
          expect(obj2.slug).to.equal('undefined-2');
          expect(obj._id.equals(obj2._id)).to.be.false;
          done();
        });
      });
    });
    it('sets slug to undefined when it is an empty string', function(done) {
      TestObj.create({name: ''}, function(err, obj) {
        expect(err).to.not.exist;
        expect(obj.slug).to.equal('undefined-3');
        done();
      });
    });
  });

  describe('index_sparse', function() {
    it('sets slug to null when it is an empty string', function(done) {
      TestSparseObj.create({name: ''}, function(err, obj) {
        expect(err).to.not.exist;
        expect(obj.slug).to.be.empty;
        TestSparseObj.create({name: ''}, function(err, obj2) {
          expect(err).to.not.exist;
          expect(obj2.slug).to.be.empty;
          expect(obj._id.equals(obj2._id)).to.be.false;
          done();
        });
      });
    });
  });

  it('works', function(done) {
    TestObj.create({name: 'cool stuff'}, function(err, obj) {
      expect(obj.slug).to.equal('cool-stuff');
      TestObj.create({name: 'cool stuff'}, function(err, obj) {
        expect(obj.slug).to.equal('cool-stuff-2');
        TestObj.create({name: 'cool stuff'}, function(err, obj) {
          expect(obj.slug).to.equal('cool-stuff-3');
          done();
        });
      });
    });
  });
});