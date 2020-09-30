const {LogModel} = require('../../database');

class LogService {
    createLog(log) {
        const logToCreate = new LogModel(log);

        return logToCreate.save();
    }
}

module.exports = new LogService();
