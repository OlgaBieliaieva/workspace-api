const parseArrays = (req, res, next) => {
  const arrayFields = ["phones", "emails", "socials", "sharedWorkspaces"]; // Поля, які повинні бути масивами

  try {
    arrayFields.forEach((field) => {
      if (req.body[field]) {
        try {
          req.body[field] = JSON.parse(req.body[field]);
          if (!Array.isArray(req.body[field])) {
            return res.status(400).json({
              message: `${field} must be an array.`,
            });
          }
        } catch (err) {
          return res.status(400).json({
            message: `Invalid JSON format for field: ${field}`,
          });
        }
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error during parsing" });
  }
};
export default parseArrays;
