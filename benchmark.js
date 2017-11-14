/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var URI = require('./');
var URL = require('url-parse');

var u = 'scheme://username:password@host:port/path?name=hustcc#fragment;ext=hello';

suite
  .add('URI', function () {
    new URI(u);
  })
  .add('URL', function () {
    URL(u, true);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .on('complete', function() {
    var fast = this.filter('fastest');
    var slow = this.filter('slowest');
    console.log('[OPS] ' +
      fast.map('name') + ' / ' + slow.map('name') +
      ' = ' +
      (fast.map('hz') / slow.map('hz')).toFixed(3) +
      '\n'
    );
  })
  .run();
