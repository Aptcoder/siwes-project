import Joi from 'joi'

const createCategoriesBodySchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
})

const updateCategoryBodySchema = Joi.object().keys({
    oldName: Joi.string().required(),
    newName: Joi.string().required(),
})

const deleteCategoryBodySchema = Joi.object().keys({
    name: Joi.string().required(),
})

module.exports = {
    createCategoriesBodySchema,
    updateCategoryBodySchema,
    deleteCategoryBodySchema,
}
