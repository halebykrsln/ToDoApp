import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]) 
  const [newTodo, setNewTodo] = useState("") 

  const API_URL = "http://localhost:8080/api/todos"

  // 1. Sayfa açılınca verileri çek
  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = () => {
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error("Veri çekilemedi:", error))
  }

  // 2. Yeni Ekle
  const addTodo = () => {
    if (!newTodo) return;
    axios.post(API_URL, { title: newTodo, completed: false })
      .then(response => {
        setTodos([...todos, response.data])
        setNewTodo("") // Kutuyu temizle
      })
  }

  // 3. Sil
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTodos(todos.filter(t => t.id !== id)))
  }

  // 4. Düzenle (İsim Değiştirme)
  const editTodo = (todo) => {
    const newTitle = prompt("Görevi düzenle:", todo.title);
    if (newTitle && newTitle !== todo.title) {
      axios.put(`${API_URL}/${todo.id}`, { ...todo, title: newTitle })
        .then(response => {
          setTodos(todos.map(t => (t.id === todo.id ? response.data : t)))
        })
    }
  }

  // 5. Tamamlandı İşaretleme (Üstünü Çizme)
  const toggleTodo = (todo) => {
    axios.put(`${API_URL}/${todo.id}`, { ...todo, completed: !todo.completed })
      .then(response => {
        setTodos(todos.map(t => (t.id === todo.id ? response.data : t)))
      })
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Yapılacaklar Listesi</h1>
      
      {/* Ekleme Kutusu */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yeni bir görev yaz..."
          style={{ 
            flex: 1, 
            padding: "12px", 
            borderRadius: "5px", 
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        <button 
          onClick={addTodo} 
          style={{ 
            padding: "12px 25px", 
            backgroundColor: "#28a745", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Ekle
        </button>
      </div>

      {/* Liste */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            background: "#fff", 
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
            padding: "15px", 
            marginBottom: "10px", 
            borderRadius: "8px",
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            
            {/* Görev İsmi (Tıklayınca Çizilir) */}
            <span 
              onClick={() => toggleTodo(todo)}
              style={{ 
                textDecoration: todo.completed ? "line-through" : "none", 
                color: todo.completed ? "#aaa" : "#333",
                cursor: "pointer",
                flex: 1,
                fontSize: "18px"
              }}
            >
              {todo.completed ? "✅" : "⬜"} {todo.title}
            </span>

            {/* Butonlar Grubu */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => editTodo(todo)} 
                style={{ 
                  backgroundColor: "#ffc107", 
                  color: "#333", 
                  border: "none", 
                  padding: "8px 15px", 
                  borderRadius: "5px", 
                  cursor: "pointer" 
                }}
              >
                Düzenle
              </button>

              <button 
                onClick={() => deleteTodo(todo.id)} 
                style={{ 
                  backgroundColor: "#dc3545", 
                  color: "white", 
                  border: "none", 
                  padding: "8px 15px", 
                  borderRadius: "5px", 
                  cursor: "pointer" 
                }}
              >
                Sil
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default App