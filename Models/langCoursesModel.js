export const createLangCourseModel = (sequelize, DataTypes) => {
    const LangCourse = sequelize.define("langcourse", {
        courseId: {
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

    return LangCourse;
};
