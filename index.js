const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// we can do bodyParser like below
// app.use(bodyParser.json({limit:'50mb'})); // ALLOW APPLICATION JSON
// app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));  // ALLOW URL ENCODED PARSER

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running!" });
});

// this file we will use for Authenticator before api call like check jwt token
// app.use(async (req, res, next) => {
//   const Authenticator =
//     new (require("./MiddleWares/Authenticator/Authenticator"))();
//   await Authenticator.functionName(req, res, next);
// });

// in this we can create common response handler also like below code
// app.use((req, res, next) => {
//     const ResponseHandler = require('fileName')
//     res.handler = new ResponseHandler(req, res);
//     next()
// })

// All API routes
app.use("/api", routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/tasks`);
});

// this below code for for enable multiple cluster like multi threading in single app
// let numberOfCpus = require('os').cpus().length;

// if (cluster.isMaster) {
//     if (process.env.DEVELOPMENT === 'true') {
//         numberOfCpus = 1;
//     }

//     // Create a worker for each CPU
//     for (var i = 0; i < numberOfCpus; i++) {
//         cluster.fork();
//     }

//     cluster.on('online', function (worker) {
//         console.log(CHALK.blueBright(`Worker ${CHALK.white.bold(worker.process.pid)} is online. :)`));
//     });

//     cluster.on('exit', function (worker, code, signal) {
//         console.log(CHALK.red(`Worker ${CHALK.white.bold(worker.process.pid)} is died.`));
//     });

//     require('./Configs/cron'); // INITIALIZE CRON JOB


// } else {
//     server.listen(port, () => {
//         console.log('\n============== Welcome To TODO App ================');
//         console.log(CHALK.blueBright(`Server started on ${CHALK.white.bold(port)} :)`))
//     });
// }
