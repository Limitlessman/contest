import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';
import bodyParser from 'body-parser'
import express from 'express';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
	src: path.join(__dirname, "sass"),
	dest: path.join(__dirname, "public")
}));

server.set('view engine', 'ejs');
server.use('/api', apiRouter);

server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch( err => {
			console.log(err);
			res.status(404).send("Bad Request");
		});
});

server.use(express.static("public"));

server.listen(config.port, config.host, () =>{
	console.info("Server listening on port: ", config.port)
});
