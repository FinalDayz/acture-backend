const { decode } = require("jsonwebtoken");


const roles = Object.freeze({
    user: '1',
    member: '2',
    admin: '3'
});

module.exports = {
    checkRole(role){
        return (req, res, next) => {
            let token = req.get("authorization");
            token = token.slice(7);
            let userRole = decode(token).result.role;

            if (roles[userRole] < roles[role]) {
                res.json({
                    success: 0,
                    message: "Access denied: unauthorized user"
                });
            }
            return next();
        }
    }
};
