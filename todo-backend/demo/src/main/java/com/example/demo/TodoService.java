package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Listeleme
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Ekleme
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Silme
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    // Güncelleme
    public Todo updateTodo(Long id, Todo yeniBilgiler) {
        return todoRepository.findById(id).map(kayitliTodo -> {
            kayitliTodo.setTitle(yeniBilgiler.getTitle());
            kayitliTodo.setCompleted(yeniBilgiler.isCompleted());
            return todoRepository.save(kayitliTodo);
        }).orElse(null);
    }
}