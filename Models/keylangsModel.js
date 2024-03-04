
export const createKeyLangModel = (sequelize, DataTypes) => {
    const KeyLang = sequelize.define("keylang", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return KeyLang;
};
