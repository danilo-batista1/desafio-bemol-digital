package br.com.bemoldigital.desafio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bemoldigital.desafio.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}