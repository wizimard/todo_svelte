import { store } from '../store/store';
import $api from './axios';
import TodoService from './TodoService';

class CategoryService {
  async getCategories() {
    const response = await $api.get('/categories');
    if (response.status === 200) {
      store.update(prev => ({
        ...prev,
        categories: response.data
      }));
    }
  }
  async addCategory() {
    try {
      const response = await $api.post('/categories', { name: 'New category' });
      store.update(prev => ({
        ...prev,
        categories: [...prev.categories, response.data]
      }))
    } catch(e) {
      console.log(e);
    }
  }
  async setCurrentCategory(id) {
    store.update(prev => ({
      ...prev,
      currentCategory: prev.categories.filter(category => category.id === id)[0],
      todos: []
    }));
    await TodoService.getTodos(id);
  }
  clearCurrentCategory() {
    store.update(prev => ({
      ...prev,
      currentCategory: null,
      todos: []
    }));
  }
  async changeCategoryTitle(category) {
    try {
      await $api.put(`/categories/${category.id}`, { name: category.name });
      store.update(prev => ({
        ...prev,
        currentCategory: category
      }))
    } catch(e) {
      console.log(e);
    }
  }
  async removeCategory(id) {
    try {
      await $api.delete(`/categories/${id}`);
      store.update(prev => ({
        categories: prev.categories.filter(category => category.id !== id),
        currentCategory: null,
        todos: []
      }));
      return true;
    } catch(e) {
      console.log(e);
    }
  }
}

export default new CategoryService();