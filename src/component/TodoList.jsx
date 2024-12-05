// TodoList.jsx
/* eslint-disable react/prop-types */
import TodoItem from './TodoItem';
import style from "../css/TodoList.module.css";
// import "../css/TodoList.module.css";
// 주의!!!!!
// 파일명은 모듈이나 import할 때 모듈로 가져오지 않으면 전역으로 인식됨(로컬).
// 그래서 하위 item 컴포넌트에도 li 스타일이 반영된겁니다.
// 배포하면 안먹음

const TodoList = ({ todos, updateTodo, toggleComplete, deleteTodo }) => {
  return (
    <ul className={style.ul}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
