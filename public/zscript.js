let socket = io();
let submit = false;
let leavesObj = [];
let openedRooms = [];
let nameData;
let n = 0;
let roomNames = ["buggs Bunny",
    "central Park",
    "carrot",
    "trees"
];

function changeRoomNames() {
    let rooms = document.getElementsByClassName('options');
    for (let i = 0; i < rooms.length; i++) {
        let n = i % roomNames.length;
        rooms[i].innerHTML = i + " " + roomNames[n];
        // room value is related to n
    }
}

window.addEventListener('load', () => {
    changeRoomNames();
    let nameForm = document.getElementById('main_form');
    let formDiv = document.getElementById('main_form_div');
    let username;
    let room;
    if (submit) {
        formDiv.style.display = "none";
    }
    nameForm.addEventListener('submit', (e) => {
        socket.emit('load');
        e.preventDefault();
        username = document.getElementById('username').value;
        room = document.getElementById('room').value;
        nameloc = (Math.random() * (window.innerWidth - 50)).toFixed(2);
        console.log(nameloc);
        nameData = {
            name: username,
            room: room,
            width: Math.random() * (window.innerWidth - 50) + 50,
            n: (leavesObj.length) % 4,
            speedx: Math.random(-0.5, 0.5)
        }
        item = document.getElementById('room');
        let hideData = {
            c: item.selectedIndex,
        }
        socket.emit('hideRoom', hideData);


        console.log(nameData.speedx);
        console.log(n);
        sessionStorage.setItem('name', username);
        sessionStorage.setItem('room', room);
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('room'));
        // sessionStorage.
        // nameForm.reset();
        document.getElementById('main_instructions').style.marginBottom = "15vh";
        formDiv.style.display = "none";
        submit = true;
        if (room != '') {
            socket.emit('newLeaf', nameData);
            window.location = './pacman.html';
        }
    })
})


socket.on('prevLeaves', (data) => {
    for (let i = 0; i < data.leaves.length; i++) {
        leavesObj.push(new FallingObj(data.leaves[i].name, data.leaves[i].room, data.leaves[i].x, data.leaves[i].n, data.leaves[i].speedx));
    }
})

socket.on('connect', () => {
    console.log("client connected via sockets");

})


socket.on('newLeaf', (data) => {
    leavesObj.push(new FallingObj(data.name, data.room, data.x, data.n, data.speedx));
})

socket.on('hideRoom', (data) => {
    let select = document.getElementById('room');
    select.remove(data.c);
})