const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');
// dotenv.config();

class passwordService {
    constructor() {
        //The salt is to use for hashing the password
        this.salt = 8;
    }
    //password hashing method
    async hashing(password) {

        const hashedPassword = await bcrypt.hash(password, this.salt);
        return hashedPassword;
    }
     async compare(plain,hashedPassword){
    return  await bcrypt.compare(plain,hashedPassword);
    }
}

//exporting the password class
module.exports = passwordService;