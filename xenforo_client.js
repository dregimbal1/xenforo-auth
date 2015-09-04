/*
*	David Regimbal (c) 2015
*   Login to XenForo with XenAPI
*/
(function () {
  Meteor.loginWithXenforo = function (options, callback) {

    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }
	
    var loginCallback = function (error) {
      if (error) {
		toastr.error('Incorrect username or password', 'Uh-oh!');
      }else{
      	toastr.success('Welcome back!');
      }
	  
    };

    Accounts.callLoginMethod({
      methodName: 'login',
      methodArguments: [{xenforo: true,username: options.username,password: options.password}],
      userCallback: loginCallback
    });

  };
})();