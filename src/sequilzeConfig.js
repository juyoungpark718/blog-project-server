import Sequelize from "sequelize";

export const pgConnect = (dbName, userName, passWord) => {
  const pg = new Sequelize(dbName, userName, passWord, {
    dialect: "postgres",
    port: 5432
  });
  pg.authenticate().then(
    () => {
      console.log("Connected postgresql");
    },
    err => {
      console.log("Failed to connect postgresql", err);
    }
  );
  return pg;
};
