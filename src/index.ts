import express, { Request, Response, NextFunction } from 'express'; // Importing express and its types
import http from 'http'; // Importing http module
import { PORT, InputfilePath, OutputfilePath } from './config/index'; // Importing configuration variables
import multer from 'multer'; // Importing multer for handling file uploads
import path from 'path'; // Importing path module for file paths
import { ConverttoJSON, Embeddings } from './lib/Index'; // Importing functions for CSV to JSON conversion and embeddings creation

const app = express(); // Creating express application
const server = http.createServer(app); // Creating HTTP server using express app

// Middleware for parsing JSON requests
app.use(express.json({ limit: '16kb' }));

// Middleware for parsing URL-encoded requests
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Serving static files from 'public' directory
app.use(express.static(path.resolve(__dirname, 'public')));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(`Internal Server Error: ${err.message}`);
});

// Route for root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

// Performing CSV to JSON conversion
ConverttoJSON(InputfilePath, OutputfilePath)
  .then(() => {
    console.log('CSV to JSON conversion complete');
  })
  .catch((err) => {
    console.error('Error converting CSV to JSON:', err);
  });

// Creating embeddings
Embeddings()
  .then(() => {
    console.log('Embeddings created successfully');
  })
  .catch((err) => {
    console.log('Failed to create embeddings: ', err);
  });

// Listening to the server on specified port
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
