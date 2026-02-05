package avaliaacao.fisica.avaliacao.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Protocolo protocolo;
    private LocalDate dataAvaliacao;
    private Double triceps;
    private Double peitoral;
    private Double abdominal;
    private Double biceps;
    private Double subescapular;
    private Double suprailiaca;
    private Double coxaAnterior;
    private Double panturrilhaMedial;
    private Double axilarMedia;
    private Double peso;
    private Double altura;



    private Double resultadoPercentualGordura;
    private Double resultadoDensidadeCorporal;
    private String classificacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Avaliacao() {}
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Protocolo getProtocolo() {
        return protocolo;
    }
    public void setProtocolo(Protocolo protocolo) {
        this.protocolo = protocolo;
    }
    public LocalDate getDataAvaliacao() {
        return dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDate dataAvaliacao) {
        this.dataAvaliacao = dataAvaliacao;
    }
    public Double getTriceps() {
        return triceps;
    }
    public void setTriceps(Double triceps) {
        this.triceps = triceps;
    }
    public Double getBiceps() {
        return biceps;
    }
    public void setBiceps(Double biceps) {
        this.biceps = biceps;
    }
    public Double getSubescapular() {
        return subescapular;
    }
    public void setSubescapular(Double subescapular) {
        this.subescapular = subescapular;
    }

    public Double getSuprailiaca() {
        return suprailiaca;
    }
    public void setSuprailiaca(Double suprailiaca){
        this.suprailiaca = suprailiaca;
    }
    public Double getCoxaAnterior() {
        return coxaAnterior;
    }
    public void setCoxaAnterior(Double coxaAnterior) {
        this.coxaAnterior = coxaAnterior;
    }
    public Double getPanturrilhaMedial() {
        return panturrilhaMedial;
    }
    public void setPanturrilhaMedial(Double panturrilhaMedial) {
        this.panturrilhaMedial = panturrilhaMedial;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Double getPeitoral() {
        return peitoral;
    }
    public void setPeitoral(Double peitoral) {
        this.peitoral = peitoral;
    }

    public Double getAbdominal() {
        return abdominal;
    }
    public void setAbdominal(Double abdominal) {
        this.abdominal = abdominal;
    }

    public Double getAxilarMedia() {
        return axilarMedia;
    }
    public void setAxilarMedia(Double axilarMedia) {
        this.axilarMedia = axilarMedia;
    }
    public Double getPeso() {
        return peso;
    }
    public void setPeso(Double peso) {
        this.peso = peso;
    }
    public Double getAltura() {
        return altura;
    }
    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public Double getResultadoPercentualGordura() {
        return resultadoPercentualGordura;
    }
    public void setResultadoPercentualGordura(Double resultadoPercentualGordura) {
        this.resultadoPercentualGordura = resultadoPercentualGordura;
    }
    public Double getResultadoDensidadeCorporal() {
        return resultadoDensidadeCorporal;
    }

    public void setResultadoDensidadeCorporal(Double resultadoDensidadeCorporal) {
        this.resultadoDensidadeCorporal = resultadoDensidadeCorporal;
    }
}
