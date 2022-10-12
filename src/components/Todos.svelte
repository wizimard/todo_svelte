<script>
    import Todo from "./Todo.svelte";
    import TodoService from "../services/TodoService";
    import { store } from '../store/store';

    let todos = [];
    let isShowAll = false;
    let countLeftTodos = 0;
    let showTodos = [];

    function changeIsShowAll() {
      isShowAll = !isShowAll;
    }
    async function clearCompleted() {
      const ids = todos.filter(todo => !!todo.isDone).map(todo => todo.id) || [];
      await TodoService.clearCompleted(ids);
    }

    store.subscribe(value => {
      todos = value.todos;
    })
    
    $: countLeftTodos = todos.filter(todo => !todo.isDone).length;
    $: showTodos = isShowAll ? todos : todos.filter(todo => !todo.isDone);
</script>

{#if todos.length > 0}
<div class="todos">
  <div class="todos__header">
    <span class="todos__count">{countLeftTodos} tasks left</span>
    <label class="checkbox todos__mode">
      <input type="checkbox" checked={isShowAll} on:change={changeIsShowAll} />
      <div></div>
      Show all
    </label>
    <button class="todos__clear" on:click={clearCompleted}>Clear completed</button>
  </div>
  <ul class="todos__items">
    {#each showTodos as todo (todo.id)}
      <Todo todo={todo} />
    {/each}
  </ul>
</div>
{/if}