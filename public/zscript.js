let socket = io();
let submit = false;
let leavesObj = [];
let openedRooms = [];
let nameData;
let n = 0;

window.addEventListener('load', () => {
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
            width: random(50, window.innerWidth - 50),
            n: (leavesObj.length) % 4,
            speedx: Math.random(-0.5, 0.5)
        }
        item = document.getElementById('room');
        socket.emit('hideRoom', item.selectedIndex);

        console.log(nameData.speedx);
        console.log(n);
        sessionStorage.setItem('name', username);
        sessionStorage.setItem('room', room);
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('room'));
        // sessionStorage.
        // nameForm.reset();
        document.getElementById('main_title').style.marginBottom = "15vh";
        formDiv.style.display = "none";
        submit = true;
        socket.emit('newLeaf', nameData);

    })
})

socket.on('connect', () => {
    console.log("client connected via sockets");

})
socket.on('prevLeaves', (data) => {
    for (let i = 0; i < data.length; i++) {
        leavesObj.push(new FallingObj(data[i].name, data[i].room, data[i].x, data[i].n, data[i].speedx));
    }
})

socket.on('newLeaf', (data) => {
    leavesObj.push(new FallingObj(data.name, data.room, data.x, data.n, data.speedx));
})

socket.on('hideRoom', (c) => {
    let select = document.getElementById('room');
    select.remove(c);
})