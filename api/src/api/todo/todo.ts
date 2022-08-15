import mongoose from "mongoose";

export interface ITodo {
    _id: mongoose.Types.ObjectId
    text: string
    done: boolean
    dueDate: Date
    createdAt: Date
    updatedAt?: Date
};

export const Todo = mongoose.model<ITodo>('Todo', new mongoose.Schema<ITodo>({
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