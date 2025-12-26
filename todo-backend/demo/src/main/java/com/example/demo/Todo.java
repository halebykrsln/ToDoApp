package com.example.demo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Getter ve Setter'ları otomatik oluşturur
@Table(name = "todos") // Veritabanında tablonun adı 'todos' olacak
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID otomatik artsın (1, 2, 3...)
    private Long id;

    private String title; // Yapılacak işin başlığı

    private boolean completed; // Tamamlandı mı? (true/false)
}