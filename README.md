# Meteor Xenforo Login Provider

I have built a login provider for Meteor applications that can use the [XenAPI for Xenforo](https://github.com/Contex/XenAPI) by Contex. It is nothing special but will hopefully help people in the future who want to achieve something similar.

1) Upload 'xenforo-auth' to packages folder inside your project directory

2) run the following:
```sh
meteor add regimbal:xenforo-auth
```

3) Add to your client/login.js file
```
Meteor.loginWithXenforo({username: username, password: password});
```

License
----
MIT


- [XenAPI for Xenforo](https://github.com/Contex/XenAPI)