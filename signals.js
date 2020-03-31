const process = require('process');

function ExitSignal(process){
    process.on('beforeExit', (code) => {
        console.log('Process beforeExit event with code: ', code);
    });
    
    process.on('exit', (code) => {
        console.log('Process exit event with code: ', code);
    });
    
    console.log('This message is displayed first.');
}

function SigintSignal(process){

   process.on('SIGHUP', function() {
       console.log('Got a SIGHUP');
   });
   setInterval(function(){
       console.log('Running');
   },10000);
   console.log('PID: ',process.pid);
}

function Architecture(process){
    console.log(`This processor architecture is ${process.arch}`);
}

function KillProcess(){
    process.kill(18770,'SIGHUP');
}

SigintSignal(process);