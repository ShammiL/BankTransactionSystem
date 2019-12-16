const bcrypt = require('bcryptjs')


async function hashPassword(password) {
    const salt = await bcrypt.gerSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    return hashpassword;
}

async function checkhash(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}


module.exports.hashPassword = hashPassword;
module.exports.checkhash = checkhash;