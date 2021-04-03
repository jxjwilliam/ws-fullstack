import React, { useState, useReducer, useContext, createContext, useRef } from 'react'
import { v4 as uuid } from 'uuid'

/**
 * use createContext, useReducer for gloabl state
 * https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext
 */
// 1. init todos
const initialTodos = [
  {
    id: uuid(),
    task: 'call CRA',
    complete: true,
  },
  {
    id: uuid(),
    task: 'working on Gatsby E-Commerce',
    complete: true,
  },
  {
    id: uuid(),
    task: 'extract basic project',
    complete: false,
  },
]

// 2. define reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true }
        }
        return todo
      })
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false }
        }
        return todo
      })
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      })
    default:
      throw new Error()
  }
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL'
    case 'SHOW_COMPLETE':
      return 'COMPLETE'
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE'
    default:
      throw new Error()
  }
}

// 3. create redux: global reducer context
const TodoContext = createContext(initialTodos)

function Filter({ dispatch }) {
  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' })
  }

  const handleShowComplete = () => {
    dispatch({ type: 'SHOW_COMPLETE' })
  }

  const handleShowIncomplete = () => {
    dispatch({ type: 'SHOW_INCOMPLETE' })
  }
  return (
    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>
  )
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoContext)

  const handleChange = () =>
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    })

  return (
    <li>
      <label htmlFor={todo.id}>
        <input id={todo.id} type="checkbox" checked={todo.complete} onChange={handleChange} />
        {todo.task}
      </label>
    </li>
  )
}

function AddTodo() {
  const dispatch = useContext(TodoContext)

  const [task, setTask] = useState('')
  const ref = useRef(null)

  const handleChange = evt => setTask(evt.target.value)

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: 'ADD_TODO', task, id: uuid() })
    }
    setTask('')
    ref.current.focus()
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} ref={ref} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

const MyReducer = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') return true
    if (filter === 'COMPLETE' && todo.complete) return true
    if (filter === 'INCOMPLETE' && !todo.complete) return true
    return false
  })

  return (
    <TodoContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </TodoContext.Provider>
  )
}

export default () => (
  <div className="wrapper">
    <h2>TODO</h2>
    <MyReducer />
  </div>
)
