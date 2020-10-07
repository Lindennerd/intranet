const usersRepository = require('../repository/user.repository');
const md5 = require('md5');

function UsersDomain() {

    async function listUsers() {
        return await usersRepository
            .getAll()
            .map(function(user) {
                delete user.password;
                return user;
            });
    }

    async function addUser(user) {
        user.password = md5(user.password);
        return await usersRepository.create(user);
    }

    async function deleteUser(id) {
        return await usersRepository.delete(id);
    }

    async function changeAdmin(id) {
        const user = await usersRepository.getById(id);
        user.isAdmin = !user.isAdmin;
        return user.save();
    }

    async function getById(id) {
        return await usersRepository.getById(id);
    }

    return { listUsers, addUser, deleteUser, changeAdmin, getById }
}

module.exports = UsersDomain();