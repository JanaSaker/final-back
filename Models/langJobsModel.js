export const createLangJobModel = (sequelize, DataTypes) => {
    const LangJob = sequelize.define("langjob", {
        keyLangId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });


    return LangJob;
};