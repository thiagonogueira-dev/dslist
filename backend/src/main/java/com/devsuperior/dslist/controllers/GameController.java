package com.devsuperior.dslist.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.devsuperior.dslist.dto.GameDTO;
import com.devsuperior.dslist.dto.GameMinDTO;
import com.devsuperior.dslist.exception.GameConflictException;
import com.devsuperior.dslist.services.GameService;

@RestController
@RequestMapping(value = "/games")
public class GameController {
	
	@Autowired
	private GameService gameService;
	
	@GetMapping
	public List<GameMinDTO> findAll(){
		List<GameMinDTO> result = gameService.findAll();
		
		return result;
	}
	
	@PostMapping
	public ResponseEntity<GameDTO> add(@RequestBody GameDTO body, UriComponentsBuilder uriBuilder) {
		try {
			System.out.println(body.getShortDescription());
			
			GameDTO game = gameService.add(body);
			 
			URI uri = uriBuilder.path("/games/{id}").buildAndExpand(game.getId()).toUri();
			 
			return ResponseEntity.created(uri).body(game);
			 
		} catch(DataIntegrityViolationException e) {
			throw new GameConflictException("Há um jogo cadastrado com o mesmo título. Escolha um título diferente.");
		}
	}
	
	@GetMapping(value = "/{id}")
	public GameDTO findByID(@PathVariable Long id){
		GameDTO result = gameService.findById(id);
		
		return result;
	}
	
}
