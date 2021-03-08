var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream('time-block.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

archive.append(fs.createReadStream(
    __dirname + '/time-block.php'
), { name: 'time-block.php' });

archive.directory('build', '/build');

archive.finalize();