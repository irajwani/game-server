## Description

Generic TS + SQL based service to provide resources for games

## Installation

```bash
$ git clone <this-repo>
$ npm install
```

## Running the app

```bash
$ docker build -t whatwapp-server .
$ docker-compose up
```

If the docker commands above fail, it might be a node version issue (I used node 12.18.1)
In this case, install nvm with:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Then follow the instructions provided to make 'nvm' command available within your terminal
Then,

```bash
$ nvm install 12.18.1
$ nvm use 12.18.1
```

and finally, repeat the docker commands

## Usage

Simply visit the [swagger documentation](http://localhost:3000/documentation) to see all available endpoints
 
I did not use any local caching methods like Redis, although it may help with endpoints such as 'get club messages'

I use a simple token assignment structure to access protected resources, in this case, all endpoints within the 'club' controller.
You can retrieve the token for your user (the tokenCode property in the response object) after registering them, or after logging in.
This token must be specified in the header as an authorization check, and so the server knows what user is accessing what resource

Standard User story:
- register at least 2 users
- add sufficient hard and soft_currency to their wallets for future actions
- retrieve token code
- create a club
- other user(s) join this club
- send a message to the club as any user
- create a donation request
- as another user, donate money to this donation request
- experiment with donating variable amounts of soft_currency
- excess donations should spill over next time a donation request is created
