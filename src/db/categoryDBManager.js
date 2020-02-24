const User = require("./../models/User");
const Category = require("./../models/Category");

const CategoryDBManager = {
    /* Returns a Promise with all the categories for the specified user */
    getAll: userId => {
        return User.findById(userId)
            .populate({ path: "categories", options: { sort: { name: -1 } } })
            .exec()
            .then(user => {
                if (user) {
                    return user.categories;
                } else {
                    throw new Error({ error: "The specified user doesn't exist" });
                }
            });
    },
    /* Creates a new category for the specified user */
    create: (userId, categoryData) => {
        const category = new Category(categoryData);
        return User.findById(userId)
            .then(user => {
                if (user) {
                    user.categories.push(category);
                    return user.save();
                } else {
                    throw new Error({ error: "The specified user doesn't exist" });
                }
            })
            .then(() => {
                return category.save();
            });
    },
    /* Updates the specified category */
    update: (categoryId, categoryData) => {
        return Category.findByIdAndUpdate(categoryId, categoryData);
    },
    /* Deletes the specified category */
    delete: (userId, categoryId) => {
        return User.findByIdAndUpdate(userId, { $pull: { categories: { _id: categoryId } } }).then(() => {
            return Category.findByIdAndDelete(categoryId);
        });
    }
};

module.exports = CategoryDBManager;
