package com.projeto.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String,Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        String message = ex.getMostSpecificCause() != null ? ex.getMostSpecificCause().getMessage() : ex.getMessage();
        Map<String,Object> body = new HashMap<>();
        if (message != null && message.toLowerCase().contains("cpf")) {
            body.put("erro", "CPF já cadastrado");
        } else {
            body.put("erro", "Violação de integridade de dados");
        }
        body.put("detalhe", message);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }
}