import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  ); // la useState, la inceput era un empty array [], dar dupa ce configurezi local Storage-ul, aici pui local storage ca sa apara ce ai scris inainte cand intrii pe pagina
  // getItem aduce din local sotrage, setItem introduce in local storage
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    // when you click an item with an particular id, we will
    // update todoList with the funcion setTodoList
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
      // this function will return all the todos, except for the one
      // with the id you clicked
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]); // la useEffect, de fiecare data cand ce e in [] e modificat, va face ceva

  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md flex 
    flex-col p-7 min-h-[550px] rounded-xl"
    >
      {/* -------- title ----- */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-do List</h1>
      </div>

      {/* ----- input box ---- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2
           placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14
         text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* ----- todo list ---- */}

      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
