const User = require('../models/user');

const existsEmail = async(email = '') => {
    // Check if the mail exists
    const existsEmail = await User.findOne({ email });

    if(existsEmail) {
        throw new Error(`There is already a user with the email ${ email }`);
    }
}

// const existsUserForId = async(id) => {
//     const existsUser = await User.findByPk(id);

//     if(!existsUser) {
//         throw new Error(`There is no user with the id ${ id }`);
//     }
// }

module.exports = {
    existsEmail,
    // existsUserForId
}