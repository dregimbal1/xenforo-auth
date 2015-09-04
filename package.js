/*
*	David Regimbal (c) 2015
*   Login to XenForo with XenAPI
*/
Package.describe({
  name: 'regimbal:xenforo-auth',
  version: '0.0.1',
  summary: 'Login with Xenforo.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
    api.use('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('http', ['server']);

	api.addFiles('xenforo_common.js',['client', 'server']);
	api.addFiles('xenforo_client.js','client');
	api.addFiles('xenforo_server.js','server');


});