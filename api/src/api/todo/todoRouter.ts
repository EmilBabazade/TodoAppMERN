import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { IError } from "../../errors/error.js";
import { IAddTodoDTO } from "./dtos/addTodoDTO.js";
import { IEditTodoDTO } from "./dtos/editTodoDTO.js";
import { ITodoDTO } from "./dtos/todoDTO.js";
import { ITodo, Todo } from "./todo.js";

const todoRoutes = Router();

todoRoutes.get('/', async (req: Request, res: Response<ITodoDTO[] | IError>) => {
    const todos = (await Todo.find()).map(t => <ITodoDTO>{
        done: t.done,
        dueDate: t.dueDate,
        id: t._id.toString(),
        text: t.text
    });
    res.status(200).json(todos);
});

todoRoutes.post('/', async (req: Request<{}, {}, IAddTodoDTO>, res: Response<ITodoDTO | IError>) => {
    const { dueDate, text } = req.body;
    if (!dueDate) return res.status(400).json({ message: 'Due Date is empty!' });
    if (!text) return res.status(400).json({ message: 'Text is empty!' });
    const newTodo = new Todo();
    newTodo.dueDate = dueDate;
    newTodo.text = text;
    await newTodo.save();
    res.status(201).json({
        done: newTodo.done,
        dueDate: newTodo.dueDate,
        id: newTodo._id.toString(),
        text: newTodo.text
    });
});

todoRoutes.put('/:id', async (req: Request<{ id: string }, {}, IEditTodoDTO>, res: Response<ITodoDTO | IError>) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });

    const { dueDate, text, done } = req.body;
    if (!dueDate) return res.status(400).json({ message: 'Due Date is empty!' });
    if (!text) return res.status(400).json({ message: 'Text is empty!' });
    if (done === undefined) return res.status(400).json({ message: 'Done is empty!' });

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.text = text;
    todo.done = done;
    todo.dueDate = dueDate;
    await Todo.findByIdAndUpdate(id, todo);
    res.status(200).json({
        done: todo.done,
        dueDate: todo.dueDate,
        id: todo._id.toString(),
        text: todo.text
    })
});

todoRoutes.delete('/:id', async (req: Request<{ id: number }>, res: Response<{} | IError>) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await Todo.findByIdAndDelete(id);
    res.status(204).end();
});

todoRoutes.get('/:id', async (req: Request<{ id: number }>, res: Response<ITodoDTO | IError>) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({
        done: todo.done,
        dueDate: todo.dueDate,
        id: todo._id.toString(),
        text: todo.text
    });
});

export default todoRoutes;