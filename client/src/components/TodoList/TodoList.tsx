import { useState } from 'react';
import styles from './TodoList.module.scss';

export type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask(''); // Очищаем поле после добавления
    }
  };

  const toggleCompletion = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className={styles.todoContainer}>
      <h2>To-do List</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? styles.completed : ''}
            onClick={() => toggleCompletion(todo.id)}
          >
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default TodoList;
