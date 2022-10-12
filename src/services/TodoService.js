import $api from './axios';
import { store } from '../store/store';

class TodoService {
  async getTodos(categoryId) {
    try {
      const response = await $api.get(`/todos?category_id=${categoryId}`);
      store.update(prev => ({
        ...prev,
        todos: response.data
      }));
    } catch(e) {
      console.log(e);
    }
  }
  async addTodo(categoryId, text) {
    try {
      const response = await $api.post('/todos', { category_id: categoryId, text, isDone: 0 });
      store.update(prev => ({
        ...prev,
        todos: [...prev.todos, response.data]
      }));
    } catch(e) {
      console.log(e);
    }
  }
  async removeTodo(todoId) {
    try {
      await $api.delete(`/todos/${todoId}`);
      store.update(prev => ({
        ...prev,
        todos: prev.todos.filter(todo => todo.id !== todoId)
      }));
    } catch(e) {
      console.log(e);
    }
  }
  async changeStatus(changeTodo) {
    try {
      await $api.put(`/todos/${changeTodo.id}`, { ...changeTodo, isDone: Number(!changeTodo.isDone) });
      store.update(prev => ({
        ...prev,
        todos: prev.todos.map(todo => {
          if (todo.id === changeTodo.id) todo.isDone = Number(!changeTodo.isDone);
          return todo;
        })
      }));
    } catch(e) {
      console.log(e);
    }
  }
  async clearCompleted(todoIds) {
    try {
      for await (const id of todoIds) {
        await $api.delete(`/todos/${id}`);
      }
      store.update(prev => ({
        ...prev,
        todos: prev.todos.filter(todo => !todo.isDone)
      }));
    } catch(e) {
      console.log(e);
    }
  }
}

export default new TodoService();