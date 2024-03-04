// import { DataTypes } from "sequelize";
// import User from "./User.js"; // Assuming User model is in User.js and needs to be imported

export const createCVModel = (sequelize, DataTypes) => {
    const CV = sequelize.define("cv", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false, // Disable the createdAt field
        updatedAt: false // Keep the updatedAt field if you want it
    });

    return CV;
};
