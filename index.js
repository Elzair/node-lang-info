var os    = require('os')
  , spawn = require('child_process').spawn
  , s     = require('string')
  ;

module.exports = function(cb) {
  if (typeof cb !== 'function') {
    cb('Invalid callback Function!', null);
  }

  var info = '', lang_part = '', lang = '';
  if (os.platform() === 'win32') {
    var sysinfo = spawn('systeminfo');

    sysinfo.stderr.on('err', function(err) {
      cb(err, null);
    });

    sysinfo.stdout.on('data', function(data) {
      info += data;
    });

    sysinfo.on('close', function() {
      // Process systeminfo output
      var lines = s(info).lines();
      for (var i=0; i<lines.length; i++) {
        var line = s(lines[i].split(':'));
        if (line[0] === 'System Locale') {
          var lang_part = line[1].trim().split(';')[0].split('-');
          lang = lang_part[0] + '_' + lang_part[1].toUpperCase();
        }
      }
      cb(null, lang);
    });
  }
  else {
    lang_part = process.env.LANG;
    if (!lang_part) {
      cb('No language specified!', null);
    }
    else {
      lang = lang_part.substring(0, lang_part.indexOf('.'));
      cb(null, lang);
    }
  }
};
