import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'

const getTodos = () => {

  const route = useRoute();
  const router = useRouter();

  const todoId = computed(() => route.params.id)
  //console.log("todoId: ", todoId.value)

  const state = ref({
    newAuthor: '',
    newTodoItem: '',
    todos: {}
  })


/**
 * Fetches all todo items from the server.
 * @returns {Promise<void>} A Promise that resolves once all todo items are successfully fetched from the server.
 * @throws {Error} If there is an error during the fetching process.
 */
// improved error handling with async/await and try/catch blocks. Better readability and maintainability.
  const GetAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      state.value.todos = data;
    } catch(error) {
      console.error(error);
    }
    // try {  /* Promise chaining with .then() can sometimes lead to nested callbacks, which can make the code harder to follow and maintain */
    //    await fetch("http://localhost:3000/todos")
    //   .then(res => res.json())
    //   .then(data => {
    //     state.value.todos = data
    //     // debugger
    //   })
    // }
    // catch(error) {
    //   console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    // }
  }

/** JSDOC
 * Creates a new todo item and sends it to the server for storage.
 * @returns {Promise<void>} A Promise that resolves once the new todo item is successfully created and stored on the server.
 * @throws {Error} If there is an error during the creation or storage process.
 */
// Improved error handling with async/await and try/catch blocks. Better readability and maintainability.
  const newTodo = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "auth-token": state.token
        },
        body: JSON.stringify({
          author: state.value.newAuthor,
          todo: state.value.newTodoItem
        }) 
      };
  
      // Make the HTTP request
      const response = await fetch("http://localhost:3000/todos/new", requestOptions);
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add new todo");
      }
  
      // Refresh todos after successfully adding a new one
      await GetAllTodos();
    } catch (error) {
      console.error("Error adding new todo:", error);
      // Handle the error as appropriate (e.g., show an error message to the user)
    }
  }
  
  /** chaining with promise. Can lead to more callbacks */
  // const newTodo = () => { 
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //       // "auth-token": state.token
  //     },
  //     body: JSON.stringify({
  //       author: state.value.newAuthor,
  //       todo: state.value.newTodoItem
  //     }) 
  //   }
  //     fetch("http://localhost:3000/todos/new", 
  //     requestOptions
  //   ).then(GetAllTodos())
  // }
  



  /* Improved error handling with async/await and try/catch blocks. Better readability and maintainability.
   also uses template literals
   */

   /**
 /**
 * Deletes a todo item from the server.
 * @async
 * @param {string} _id - The ID of the todo item to delete.
 * @throws {Error} If the deletion request fails or the response is not ok.
 * @returns {Promise<void>} A Promise that resolves when the todo item is successfully deleted.
 */
   const deleteTodo = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/delete/${_id}`, { method: "DELETE" });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
  
      // Refresh todos after successfully deleting the todo
      await GetAllTodos();
    } 
    catch (error) {
      console.error("Error deleting todo:", error);
      // Handle the error as appropriate (e.g., show an error message to the user)
    }
  }
  

  /** cleanest, less code and error handling */
  // const deleteTodo = (_id) => {
  //   fetch("http://localhost:3000/todos/delete/" + _id, { method: "DELETE"})
  //     .then(GetAllTodos())
  // }




  /**
 * Updates a todo item on the server.
 * @param {string} todoId - The ID of the todo item to update.
 * @returns {Promise<void>} A Promise that resolves once the todo item is successfully updated on the server.
 * @throws {Error} If there is an error during the update process.
 */

const editTodo = async (_id) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        // "auth-token": state.token
      },
      body: JSON.stringify({
        author: state.value.newAuthor,
        todo: state.value.newTodoItem
      }) 
    };

    const url = `http://localhost:3000/todos/update/${_id}`;

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    router.push('/todos');
  } 
  catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
} 

// const editTodo = () => { 
//   const requestOptions = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//       // "auth-token": state.token
//     },
//     body: JSON.stringify({
//       author: state.value.newAuthor,
//       todo: state.value.newTodoItem
//     }) 
//   }
//   fetch("http://localhost:3000/todos/update/" + todoId.value, 
//   requestOptions)
//    // .then(GetAllTodos())
//     .then(res =>  res.body ) // redundant
//     .then(res => {console.log(res)}) // redundant
//     router.push('/todos')
// }
 // 


/**
 * Fetches a specific todo item from the server.
 * @param {string} todoId - The ID of the todo item to fetch.
 * @returns {Promise<void>} A Promise that resolves once the specific todo item is successfully fetched from the server.
 * @throws {Error} If there is an error during the fetching process.
 */
/* 
const todo = ref({})

const GetSpecificTodo = async (todoId) => {
  try {
    // Make the HTTP request to fetch all todo items
    const response = await fetch("http://localhost:3000/todos");

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch todo");
    }

    // Parse the response data
    const data = await response.json();

    // Filter the data to find the specific todo item
    const specificTodo = data.find(t => t._id === todoId);

    // Update the todo ref with the specific todo item
    todo.value = specificTodo;
  } 
  catch (error) {
    console.error("Error fetching todo:", error);
    // Handle the error as appropriate (e.g., show an error message to the user)
    throw error;
  }
}
 */


  const todo = ref({})
  const GetSpecificTodo = async () => {
    try {
      fetch("http://localhost:3000/todos")
        .then(res =>  res.json() ) 
        .then(data => {
            todo.value = data.filter(t => t._id === todoId.value)
        })
    }
    catch(error) {
      console.log(error)
    }
  }


  return {
    todo,
    todoId,
    GetSpecificTodo,
    state,
    GetAllTodos, 
    newTodo,
    deleteTodo,
    editTodo
  }
}

export default getTodos