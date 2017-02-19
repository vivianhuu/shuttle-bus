# shuttle-bus
This project is to build a website that provide information about shuttle bus of The Hong Kong Polytechnic Unversity with MEAN.
Users can search the route for detailed information without login. 
Admins can create, modify and delete routes after login.

To run this project, you have to install angularjs, ngmap, bootstrap, jquery, mongodb, express, body-parser, path, mongojs.
{test code}
The "data" folder includes two json files, routes.json, admins.json. This two files are the collections in database "bus",
you need to put them in mongodb/bin.
you can import them through ./mongoimport -- db bus --collection routes --file routes.json.

All the code is in the "public" folders.

