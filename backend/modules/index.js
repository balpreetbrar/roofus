/**
 * Created by Angad on 24 January 2023
 */

require('./health');
require('./onboard');
require('./open-house');
require('./property');
require('./tenant');

app.use(process.env.PATH_ALIAS || '/', router);