const port = process.env.PORT;
const logger = require('./logger/logger');
const app = require('./app.js');


app.listen(port, ()=>{
    logger.info('Server is up on port '+port);
});







