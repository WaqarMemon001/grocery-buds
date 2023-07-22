import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // show display
      showAlert(true, "Please enter value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "Item Updated Successfully", "update");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      showAlert(true, "Item added successfully", "success");
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const clearAll = () => {
    // display alert
    showAlert(true, "All Items removed", "danger");
    setList("");
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "Item Removed", "danger");
  };

  const editHandler = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-from" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery buds</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="eg: Apples..."
            className="grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "Update" : "add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            editHandler={editHandler}
            removeItem={removeItem}
          />
          <button className="clear-btn" onClick={clearAll}>
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
