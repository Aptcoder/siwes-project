const Category = require('../models/Category')

const getAllCategories = async (req, res) => {
    const categories = await Category.find().lean()

    res.json({
        success: true,
        message: 'Categories retrieved successfully',
        data: categories,
    })
}

const createNewCategory = async (req, res) => {
    const { name } = req.body

    if (!name.length)
        return res.status(403).json({
            success: false,
            message: 'Category name is required',
        })

    const duplicateCategory = await Category.findOne({ name }).exec()

    if (duplicateCategory)
        return res
            .status(409)
            .json({ success: false, message: 'Category already exist' })

    const newCategory = {
        name,
    }

    await Category.create(newCategory)

    return res.send({
        success: true,
        message: 'Category created successfully',
        data: newCategory,
    })
}

const updateCategory = async (req, res) => {
    const { oldName, newName } = req.body

    if (!oldName || !newName)
        return res.status(403).json({
            success: false,
            message: 'All fields are required',
        })

    if (oldName === newName)
        return res.status(403).json({
            success: false,
            message: 'Category already exists',
        })

    const category = await Category.findOne({ name: oldName }).exec()

    if (!category)
        return res.status(409).json({
            success: false,
            message: `Category ${oldName} does not exist`,
        })

    const categoryNameAlreadyExist = await Category.findOne({ name: newName })
        .lean()
        .exec()

    if (categoryNameAlreadyExist)
        return res.status(409).json({
            success: false,
            message: `Category ${newName} already exists`,
        })

    category.name = newName
    await category.save()

    return res.json({
        success: true,
        message: `${oldName} successfully updated to ${newName}`,
    })
}

const deleteCategory = async (req, res) => {
    const { name } = req.body

    if (!name.length)
        return res.status(403).json({
            success: false,
            message: 'Category name is required',
        })

    const category = await Category.findOne({ name }).exec()

    if (!category)
        return res
            .status(409)
            .json({ success: false, message: 'Category does not exist' })

    const result = await category.deleteOne()

    res.json({
        success: true,
        message: `Category ${result.name} deleted`,
    })
}

module.exports = {
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory,
}
