let socket = io();
let submit = false;

socket.on('connect', () => {
    console.log("client connected via sockets");

})

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
        room = document.getElementById('quote').value;
        nameloc = (Math.random() * (window.innerWidth - 50)).toFixed(2);
        console.log(nameloc);
        nameData = {
            name: username,
            nameloc: nameloc,
            n: Math.floor(Math.random() * 4 + 1)
        }
        qouteloc = {
            x: (Math.random() * window.innerWidth).toFixed(2) - 20,
            y: (Math.random() * window.innerHeight).toFixed(2)
        }
        locData = {
            quote: quote,
            quoteloc: qouteloc
        }

        sessionStorage.setItem('name', username);
        // sessionStorage.setItem('room', quote);

        // nameForm.reset();
        document.getElementById('main_title').style.marginBottom = "15vh";
        formDiv.style.display = "none";
        submit = true;

        socket.emit('newLeaf', nameData);
        for (let i = 0; i < leavesObj.length; i++) {
            leavesObj[i].display();
        }
    })
})