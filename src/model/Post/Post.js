import { Model, sequelize } from "sequelize";
import column from "./column";

export class Post extends Model {}

const postInit = sequelize => {
  Post.init(column, { sequelize });
};

export default postInit;
