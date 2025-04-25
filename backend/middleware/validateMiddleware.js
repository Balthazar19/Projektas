exports.validateItem = (req, res, next) => {
    const { name, description } = req.body;
    if (typeof name !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    next();
  };
  