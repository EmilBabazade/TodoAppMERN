import mongoose from "mongoose";
;
export const Todo = mongoose.model('Todo', new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    }
}));
//# sourceMappingURL=todo.js.map