import { db } from "../Models/index.js";

const Job = db.Jobs;
const KeyLang = db.KeyLangs;
const LangJob = db.LangJobs;
const User = db.Users;

// Create a new job
export const createJobs = async (req, res) => {
    try {
        const { title, company_name, company_location, availability, place, description, level_required, status, submission_date, keylangs } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const job = await Job.create({
            title,
            company_name,
            company_location,
            availability,
            place,
            description,
            level_required,
            status,
            submission_date,
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

        // Associate the job with the fetched KeyLang instances
        await job.setKeylangs(keylangInstances);

        // Fetch the job with its associated languages
        const jobWithLanguages = await Job.findByPk(job.id, {
            include: [{
                model: KeyLang,
                through: { attributes: [] } // Exclude the pivot table attributes from the response
            }]
        });

        res.json({ job: jobWithLanguages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all jobs
// Get all jobs with associated KeyLangs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            include: [
                {
                    model: KeyLang,
                    through: {
                        attributes: [] // Exclude pivot table attributes from result
                    }
                }
            ]
        });

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Update a job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, company_name, company_location, availability, place, description, level_required, status, submission_date, keylangs } = req.body;

        // Find the job
        const job = await Job.findByPk(jobId);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Update job attributes
        await job.update({
            title,
            company_name,
            company_location,
            availability,
            place,
            description,
            level_required,
            status,
            submission_date
        });

        // Update associated languages
        if (keylangs && keylangs.length >  0) {
            // Remove existing associations
            await LangJob.destroy({ where: { jobId } });

            // Create new associations
            await Promise.all(keylangs.map(async (lang) => {
                await LangJob.create({
                    jobId,
                    keyLangId: lang.id
                });
            }));
        }

        // Fetch the updated job with its associated languages
        const updatedJobWithLanguages = await Job.findByPk(jobId, {
            include: [{
                model: KeyLang,
                through: { attributes: [] } // Exclude the pivot table attributes from the response
            }]
        });

        res.status(200).json({ job: updatedJobWithLanguages });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Delete a job
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job
        const job = await Job.findByPk(jobId);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Delete associated language associations
        await LangJob.destroy({ where: { jobId } });

        // Delete the job
        await job.destroy();

        res.status(204).json("Job deleted successfully");
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
