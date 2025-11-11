import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos, renderPending } from './use-cases';

const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {string} elementID 
 */

export const App = ( elementId ) => {

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIds.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIds.PendingCountLabel )
    }

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIds.NewTodoInput );
    const todoListUL = document.querySelector( ElementIds.TodoList );
    const deleteTodo = document.querySelector( ElementIds.TodoList );
    const clearCompletedButton = document.querySelector( ElementIds.ClearCompleted );
    const filterLIs = document.querySelectorAll( ElementIds.TodoFilters );

    // Listeners
    newDescriptionInput.addEventListener('keyup', () => {
        if( event.keyCode !== 13) return;
        if (event.target.value.trim().lenght === 0) return; 

        todoStore.addTodo( event.target.value );

        displayTodos();

        event.target.value = '';

    });

    todoListUL.addEventListener('click' , ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    deleteTodo.addEventListener('click' , ( event ) => {

        const isDestroyElement = event.target.className === 'destroy'

        if( isDestroyElement ) {
            const deleteElement = event.target.closest('[data-id]');
            todoStore.deleteTodo( deleteElement.getAttribute('data-id') );
            displayTodos();
        }
        
    });

    clearCompletedButton.addEventListener('click', () => {
        
        const todoDone = document.querySelectorAll('.completed');
        
        todoStore.deleteCompleted( todoDone );
        displayTodos();
    });

    filterLIs.forEach( element => {

        element.addEventListener('click', ( element ) => {
            filterLIs.forEach( el => el.classList.remove('selected') )
            element.target.classList.add('selected')
     
        switch( element.target.text ){
            case 'Todos':
                todoStore.setFilter( Filters.All )
            break;
            case 'Pendientes':
                todoStore.setFilter( Filters.Pending )
            break;
            case 'Completados':
                todoStore.setFilter( Filters.Completed )
            break;
        }
        
        displayTodos();
        
        })


    });

}