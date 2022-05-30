import knex from "knex";

const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./database/grms.sqlite3",
  },
  useNullAsDefault: true,
});

export default connection;
