
// THE DRAGGABLE REUSABLE COMPONENT //////////////
export function Draggable(props) {
  // Initialisation ------------------------------

  // State ---------------------------------------

  // Handlers ------------------------------------
  const handleDrag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  // View ----------------------------------------
  return (
    <div
      key={props.id}
      id={props.id}
      draggable="true"
      onDragStart={handleDrag}
      className={(('className' in props) && props.className)}
    >
      {props.children}
    </div>
  );
  }


// THE DROPPABLE REUSABLE COMPONENT //////////////
export function Droppable(props) {
  // Initialisation ------------------------------
  
  // State ---------------------------------------

  // Handlers ------------------------------------
  const handleDrop = (event) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    const id = document.getElementById(data);
    event.target.appendChild(id);
  };

  const allowDrop = (event) => event.preventDefault();
    
  // View ----------------------------------------
  return (
    <div
      id={props.id}
      onDrop={handleDrop}
      onDragOver={allowDrop}
      className={(('className' in props) && props.className)}
    >
      {props.children}
    </div>
  );
}