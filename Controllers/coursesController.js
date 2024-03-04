import { db } from "../Models/index.js";

const Course = db.Courses;
const KeyLang = db.KeyLangs;
const LangCourse = db.LangCourses;

// Create a new course
export const createCourse = async (req, res) => {
    try {
        const { title, subtitle, description, status, submission_date, URL, keylangs } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        // Create the course
        const course = await Course.create({
            title,
            subtitle,
            description,
            status,
            submission_date,
            URL,
            userId

        });

        // Extract IDs from the keylangs array
        const keylangIds = keylangs.map(k => k.id);

        // Fetch the KeyLang instances by their IDs
        const keylangInstances = await KeyLang.findAll({
            where: {
                id: keylangIds
            }
        });

        // Associate the course with the fetched KeyLang instances
        await course.setKeylangs(keylangInstances);

        // Fetch the course with its associated languages
        const courseWithLanguages = await Course.findByPk(course.id, {
            include: [{
                model: KeyLang,
                through: { attributes: [] } // Exclude the pivot table attributes from the response
            }]
        });

        res.json({ course: courseWithLanguages });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all courses with associated KeyLangs
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: KeyLang,
                    through: {
                        attributes: [] // Exclude pivot table attributes from result
                    }
                }
            ]
        });

        res.status(200).json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a course
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, subtitle, description, status, submission_date, URL, keylangs } = req.body;

        // Find the course
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Update course attributes
        await course.update({
            title,
            subtitle,
            description,
            status,
            submission_date,
            URL,
        });

        // Update associated languages
        if (keylangs && keylangs.length > 0) {
            // Remove existing associations
            await LangCourse.destroy({ where: { courseId } });

            // Create new associations
            await Promise.all(keylangs.map(async (lang) => {
                await LangCourse.create({
                    courseId,
                    keyLangId: lang.id
                });
            }));
        }

        // Fetch the updated course with its associated languages
        const updatedCourseWithLanguages = await Course.findByPk(courseId, {
            include: [{
                model: KeyLang,
                through: { attributes: [] } // Exclude the pivot table attributes from the response
            }]
        });

        res.status(200).json({ course: updatedCourseWithLanguages });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Find the course
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Delete associated language associations
        await LangCourse.destroy({ where: { courseId } });

        // Delete the course
        await course.destroy();

        res.status(204).json("Course deleted successfully");
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
