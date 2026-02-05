import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ==========================================
// ESTILOS (Adicionei estilos para o Modal)
// ==========================================
const styles = {
    container: { maxWidth: '950px', margin: '30px auto', fontFamily: 'Segoe UI, sans-serif', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', background: '#0F1115', boxShadow: '0 4px 10px #22C55E' },
    header: { background: '#1A1D24', padding: '20px', color: 'white', textAlign: 'center' },
    tabHeader: { display: 'flex', background: '#1A1D24', borderBottom: '1px solid #22C55E' },
    tabButton: (isActive) => ({
        flex: 1, padding: '15px', cursor: 'pointer', border: 'none', background: isActive ? '#1A1D24' : 'transparent', fontWeight: isActive ? 'bold' : '500', color: isActive ? '#fdfffe' : '#fdfdfd', borderBottom: isActive ? '3px solid #22C55E' : 'none', fontSize: '15px', outline: 'none'
    }),
    content: { padding: '25px' },
    inputGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#fbfbfb' },
    input: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #22C55E', fontSize: '14px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', background: '#3B82F6', color: '#fbfbfb', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' },
    cardBusca: { background: '#1A1D24', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px', fontSize: '14px' },
    th: { background: '#1A1D24', color: 'white', padding: '12px', textAlign: 'left' },
    td: { padding: '12px', borderBottom: '1px solid #1A1D24' },
    
    // Estilos do Modal (Pop-up)
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#1A1D24', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { background: 'black', padding: '25px', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 15px #1A1D24' },
    modalHeader: { borderBottom: '1px solid #020202', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    closeBtn: { background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' },
    detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px', background: '#1A1D24', padding: '10px', borderRadius: '5px' }
};

// ==========================================
// 1. ABA CADASTRO
// ==========================================
const TabCadastro = ({ aoSucesso }) => {
    const [dados, setDados] = useState({ nome: '', dataNascimento: '', sexo: 'M' });

    const cadastrar = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/usuario', dados);
            alert(`Aluno ${res.data.nome} cadastrado!`);
            setDados({ nome: '', dataNascimento: '', sexo: 'M' });
            aoSucesso(res.data);
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar.");
        }
    };

    return (
        <form onSubmit={cadastrar}>
            <h3>👤 Novo Aluno</h3>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Nome Completo</label>
                <input style={styles.input} value={dados.nome} onChange={e=>setDados({...dados, nome: e.target.value})} required />
            </div>
            <div style={{display:'flex', gap:'15px'}}>
                <div style={{flex:1}}>
                    <label style={styles.label}>Nascimento</label>
                    <input type="date" style={styles.input} value={dados.dataNascimento} onChange={e=>setDados({...dados, dataNascimento: e.target.value})} required />
                </div>
                <div style={{flex:1}}>
                    <label style={styles.label}>Sexo</label>
                    <select style={styles.input} value={dados.sexo} onChange={e=>setDados({...dados, sexo: e.target.value})}>
                        <option value="M">Masculino (M)</option>
                        <option value="F">Feminino (F)</option>
                    </select>
                </div>
            </div>
            <button style={styles.button}>CADASTRAR ALUNO</button>
        </form>
    );
};

// ==========================================
// 2. ABA NOVA AVALIAÇÃO
// ==========================================
const TabNovaAvaliacao = ({ alunoPre }) => {
    const [aluno, setAluno] = useState(alunoPre);
    const [buscaAluno, setBuscaAluno] = useState('');
    const [listaAlunos, setListaAlunos] = useState([]);
    const [resultado, setResultado] = useState(null);

    const [form, setForm] = useState({
        peso: '', altura: '', protocolo: 'TRESDOBRAS',
        peitoral: 0, axilarMedia: 0, subescapular: 0, triceps: 0, biceps: 0,
        suprailiaca: 0, abdominal: 0, coxaAnterior: 0, panturrilhaMedial: 0
    });

    const procurarPessoa = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/usuario/Pesquisar?nome=${buscaAluno}`);
            setListaAlunos(res.data);
        } catch (error) { alert("Erro na busca."); }
    };

    const salvarAvaliacao = async (e) => {
        e.preventDefault();
        if(!aluno) return alert("Selecione um aluno!");
        if(Number(form.peso) <= 0) return alert("Peso obrigatório!");

        const payload = {
            usuarioId: aluno.id,
            dataAvaliacao: new Date().toISOString().split('T')[0],
            protocolo: form.protocolo,
            peso: Number(form.peso),
            altura: Number(form.altura),
            peitoral: Number(form.peitoral),
            abdominal: Number(form.abdominal),
            coxaAnterior: Number(form.coxaAnterior),
            triceps: Number(form.triceps),
            suprailiaca: Number(form.suprailiaca),
            axilarMedia: Number(form.axilarMedia),
            subescapular: Number(form.subescapular),
            biceps: Number(form.biceps),
            panturrilhaMedial: Number(form.panturrilhaMedial)
        };

        try {
            const res = await axios.post('http://localhost:8080/avaliacoes', payload);
            setResultado(res.data);
            setListaAlunos([]);
        } catch (err) {
            alert("Erro ao salvar. Verifique os dados.");
        }
    };

    if(resultado) return (
        <div style={{ textAlign: 'center', padding: '40px', background: '#d4edda', borderRadius: '10px', color: '#155724' }}>
            <h1>🎉 Avaliação Salva!</h1>
            <h2 style={{fontSize: '3.5em', margin: '15px 0', color: '#28a745'}}>
                {resultado.resultadoPercentualGordura ? resultado.resultadoPercentualGordura.toFixed(2) : '--'}%
            </h2>
            <p>Gordura Corporal</p>
            <div style={{background: 'white', padding: '20px', borderRadius: '8px', display: 'inline-block', marginTop: '10px'}}>
                <p style={{margin:0, fontWeight: 'bold'}}>Classificação</p>
                <p style={{margin:'5px 0 0 0', color: '#007bff', fontSize: '1.5em', fontWeight: 'bold'}}>{resultado.classificacao}</p>
            </div>
            <br/><br/>
            <button onClick={() => { setResultado(null); setForm({...form, peso:'', altura:''}); }} style={{...styles.button, background:'#155724', width: 'auto'}}>Nova Avaliação</button>
        </div>
    );

    return (
        <div>
            <h3>📝 Nova Avaliação</h3>
            {!aluno ? (
                <div style={styles.cardBusca}>
                    <label style={styles.label}>1. Selecione o Aluno</label>
                    <div style={{display:'flex', gap:'10px'}}>
                        <input style={styles.input} placeholder="Nome..." value={buscaAluno} onChange={e=>setBuscaAluno(e.target.value)} />
                        <button onClick={procurarPessoa} style={{...styles.button, width:'auto', marginTop:0, background:'#17a2b8'}}>🔍 Buscar</button>
                    </div>
                    {listaAlunos.length > 0 && (
                        <div style={{marginTop: '10px', background: 'white', border: '1px solid #ddd', maxHeight: '150px', overflowY: 'auto'}}>
                            {listaAlunos.map(u => (
                                <div key={u.id} onClick={()=>setAluno(u)} style={{padding:'10px', borderBottom:'1px solid #eee', cursor:'pointer'}}>
                                    <strong>{u.nome}</strong>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div style={{background:'#cce5ff', padding:'15px', borderRadius:'5px', marginBottom:'20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{color: '#004085', fontWeight:'bold'}}>👤 Aluno: {aluno.nome}</span>
                    <button onClick={()=>setAluno(null)} style={{background:'white', border:'1px solid red', color:'red', cursor:'pointer', fontWeight:'bold', padding: '5px 10px'}}>Trocar</button>
                </div>
            )}
            <form onSubmit={salvarAvaliacao}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Protocolo</label>
                    <select style={styles.input} value={form.protocolo} onChange={e=>setForm({...form, protocolo: e.target.value})}>
                        <option value="TRESDOBRAS">Pollock 3 Dobras</option>
                        <option value="SETEDOBRAS">Pollock 7 Dobras</option>
                    </select>
                </div>
                <div style={{display:'flex', gap:'15px'}}>
                    <div style={{flex:1}}><label style={styles.label}>Peso (kg)</label><input type="number" step="0.1" style={styles.input} value={form.peso} onChange={e=>setForm({...form, peso: e.target.value})} required /></div>
                    <div style={{flex:1}}><label style={styles.label}>Altura (m)</label><input type="number" step="0.01" style={styles.input} value={form.altura} onChange={e=>setForm({...form, altura: e.target.value})} required /></div>
                </div>
                <h4 style={{marginTop:'20px', color:'#555', borderBottom:'1px solid #eee'}}>Medidas (mm)</h4>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                    <input type="number" placeholder="Peitoral" style={styles.input} onChange={e=>setForm({...form, peitoral: e.target.value})} />
                    <input type="number" placeholder="Abdominal" style={styles.input} onChange={e=>setForm({...form, abdominal: e.target.value})} />
                    <input type="number" placeholder="Coxa" style={styles.input} onChange={e=>setForm({...form, coxaAnterior: e.target.value})} />
                    <input type="number" placeholder="Tríceps" style={styles.input} onChange={e=>setForm({...form, triceps: e.target.value})} />
                    <input type="number" placeholder="Supra" style={styles.input} onChange={e=>setForm({...form, suprailiaca: e.target.value})} />
                    <input type="number" placeholder="Axilar" style={styles.input} onChange={e=>setForm({...form, axilarMedia: e.target.value})} />
                    <input type="number" placeholder="Subescapular" style={styles.input} onChange={e=>setForm({...form, subescapular: e.target.value})} />
                </div>
                <button type="submit" style={styles.button}>CALCULAR</button>
            </form>
        </div>
    );
};

// ==========================================
// 3. ABA HISTÓRICO (AGORA COM DETALHES)
// ==========================================
const TabHistorico = () => {
    const [lista, setLista] = useState([]);
    const [termo, setTermo] = useState('');
    const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null); // Para o Modal

    const carregarTudo = async () => {
        try {
            const res = await axios.get('http://localhost:8080/avaliacoes');
            setLista(res.data);
        } catch (error) { console.error(error); }
    };

    const buscarHistorico = async () => {
        if(!termo) return carregarTudo();
        try {
            const res = await axios.get(`http://localhost:8080/avaliacoes/buscar?nome=${termo}`);
            setLista(res.data);
        } catch(e){ alert("Erro na busca"); }
    };

    useEffect(() => { carregarTudo(); }, []);

    return (
        <div>
            <h3>📂 Histórico de Avaliações</h3>
            <div style={styles.cardBusca}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={styles.input} placeholder="Filtrar por nome..." value={termo} onChange={e => setTermo(e.target.value)} />
                    <button onClick={buscarHistorico} style={{...styles.button, width:'auto', marginTop:0, background:'#007bff'}}>🔍 Buscar</button>
                    <button onClick={carregarTudo} style={{...styles.button, width:'auto', marginTop:0, background:'#6c757d'}}>🔄 Atualizar</button>
                </div>
            </div>
            
            <div style={{overflowX: 'auto'}}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Data</th>
                            <th style={styles.th}>Aluno</th>
                            <th style={styles.th}>Gordura %</th>
                            <th style={styles.th}>Classificação</th>
                            <th style={styles.th}>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(av => (
                            <tr key={av.id}>
                                <td style={styles.td}>{av.dataAvaliacao ? new Date(av.dataAvaliacao).toLocaleDateString('pt-BR') : '-'}</td>
                                <td style={styles.td}>{av.usuario ? av.usuario.nome : 'Desconhecido'}</td>
                                <td style={styles.td}><strong>{av.resultadoPercentualGordura?.toFixed(2)}%</strong></td>
                                <td style={styles.td}>{av.classificacao}</td>
                                <td style={styles.td}>
                                    <button 
                                        onClick={() => setAvaliacaoSelecionada(av)} 
                                        style={{padding:'5px 10px', background:'#17a2b8', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}
                                    >
                                        👁️ Ver Detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {lista.length === 0 && <p style={{textAlign:'center', color:'#888', padding:'20px'}}>Nenhuma avaliação encontrada.</p>}
            </div>

            {/* MODAL DE DETALHES */}
            {avaliacaoSelecionada && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h3 style={{margin:0}}>Detalhes da Avaliação</h3>
                            <button onClick={()=>setAvaliacaoSelecionada(null)} style={styles.closeBtn}>&times;</button>
                        </div>
                        
                        <div style={{marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #eee'}}>
                            <p><strong>Aluno:</strong> {avaliacaoSelecionada.usuario?.nome}</p>
                            <p><strong>Data:</strong> {new Date(avaliacaoSelecionada.dataAvaliacao).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Protocolo:</strong> {avaliacaoSelecionada.protocolo}</p>
                        </div>

                        <h4 style={{margin:'10px 0'}}>📏 Antropometria</h4>
                        <div style={styles.detailGrid}>
                            <span><strong>Peso:</strong> {avaliacaoSelecionada.peso} kg</span>
                            <span><strong>Altura:</strong> {avaliacaoSelecionada.altura} m</span>
                            <span><strong>IMC:</strong> {(avaliacaoSelecionada.peso / (avaliacaoSelecionada.altura * avaliacaoSelecionada.altura)).toFixed(2)}</span>
                        </div>

                        <h4 style={{margin:'15px 0 10px 0'}}>🤏 Dobras Cutâneas (mm)</h4>
                        <div style={styles.detailGrid}>
                            <span><strong>Peitoral:</strong> {avaliacaoSelecionada.peitoral || 0}</span>
                            <span><strong>Abdominal:</strong> {avaliacaoSelecionada.abdominal || 0}</span>
                            <span><strong>Coxa:</strong> {avaliacaoSelecionada.coxaAnterior || 0}</span>
                            <span><strong>Tríceps:</strong> {avaliacaoSelecionada.triceps || 0}</span>
                            <span><strong>Suprailíaca:</strong> {avaliacaoSelecionada.suprailiaca || 0}</span>
                            <span><strong>Axilar Média:</strong> {avaliacaoSelecionada.axilarMedia || 0}</span>
                            <span><strong>Subescapular:</strong> {avaliacaoSelecionada.subescapular || 0}</span>
                            <span><strong>Panturrilha:</strong> {avaliacaoSelecionada.panturrilhaMedial || 0}</span>
                            <span><strong>Bíceps:</strong> {avaliacaoSelecionada.biceps || 0}</span>
                        </div>

                        <div style={{marginTop:'20px', textAlign:'center', background:'#d4edda', padding:'15px', borderRadius:'5px', color:'#155724'}}>
                            <h2>{avaliacaoSelecionada.resultadoPercentualGordura?.toFixed(2)}% Gordura</h2>
                            <p style={{margin:0}}>{avaliacaoSelecionada.classificacao}</p>
                        </div>

                        <button onClick={()=>setAvaliacaoSelecionada(null)} style={{...styles.button, background:'#6c757d', marginTop:'20px'}}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ==========================================
// APP PRINCIPAL
// ==========================================
const SistemaAvaliacao = () => {
    const [aba, setAba] = useState('cadastro');
    const [alunoNovo, setAlunoNovo] = useState(null);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{margin:0}}>🏋️‍♂️ Sistema de Avaliação Física</h2>
            </div>
            <div style={styles.tabHeader}>
                <button style={styles.tabButton(aba==='cadastro')} onClick={()=>setAba('cadastro')}>Cadastrar Aluno</button>
                <button style={styles.tabButton(aba==='avaliacao')} onClick={()=>setAba('avaliacao')}>Nova Avaliação</button>
                <button style={styles.tabButton(aba==='historico')} onClick={()=>setAba('historico')}>Histórico</button>
            </div>
            <div style={styles.content}>
                {aba === 'cadastro' && <TabCadastro aoSucesso={(u) => { setAlunoNovo(u); setAba('avaliacao'); }} />}
                {aba === 'avaliacao' && <TabNovaAvaliacao alunoPre={alunoNovo} />}
                {aba === 'historico' && <TabHistorico />}
            </div>
        </div>
    );
};

export default SistemaAvaliacao;