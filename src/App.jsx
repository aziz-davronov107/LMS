import { useEffect, useState } from "react";

export default function App() {
  const [todo,setTodo] = useState( () => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  })
  const [isCheked,setCheked] = useState("all")
  const [inputValue,setInputValue] = useState("")
  function todoSet() {
    if (!inputValue.trim()) return;

    const date = new Date();
    const formattedDate = date.toLocaleString();

    const newTodo = {
      id: todo.length + 1,
      name: inputValue,
      data: formattedDate,
      status: true
    };
    
    setTodo([...todo, newTodo]);
    setInputValue("");
  }
  useEffect(()=>{
    localStorage.setItem("users",JSON.stringify(todo));
  },[todo])
  function ischek(btn) {
    document.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    console.log(btn.className)
    setCheked(btn.value);
  }
  function toggleStatus(id) {
    let updatedTodos;

    if (id){
      updatedTodos = todo.map(item =>
        item.id === id ? { ...item, status: !item.status } : item
      );
    }
    else{
      updatedTodos = todo.map(item => ({
      ...item,
      status: true
    }));
    }
    setTodo(updatedTodos);
  }
  return (
    <div className="max-w-3xl mx-auto font-light">
      <nav className="flex  justify-between my-10 items-center  font-bold">
        <div className="text-2xl">Todo List</div>
        <button className="boder shadow-lg p-4 rounded-2xl active:opacity-75" onClick={()=>toggleStatus()}>
          Barchasini bajarilgan qilish
        </button>
      </nav>
      <main className="flex justify-between gap-5 italic">
        <div className="flex-1/3  p-2  rounded-2xl flex justify-between items-center shadow-lg">
          <input type="text" placeholder="Yangi vazifa... (Enter)"value={inputValue}  onChange={el => setInputValue(el.target.value)} 
            onKeyDown={e => {
            if (e.key === "Enter") {
              todoSet();
            }
          }} />
          <button className="boder shadow-lg  p-4 rounded-2xl active:opacity-75 bg-[#2c2a2a] text-white" onClick={todoSet}>
            Qoshish
          </button>
        </div>
        <div className="flex-1 rounded-2xl p-5 flex shadow-lg">
          <input type="search" placeholder="Qidirish..." />
        </div>
      </main>
      <section className="flex justify-between" >
        <div className="flex gap-5">
          <button className=" boder shadow-lg p-4 rounded-2xl active:opacity-75 active" value={"all"}  onClick={el => ischek(el.target)}>Barchasi</button>
          <button className=" boder shadow-lg p-4 rounded-2xl active:opacity-75" value={"notChek"} onClick={el => ischek(el.target)}>Faol</button>
          <button className=" boder shadow-lg p-4 rounded-2xl active:opacity-75" value={"cheked"} onClick={el => ischek(el.target)}> Bajarigan</button>
        </div>
        <p>
          Qolgan: <span></span>
        </p>
      </section>
      <div>
        <ul className="rounded-2xl shadow-2xl p-5">
          {
           ( isCheked === "all" ? todo : isCheked === "notChek" ? todo.filter(item => !item.status) : todo.filter(item  => item.status)).map(el=>{
            return <li className="flex justify-between items-center" key={el.id}>
              <div className="flex items-center p-4 gap-5">
                <div className="">
                  <input
                  type="checkbox" className=" bg-amber-600"
                  checked={el.status} 
                  onChange={() => toggleStatus(el.id)}
                />
                </div>
                <div>
                  <h1>{el.name}</h1>
                  <p>{el.data}</p>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <input type="text" className="boder shadow-lg p-4 rounded-2xl active:opacity-75" placeholder="update"/>
                <button className="boder shadow-lg p-4 rounded-2xl active:opacity-75">remove</button>
              </div>
            </li> 
           })
          }
        </ul>
      </div>
    </div>
  );
}
