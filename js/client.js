const socket = io();
const form = document.getElementById('sendContainer');
const messagInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('alert.mp3')
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

const name = prompt("Enter your name to join:");
socket.emit('new-user-joined', user);
socket.on('user-joined', name =>{
    append(`${name} joined the chat!`, 'right')
});
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});
socket.on('left', name => {
    append(`${name} left the chat!`, 'right')
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = message.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})