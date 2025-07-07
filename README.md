# E-coomrce-fully-function-website


🛠️ Environment Setup
Create your own MongoDB Atlas account

Go to https://www.mongodb.com/cloud/atlas

Set up a free cluster and create a new database.

Add your MongoDB connection URI to the .env file
In the root of the backend/ folder (or wherever your server code is), create a file named .env and add:

env
Copy
Edit
MONGODB_URI=your-mongodb-atlas-connection-uri-here
Example:

env
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
Don't forget to add .env to .gitignore to keep your credentials private.

