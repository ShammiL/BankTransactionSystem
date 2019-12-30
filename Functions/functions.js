const bcrypt = require('bcryptjs')


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    return hashpassword;
}

async function checkhash(password, hash) {
    
    const match = await bcrypt.compare(password, hash);
    console.log("hash", match)
    return match;
}


module.exports.hashPassword = hashPassword;
module.exports.checkhash = checkhash;