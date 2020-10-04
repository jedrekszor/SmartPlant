function exportToPythonInt(toExport){
 
    if (!isNaN(toExport) && typeof(toExport) == 'number') {
        
        var spawn = require("child_process").spawn;

        var childProcess = require("child_process").spawn('python', [__dirname + '/pot.py', toExport], { stdio: "inherit" })
        
        childProcess.on('data', function (data) {
            process.stdout.write("python script output", data);
        });

        childProcess.on('close', function (code) {
            
            if (code === 1) {
                process.stderr.write("error occured", code);
                process.exit(1);
            }
            else {
                process.stdout.write('"python script exist with code: ' + code + '\n');
            }
        });
        return true;
    }

    else {
        console.log('Wrong humidity value. Parsed value: ' + toExport);
        return false;
    }
}

module.exports.exportToPythonInt = exportToPythonInt;
