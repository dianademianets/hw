const path = require('path');
const {promisify} = require('util');
const fs = require('fs');

const db = path.join(process.cwd(), 'dataBase', 'users.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    getAllUsers: async () => {
        const data = await readFile(db);
        return JSON.parse(data.toString());
    },
    getUserByEmail: async (email) => {
        const data = await readFile(db);
        const DB = JSON.parse(data.toString());
        return DB.find((user) => user.email === email);
    },

    createUser: async (userObject) => {
        const data = await readFile(db);
        const DB = JSON.parse(data.toString());
        DB.push(userObject);
        await writeFile(db, JSON.stringify(DB));
    },
    deleteUser: async (userId) => {
        const data = await readFile(db);
        const DB = JSON.parse(data.toString());
        return DB.splice(userId, 1);
        await writeFile(db, JSON.stringify(DB));
    }
}
// //В цьому способі взагалі не впевнена
// const DB = require('../dataBase/users.json');
//
// module.exports = {
//     getAllUsers: () => {
//         return DB;
//     },
//     getUserByEmail: (email) =>
//         DB.filter((user) => user.email !== email),
//
//     createUser: (userObject) => {
//         DB.push(userObject);
//     },
//     deleteUser: (userId) => {
//         DB.splice(userId, 1);
//     }
// }
