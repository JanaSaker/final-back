export const authorizeAccess = (model) => async (req, res, next) => {
    try {
      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Get the model ID from the request parameters
      const modelId = req.params.id;
  
      // Find the model by ID
      const item = await model.findByPk(modelId);
  
      // Check if the model exists
      if (!item) {
        return res.status(404).json({ error: `${model.name} not found` });
      }

      // Check if the authenticated user is the owner of the model item
      if (item.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      // If the user is authorized, proceed to the next middleware or controller function
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  