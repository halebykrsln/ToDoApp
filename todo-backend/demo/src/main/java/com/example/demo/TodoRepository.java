package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Buraya kod yazmana gerek yok, Spring Boot arka planda her şeyi halledecek.
}