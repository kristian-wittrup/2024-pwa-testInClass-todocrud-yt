import { ref, /* computed */ } from 'vue'
import { /* useRoute , useRouter  */} from 'vue-router'

const getTodos = () => {

  // Route and router are used to grab the todoId from the URL and then stored in computed so we can use it in the rest of the code
  // const route = useRoute(); // Used to grab the todoId from the URL and then stored in computed so we can use it in the rest of the code
  // const router = useRouter(); 

  // const todoId = computed(() => route.params.id)
  // console.log("todoId: ", todoId.value)

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
  
 /**
 * Deletes a todo item from the server.
 * @async
 * @param {string} _id - The ID of the todo item to delete.
 * @throws {Error} If the deletion request fails or the response is not ok.
 * @returns {Promise<void>} A Promise that resolves when the todo item is successfully deleted.
 */

 // Delete code here 



  // Start here week 12


/**
 * Test for handleEdit */ 
/**
 * Function to handle editing a todo item.
 * @async
 * @function handleEditTodo
 * @returns {Promise<void>}
 */
// Edit handleEditTodo here. Seperate the function from the editTodo function for better readability and maintainability.




/**
 * Function to edit a todo item.
 * @async
 * @function editTodo
 * @param {_id} _id - The ID of the todo item to edit.
 * @param {Object} data - The updated data for the todo item.
 * @returns {Promise<void>}
 */
// Edit code here



/**
 * Fetches a specific todo item from the server.
 * @param {string} todoId - The ID of the todo item to fetch.
 * @returns {Promise<void>} A Promise that resolves once the specific todo item is successfully fetched from the server.
 * @throws {Error} If there is an error during the fetching process.
 */
// Fetch specific todo item code here + todo ref array

 

  return {
    state,
    GetAllTodos, 
    newTodo,
    
  }
}

export default getTodos