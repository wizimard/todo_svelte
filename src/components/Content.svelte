<script>
  import { onMount } from "svelte";
    import AddTodo from "./AddTodo.svelte";
    import Todos from "./Todos.svelte";
    import { store } from "../store/store";
    import CategoryService from '../services/CategoryService';

    let currentCategory;

    store.subscribe(value => {
      currentCategory = value.currentCategory;
    });

    function changeCategoryName() {
      CategoryService.changeCategoryTitle(currentCategory);
    }
    function onKeyDown(e) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.target.blur();
      }
    }
    function removeCategory() {
      CategoryService.removeCategory(currentCategory.id);
    }

    onMount(() => {
      CategoryService.getCategories();
    })
</script>

<div class="content">
    {#if !!currentCategory}
      <div class="content__header">
        <button class="back" on:click={CategoryService.clearCurrentCategory}>
          <div></div>
        </button>
        <input type="text" 
          bind:value={currentCategory.name} 
          on:blur={changeCategoryName}
          on:keydown={onKeyDown} />
        <button class="category__remove" on:click={removeCategory}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </button>
      </div>
      <AddTodo categoryId={currentCategory.id} />
      <Todos categoryId={currentCategory.id} />
    {:else}
    <div class="empty">
      HERE IS EMPTY
    </div>
    {/if}
</div>