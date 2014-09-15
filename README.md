node-lang-info
==============

Node.js module to retrieve current user's language

Installation
------------

To install **node-lang-info** as a module into your project, type the following command.

    npm install node-lang-info --save

Usage
-----

Here is an example of how to use **node-lang-info** in your module

```javascript
var lang_info = require('node-lang-info');

lang_info(function(err, lang) {
  if(err) {
    console.error(JSON.stringify(err, null, 2));
  }
  else {
    console.log('Current Locale: ' + lang);
  }
});
```

Requirements
------------

* [Node.js](http://nodejs.org/)
* OS X, Linux, Windows
