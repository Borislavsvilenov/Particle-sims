const socket = io('ws://localhost:8080')

socket.on('return', newList => {

    console.log(newList);

});