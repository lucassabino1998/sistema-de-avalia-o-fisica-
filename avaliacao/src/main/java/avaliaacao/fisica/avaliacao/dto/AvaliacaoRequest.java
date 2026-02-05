package avaliaacao.fisica.avaliacao.dto;

import avaliaacao.fisica.avaliacao.model.Protocolo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AvaliacaoRequest {
    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    @NotNull(message = "A data é obrigatória")
    private LocalDate dataAvaliacao;
    @NotNull(message = "O protocolo é obrigatório")
    private Protocolo protocolo;


    private Double triceps;
    private Double biceps;
    private Double peitoral;
    private Double subescapular;
    private Double suprailiaca;
    private Double coxaAnterior;
    private Double panturrilhaMedial;
    private Double axilarMedia;
    private Double abdominal;
    private Double peso;
    private Double altura;


    private Double resultadoPercentualGordura;
    private Double resultadoDensidadeCorporal;
    private String classificacao;

}
