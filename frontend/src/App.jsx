import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; 
import { BookOpen, Trash2, Edit, PlusCircle, LogOut, UserPlus, LogIn, X, LoaderCircle, Book, Library } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000/api';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content animate-fade-in-up">
                <header className="modal-header">
                    <h3 className="font-serif">{title}</h3>
                    <button onClick={onClose} className="modal-close-button"><X size={24} /></button>
                </header>
                <main className="modal-body">{children}</main>
            </div>
        </div>
    );
};

const FormAutor = ({ autorAtual, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ nome: '', pseudonimo: '', data_nascimento: '', data_morte: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (autorAtual) { setFormData({ nome: autorAtual.nome || '', pseudonimo: autorAtual.pseudonimo || '', data_nascimento: autorAtual.data_nascimento || '', data_morte: autorAtual.data_morte || '' });
        } else { setFormData({ nome: '', pseudonimo: '', data_nascimento: '', data_morte: '' }); }
    }, [autorAtual]);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault(); setIsLoading(true); setError('');
        try { await onSave(formData); } catch (err) { setError(err.message || 'Erro ao salvar autor.'); } finally { setIsLoading(false); }
    };
    return (
        <form onSubmit={handleSubmit} className="form-container">
            {error && <div className="error-message">{error}</div>}
            <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required />
            <input name="pseudonimo" value={formData.pseudonimo} onChange={handleChange} placeholder="Pseudónimo (opcional)" />
            <input name="data_nascimento" type="date" value={formData.data_nascimento} onChange={handleChange} required />
            <input name="data_morte" type="date" value={formData.data_morte} onChange={handleChange} />
            <footer className="form-footer">
                <button type="button" onClick={onCancel} className="button button-secondary">Cancelar</button>
                <button type="submit" disabled={isLoading} className="button button-primary">
                    {isLoading && <LoaderCircle size={18} className="animate-spin" />} Salvar
                </button>
            </footer>
        </form>
    );
};

const FormLivro = ({ livroAtual, onSave, onCancel, autores }) => {
    const [formData, setFormData] = useState({ titulo: '', subtitulo: '', ano_publicacao: '', edicao: '', autor_id: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (livroAtual) { setFormData({ titulo: livroAtual.titulo || '', subtitulo: livroAtual.subtitulo || '', ano_publicacao: livroAtual.ano_publicacao || '', edicao: livroAtual.edicao || '', autor_id: livroAtual.autor_id || '' });
        } else { setFormData({ titulo: '', subtitulo: '', ano_publicacao: '', edicao: '', autor_id: '' }); }
    }, [livroAtual, autores]);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault(); setIsLoading(true); setError('');
        try { await onSave(formData); } catch (err) { setError(err.message || 'Erro ao salvar livro.'); } finally { setIsLoading(false); }
    };
    return (
        <form onSubmit={handleSubmit} className="form-container">
            {error && <div className="error-message">{error}</div>}
            <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required />
            <input name="subtitulo" value={formData.subtitulo} onChange={handleChange} placeholder="Subtítulo (opcional)" />
            <input name="ano_publicacao" type="number" value={formData.ano_publicacao} onChange={handleChange} placeholder="Ano de Publicação" required />
            <input name="edicao" value={formData.edicao} onChange={handleChange} placeholder="Edição" required />
            <select name="autor_id" value={formData.autor_id} onChange={handleChange} required>
                <option value="" disabled>Selecione um autor</option>
                {autores.map(autor => <option key={autor.id} value={autor.id}>{autor.nome}</option>)}
            </select>
            <footer className="form-footer">
                <button type="button" onClick={onCancel} className="button button-secondary">Cancelar</button>
                <button type="submit" disabled={isLoading} className="button button-primary">
                    {isLoading && <LoaderCircle size={18} className="animate-spin" />} Salvar
                </button>
            </footer>
        </form>
    );
};

