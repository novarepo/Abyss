import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const httpServer = http.createServer();
const expressServer = express();
const __dirname = path.resolve();

expressServer.use(cookieParser());

expressServer.get('/', (req, res) => {
        if (req.cookies['Cloak'] === 'Khan Academy') {
            res.sendFile(path.join(__dirname + '/mislead/', 'khan.html'));
        } else if (req.cookies['Cloak'] === 'Quizlet') {
            res.sendFile(path.join(__dirname + '/mislead/', 'quizlet.html'));
        } else if (req.cookies['Cloak'] === 'IXL') {
            res.sendFile(path.join(__dirname + '/mislead/', 'ixl.html'));
        } else if (req.cookies['Cloak'] === 'Quizizz') {
            res.sendFile(path.join(__dirname + '/mislead/', 'quizizz.html'));
        } else if (req.cookies['Cloak'] === 'Clever') {
            res.sendFile(path.join(__dirname + '/mislead/', 'clever.html'));
        } else if (req.cookies['Cloak'] === 'Blooket') {
            res.sendFile(path.join(__dirname + '/mislead/', 'blooket.html'));
        } else if (req.cookies['Cloak'] === 'Edpuzzle') {
            res.sendFile(path.join(__dirname + '/mislead/', 'edpuzzle.html'));
        } else {
            res.sendFile(path.join(__dirname + '/mislead/', 'khan.html'));
        } 
	}
);

expressServer.get('/util.js', function(req, res) {
    res.sendFile(__dirname + "/mislead/" + "util.js");
});
expressServer.get('/uv/uv.config.js', function(req, res) {
    res.sendFile(__dirname + "/mislead/uv/" + "uv.config.js");
});

expressServer.get('/uv/uv.bundle.js', function(req, res) {
    res.sendFile(__dirname + "/mislead/uv/" + "uv.bundle.js");
});
expressServer.get('/uv/uv.handler.js', function(req, res) {
    res.sendFile(__dirname + "/mislead/uv/" + "uv.handler.js");
});

expressServer.get('/uv/uv.sw.js', function(req, res) {
    res.sendFile(__dirname + "/mislead/uv/" + "uv.sw.js");
});



expressServer.get("/sw.js", function(req, res) {
    res.sendFile(__dirname + "/mislead/" + "sw.js");
});




const bareServer = createBareServer('/bear/', {
	maintainer: {
		email: 'webmaster@goastral.net',
		website: 'https://github.com/astralservice',
	},
});

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		expressServer(req, res);
	}
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
	console.log('Abyss listening on port 1234');
});

httpServer.listen({
	port: 1234,
});
