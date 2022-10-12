<script>
  import TodoService from "../services/TodoService";
  
  export let todo;

  function removeTodo() {
    TodoService.removeTodo(todo.id);
  }
  function changeStatus() {
    TodoService.changeStatus(todo);
  }
</script>

<li class={`todo ${todo.isDone ? 'todo-done' : ''}`}>
  <label class="checkbox">
    <input type="checkbox" checked={!!todo.isDone} on:change={changeStatus} />
    <div></div>
  </label>
  <p class="todo__text">{todo.text}</p>
  <button class="todo__remove" on:click={removeTodo}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
  </button>
</li>