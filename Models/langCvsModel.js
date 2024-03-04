export const createLangCVsModel = (sequelize, DataTypes) => {
    const LangCV = sequelize.define("langcv", {
        CVId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        keyLangId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return LangCV;
};
