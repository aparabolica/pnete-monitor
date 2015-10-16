A platform to monitor the execution of National Plan to Erradicate Slave Labor *(Plano Nacional de Erradicação do Trabalho Escravo - PNETE)*.

# Getting started

Install Node.js and MongoDB. Then clone this repository and run:

    npm install
    node .

A admin account will be set using credentials from `server/config.json` file.

## Setup

Create a .env from example:

    cp .env.example .env

Change the file with options for MongoDB and e-mail services.

## Development

This application is built upon [Loopback API framework](https://docs.strongloop.com/display/public/LB/LoopBack) and uses [AngularJS Javascript SDK](https://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK) for the client app.

Coding style is defined following [EditorConfig](http://editorconfig.org) conventions. If you use [Atom](atom.io), install [editorconfig package](https://atom.io/packages/editorconfig).
