icloud
======

Access the iCloud API

### usage 

###for contact fetching
```javascript
var icloud = require('icloud');

var instance = icloud();
instance.login("username", "password", function(err) {
    if (err) return console.log('login failed');
    instance.contacts(function(err, results) {
        if (err) return console.log('failed to fetch contacts');
        console.log(results.contacts);
    });
});
```

###for event fetching
```javascript
var icloud = require('icloud');

var instance = icloud();
instance.login("username", "password", function(err) {
    if (err) return console.log('login failed');
    instance.calendar(function(err, results) {
        if (err) return console.log('failed to fetch events');
        console.log(results);
    });
});
```


### credits

The implementation is heavily inspired by [pycloud](https://github.com/picklepete/pyicloud/)