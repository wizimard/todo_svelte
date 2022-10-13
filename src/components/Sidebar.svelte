<script>
  import Category from "./Category.svelte";
  import CategoryService from '../services/CategoryService';
  import { store } from '../store/store';

  let categories;

  store.subscribe(value => {
    categories = value.categories
  });
</script>

<div class="sidebar">
  <h4 class="sidebar__title bold">Categories</h4>
  <ul class="categories">
    {#each categories as category}
      <Category category={category} />
    {/each}
  </ul>
  <button class="category-add" on:click={CategoryService.addCategory}>
    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
  </button>
</div>

<style>

</style>
