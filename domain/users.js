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

    async function changeProfilePicture(file, id) {
        //const base64Image = getImageBase64(file);
        const contentType = getImageContentType(file);
        const user = await usersRepository.getById(id);

        user.profile["profile-image"] = {
            data: file.data,
            contentType: contentType
        };
        
        user.save();
    }

    async function changeBackgroundPicture(file, id) {
        //const base64Image = getImageBase64(file);
        const contentType = getImageContentType(file);
        const user = await usersRepository.getById(id);

        user.profile.background = {
            data: file.data,
            contentType: contentType
        };

        user.save();
    }

    async function getById(id) {
        return await usersRepository.getById(id);
    }

    async function updateInformation(information, id) {
        const user = await usersRepository.getById(id);
        user.name = information.name !== "" && user.name !== information.name
            ? information.name : user.name;

        user.email = information.email !== "" && user.email !== information.email
            ? information.email : user.email;

        user.password = information.password !== "" && md5(information.password) !== user.password
            ? md5(information.password) : user.password;

        user.save();
    }

    function getImageContentType(file) {
        const re = /(?:\.([^.]+))?$/;
        const extension = re.exec(file.name)[1];
        return `image/${extension}`;    
    }

    return { 
        listUsers, 
        addUser, 
        deleteUser, 
        changeAdmin, 
        getById, 
        changeBackgroundPicture, 
        changeProfilePicture, 
        updateInformation 
    }
}

module.exports = UsersDomain();