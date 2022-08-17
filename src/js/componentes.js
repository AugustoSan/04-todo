import { Todo } from "../classes";
import { todoList  } from "../index";


// Referencias
const divTodoList        = document.querySelector('.todo-list');
const txtInputTodo       = document.querySelector('.new-todo');
const btnBorrarCompleted = document.querySelector('.clear-completed');
const ulFiltros          = document.querySelector('.filters');
const anchorFiltros      = document.querySelectorAll('.filtro');
const numPendientes      = document.querySelector('strong');

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label> ${todo.tarea } </label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    // se envia el primer elemento porque como es una lista ordenada, lo recomendable es que se tenga pero sin ningun div
    divTodoList.append( div.firstElementChild ); 
    return div.firstElementChild;

}

// Eventos

document.onreadystatechange = function() {
    if( document.readyState == 'complete'){
        numPendientes.innerText = todoList.obtenerNumPendientes();
    }
}

txtInputTodo.addEventListener('keyup', ( event ) => {
    if(event.keyCode === 13 && txtInputTodo.value.length > 0){

        const nuevoTodo = new Todo( txtInputTodo.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInputTodo.value = '';
        numPendientes.innerText = todoList.obtenerNumPendientes();
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElement = event.target.localName;  // input, label, button
    const todoElement   = event.target.parentElement.parentElement;
    const todoId        = todoElement.getAttribute('data-id');


    if(nombreElement.includes('input')){ // click en el check
        todoList.marcarCompletado( todoId ); 
        todoElement.classList.toggle('completed');
        //console.log(todoElement);
    }
    else if(nombreElement.includes('button')){  // Eliminar todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElement);
    }
    numPendientes.innerText = todoList.obtenerNumPendientes();
    //console.log( todoList );

});

btnBorrarCompleted.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = 0; i < divTodoList.children.length; i++) {
        const element = divTodoList.children[i];
        if(element.classList.contains('completed')){
            divTodoList.removeChild( element );
        }
    }
    numPendientes.innerText = todoList.obtenerNumPendientes();
    //console.log(todoList);
});

ulFiltros.addEventListener( 'click', (event) => {
    const filtro = event.target.text;

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    if(!filtro){ return; }

    for( const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        //console.log(completado);

        switch(filtro){
            case 'Pendientes':
                if( completado ){
                    //console.log(event.target);
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
            
        }
    }
    numPendientes.innerText = todoList.obtenerNumPendientes();
} );