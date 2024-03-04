import express from 'express';
import { createKeyLang, getKeyLangs, updateKeyLang, deleteKeyLang } from '../Controllers/keylangsController.js';

const router = express.Router();

// Route to create a new key language
router.post('/keylangs', createKeyLang);

// Route to get all key languages
router.get('/keylangs', getKeyLangs);

// Route to update a key language
router.put('/keylangs/:id', updateKeyLang);

// Route to delete a key language
router.delete('/keylangs/:id', deleteKeyLang);

export default router;
