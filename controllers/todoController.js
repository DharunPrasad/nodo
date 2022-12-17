//Models
const TodoTask = require("../models/todoTask")

//To get all the todos
const getTodo = async (req, res) => {
    try{
        const todo = await TodoTask.find()
        res.render("todo.ejs", { todoTasks: todo });
    }
    catch(err){
        res.send(500, err)
    }
   
}

//To create a new todo
const createTodo = async (req, res) => {
    try {
        await TodoTask.create(req.body);
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
}

//To get the data before update a todo
const updateGetTodo = async (req, res) => {
    try{
        const id = req.params.id;
        const tasks = await TodoTask.find()
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    }
    catch(err){
        res.send(500, err)
    }
}
//To actually update a todo
const updateTodo = async(req, res) => {
    try{
        const id = req.params.id;
        await TodoTask.findByIdAndUpdate(id, req.body)
        res.redirect("/")
    }
    catch(err){
        res.send(500, err)
    }
 

}
//To delete a todo
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await TodoTask.findByIdAndRemove(id)
        res.redirect("/")
    }
    catch (err) {
        res.send(500, err);
    }
}

module.exports = {
    getTodo,
    createTodo,
    updateGetTodo,
    updateTodo,
    deleteTodo
}