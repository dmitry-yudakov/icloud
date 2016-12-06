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

## for creating events

```javascript
var icloud = require('./index'),
    uuid = require('node-uuid'),
    moment = require('moment');

var instance = icloud();

var event = {
    Event: {
        pGuid: 'home',
        title: 'New Event',
        startDate: instance.generateDate( moment().startOf('hour').toDate()),
        endDate: instance.generateDate( moment().add(1,'hour').startOf('hour').toDate()),
        allDay: false,
        guid: uuid.v1().toUpperCase() // in case of existing event use its guid
    }
}
instance.login("username", "password", function(err) {
    if (err) return console.log('login failed');
    instance.calendarSaveEvent(event, function (err, results) {
        if (err) return console.log('failed to create new event:', err);
        console.log(JSON.stringify(results, null, '\t'));
    })
})
```

For saving existing event it's the same function, just use the event structure received from calendar() function with existing `guid` and the rest of the parameters.

## for deleting events

```javascript
var icloud = require('./index');

var instance = icloud();

var event = {
    Event: {
        guid: 'D1181CD0-7946-43E7-BEEB-262E1DB5A6D5',
        pGuid: 'home'
    }
}

instance.login("username", "password", function(err) {
    if (err) return console.log('login failed');
    instance.calendarDeleteEvent( event, function(err) {
        if (err) return console.log('failed to delete event', err);
        console.log('event deleted');
    });
})
```

## credits

The implementation is heavily inspired by [pycloud](https://github.com/picklepete/pyicloud/)