const TelaAuth = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault(); setError(null); setIsLoading(true);
        const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
        const payload = isLogin ? { email, password } : { name, email, password, password_confirmation: passwordConfirmation };
        try {
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload), });
            const data = await response.json();
            if (!response.ok) { throw new Error(data.message || (data.errors ? Object.values(data.errors).join(', ') : 'Ocorreu um erro')); }
            onLoginSuccess(data.access_token);
        } catch (err) { setError(err.message); } finally { setIsLoading(false); }
    };
    return (
        <div className="auth-screen">
            <div className="auth-card animate-fade-in-up">
                <div className="auth-card-header">
                    <BookOpen className="icon" />
                    <h2 className="font-serif">Biblioteca Clássica</h2>
                    <p>{isLogin ? 'Faça login na sua conta' : 'Crie uma nova conta'}</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />}
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    {!isLogin && <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirmar Password" required />}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : (isLogin ? <LogIn size={20}/> : <UserPlus size={20}/>)}
                        <span>{isLogin ? 'Login' : 'Registar'}</span>
                    </button>
                </form>
                <p className="auth-toggle">
                    {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                    <button onClick={() => { setIsLogin(!isLogin); setError(null); }}>
                        {isLogin ? 'Registe-se' : 'Faça login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default function App() {
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    const [autores, setAutores] = useState([]);
    const [livros, setLivros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeView, setActiveView] = useState('livros');
    const [isAutorModalOpen, setIsAutorModalOpen] = useState(false);
    const [autorEmEdicao, setAutorEmEdicao] = useState(null);
    const [isLivroModalOpen, setIsLivroModalOpen] = useState(false);
    const [livroEmEdicao, setLivroEmEdicao] = useState(null);
    
    const fetchAutenticado = useCallback(async (endpoint, options = {}) => {
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}`, ...options.headers, };
        const response = await fetch(endpoint, { ...options, headers });
        if (response.status === 401) { localStorage.removeItem('authToken'); setToken(null); throw new Error('Sessão expirada.'); }
        if (response.status === 204) { return null; }
        const data = await response.json();
        if (!response.ok) { throw new Error(data.message || 'Ocorreu um erro na API.'); }
        return data;
    }, [token]);

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            Promise.all([
                fetchAutenticado(`${API_URL}/user`),
                fetchAutenticado(`${API_URL}/autores`),
                fetchAutenticado(`${API_URL}/livros`),
            ]).then(([userData, autoresData, livrosData]) => {
                setUser(userData);
                setAutores(autoresData || []);
                setLivros(livrosData || []);
            }).catch(console.error).finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [token, fetchAutenticado]);
    
    const handleLoginSuccess = (newToken) => { localStorage.setItem('authToken', newToken); setToken(newToken); };
    const handleLogout = async () => {
        try { await fetchAutenticado(`${API_URL}/logout`, { method: 'POST' }); } catch (error) { console.error(error); } finally { localStorage.removeItem('authToken'); setToken(null); setUser(null); }
    };
    
    const handleSaveAutor = async (dadosAutor) => {
        const method = autorEmEdicao ? 'PUT' : 'POST';
        const endpoint = autorEmEdicao ? `${API_URL}/autores/${autorEmEdicao.id}` : `${API_URL}/autores`;
        await fetchAutenticado(endpoint, { method, body: JSON.stringify(dadosAutor) });
        const autoresAtualizados = await fetchAutenticado(`${API_URL}/autores`);
        setAutores(autoresAtualizados);
        closeAutorModal();
    };
    const openAutorModal = (autor = null) => { setAutorEmEdicao(autor); setIsAutorModalOpen(true); };
    const closeAutorModal = () => { setAutorEmEdicao(null); setIsAutorModalOpen(false); };
    const handleDeleteAutor = async (id) => {
        if (window.confirm('Tem a certeza?')) {
            await fetchAutenticado(`${API_URL}/autores/${id}`, { method: 'DELETE' });
            setAutores(autores.filter(a => a.id !== id));
        }
    };
    
    const handleSaveLivro = async (dadosLivro) => {
        const method = livroEmEdicao ? 'PUT' : 'POST';
        const endpoint = livroEmEdicao ? `${API_URL}/livros/${livroEmEdicao.id}` : `${API_URL}/livros`;
        await fetchAutenticado(endpoint, { method, body: JSON.stringify({...dadosLivro, generos_ids: []}) }); // Manda generos_ids vazio
        const livrosAtualizados = await fetchAutenticado(`${API_URL}/livros`);
        setLivros(livrosAtualizados);
        closeLivroModal();
    };
    const openLivroModal = (livro = null) => { setLivroEmEdicao(livro); setIsLivroModalOpen(true); };
    const closeLivroModal = () => { setLivroEmEdicao(null); setIsLivroModalOpen(false); };
    const handleDeleteLivro = async (id) => {
        if (window.confirm('Tem a certeza?')) {
            await fetchAutenticado(`${API_URL}/livros/${id}`, { method: 'DELETE' });
            setLivros(livros.filter(l => l.id !== id));
        }
    };
    
    if (isLoading) {
        return <div className="loading-screen"><LoaderCircle size={48} className="animate-spin"/></div>
    }

    if (!token) {
        return <TelaAuth onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-title">
                    <BookOpen size={28} />
                    <h1 className="font-serif">Biblioteca Clássica</h1>
                </div>
                <div className="header-user-info">
                    <span className="user-name">Olá, {user?.name}</span>
                    <button onClick={handleLogout} className="logout-button">
                        <LogOut size={16} /><span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="main-content">
                <nav className="main-nav">
                    <button onClick={() => setActiveView('livros')} className={activeView === 'livros' ? 'active' : ''}>
                        <Book size={18}/> Livros
                    </button>
                    <button onClick={() => setActiveView('autores')} className={activeView === 'autores' ? 'active' : ''}>
                        <Library size={18}/> Autores
                    </button>
                </nav>

                {activeView === 'livros' && (
                    <div>
                        <div className="page-header">
                            <h2 className="font-serif">Livros</h2>
                            <button onClick={() => openLivroModal()} className="button button-primary">
                                <PlusCircle size={20} /> Adicionar Livro
                            </button>
                        </div>
                        <div className="card-grid">
                            {livros.length > 0 ? livros.map(livro => (
                                <div key={livro.id} className="card">
                                    <div className="card-content">
                                        <p className="card-title">{livro.titulo}</p>
                                        <p className="card-subtitle">{livro.autor?.nome}</p>
                                    </div>
                                    <div className="card-actions">
                                        <button onClick={() => openLivroModal(livro)}><Edit size={18} /></button>
                                        <button onClick={() => handleDeleteLivro(livro.id)} className="delete"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            )) : <p className="empty-message">Nenhum livro encontrado.</p>}
                        </div>
                    </div>
                )}
                
                {activeView === 'autores' && (
                     <div>
                        <div className="page-header">
                            <h2 className="font-serif">Autores</h2>
                            <button onClick={() => openAutorModal()} className="button button-primary">
                                <PlusCircle size={20} /> Adicionar Autor
                            </button>
                        </div>
                        <div className="card-grid">
                            {autores.length > 0 ? autores.map(autor => (
                                <div key={autor.id} className="card">
                                    <div className="card-content">
                                        <p className="card-title">{autor.nome}</p>
                                        <p className="card-subtitle">{autor.pseudonimo}</p>
                                        <p className="card-meta">{`Nasc: ${autor.data_nascimento} ${autor.data_morte ? ' | Fal: '+autor.data_morte : ''}`}</p>
                                    </div>
                                    <div className="card-actions">
                                        <button onClick={() => openAutorModal(autor)}><Edit size={18} /></button>
                                        <button onClick={() => handleDeleteAutor(autor.id)} className="delete"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            )) : <p className="empty-message">Nenhum autor encontrado.</p>}
                        </div>
                    </div>
                )}
            </main>
            
            <Modal isOpen={isAutorModalOpen} onClose={closeAutorModal} title={autorEmEdicao ? 'Editar Autor' : 'Adicionar Autor'}>
                <FormAutor autorAtual={autorEmEdicao} onSave={handleSaveAutor} onCancel={closeAutorModal}/>
            </Modal>
            
            <Modal isOpen={isLivroModalOpen} onClose={closeLivroModal} title={livroEmEdicao ? 'Editar Livro' : 'Adicionar Livro'}>
                <FormLivro livroAtual={livroEmEdicao} onSave={handleSaveLivro} onCancel={closeLivroModal} autores={autores} />
            </Modal>
        </div>
    );
}
