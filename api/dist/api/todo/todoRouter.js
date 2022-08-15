var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import mongoose from "mongoose";
import { Todo } from "./todo.js";
const todoRoutes = Router();
todoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = (yield Todo.find()).map(t => ({
        done: t.done,
        dueDate: t.dueDate,
        id: t._id.toString(),
        text: t.text
    }));
    res.status(200).json(todos);
}));
todoRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dueDate, text } = req.body;
    if (!dueDate)
        return res.status(400).json({ message: 'Due Date is empty!' });
    if (!text)
        return res.status(400).json({ message: 'Text is empty!' });
    const newTodo = new Todo();
    newTodo.dueDate = dueDate;
    newTodo.text = text;
    yield newTodo.save();
    res.status(201).json({
        done: newTodo.done,
        dueDate: newTodo.dueDate,
        id: newTodo._id.toString(),
        text: newTodo.text
    });
}));
todoRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ message: 'Invalid Id' });
    const { dueDate, text, done } = req.body;
    if (!dueDate)
        return res.status(400).json({ message: 'Due Date is empty!' });
    if (!text)
        return res.status(400).json({ message: 'Text is empty!' });
    if (done === undefined)
        return res.status(400).json({ message: 'Done is empty!' });
    const todo = yield Todo.findById(id);
    if (!todo)
        return res.status(404).json({ message: 'Todo not found' });
    todo.text = text;
    todo.done = done;
    todo.dueDate = dueDate;
    yield Todo.findByIdAndUpdate(id, todo);
    res.status(200).json({
        done: todo.done,
        dueDate: todo.dueDate,
        id: todo._id.toString(),
        text: todo.text
    });
}));
todoRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ message: 'Invalid Id' });
    const todo = yield Todo.findById(id);
    if (!todo)
        return res.status(404).json({ message: 'Todo not found' });
    yield Todo.findByIdAndDelete(id);
    res.status(204).end();
}));
todoRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ message: 'Invalid Id' });
    const todo = yield Todo.findById(id);
    if (!todo)
        return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json({
        done: todo.done,
        dueDate: todo.dueDate,
        id: todo._id.toString(),
        text: todo.text
    });
}));
export default todoRoutes;
//# sourceMappingURL=todoRouter.js.map