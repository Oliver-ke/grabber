const router = require('express').Router();
const { addCategory, getCategories, deleteCategory, updateCategory } = require('../../controllers/categoryController');
const { isTokenValid, validate } = require('../../middlewares');

/*
	Description: Add a new category
	Route: POST '/api/category'
  security: private, only logined in users can add
*/
router.post('/', isTokenValid, validate('addCategory'), addCategory);

/*
	Description: get all categories
	Route: GET '/api/category'
  security: public, everyone can get categories
*/
router.get('/', getCategories);

/*
	Description: update a category
	Route: PUT '/api/category/:id'
  security: private, only loged in users can update category
*/
router.put('/:id', isTokenValid, validate('updateCategory'), updateCategory);

/*
	Description: Delete category
	Route: DELETE '/api/category/:id'
  security: private, only logined in users can delete
*/
router.delete('/:id', isTokenValid, deleteCategory);

module.exports = router;
