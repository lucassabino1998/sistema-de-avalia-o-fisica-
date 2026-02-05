package avaliaacao.fisica.avaliacao.controller;

import avaliaacao.fisica.avaliacao.dto.UsuarioRequest;
import avaliaacao.fisica.avaliacao.model.Usuario;
import avaliaacao.fisica.avaliacao.repository.UsuarioRepository;
import avaliaacao.fisica.avaliacao.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;
    @PostMapping
    public Usuario criarUsuario(@RequestBody @Valid UsuarioRequest usuarioRequest){
        return usuarioService.criar(usuarioRequest);
    }
    @GetMapping
    public List<Usuario> listarUsuarios(){
        return usuarioService.listarUsuarios();
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id){
        usuarioService.DeletarUsuario(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/Pesquisar")
    public List<Usuario> Pesquisa(@RequestParam String nome) {
        return usuarioService.pesquisarUsuario(nome);
    }
}
