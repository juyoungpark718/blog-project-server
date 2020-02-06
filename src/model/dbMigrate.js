import postInit from "./Post/Post";

const dbMigrate = async sequelize => {
  await postInit(sequelize);
  sequelize.sync();
};

export default dbMigrate;
