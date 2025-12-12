// import express from 'express';
// import http from 'http'
// import { Server } from 'socket.io';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   }
// });

// const socketConnection=()=>{
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('send-notification', (data) => {
//     io.emit('receive-notification', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// }

// export default socketConnection;