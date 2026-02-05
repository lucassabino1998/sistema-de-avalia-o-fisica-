package avaliaacao.fisica.avaliacao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuario_tb")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Usuario {
    @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;

    private LocalDate dataNascimento;
    @Enumerated(EnumType.STRING)
    private Sexo sexo;
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Avaliacao> avaliacoes = new ArrayList<>();

}
