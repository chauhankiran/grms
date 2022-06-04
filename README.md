# grms

An open source CRM system

__The project is in early stage. It is recommended to not use this in production.__

## Local Setup

The project is simple and boring so as its setup. In this repo, both `front-end` (written in React) and `back-end` (written in Node) are present side-by-side. SQLite is the database created inside the `back-end/database` folder for quick setup with tables and some dummy data. Follow these steps to up and running the project locally.

1. Clone the repo. 

```bash
$ git clone git@github.com:chauhankiran/grms.git
```

2. Go inside the `back-end` and the `front-end` and install the dependencies.

```bash
# install back-end dependency.
$ cd back-end
$ npm i

# we're done with back-end. Go back to root folder for now.
$ cd ..

# install front-end dependency.
$ cd front-end
$ npm i
```

3. Create `.env` file in `back-end` folder with following keys (you need to fill values for all these keys).

```
JWT_SECRET="entry-any-random-at-least-64-chars-string"
```

4. That's it! You're ready to run the project. Open two terminal tabs (or two terminal windows) and run front-end and back-end side-by-side with these commands.

```bash
# go inside the front-end folder and run it.
$ cd front-end
$ npm start

# in other terminal tab or window,
# go inside the front-end folder and run it.
$ cd back-end
$ npm run dev
```

The React front-end is available at http://localhost:3000 and Node back-end is available at http://localhost:5000.

## Contribution

Interested to involve in development? Take a quick look at Issue or read the code and find comments that starts with `TODO`. Most of these TODO comments are written there to do something more. If you know how to resolve the particular TODO, then first create an issue with that TODO information and the create PR against it.

## License

MIT License
