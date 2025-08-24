import express from 'express'; // Imports Express.js.
import reminderRoutes from './routes/reminderRoutes.js'; // Imports the reminder routes.  
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'; // Imports the error handler middleware.

const app = express() // Creates an Express application instance.
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies.
app.use('/reminders', reminderRoutes); 

app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // Starts the server on port 3000 and logs a confirmation message.