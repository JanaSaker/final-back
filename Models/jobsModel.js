export const createJobModel = (sequelize, DataTypes) => {
    const Job = sequelize.define("job", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        availability: {
            type: DataTypes.ENUM('PartTime', 'FullTime'),
            allowNull: false
        },
        place: {
            type: DataTypes.ENUM('Remotely', 'OnSite', 'Hybrid'),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        level_required: {
            type: DataTypes.ENUM('junior', 'mid', 'senior'),
            allowNull: false,
            defaultValue: 'junior'
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

        }
    }, {
        timestamps: false,
        createdAt: false, // Disable the createdAt field
        updatedAt: false // Keep the updatedAt field if you want it
    });

    return Job;
};
