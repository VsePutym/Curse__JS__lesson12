'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    ulTodoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
    todoList.textContent = '';
    ulTodoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            ulTodoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnToDoComplete = li.querySelector('.todo-complete');
        btnToDoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });
        const removed = li.querySelector('.todo-remove');
        removed.addEventListener('click', function () {
            todoData.splice(-1, 1);
            localStorage.setItem('memory', JSON.stringify(todoData));
            render();
        });
    });
};

const showTodo = function(){
    todoData = JSON.parse(localStorage.getItem('memory'));
    render();
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    if (newTodo.value !== '') {
        todoData.push(newTodo);
        render();
        headerInput.value = '';
    } else {
        alert('вы сюда ничего не записали');
    }
    localStorage.setItem('memory', JSON.stringify(todoData));
});
showTodo();
render();
