import { db } from "../Models/index.js";

const Insight = db.Insights;
// Create a new insight// Create a new insight
export const addInsight = async (req, res) => {
    let info = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        submission_date: req.body.submission_date,
        keyLangId: req.body.keyLangId // Ensure this is the correct field name for the association
    };

    try {
        const insight = await Insight.create(info);
        res.status(200).send(insight);
    } catch (error) {
        console.error("Error creating Insight:", error);
        res.status(500).send("Internal Server Error");
    }
};
// Get all insights with associated KeyLang
export const getAllInsight = async (req, res) => {
    try {
        let insights = await Insight.findAll({
            include: [{ model: db.KeyLangs }] // No need to specify 'as' since Sequelize uses the model name as the alias
        });
        res.status(200).send(insights);
    } catch (error) {
        console.error("Error fetching insights:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};
// Get single insight with associated KeyLang
export const getOneInsight = async (req, res) => {
    const id = req.params.id; // Assuming the ID is passed as a URL parameter

    try {
        const insight = await db.Insights.findOne({
            where: { id: id }, // Find the insight with the specified ID
            include: [{ model: db.KeyLangs }] // Include the associated KeyLang
        });

        if (insight) {
            res.status(200).json(insight);
        } else {
            res.status(404).send('Insight not found');
        }
    } catch (error) {
        console.error("Error fetching insight:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

// Update insight
export const updateInsight = async (req, res) => {
    let id = req.params.id;
    try {
        // Explicitly specify which fields to update
        const insight = await Insight.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            submission_date: req.body.submission_date,
            keyLangId: req.body.keyLangId // Update the association if necessary
        }, {  
            where: { id: id }  
        });

        res.status(200).send(insight);
    } catch (error) {
        console.error("Error updating insight:", error);
        res.status(500).send("Internal Server Error",console.error( error));
    }
};
// Delete insight
export const deleteInsight = async (req, res) => {
    let id = req.params.id;
    try {
        await Insight.destroy({ where: { id: id } });
        res.status(200).send('Insight deleted');
    } catch (error) {
        console.error("Error deleting insight:", error);
        res.status(500).send("Internal Server Error");
    }
};
