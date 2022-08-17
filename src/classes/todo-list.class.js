import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        this.cargarLocalStorage();
        //this.todos = [];
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }
    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }
    marcarCompletado( id ){
        for (const todo of this.todos) {
            if(todo.id == id){
                console.log(todo.id, id);
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }
    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado ); 
        this.guardarLocalStorage();
    }
    
    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
        console.log(this.todos);
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) 
                    ? JSON.parse(localStorage.getItem('todo')) 
                    : [];

        // this.todos = this.todos.map( obj => Todo.fromJson( obj ) ); // para convertir los objetos del local storage en objetos Todo
        this.todos = this.todos.map( Todo.fromJson ); // para convertir los objetos del local storage en objetos Todo
        //console.warn(this.todos);
    }

}