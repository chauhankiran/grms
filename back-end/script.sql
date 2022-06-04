--- TODO: Move this into Knex migration.

--- `users` table.
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  password TEXT
);

--- `companies` table.
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  website TEXT,
  phone TEXT,
  mobile TEXT,
  fax TEXT,
  address1 TEXT,
  address2 TEXT,
  address3 TEXT,
  city TEXT,
  state INTEGER,       --- Pickup
  zip TEXT,
  country INTEGER,     --- Pickup
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INT,
  archivedOn TEXT,
  archivedBy INTEGER
);