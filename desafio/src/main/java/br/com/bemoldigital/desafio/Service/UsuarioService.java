package br.com.bemoldigital.desafio.Service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.bemoldigital.desafio.model.Usuario;
import br.com.bemoldigital.desafio.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	private UsuarioRepository repository;
	private PasswordEncoder passwordEncoder;
	
	public UsuarioService(UsuarioRepository repository) {
		this.repository = repository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}
	
	public List<Usuario> listarUsuario(){
		List<Usuario> lista = repository.findAll();
		return lista;
	}

	public Usuario criarUsuario(Usuario usuario) {
		String encoder = this.passwordEncoder.encode(usuario.getSenha());
		usuario.setSenha(encoder);
		Usuario usuarioNovo = repository.save(usuario);
		return usuarioNovo;
	}
	
	public Usuario editarUsuario(Usuario usuario) {
		String encoder = this.passwordEncoder.encode(usuario.getSenha());
		usuario.setSenha(encoder);
		Usuario usuarioNovo = repository.save(usuario);
		return usuarioNovo;
	}
	
	public Boolean excluirUsuario(Long id) {
		repository.deleteById(id);
		return true;
	}

	public Boolean validarSenha(Usuario usuario) {
		String senha = repository.getById(usuario.getId()).getSenha();
		Boolean valid = passwordEncoder.matches(usuario.getSenha(), senha);
		return valid;
	}
}
