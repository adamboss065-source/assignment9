function authorization(role) {
  return async function (req, res, next) {
    if (req.user.role < role) {
      throw new Error("You don't have access");
    }
    next();
  };
}
export default authorization;
