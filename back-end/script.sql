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

--- `deals` table.
---- TODO: Update dueDate to dueOn, closeDate to closeOn.
CREATE TABLE deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  companyId INTEGER,
  contactId INTEGER,
  name TEXT,
  status INTEGER,     --- Pickup
  stage INTEGER,      --- Pickup
  total INTEGER,
  dueDate TEXT,
  closeDate TEXT,
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

--- `quotes` table.
CREATE TABLE quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  companyId INTEGER,
  contactId INTEGER,
  dealId INTEGER,
  name TEXT,
  total INTEGER,
  expireOn TEXT,
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

--- `tickets` table.
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  companyId INTEGER,
  contactId INTEGER,
  title TEXT,
  priority INTEGER,
  assignee INTEGER,
  status INTEGER,
  type INTEGER,
  dueOn TEXT,
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

--- `tasks` table.
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  companyId INTEGER,
  contactId INTEGER,
  dealId INTEGER,
  ticketId INTEGER,
  title TEXT,
  time TEXT,
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

--- `ref_states` table.
CREATE TABLE ref_states (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);

--- `ref_countries` table.
CREATE TABLE ref_countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  createdBy INTEGER,
  createdOn TEXT,
  updatedBy INTEGER,
  updatedOn TEXT,
  active INTEGER,
  archivedOn TEXT,
  archivedBy INTEGER
);
