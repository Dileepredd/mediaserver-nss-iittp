## nss-iitp-mediaserver.github.io

### How to run ?
```
First copy .env-sample to .env and you can change the parmetes in .env files if you want. You can add environment parameters which should not be display on github like session password, username, connection string etc.
```
```
You can access it inside application as process.env.<Parameter Name>
```
```
If you add new parameter in .env make sure you update .env-sample
```
```
Now run `npm insatll` to install dependencies.
```
```
Now run `npm start` to start the script.
```

## `Structure`

### `controllers`
```
All the contollers we will use for handling particular set of route
```
### `models`
```
Schemas of models we will use in our website
```
### `views`
```
All the ejs file that we will use to render html.
We can use ejs to create partials and structes that we will use for our website
```
### `public`
```
Includes all the static files that we will use in our web application like images,css,frontend js.
```
### `server.js`
```
This is the main file that runs server and connects with database and import all controllers
```