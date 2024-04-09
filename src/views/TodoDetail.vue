<template>
  <div>
    <h1>Edit a ToDo</h1>

    <div v-if="!todo">
      <p> Todo item is not found </p>
    </div>

    <div v-else>
      <span> Author: {{ todo.author }} </span>
      <span> Todo: {{ todo.todo }} </span>
    </div>

    <input type="text" placeholder="Author" v-model="state.newAuthor">
    <span> Author: {{ state.newAuthor }}</span>
    <input type="text" placeholder="Todo" v-model="state.newTodoItem">
    <span> Author: {{ state.newTodoItem }}</span>
    <br>
    <button @click="handleEditTodo()">Update</button>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import todocrud from '../modules/todocrud'

const { GetSpecificTodo, todo, todoId, state, handleEditTodo } = todocrud()

onMounted(() => {
  GetSpecificTodo(todoId.value)
})

</script>

<style>

</style>
