A platform to monitor the execution of National Plan to Erradicate Slave Labor *(Plano Nacional para Erradicação do Trabalho Escravo - PNETE)*.

# Getting started

Install the following dependencies:

- [Node.js](nodejs.org)
- [MongoDB](mongodb.org)

Clone this repository locally and create a `.env` based on example:

    cp .env.example .env

Install dependency modules:

    npm install

Compile assets:

    grunt build

Run:

    npm start

## Development

Install `grunt-cli`:

    sudo npm install -g grunt-cli

If you made changes to the client, recompile it:

    grunt build

A "watch" task is also available:

    grunt watch

This application uses [Loopback API framework](https://docs.strongloop.com/display/public/LB/LoopBack) and [AngularJS Javascript SDK](https://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK) for the client app.

Coding style is defined following [EditorConfig](http://editorconfig.org) conventions. If you use [Atom](atom.io), install [editorconfig package](https://atom.io/packages/editorconfig).
