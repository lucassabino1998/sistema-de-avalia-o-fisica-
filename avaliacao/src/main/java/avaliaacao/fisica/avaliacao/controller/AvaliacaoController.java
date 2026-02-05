package avaliaacao.fisica.avaliacao.controller;

import avaliaacao.fisica.avaliacao.dto.AvaliacaoRequest;
import avaliaacao.fisica.avaliacao.model.Avaliacao;
import avaliaacao.fisica.avaliacao.service.AvaliacaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {
    @Autowired
    private AvaliacaService avaliacaService;

    @PostMapping
    public ResponseEntity<Avaliacao> criarAvaliacao(@RequestBody @Valid AvaliacaoRequest request){
        Avaliacao novaAvaliacao = avaliacaService.criarAvaliacao(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaAvaliacao);
    }

    @GetMapping
    public ResponseEntity<List<Avaliacao>> listarTodas(){
        return ResponseEntity.ok(avaliacaService.listarTodas());
    }
    @GetMapping("/buscar")
    public ResponseEntity<List<Avaliacao>> buscarPorNome(@RequestParam String nome){
        List<Avaliacao> listaEncontrada = avaliacaService.buscarPorNomePaciente(nome);
        return ResponseEntity.ok(listaEncontrada);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Avaliacao> deletarAvaliacao(@PathVariable Long id){
        return ResponseEntity.noContent().build();
    }
}
