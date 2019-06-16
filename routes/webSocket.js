
var WebSocket = require('ws');

module.exports = function (server) {
    //添加wss服务
    const wss = new WebSocket.Server({ server });
    //监听连接
    wss.on('connection', function connection(ws) {
        var result = {
            type: 'init',
            data: {
                msg: 'msg'
            }
        }
        ws.send(JSON.stringify(result))
        ws.on('open', function open() {
            ws.send('something');
        });
        ws.on('message', function incoming(data) {
            data = JSON.parse(data)
            if (result.type == 'init') {
                console.log(data.type)
            }
        });
    });
    //自定义wss服务器端口
    // const wss = new WebSocket.Server({
    //   port: 5052,
    //   perMessageDeflate: {
    //     zlibDeflateOptions: {
    //       // See zlib defaults.
    //       chunkSize: 1024,
    //       memLevel: 7,
    //       level: 3
    //     },
    //     zlibInflateOptions: {
    //       chunkSize: 10 * 1024
    //     },
    //     // Other options settable:
    //     clientNoContextTakeover: true, // Defaults to negotiated value.
    //     serverNoContextTakeover: true, // Defaults to negotiated value.
    //     serverMaxWindowBits: 10, // Defaults to negotiated value.
    //     // Below options specified as default values.
    //     concurrencyLimit: 10, // Limits zlib concurrency for perf.
    //     threshold: 1024 // Size (in bytes) below which messages
    //     // should not be compressed.
    //   }
    // });
}
