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
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

--- `contacts` table.
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER,
  pointOfContact INTEGER, --- One company can have many contacts. The pointOfContact is primary one.
  firstName TEXT,
  lastName TEXT,
  prefix TEXT,
  title TEXT,
  email TEXT,
  phone TEXT,
  mobile TEXT,
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
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

