const AppError = require("../utils/appError");
async function notifications(req, res, next) {
  try {
    const { pool } = req;
    const user = req.user;

    if (pool.connected) {
      const results = await pool
        .request()
        .input("UserID", user.UserID)
        .execute("GetNotificationsByUserID");

      res.status(200).json({
        status: "success",
        notifications: results.recordset,
      });
    }
  } catch (error) {
    console.error(error);
    return next(new AppError("Internal server error", 500));
  }
}

module.exports = notifications;
