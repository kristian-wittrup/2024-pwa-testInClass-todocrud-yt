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
    <!-- week 12 start : DNR -->
<!--     <div v-for="todo in state.todos" :key="todo._id">
      <router-link :to="`/todo/${todo._id}`">
        <span>{{ todo.author }}</span>
        <span>{{ todo.todo }}</span>
        <button @click="deleteTodo(todo._id)">Delete</button>
      </router-link>
    </div> -->
    <div v-for="todo in state.todos" :key="todo.id">
      <router-link :to="`/todo/${todo.id}`">
        <p>{{ todo.id }}</p>
        <p>{{ todo.name }}</p>
        <p>{{ todo.description }}</p>
        <p>{{ todo.price }}</p>
        <p>{{ todo.inStock }}</p>
      </router-link>
      <button @click="deleteTodo(todo.id)">Delete</button>
    </div>


  </div>
</template>
<script setup>
import todocrud from '../modules/todocrud'
import { onMounted } from 'vue'


  const { state, GetAllTodos, newTodo, deleteTodo } = todocrud()

  onMounted(GetAllTodos) // fetches all todos on page load

  // onMounted(() => {
  //   GetAllTodos()
  // })
  /** This approach provides more flexibility if you need to execute multiple statements or perform additional operations when the component is mounted */
</script>

<style lang="scss" scoped>

</style>