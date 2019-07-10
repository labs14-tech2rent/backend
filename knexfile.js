// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/tech2rent.sqlite3"
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: 
      "postgres://dpbwkbscotagxs:6ebf4540543086da6be50f26084afcb659c677cc74ae6aafe169093c53a6e48f@ec2-54-235-92-43.compute-1.amazonaws.com:5432/d65snepl202ioo"
    ,
    migrations: {
      directory: "./data/migrations"
    }, 
    seeds: {
      directory: "./data/seeds"
    }
  }
};
