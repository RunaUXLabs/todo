import { useState, useEffect } from 'react';
import TodoInput from './component/TodoInput2';
import TodoList from './component/TodoList2';
import styles from "./css/App.module.css";
// 모듈 css를 가져오려면 객체에 싸매서 가져와야합니다.
// Ant Design Icons
import { SearchOutlined } from '@ant-design/icons';

function App() {
  /**
   * R 읽기 - 로컬스토리지에 저장되어있는 정보 읽어오기
   */
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    // 로컬스토리지에 todos라는 객체를 가져와서 storedTodos변수에 할당
    return storedTodos ? JSON.parse(storedTodos) : [];
    // (삼항연산자)로컬스토리지에 데이터가 없으면 빈 배열로 초기화
    // 이 반환되는 내용이 todos가 됨
  });

  useEffect(() => {
    // todos 변경될 때마다 useEffect가 실행하여 로컬 스토리지 업데이트
    localStorage.setItem('todos', JSON.stringify(todos));
    // 로컬스토리지에 todos라는 객체를 찾아가 todos로 들어온 값을 문자열(string) 형태로 변환해서 저장
  }, [todos]);


  /**
   * C 생성하기 - todo 등록
   * @param {*} text todo의 내용
   */
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false
    }]);
    /* 기존의 todos항목을 복제해오고, 그 뒤로 새로운 todo를 아이템으로 추가
    아이템 구성으로는 아래 세 프로퍼티로 구성해
    id: 등록시점을 밀리초로 변형한 숫자(시간은 흐르기때문에 고유할 수 밖에 없음)
    text: 파라미터로 들어온 텍스트(할 일)
    completed: 완료여부 false(기본값) */
  };


  /**
   * U 업데이트 - 변경된 텍스트 반영
   * @param {*} id todo의 고유 값
   * @param {*} updatedText 업데이트 반영 할 텍스트
   */
  const updateTodo = (id, updatedText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: updatedText } : todo)));
    /* .map() 기록 되어있는 todos를 순회하면서 동일한 행동을 해, 각 할일은 todo라고 할게
    (삼항연산자) 현재 순회 중인 todos에서 todo가 변경된 텍스트를 반영할 아이템이라면
    (true) ...todo 전개구문을 이용해서 객체의 모든 속성을 복사하고, text 속성만 새로운 텍스트로 변경해
    (false) 기존 todo 그대로 둬 */
  };

  /**
   * U 업데이트 - 완료여부를 토글하는 핸들러 함수
   * @param {*} id todo의 고유 값
   */
  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    /* .map() 기록 되어있는 todos를 순회하면서 동일한 행동을 해, 각 할일은 todo라고 할게
    (삼항연산자) 현재 순회 중인 todo가 완료여부를 표시하려는 아이템이라면
    (true) ...todo 전개구문을 이용해서 객체의 모든 속성을 복사하고, completed 속성만 반전해
    (false) 기존 todo 그대로 둬 */
  };


  /**
   * D 삭제
   * @param {*} id todo의 고유 값
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    /* .filter() 주어진 조건을 만족하는 요소들로만 새로운 배열을 생성
    삭제하려는 todo의 id가 파라미터로 들어가고
    그 id와 같지 않은 todo만 모아서 배열생성하여 setTodos()로 부모상태 업데이트
    => 그 id값을 가진 todo는 제외시켜 */
  };


  // 검색기능 구현하기
  const [searchQuery, setSearchQuery] = useState(""); // 검색결과만 추릴 상태값 선언
  const filteredTodos = searchQuery
    ? todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : todos;
  // .toLowerCase()는 전부 소문자 처리하는 메서드 => 검색이 대소문자 구분안하고 광범위하게 되도록 만드는 과정

  return (
    <div className={styles.app}>
      <h1>Ant Design 반영한<br />가벼운 React To-Do List</h1>

      {/* 구글아이콘 샘플, span태그 안에 아이콘 고유명 작성 */}
      {/* <span className="material-symbols-outlined">
        expand_circle_down
      </span>
      <span className="material-symbols-outlined">
        favorite
      </span>
      <span className="material-symbols-outlined">
        sync_saved_locally
      </span> */}

      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        // todos={todos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />

      {/* 검색기능 */}
      <div className={styles.searchInput}>
        <SearchOutlined className={styles.ico} />
        <input
          type="search"
          // type="text"로 안넣은 이유 => value를 감지하는 상태이므로 불필요한 텍스트 처리에 상태값이 민감하게 반영되는것을 막기위함, UX를 생각하여 type="search"로 검색어를 한번에 지우는 기능 반영
          placeholder="할 일을 검색할 수 있어요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );

}

export default App;

