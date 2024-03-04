import { dbConfig } from "../config/dbConfig.js";
import { Sequelize, DataTypes } from "sequelize";
import {createJobModel} from "./jobsModel.js";
import {createUserModel} from './usersModel.js';
import {createCVModel} from './cvsModel.js';
import { createCourseModel } from './coursesModel.js';
import {createLangCourseModel} from "./langCoursesModel.js"
import {createLangCVsModel} from "./langCvsModel.js";
import {createLangJobModel} from "./langJobsModel.js";
import {createKeyLangModel} from "./keylangsModel.js";
import { createInsightModel } from "./insightsModel.js"; // Alias one of the createInsightModel imports
import pg from "pg";

const sequelize = new Sequelize(
    "postgres://postgres:eZmhbpPnm7Sb2U1D@rhxpeecuigvrqiuybgwf.db.eu-central-1.nhost.run:5432/rhxpeecuigvrqiuybgwf",
    {
      dialectModule: pg,
    }
);

try {
    await sequelize.authenticate();
    console.log("Connected to the database");
} catch (error) {
    console.error("Error connecting: ", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = createUserModel(sequelize, DataTypes);
db.Courses = createCourseModel(sequelize, DataTypes);
db.CVs = createCVModel(sequelize, DataTypes);
db.Insights = createInsightModel(sequelize, DataTypes);
db.Jobs = createJobModel(sequelize, DataTypes);
db.KeyLangs = createKeyLangModel(sequelize, DataTypes);
db.LangCourses = createLangCourseModel(sequelize, DataTypes);
db.LangCVs = createLangCVsModel(sequelize, DataTypes);
db.LangJobs = createLangJobModel(sequelize, DataTypes);


db.Users.hasMany(db.Courses, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Users.hasMany(db.Insights, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Users.hasMany(db.CVs, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

db.Users.hasMany(db.Jobs, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
//////////////////////////////////
db.Courses.belongsTo(db.Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Courses.belongsToMany(db.KeyLangs, {
    through: 'LangCourses',
    foreignKey: 'courseId',
    onDelete: 'CASCADE'
});
//////////////////////////////
db.CVs.belongsTo(db.Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE' 
});
db.CVs.belongsToMany(db.KeyLangs, {
    through: 'LangCVs',
    foreignKey: 'CVId',
    onDelete: 'CASCADE'
});
///////////////////////////////////
db.Insights.belongsTo(db.Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Insights.belongsTo(db.KeyLangs, {
    foreignKey: 'keyLangId',
    onDelete: 'CASCADE'
});
////////////////////////////////////
db.Jobs.belongsTo(db.Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Jobs.belongsToMany(db.KeyLangs, {
    through: 'LangJobs',
    foreignKey: 'jobId',
    onDelete: 'CASCADE'
});  
/////////////////////////////////
db.KeyLangs.belongsToMany(db.Courses, {
    through: 'LangCourses',
    foreignKey: 'keyLangId',
    onDelete: 'CASCADE'
});
db.KeyLangs.belongsToMany(db.CVs, {
    through: 'LangCVs',
    foreignKey: 'keyLangId',
    onDelete: 'CASCADE'
});
db.KeyLangs.belongsToMany(db.Jobs, {
    through: 'LangJobs',
    foreignKey: 'keyLangId',
    onDelete: 'CASCADE'
});
db.KeyLangs.hasMany(db.Insights, {
    foreignKey: 'keyLangId',
    onDelete: 'CASCADE'
});
/////////////////////////

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synchronization done!");
    });
export {db};
