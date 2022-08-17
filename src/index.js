import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();


//console.log(todoList);

todoList.todos.forEach( crearTodoHtml ); // es lo mismo a: todoList.todos.forEach(todo => crearTodoHtml(todo));
