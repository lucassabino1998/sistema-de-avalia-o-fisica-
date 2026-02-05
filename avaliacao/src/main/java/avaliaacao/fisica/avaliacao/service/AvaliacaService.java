package avaliaacao.fisica.avaliacao.service;

import avaliaacao.fisica.avaliacao.dto.AvaliacaoRequest;
import avaliaacao.fisica.avaliacao.model.Avaliacao;
import avaliaacao.fisica.avaliacao.model.Protocolo;
import avaliaacao.fisica.avaliacao.model.Sexo;
import avaliaacao.fisica.avaliacao.model.Usuario;
import avaliaacao.fisica.avaliacao.repository.AvaliacaoRepository;
import avaliaacao.fisica.avaliacao.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaService {
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Avaliacao criarAvaliacao(AvaliacaoRequest request) {
        // 1. Busca Usuario
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        // 2. Prepara a Avaliação
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setUsuario(usuario);
        avaliacao.setDataAvaliacao(request.getDataAvaliacao());
        avaliacao.setProtocolo(request.getProtocolo());
        avaliacao.setPeso(request.getPeso());   // Não esqueça peso e altura!
        avaliacao.setAltura(request.getAltura());

        // --- AQUI ESTAVA FALTANDO DADOS ---
        // Você precisa setar TODAS as dobras que vêm do JSON
        avaliacao.setPeitoral(request.getPeitoral());
        avaliacao.setAxilarMedia(request.getAxilarMedia()); // <--- O erro era aqui!
        avaliacao.setTriceps(request.getTriceps());
        avaliacao.setSubescapular(request.getSubescapular());
        avaliacao.setAbdominal(request.getAbdominal());
        avaliacao.setSuprailiaca(request.getSuprailiaca());
        avaliacao.setCoxaAnterior(request.getCoxaAnterior());

        // Opcionais (se seu JSON tiver)
        avaliacao.setBiceps(request.getBiceps());
        avaliacao.setPanturrilhaMedial(request.getPanturrilhaMedial());

        // 3. Calcula
        calcularresultado(avaliacao, usuario);

        // --- ADICIONE ISSO AQUI PARA IMPRIMIR ---
        // ...
        calcularresultado(avaliacao, usuario); // Sua linha que calcula

        // --- ESPIÃO ---
        System.out.println("--- DEBUG ---");
        System.out.println("Sexo do Usuário: " + usuario.getSexo());
        System.out.println("Protocolo: " + avaliacao.getProtocolo());
        System.out.println("RESULTADO CALCULADO: " + avaliacao.getResultadoPercentualGordura());
        System.out.println("-------------");


        // 4. Salva
        return avaliacaoRepository.save(avaliacao);
    }

    private void calcularresultado(Avaliacao a, Usuario u) { // <--- Verifique se o nome está igual ao que você chamou lá em cima
        double densidade = 0.0;
        double soma = 0.0;
        int idade = java.time.Period.between(u.getDataNascimento(), java.time.LocalDate.now()).getYears();

        // 1. LÓGICA DO PROTOCOLO
        if (a.getProtocolo() == Protocolo.TRESDOBRAS) {
            if (Sexo.M.equals(u.getSexo())) {
                soma = a.getPeitoral() + a.getAbdominal() + a.getCoxaAnterior();
                densidade = 1.10938 - (0.0008267 * soma) + (0.0000016 * soma * soma) - (0.0002574 * idade);
            } else {
                soma = a.getTriceps() + a.getSuprailiaca() + a.getCoxaAnterior();
                densidade = 1.0994921 - (0.0009929 * soma) + (0.0000023 * soma * soma) - (0.0001392 * idade);
            }
        }
        // ... (outros protocolos)

        // 2. CONVERTER DENSIDADE EM % GORDURA (Siri)
        // Se a densidade for 0 (erro no if acima), isso daria erro, mas vamos assumir que entrou no if.
        double gordura = ((4.95 / densidade) - 4.50) * 100;

        // 3. O PASSO QUE DEVE ESTAR FALTANDO 👇👇👇
        a.setResultadoPercentualGordura(gordura);
        a.setResultadoDensidadeCorporal(densidade);

        // Debug extra dentro do método para garantir
        System.out.println(">>> DENTRO DO CÁLCULO: Gordura deu " + gordura);
        System.out.println(">>> DENTRO DO CÁLCULO: Gordura deu " + densidade);
    }


    private int calcularIdade(java.time.LocalDate dataNascimento) {
        if (dataNascimento == null) return 0;
        return java.time.Period.between(dataNascimento, java.time.LocalDate.now()).getYears();
    }

    // Adicione isso no AvaliacaoService
    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }
    public List<Avaliacao> buscarPorNomePaciente(String nome) {
        if (nome == null || nome.isEmpty()) {
            throw new RuntimeException("O nome para busca não pode estar vazio!");
        }
        return avaliacaoRepository.findByUsuarioNomeContainingIgnoreCase(nome);
    }
    public void apagarAvalicao(Long id) {
        if (avaliacaoRepository.existsById(id)) {
            throw new RuntimeException("Avaliação não encontrada com o ID: " + id);

        }
        avaliacaoRepository.deleteById(id);
    }

}
