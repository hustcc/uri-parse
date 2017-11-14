var URI = require('./');
var expect = require('expect');

describe('uri-parse', function() {
  it(' - full', function() {
    expect(
      new URI('scheme://username:password@host:port/path?name=hustcc#fragment;ext=hello').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: {
        name: 'hustcc'
      },
      fragment: 'fragment',
      extension: {
        ext: 'hello'
      }
    });

    expect(
      function() {
        new URI('scheme:/').all()
      }
    ).toThrow('scheme should followed by "://".');
  });

  it(' - optional username:password', function() {
    expect(
      new URI('scheme://host:port/path?name=hustcc#fragment;ext=hello').all()
    ).toEqual({
      schema: 'scheme',
      username: undefined,
      password: undefined,
      host: 'host',
      port: 'port',
      path: 'path',
      query: {
        name: 'hustcc'
      },
      fragment: 'fragment',
      extension: {
        ext: 'hello'
      }
    });

    expect(
      function() {
        new URI('scheme://username@host:port/path?name=hustcc#fragment;ext=hello').all()
      }
    ).toThrow('username and password must be paired.');
  });

  it(' - optional port', function() {
    expect(
      new URI('scheme://username:password@host').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: undefined,
      path: undefined,
      query: undefined,
      fragment: undefined,
      extension: undefined
    });

    expect(
      new URI('scheme://username:password@host:').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: '',
      path: undefined,
      query: undefined,
      fragment: undefined,
      extension: undefined
    });
  });

  it(' - optional path', function() {
    expect(
      new URI('scheme://username:password@host:port/').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: '',
      query: undefined,
      fragment: undefined,
      extension: undefined
    });

    expect(
      new URI('scheme://username:password@host:port').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: undefined,
      query: undefined,
      fragment: undefined,
      extension: undefined
    });
  });

  it(' - optional query', function() {
    expect(
      new URI('scheme://username:password@host:port/path').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: undefined,
      fragment: undefined,
      extension: undefined
    });

    expect(
      new URI('scheme://username:password@host:port/path?').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: {},
      fragment: undefined,
      extension: undefined
    });
  });

  it(' - optional fragment', function() {
    expect(
      new URI('scheme://username:password@host:port/path?name=hustcc').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: {
        name: 'hustcc'
      },
      fragment: undefined,
      extension: undefined
    });

    expect(
      new URI('scheme://username:password@host:port/path?name=hustcc#').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: {
        name: 'hustcc'
      },
      fragment: '',
      extension: undefined
    });
  });

  it(' - optional extension', function() {
    expect(
      new URI('scheme://username:password@host:port/path?name=hustcc#fragment').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: {
        name: 'hustcc'
      },
      fragment: 'fragment',
      extension: undefined
    });

    expect(
      new URI('scheme://username:password@host:port/path?name=hustcc#fragment;test').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: 'path',
      query: {
        name: 'hustcc'
      },
      fragment: 'fragment',
      extension: {
        test: undefined
      }
    });
  });

  it(' - others', function() {
    expect(
      new URI('scheme://username:password@host:port/#fragment').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: '',
      query: undefined,
      fragment: 'fragment',
      extension: undefined
    });

    expect(
      new URI('scheme://username:password@host:port#fragment').all()
    ).toEqual({
      schema: 'scheme',
      username: 'username',
      password: 'password',
      host: 'host',
      port: 'port',
      path: undefined,
      query: undefined,
      fragment: 'fragment',
      extension: undefined
    });

    expect(
      new URI('scheme://[host]?name=hustcc;ext=hello').all()
    ).toEqual({
      schema: 'scheme',
      username: undefined,
      password: undefined,
      host: '[host]',
      port: undefined,
      path: undefined,
      query: {
        name: 'hustcc'
      },
      fragment: undefined,
      extension: {
        ext: 'hello'
      }
    });
  });
});
