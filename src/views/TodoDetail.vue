<template>
  <div>
    <h1>Editing a ToDo</h1>

    <div v-if="todo.length > 0">
      Author: <h4>{{ todo[0].author }}</h4>
      Todo Item: <p>{{ todo[0].todo }}</p>
    </div>

    <div v-else>
      <p>Todo item not found</p>
    </div>

    <hr>

    <input type="text" placeholder="Author" v-model="state.newAuthor">
    <span> Test: {{ state.newAuthor }} </span>
    <br>
    <input type="text" placeholder="Todo" v-model="state.newTodoItem">
    <span> Test: {{ state.newTodoItem }} </span>
    <br>
    <button @click="handleEditTodo()">Update Item</button>

    <hr>
  </div>
</template>


<script setup>
import { onMounted } from 'vue';
import todocrud from '../modules/todocrud'

const {  editTodo, state, GetSpecificTodo, todo, todoId } = todocrud()

// Call GetSpecificTodo with onMounted Hook, and parse todoId to fetch the specific todo item. .value is used to access the value of the ref
onMounted(() => {
  GetSpecificTodo(todoId.value)
})


const handleEditTodo = async () => {
  try {
    // Ensure todoId is available
 
    if (!todoId.value) {
      throw new Error('Todo ID is missing')
    }

    // Call editTodo function to update todo item
    await editTodo(todoId.value, {
      author: state.newAuthor,
      todo: state.newTodoItem
    })

    // Optionally, show success message to the user
    console.log('Todo item updated successfully')
  } catch (error) {
    console.error('Error updating todo:', error)
    // Optionally, show error message to the user
  }
}
</script>

<style lang="scss" scoped>

</style>
