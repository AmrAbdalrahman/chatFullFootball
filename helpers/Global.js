class Global {

    constructor() {
        this.globalRoom = [];
    }

    EnterRoom(id, name, room, img) {
        let roomName = {id, name, room, img};
        this.globalRoom.push(roomName);
        return roomName;
    }

    GetRoomList(room) {
        let roomName = this.globalRoom.filter((user) => user.room === room);

        let namesArray = users.map((user) => {
            return {
                name: user.name,
                img: user.img
            };
        });

        return namesArray;
    }

}

module.exports = {Global};