const Task = require('../../models/task');

async function paginated(params) {
    const { page = 1, limit = 10 } = params;
    const tasks = await Task.find()
        .skip((page - 1) * limit)
        .limit(limit);
    const count = await Task.countDocuments();
    return {
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    };
}

async function findOneById(id) {
    return Task.findById(id).populate('assignedTo');
}

async function save(newTask) {
    const task = new Task(newTask);
    return task.save();
}

async function update(id, updatedTask) {
    return Task.findByIdAndUpdate(id, updatedTask, { new: true });
}

async function remove(id) {
    return Task.findByIdAndDelete(id);
}

module.exports = {
    paginated,
    findOneById,
    save,
    update,
    remove
};
