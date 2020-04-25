const router = require('express').Router();
console.log("called till here");
router.use('/users', require('./modules/users'));

module.exports = router;