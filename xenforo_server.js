/*
*	David Regimbal (c) 2015
*   Login to XenForo with XenAPI
*/
(function () {

  Meteor.startup(function () {
    var config = Accounts.loginServiceConfiguration.findOne({service: 'xenforo'});
    if (!config) {
	  // Swap clientId with your API key
      Accounts.loginServiceConfiguration.insert({ service: 'xenforo', clientId: 'daef43yDFSgettg5m38g024ghfrprpsaf5r23GBRffrwefrgh344gfarg9a', loginStyle: 'redirect'});
    }	
  });

  Accounts.registerLoginHandler(function (options) {
	  
	var Future = Npm.require('fibers/future');

	if (!options.xenforo && !options.username && !options.password){
		return undefined; // don't handle
	}
    
	// Swap out URL for yout distro
    var url = 'https://halocustoms.com/api.php?action=authenticate&username=' + options.username + '&password=' + options.password;
    var request = new Future();
	
	
    HTTP.get(url, function(err,res) {
		
    	if(res){
			
			data = JSON.parse(res.content);
			
    		if(data.error === 5){
				request.throw('Invalid username or password');
    		}else{

				var hash = data.hash;
				
				url2 = 'https://halocustoms.com/api.php?action=getUser&hash=' + options.username + ':' + hash;
				
				HTTP.get(url2, function(err2,res2){
					
					data2 = JSON.parse(res2.content);
					
				    var stampedToken = Accounts._generateStampedLoginToken();
				    var hashStampedToken = Accounts._hashStampedToken(stampedToken);
				    Meteor.users.update(data2.user_id, 
				      {$push: {'services.resume.loginTokens': hashStampedToken}}
				    );
					
					serviceData = {
						id: data2.user_id,
						token: stampedToken.token,
						username: data2.username,
						email: data2.email,
						timezone: data2.timezone,
						friend_count: data2.friend_count,
						visable: data2.visable,
						is_banned: data2.is_banned
					};
					
					Accounts.updateOrCreateUserFromExternalService('xenforo',serviceData);

					var mrt_user = Meteor.users.findOne({"services.xenforo.username":data2.username});

					request.return({userId:mrt_user._id,token:stampedToken.token});

				});
    		}	
    	}else{
			request.throw(2);//Xenforo could not be reached
    	}
    });
	
    try {
		var xen = request.wait();
		if(xen){
			return {userId:xen.userId,token:xen.token};
		}
    }
    catch(err) {
        throw new Meteor.Error("xen-error", 'Your username or password is incorrect!');
    }
  });
})();