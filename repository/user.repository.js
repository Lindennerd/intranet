const generic = require('./generic.repository');
const userModel = require('./models/user.model');

const userRepository = generic(userModel);

module.exports = userRepository;