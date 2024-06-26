const userModel = require("../../models/user");
const pager = require("../../utils/pager");

async function createIfNotExists(decoded, res) {
    let user = await findOne({ name: decoded.given_name, lastname: decoded.family_name });
    if (!user) {
        user = {
            name: decoded.given_name,
            lastname: decoded.family_name,
            role: decoded.role 
        };
    }
    return user;
}

async function findOneById(_id) {
    return await userModel.findById(_id).exec();
}

const update = async (id, updatedUser) => {
    const user = await userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

async function save(user) {
    let _user = new userModel(user);
    return await _user.save();
}

async function paginated(params) {
    let perPage = params.perPage?params.perPage:10, page = Math.max(0, params.page);
    let filter = params.filter?params.filter:{}
    let sort = params.sort?params.sort:{}

    let count = await userModel.countDocuments(filter);
    let data = await userModel.find(filter)
    .limit(perPage)
    .skip(perPage *page)
    .sort(sort)
    
    .exec();

    return pager.createPager(page, data, count, perPage);
}

async function remove(id) {
    return await userModel.findOneAndDelete({_id: id}).exec();
}

module.exports = { createIfNotExists, findOneById, save, paginated, remove, update };