const AdminCheck = async (req, res, next) => {

    try {
        const { admin } = userData;
        if (admin === "admin") {
            next();
        }
        else {
            res.status(401).send('Access denied');
        }

    } catch (error) {
        res.status(401).json(error.message);
    }
};

module.exports = {
    AdminCheck,
}