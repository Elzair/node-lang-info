var os    = require('os')
  , spawn = require('child_process').spawn
  , s     = require('string')
  ;

module.exports = function(cb) {
  if (typeof cb !== 'function') {
    cb('Invalid callback Function!', null);
  }

  var info = '', lang_part = '', lang = '', sysinfo = '',
      lines = '', line = '';

  if (os.platform() === 'win32') {
    sysinfo = spawn('systeminfo');

    sysinfo.stderr.on('err', function(err) {
      cb(err, null);
    });

    sysinfo.stdout.on('data', function(data) {
      info += data;
    });

    sysinfo.on('close', function() {
      // Process systeminfo output
      lines = s(info).lines();
      
      for (var i=0; i<lines.length; i++) {
        line = lines[i].split(':');
        
        if (line[0] === 'System Locale') {
          lang_part = line[1].trim().split(';')[0].split('-');
          lang = lang_part.length === 2 ? lang_part[0] + '_' + lang_part[1].toUpperCase() : lang_part[0];
        }
      }

      cb(null, lang);
    });
  }
  else {
    sysinfo = spawn('locale');

    sysinfo.stderr.on('err', function(err) {
      cb(err, null);
    });

    sysinfo.stdout.on('data', function(data) {
      info += data;
    });

    sysinfo.on('close', function () {
      lines = s(info).lines();

      for (var i=0; i<lines.length; i++) {

        line = lines[i].split('=');

        if (line[0] === 'LANG') {
          lang = line[1].replace(/"/, '').replace(/\.\S+/, '');
        }
      }

      cb(null, lang);
    });
  }
};
