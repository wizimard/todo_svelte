<script>
  import CategoryService from "../services/CategoryService";

  export let category;

  function onClick(e) {
    CategoryService.setCurrentCategory(category.id);
    e.currentTarget.blur();
  }

</script>

<li class="category">
  <button type="button" on:click={onClick}>{category.name}</button>
</li>