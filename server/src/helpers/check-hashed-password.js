const bcrypt = require('bcrypt');

module.exports = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);
