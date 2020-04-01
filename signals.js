const process = require('process');

function SighupSignal(process){

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
    process.kill(3833,'SIGHUP');
}

KillProcess(process);