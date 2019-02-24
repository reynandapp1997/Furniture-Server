# Furniture-Server

### Installing

First you need to install all dependencies by running :

```bash
yarn install
```

### Running locally

Go open file env.json, and edit the following line.

```javascript
{
    "env": {
        "MONGODB_URI": "mongodb+srv://reynandapp1997:gegewepe@cluster0-uclqy.mongodb.net/furniture?retryWrites=true",
        "DOMAIN": "https://furniture-server.herokuapp.com"
    }
}
```

Example

```javascript
{
    "env": {
        "MONGODB_URI": "mongodb://127.0.0.1:27017/furniture",
        "DOMAIN": "http://localhost:3000"
    }
}
```