var express = require('express');
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const path = require('path');

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});


app.use(cors());


app.set('view engine', 'ejs')

const { auth } = require('express-openid-connect');
require('dotenv').config()


const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: process.env.BASEURL,
	clientID: process.env.CLIENTID,
	issuerBaseURL: process.env.ISSUER,
};

app.use(auth(config));


app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	console.log(req.oidc.isAuthenticated());
	res.render("loginform", {
		isAuthenticated: req.oidc.isAuthenticated(),
		user: req.oidc.user,
	});
	
});
  

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });    
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));