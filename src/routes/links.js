const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const postPolicy = require('../policy/PostPolicy');

router.post('/', postPolicy.validateFields, postController.create);

router.delete('/:post_id', postController.remove);

router.put('/:post_id', postPolicy.validateFields, postPolicy.validateId, postController.editById);

router.get('/', postController.getAll);

router.get('/:post_id', postPolicy.validateId, postController.getById);

module.exports = router;