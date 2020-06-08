import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item{
    id: number;
    nome: string;
    caminho_imagem: string;
}

interface IbgeUfResponse{
    sigla: string;
}

interface IbgeCidadeResponse{
    nome: string;
}

const CreatePoint = () => {
    const [itens, setItens] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cidades, setCidades] = useState<string[]>([]);

    const [posicaoInicial, setPosicaoInicial] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        numero: ''
    });

    const [ufSelecionada, setUfSelecionada] = useState('0');
    const [cidadeSelecionada, setCidadeSelecionada] = useState('0');
    const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
    const [posicaoSelecionada, setPosicaoSelecionada] = useState<[number, number]>([0, 0]);
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File>();

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setPosicaoInicial([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        api.get('itens').then(response => {
            setItens(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const siglasUf = response.data.map(uf => uf.sigla);

            setUfs(siglasUf);
        });
    }, []);

    useEffect(() => {
        if (ufSelecionada ==='0'){
            return;
        }

        axios.get<IbgeCidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios`)
             .then(response => {
            const nomesCidade = response.data.map(cidade => cidade.nome);

            setCidades(nomesCidade);
        });
    }, [ufSelecionada]);

    function handleSelecionaUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        setUfSelecionada(uf);
    }

    function handleSelecionaCidade(event: ChangeEvent<HTMLSelectElement>){
        const cidade = event.target.value;
        setCidadeSelecionada(cidade);
    }

    function handleMapClick(event: LeafletMouseEvent){
        setPosicaoSelecionada([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number){
        const jaSelecionou = itensSelecionados.findIndex(item => item === id);
        if(jaSelecionou >= 0){
            let arrayNovo = itensSelecionados.filter(item => item !== id);
            setItensSelecionados(arrayNovo);
        } else {
            setItensSelecionados([ ...itensSelecionados, id ]);
        }
        
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const { nome, email, numero } = formData;
        const uf = ufSelecionada;
        const cidade = cidadeSelecionada;
        const [ latitude, longitude ] = posicaoSelecionada;
        const itens = itensSelecionados;

        const data = new FormData();

        data.append('nome', nome);
        data.append('email', email);
        data.append('numero', numero);
        data.append('uf', uf);
        data.append('cidade', cidade);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('itens', itens.join(','));

        if (arquivoSelecionado) {
            data.append('image', arquivoSelecionado);
        }

        await api.post('pontos', data);
        alert('ponto de coleta criado!');
        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={ logo } alt="Ecoleta"/>
                
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <Dropzone onFileUploaded={setArquivoSelecionado}/>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="nome">Nome da entidade</label>  
                        <input 
                            type="text"
                            name="nome"
                            id="nome"
                            onChange={handleInputChange}
                        />   
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>  
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />   
                        </div>
                        <div className="field">
                            <label htmlFor="numero">Whatsapp</label>  
                            <input 
                                type="text"
                                name="numero"
                                id="numero"
                                onChange={handleInputChange}
                            />   
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Seleione o endereço no mapa</span>
                    </legend>

                    <Map center={posicaoInicial} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={posicaoSelecionada} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" 
                                    id="uf" 
                                    value={ufSelecionada} 
                                    onChange={handleSelecionaUf}>
                                <option value="0">Selecione uma Uf</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select name="cidade" 
                                    id="cidade"
                                    value={cidadeSelecionada} 
                                    onChange={handleSelecionaCidade}
                                    >
                                <option value="0">Selecione uma cidade</option>
                                {cidades.map(cidade => (
                                    <option key={cidade} value={cidade}>{cidade}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Seleione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {itens.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={itensSelecionados.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={ item.caminho_imagem } alt={ item.nome }/>
                                <span>{ item.nome }</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
}

export default CreatePoint;