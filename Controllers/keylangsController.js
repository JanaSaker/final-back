import { db } from "../Models/index.js";
const KeyLang = db.KeyLangs;

// Create a new key language
export const createKeyLang = async (req, res) => {
    try {
        const { language } = req.body;

        // Create the key language
        const keyLang = await KeyLang.create({ language });

        res.status(201).json({ keyLang });
    } catch (error) {
        console.error("Error creating key language:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all key languages
export const getKeyLangs = async (req, res) => {
    try {
        const keyLangs = await KeyLang.findAll();
        res.status(200).json({ keyLangs });
    } catch (error) {
        console.error("Error fetching key languages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Update a key language
export const updateKeyLang = async (req, res) => {
    try {
        const keyLangId = req.params.id;
        const { language } = req.body;

        // Find the key language
        const keyLang = await KeyLang.findByPk(keyLangId);

        if (!keyLang) {
            return res.status(404).json({ error: "Key language not found" });
        }

        // Update key language
        await keyLang.update({ language });

        res.status(200).json({ keyLang });
    } catch (error) {
        console.error("Error updating key language:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a key language
export const deleteKeyLang = async (req, res) => {
    try {
        const keyLangId = req.params.id;

        // Find the key language
        const keyLang = await KeyLang.findByPk(keyLangId);

        if (!keyLang) {
            return res.status(404).json({ error: "Key language not found" });
        }

        // Delete the key language
        await keyLang.destroy();
        res.status(204).json({ message: "Key language deleted successfully" });
    } catch (error) {
        console.error("Error deleting key language:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
