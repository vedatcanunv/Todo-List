import React, { useState } from "react";

function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addData(inputValue);
      setInputValue("");
    }
  };

  const addData = (text) => {
    const newData = {
      text,
      id: Date.now(),
      isComplete: false,
      isEditing: false,
    };
    setData([...data, newData]);
  };

  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const completeData = (id) => {
    setData(
      data.map((item) =>
        item.id == id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const editData = (id) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
    );
  };

  const handleDataBlur = (id) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  return (
    <div>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Lets write something?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div>
          {data.map((item) =>
            item.isEditing ? (
              <input
                key={item.id}
                value={item.text}
                onChange={(e) =>
                  setData(
                    data.map((i) =>
                      i.id === item.id ? { ...i, text: e.target.value } : i
                    )
                  )
                }
                onBlur={() => handleDataBlur(item.id)}
                autoFocus
              />
            ) : (
              <li
                className="todo-item"
                key={item.id}
                style={{
                  textDecoration: item.isComplete ? "line-through" : "none",
                }}
              >
                {" "}
                <span onClick={() => editData(item.id)}> {item.text} </span>
                <button
                  onClick={() => completeData(item.id)}
                  className={item.isComplete ? "complete-btn" : "no-click"}
                >
                  {" "}
                  &#10003;{" "}
                </button>
                <button
                  onClick={() => deleteData(item.id)}
                  className="delete-btn"
                >
                  {" "}
                  X{" "}
                </button>
              </li>
            )
          )}
        </div>
      </div>
      <div className="filter-box">
        <p>{data.length} data left</p>
      </div>
    </div>
  );
}

export default MainPage;
