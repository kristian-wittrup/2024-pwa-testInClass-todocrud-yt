<template>
  <main>
    <h1>Hello world</h1>
    <div>
      <h2>Todos</h2>
      <div v-for="todo in todos" :key="todo.id" class="card">
        <p>{{ todo.todo }}</p>
        <p>{{ todo.author }}</p>
        <p>{{ todo._id }}</p>
      </div>
    </div>
  <!--   <div v-for="data in dataStuff" :key="(data, index)">
      <p>{{ data.name }} + {{ index }}</p>
      <p>{{ data.age }}</p>
      <p>{{ data.id }}</p>
    </div>'
    <div v-if="isLoggedIn">
        This is true
    </div>
    <div v-else>
        This is false
    </div> -->

  </main>
</template>

<script setup>
import inClasscrud from '../modules/inClasscrud'
import { onMounted } from 'vue'

const { todos, fetchTodos } = inClasscrud()



 onMounted(() => {
   fetchTodos()
 })

// console.log("my stuff", todos)



//   console.log("my stuff", todos)

</script>
<style> 

</style>
<style scoped>
.card {
  border: 1px solid #ccc;
  background-color: darkseagreen;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  transition: box-shadow 0.3s ease;
}

</style>


