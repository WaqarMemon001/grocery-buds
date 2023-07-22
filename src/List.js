import React from "react";

const List = ({ items, editHandler, removeItem }) => {
  return (
    <div className="grocery-items">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={()=>editHandler(id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={()=>removeItem(id)}>
                Delete
              </button>  
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
