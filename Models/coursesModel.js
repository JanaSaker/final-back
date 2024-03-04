export const createCourseModel = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
            allowNull: false,
            defaultValue: 'pending'
        },
        submission_date: {
            type: DataTypes.DATE,
            allowNull: false, 
            defaultValue: DataTypes.NOW // This sets the default value to the current date and time

        },
        URL: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false, // Disable the createdAt field
        updatedAt: false // Keep the updatedAt field if you want it
    });
    return Course;
};
