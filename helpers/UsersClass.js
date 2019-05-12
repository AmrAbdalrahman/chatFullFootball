class Users {

    constructor() {
        this.users = [];
    }

    AddUserData(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    RemoveUser(id) {
        let user = this.GetUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    GetUser(id) {
        let getUser = this.users.filter((userId) => {
            return userId.id === id;
        })[0];
        return getUser;
    }

    GetUsersList(room) {
        let users = this.users.filter((user) => user.room === room);

        let namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }

}

module.exports = {Users};