package avaliaacao.fisica.avaliacao.repository;

import avaliaacao.fisica.avaliacao.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
List<Avaliacao> findByUsuarioNomeContainingIgnoreCase(String nome);
}
