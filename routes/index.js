
let login = require('./login')
module.exports = function(app){
    app.use('/app',login);
}