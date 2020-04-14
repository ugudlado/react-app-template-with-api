## Running the code in local machine - Visual Studio Code ##

Open the app.workspace-code file in visualstudio code
Open terminal - Ctrl + `
for both client and server, install npm packages
npm install

For api, create the following launch.json file inside /server/.vscode folder
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "API",
            "program": "${workspaceFolder}/src/server.ts",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": [
                "${workspaceFolder}/build/**/*.js"
            ],
            "env": {
                "DATABASE_URL":"postgres://test:test@localhost:5432/demodb"
            }
        }
    ]
}

Press F5 to debug the code :) enjoy. Change the DATABASE_URL as needed.

## Running the code in local machine - Terminal ##

> Running Front end
cd client
npm install
npm start
> Running Api
cd server
npm install
npm start
> Running both Api and frontend together
cd client
npm install
npm run postinstall

cd server
npm install
npm run postinstall
npm start

### Useful commands

* Command to kill node processes

```sh
pkill -9 node
```

### TypeORM migration

Considering we are generating and run schema migrations based on js files, we need to run below commands only after converting .ts to .js files. So, please run ```npm install``` before running any of the below typeorm commands.

#### To generate migration based on model changes

```
npm run typeorm migration:generate -- -n CreateUserAndRole
```

#### To update database with latest migrations

```
npm run typeorm migration:run
```

# Reference links

* Configure typeORM - <https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md>
