class Users {

    constructor() {
        this.users = [];
    }

    AddUserData(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    GetUsersList(room) {
        let users = this.users.filter((user) => user.room === room);

       return  users.map((user) => user.name);

      //  let namesArray =
      //  return namesArray;
    }

}

module.exports = {Users};