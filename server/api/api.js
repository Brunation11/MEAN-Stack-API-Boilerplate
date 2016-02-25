var express = require('express');
var router = express.Router();

router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/posts', require('./post/postRoutes'));

module.exports = router;