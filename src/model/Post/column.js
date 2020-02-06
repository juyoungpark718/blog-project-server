import Sequelize from "sequelize";

const column = {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  },
  updatedAt: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
};

export default column;
