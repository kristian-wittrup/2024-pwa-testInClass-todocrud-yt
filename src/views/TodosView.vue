<template>
  <div>
    <h1>All Todos</h1>
    <button @click="newTodo()">New Todo - static</button>
    <br>
    <input type="text" placeholder="Author" v-model="state.newAuthor">
    <span> Test: {{ state.newAuthor }} </span>
    <br>
    <input type="text" placeholder="Todo" v-model="state.newTodoItem">
    <span> Test: {{ state.newTodoItem }} </span>

    <br>

    <div v-for="todo in state.todos" :key="todo._id" class="card">
      <router-link :to="`/todo/${todo._id}`">
        <h4>
          {{todo.author}}
        </h4>
        <p>
          {{todo.todo}}
        </p>
        
        <button @click="editTodo(todo._id)">Edit todo</button>
      </router-link>
      <button @click="deleteTodo(todo._id)">Delete todo</button>
    </div>
    
  </div>
</template>
<script setup>
import todocrud from '../modules/todocrud'
import { onMounted } from 'vue'


  const { state, GetAllTodos, newTodo, deleteTodo, editTodo  } = todocrud()

  onMounted(GetAllTodos) // fetches all todos on page load

  // onMounted(() => {
  //   GetAllTodos()
  // })
  /** This approach provides more flexibility if you need to execute multiple statements or perform additional operations when the component is mounted */
</script>

<style lang="scss" scoped>

</style>