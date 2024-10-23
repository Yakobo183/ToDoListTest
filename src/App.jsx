import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [element, Element] = useState([]);
  const [dane, Dane] = useState("");
  const [stan, Stan] = useState("wszystkie");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("element")) || [];
    Element(storedTasks);
  }, []);

  //dodawanie zadania
  const Dodaj = () => {
    if (dane.trim()) {
      Element([...element, { text: dane, completed: false }]);
      //Dane("");
        localStorage.setItem("element", JSON.stringify(element));

    } else {
      alert("Nazwa nie moze byc pusta");
    }
  };

  //zmiana stanu wykonania
  const Zmien = (index) => {
    const zmien = [...element];
    zmien[index].completed = !zmien[index].completed;
    Element(zmien);
  };

  //usuwanie zadania
  const Usun = (index) => {
    const usun = element.filter((_, i) => i !== index);
    Element(usun);
  };

  //sprawdzanie stanu wykonania
  const sprawdzania = element.filter((task) => {
    if (stan === "wykonane") return task.completed;
    if (stan === "niewykonane") return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Aplikacja ToDo</h1>
      <div>
        <input
          type="text"
          value={dane}
          onChange={(e) => Dane(e.target.value)}
          placeholder="Dodaj nowe zadanie"
        />
        <button onClick={Dodaj}>Dodaj</button>
      </div>
      <div>
        <button onClick={() => Stan("wszystkie")}>Wszystkie</button>
        <button onClick={() => Stan("wykonane")}>Wykonane</button>
        <button onClick={() => Stan("niewykonane")}>Niewykonane</button>
      </div>
      <ul>
        {sprawdzania.map((task, index) => (
          <li key={index} style={{ color: task.completed ? "red" : "black" }}>
            {task.text}
            <button onClick={() => Zmien(index)}>Zakończ</button>
            <button onClick={() => Usun(index)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
