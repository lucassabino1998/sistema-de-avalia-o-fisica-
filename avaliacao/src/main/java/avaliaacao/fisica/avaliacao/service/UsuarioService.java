package avaliaacao.fisica.avaliacao.service;

import avaliaacao.fisica.avaliacao.dto.UsuarioRequest;
import avaliaacao.fisica.avaliacao.model.Usuario;
import avaliaacao.fisica.avaliacao.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
  private final UsuarioRepository usuarioRepository;

  public Usuario criar(UsuarioRequest request) {
      Usuario novoUsuario = Usuario.builder().
              nome(request.getNome()).
              dataNascimento(request.getDataNascimento()).
              sexo(request.getSexo()).
              build();
      usuarioRepository.save(novoUsuario);
      return novoUsuario;
  }
  private Usuario transformaresponse(Usuario u ){
      return Usuario.builder().id(u.getId())
              .nome(u.getNome()).
              dataNascimento(u.getDataNascimento()).sexo(u.getSexo())
              .build();
  }
  public List<Usuario> listarUsuarios(){
      List<Usuario> usuarios = usuarioRepository.findAll();
      return usuarios.stream()
              .map(this::transformaresponse)
              .collect(Collectors
                      .toList());
  }
  public void DeletarUsuario(Long id){
      if(!usuarioRepository.existsById(id)){
          throw new RuntimeException("transação nao encontrada com o ID: " + id);
      }
      usuarioRepository.deleteById(id);
  }
  public List<Usuario> pesquisarUsuario(String nome) {
      return usuarioRepository.findByNomeContainingIgnoreCase(nome);
  }
}
