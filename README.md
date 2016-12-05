icloud
======

Access the iCloud API.

There's no OAuth or something alike to access Apple user's calendar, contacts, etc. 
The only way seems to be establishing session with iCloud credentials over https.  

# usage 

## for contact fetching
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

## for event fetching

This fetches current month's events by default

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

Little more complex example allowing fetching events in different date range.

```javascript
var icloud = require('icloud'),
    moment = require('moment');

var instance = icloud();
var options = { // 3 months range
    fromDate: moment().subtract(1,'month').startOf('month'),
    toDate: moment().add(1,'month').endOf('month')
}

instance.login("username", "password", function(err) {
    if (err) return console.log('login failed');
    instance.calendar(options, function(err, results) {
        if (err) return console.log('failed to fetch events');
        console.log(results);
    });
});
```

## credits

The implementation is heavily inspired by [pycloud](https://github.com/picklepete/pyicloud/)