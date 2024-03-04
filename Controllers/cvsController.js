import { db } from "../Models/index.js";

const CV = db.CVs;
const KeyLang = db.KeyLangs;
const LangCV = db.LangCVs;

export const createCVs = async (req, res) => {
    try {
        const { title, description, status, submission_date, keylangs } = req.body;
        const file = req.file.filename; // Assuming file upload is handled correctly
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        // Parse keylangs if it's a JSON string
        let parsedKeylangs;
        try {
            parsedKeylangs = JSON.parse(keylangs);
        } catch (error) {
            return res.status(400).json({ error: "Invalid keylangs format" });
        }

        // Create the cv
        const cv = await CV.create({
            title,
            description,
            file,
            status,
            submission_date,
            userId
        });

        // Extract IDs from the parsed keylangs array
        const keylangIds = parsedKeylangs.map(k => k.id);

        // Fetch the KeyLang instances by their IDs
        const keylangInstances = await KeyLang.findAll({
            where: {
                id: keylangIds
            }
        });

        // Associate the cv with the fetched KeyLang instances
        await cv.setKeylangs(keylangInstances);

        // Fetch the cv with its associated languages
        const cvWithLanguages = await CV.findByPk(cv.id, {
            include: [{
                model: KeyLang,
                through: { attributes: [] } // Exclude the pivot table attributes from the response
            }]
        });

        res.json({ cv: cvWithLanguages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all cvs
// Get all cvs with associated KeyLangs
export const getCVs = async (req, res) => {
    try {
        const cvs = await CV.findAll({
            include: [
                {
                    model: KeyLang,
                    through: {
                        attributes: [] // Exclude pivot table attributes from result
                    }
                }
            ]
        });

        res.status(200).json({ cvs });
    } catch (error) {
        console.error("Error fetching cvs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Update a cv
export const updateCV = async (req, res) => {
    try {
        const cvId = req.params.id;
        const { title,
            description,
            file,
            status,
            submission_date, keylangs } = req.body;

        // Find the cv
        const cv = await CV.findByPk(cvId);

        if (!cv) {
            return res.status(404).json({ error: "CV not found" });
        }

        // Update cv attributes
        await cv.update({
            title,
            description,
            file,
            status,
            submission_date
        });

        // Update associated languages
        if (keylangs && keylangs.length >  0) {
            // Remove existing associations
            await LangCV.destroy({ where: { cvId } });

            // Create new associations
            await Promise.all(keylangs.map(async (lang) => {
                await LangCV.create({
                    cvId,
                    keyLangId: lang.id
                });
            }));
        }

        // Fetch the updated cv with its associated languages
        const updatedCVWithLanguages = await CV.findByPk(cvId, {
            include: [{
                model: KeyLang,
                through: { attributes: [] } // Exclude the pivot table attributes from the response
            }]
        });

        res.status(200).json({ cv: updatedCVWithLanguages });
    } catch (error) {
        console.error("Error updating cv:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Delete a cv
export const deleteCV = async (req, res) => {
    try {
        const cvId = req.params.id;

        // Find the cv
        const cv = await CV.findByPk(cvId);

        if (!cv) {
            return res.status(404).json({ error: "CV not found" });
        }

        // Delete associated language associations
        await LangCV.destroy({ where: { cvId } });

        // Delete the cv
        await cv.destroy();

        res.status(204).json("CV deleted successfully");
    } catch (error) {
        console.error("Error deleting cv:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
