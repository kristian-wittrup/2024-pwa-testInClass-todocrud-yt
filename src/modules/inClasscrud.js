import { ref } from 'vue'

const getTodosInClass = () => {
  const todos = ref([])

  const fetchTodos = async() => {
    try {
      const response = await fetch('http://localhost:3000/Todos') // axios
    
      if(!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json()
      todos.value = data
    }
    catch (error) {
      console.log(error)
    }
  }

  return {
    todos,
    fetchTodos
  }
}

export default getTodosInClass