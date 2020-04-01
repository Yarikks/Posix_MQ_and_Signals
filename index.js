const PosixMQ = require('posix-mq');
const PosixMQ1 = require('./node_modules/posix-mq/lib/index');
const mq = new PosixMQ();
const mq1 = new PosixMQ1();

function CreateInsertMQ(mq){
    mq.open({
        name: '/pmqtest',
        create: true,
        mode: '0777',
        maxmsgs: 10,
        msgsize: 8
    });
    var writebuf = Buffer.alloc(1);
    var r;
    do {
        writebuf[0] = Math.floor(Math.random() * 93) + 33;
        console.log("Writing "+ writebuf[0] +" ('"+ String.fromCharCode(writebuf[0]) +"') to the queue...");
    } while ((r = mq.push(writebuf)) !== false);
    mq.close(); 
}

function OpenRemoveMQ(mq){
    mq.on('messages', function() {
        var n;
        while ((n = this.shift(readbuf)) !== false) {
            console.log("Received message ("+ n +" bytes): "+ readbuf.toString('utf8', 0, n));
            console.log("Messages left: "+ this.curmsgs);
        }
        this.unlink();
        this.close();
    });
    mq.open({name: '/pmqtest'});
    readbuf = Buffer.alloc(mq.msgsize);
}


function OpenListenMQ(mq1){
    mq1.open({name: '/pmqtest'});
    readbuf = Buffer.alloc(mq.msgsize);
    
    handleMsg = () => {
        let n;
        while ((n = mq1.shift(readbuf)) !== false) {
            let msg = readbuf.toString('utf8', 0, n);
            console.log("Received message("+ n +" bytes): " + msg);
            console.log("Messages left: "+ mq1.curmsgs);
        }
    };
    
    handleMsg(); 
    mq1.on('messages', handleMsg);
}


OpenListenMQ(mq);