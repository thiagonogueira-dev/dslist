package com.devsuperior.dslist.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devsuperior.dslist.exception.GameConflictException;

@ControllerAdvice
public class GameExceptionHandler {
	
	@ExceptionHandler(GameConflictException.class)
	public ResponseEntity<String> handleGameConflictException(GameConflictException ex) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
	}
}
