import { writable } from 'svelte/store';

function createStore() {

  const store = writable({
    categories: [],
    currentCategory: null,
    todos: []
  });

  return store;
}

export const store = createStore();