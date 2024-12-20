// TodoItem.jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoItem.module.css";
// Ant Design
import { Checkbox } from "antd";
import { setTwoToneColor, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  // 수정상태 여부를 초기값으로 상태에 설정
  const [editText, setEditText] = useState(todo.text);
  // 기존 todo에 기록된 텍스트를 초기값으로 상태에 설정

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      // isEditing이 true이고 editText가 존재한다면 App에 선언한 updateTodo(해당todo고유 아이디값, 변경된내용)를 실행해
      updateTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
    // 수정상태를 반대로 돌려
  };

  // 투톤컬러 고정
  setTwoToneColor('#747bff');
  return (
    <li className={style.li}>
      {/* 체크박스 */}
      <Checkbox
        checked={todo.completed} // 완료여부 업데이트 해(상태값 반영)
        onChange={() => toggleComplete(todo.id)}
      />

      {/* 수정 상태이면 input을 보여주고, 아니라면 span을 보여줘 */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        // 완료 여부를 판단해서 true이면 텍스트에 선긋고, 아니면 제거
        >
          {todo.text}
        </span>
      )}

      {/* 수정여부 버튼: 수정 상태이면 해당 버튼에 '완료'로, 아니라면 '수정'으로 써 줘 */}
      <button onClick={handleEdit}>
        {/* {isEditing ? '완료' : '수정'} */}
        {isEditing ? '완료' : <EditTwoTone />}
      </button>

      {/* 삭제버튼 */}
      <button onClick={() => deleteTodo(todo.id)}>
        <DeleteTwoTone />
      </button>
    </li>
  );
};

export default TodoItem;
