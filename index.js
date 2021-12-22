const PORT = 4003

const express = require('express')
var app = express()
const http = require('http')
var server = http.createServer(app)
const { Server } = require('socket.io')
var io = new Server(server)

const fs = require('fs')
const storage = require('./chat-data.json')

// Configurando arquivos estáticos
    app.use(express.static('public'))
// Parse URL-encoded bodies (as sent by HTML forms)
    app.use(express.urlencoded())


app.get('/', (req, res) => {
    res.render(__dirname + '/index.html')
})

app.post('/username', (req, res) => {
    let data = storage
    let nome = req.body.nome
    if(data.usuarios.indexOf(nome) === -1){
        data.usuarios[data.usuarios.length] = nome
    }
    
    console.log(data)
    
    fs.writeFile(
        __dirname + '/chat-data.json', //caminho
        JSON.stringify(data), //dados
        err => {if(err) throw err;res.redirect('/')} //callback
    )
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
})

server.listen(PORT, console.log('The server is running in port ', PORT))

/*

ANOTACOES

- nome no chat
- nomes unicos
- sala unica
- sem historico
- front sem framework

*/

/*

DEPENDENCIAS

express --save
socket.io --save

*/