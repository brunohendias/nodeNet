const net = require('net');

var connections = [];//armazena todas as conexões

var broadcast = (message, origin)=>{
	connections.forEach((connection)=>{//pega todas as conexões
		if(connection === origin) return;//verifica quem mandou a mensagem
		connection.write(message);//envia a mensagem para todas as conexões
	});
};

net.createServer((connection)=>{//cria servidor
	connections.push(connection);//guarda a conexão

	connection.write('I am the server');

	connection.on('data', (message)=>{//mensagem recebida
		var command = message.toString();
		if(command.indexOf('/nickname ') === 0){
			var nickname = command.replace('/nickname ', '');
			broadcast(connection.nickname + ' is now ' + nickname);
			connection.nickname = nickname;
			return;
		}
		broadcast(connection.nickname + ' > ' + message, connection);//emprime a msg e recebe a connection
	});

	connection.on('end', ()=>{
		broadcast(connection.nickname + ' has left ' + connection);
		connections.splice(connections.indexOf(connection), 1);
	});

}).listen(3000);