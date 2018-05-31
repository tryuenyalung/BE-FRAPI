Boilerplate for Express Application
w/ GridFS as Storage
---------------------------

1. npm install nodemon -g

2. npm install -save express express-validator body-parser gridfs-stream method-override mongoose multer multer-gridfs-storage

3. npm install -save-dev babel-cli babel-preset-env babel-core babel-register

4. "scripts": {
	"start": "nodemon bin/dev",
    "clean": "rm -rf dist",
    "build": "npm run clean && mkdir dist && babel src -s -d dist",
    "prod": "npm run build && nodemon bin/prod"
  },

