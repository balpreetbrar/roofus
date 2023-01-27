# Roofus Project
This project includes the Node.js APIs and VueJs Frontend for Roofus Project.

## Configuration for Frontend

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Configuration for Backend 

Project Backend Prerequistes - 
1. Node.js Version 18
2. A MySQL Database

To run this project do the following:
1. Run `npm install` in project directory,
2. Set database credentials in test.json file under config directory,
3. Create Tables in MySQL Database by copying queries in structure.sql under database/migration
3. For Windows run -<br/>
    a) `set NODE_ENV=test`<br/>
    b) `node index.js`<br/>
   For Linux based systems run `NODE_ENV=test node index.js`
