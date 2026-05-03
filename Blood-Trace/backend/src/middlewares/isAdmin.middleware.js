/**
 * Admin Authorization Middleware
 * Checks if the authenticated user has an 'admin' role to restrict access to certain routes.
 */
const isAdmin = (req, res, next) => {

    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();
};

module.exports = isAdmin;
