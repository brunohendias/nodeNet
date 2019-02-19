const net = require('net');

const client = net.connect(3000);//connecta na porta 3000

	client.on('connect', ()=>{//quando conectado
		client.write('I am the client');//envie a mensagem
	});

	client.on('data', (message)=>{//mensagem recebida
		console.log(message.toString());//emprime a mensagem
	});

	client.on('end', ()=>{
		process.exit();
	});

	process.stdin.on('readable', ()=>{//le oque foi escrito
		var message = process.stdin.read();//mensagem digitada
		if(!message) return;//se não tiver mensagem retorne vasio
		message = message.toString().replace(/\n/, '');
		client.write(message);//emprime a mensagem
	});
