const {insertPost} = require("./feed.service");

addPost:(req,res) => {
    const body = req.body;
}

login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "email not found"
            });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                expiresIn: "1h"
            });
            return res.json({
                success: 1,
                message: "Login successful",
                token: jsontoken
            });
        }
        else {
            return res.json({
                success: 0,
                data: "Invalid password"
            });
        }
    });
}
};
