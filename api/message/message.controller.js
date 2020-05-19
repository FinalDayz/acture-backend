module.exports = {

    getUserMessages: (req, res) => {
        const id = req.params.id;
        getUserMessages(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
};
