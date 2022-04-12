let socket = io();
let submit = false;
let leavesObj = [];
let nameData;
let n = 0;
let roomNames = ["buggs Bunny",
    "central Park",
    "carrot",
    "trees"
];
let create0_join1 = 0;

window.addEventListener('load', () => {
    // buttons
    document.getElementById('joinn').addEventListener('click', () => {
        if (leavesObj.length > 0) {
            document.getElementById("join_form_div").style.display = "none";
            document.getElementById("main_form_div").style.display = "block";
            create0_join1 = 1;
        } else {
            document.getElementById("join_form_div").style.display = "none";
            document.getElementById("joinerror").style.display = "block";
            document.getElementById("main_form_div").style.display = "block";
            document.getElementById("room").style.display = "block";
            create0_join1 = 0;
        }

    })
    document.getElementById('create').addEventListener('click', () => {
        document.getElementById("join_form_div").style.display = "none";
        document.getElementById("main_form_div").style.display = "block";
        document.getElementById("room").style.display = "block";
        create0_join1 = 0;
    })




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
        if (create0_join1) {
            username = document.getElementById('username').value;
            sessionStorage.setItem('player', "2");
            sessionStorage.setItem('name', username);

            document.getElementById('main_instructions').style.display = "block";
            // write click on room leaf to join
        } else {
            username = document.getElementById('username').value;
            room = document.getElementById('room').value;
            let hideData = {
                room: room
            }
            socket.emit('hideRoom', hideData);
            sessionStorage.setItem('name', username);
            sessionStorage.setItem('room', room);
            sessionStorage.setItem('player', "1");
            nameData = {
                name: username,
                room: room,
                x: Math.random() * (window.innerWidth - 50) + 50,
                n: (leavesObj.length) % 4,
                speedx: Math.random(-0.5, 0.5)
            }
            socket.emit('newLeaf', nameData);
        }

        document.getElementById("join_form_div").style.display = "none";
        document.getElementById("main_form_div").style.display = "none";
        submit = true;
    })
})


socket.on('connect', () => {
    console.log('client connected via sockets');
})

socket.on('prevLeaves', (data) => {
    for (let i = 0; i < data.leaves.length; i++) {
        leavesObj.push(new FallingObj(data.leaves[i].name, data.leaves[i].room, data.leaves[i].x, data.leaves[i].n, data.leaves[i].speedx));
    }
    let rooms = document.getElementsByClassName('options');
    let select = document.getElementById('room');
    for (let i = 0; i < rooms.length; i++) {
        console.log(data.rooms[rooms[i].value], rooms[i].value);
        if (data.rooms[rooms[i].value]) {
            console.log("remove room: ", i);
            select.remove(i + 1);
        }
    }
})

socket.on('leafSuccess', () => {
    window.location = './pacman.html';
})


socket.on('newLeaf', (data) => {

    leavesObj.push(new FallingObj(data.name, data.room, data.x, data.n, data.speedx, ++data.player));
})

socket.on('hideRoom', (data) => {
    let select = document.getElementById('room');
    select.remove(data.c + 1);
})