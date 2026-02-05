package avaliaacao.fisica.avaliacao.dto;

import avaliaacao.fisica.avaliacao.model.Protocolo;
import avaliaacao.fisica.avaliacao.model.Sexo;
import avaliaacao.fisica.avaliacao.model.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UsuarioRequest {

    @NotBlank(message = "Nome Nao Pode Se Vazio")
    private String nome;
   @NotNull(message = "Data nao pode ser vazio")
    private LocalDate dataNascimento;

   @NotNull(message = "Sexo Nao Pode Se Vazio")
    private Sexo sexo;


}
