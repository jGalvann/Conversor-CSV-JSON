import { useState } from 'react'
import './App.css'

function App() {
  const [csv, setCsv] = useState('')
  const [jsonResult, setJsonResult] = useState('')
  
  const conversorCsvParaJson = () => {

    try {

      const conteudo = csv.trim();
      if (!conteudo) return alert("O campo está vazio. Insira um conteúdo válido!");

      const linhas = conteudo.split('\n');
      const cabecalho = linhas[0].split(',').map(item => item.trim());

      const dados = linhas.slice(1).map(linha => {
        const valores = linha.split(',');

      return cabecalho.reduce((objeto, cabecalho, index) => {
          objeto[cabecalho] = valores[index]?.trim() || "";
          return objeto;
        }, {});
      });
      
      setJsonResult(JSON.stringify(dados, null, 2));

    } catch (error) {
      alert("Não deu boa, verifique o formato do arquivo aí");
    }
  }

  return (
    <div className="container">
      <h1>Conversor de CSV para JSON</h1>

      <div className='input-area'>
        <textarea
          placeholder='Cole seu CSV aqui...'
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />
      
      <div className='button-area'>
        <button onClick={conversorCsvParaJson}>Converter</button>
        <button onClick={() => {setCsv(''); setJsonResult('')}} className="btn-limpar">Limpar</button>
      </div>

      {jsonResult && (
        <pre className="resultado">
          <code>{jsonResult}</code>
        </pre>
        )}
      </div>
    </div>
  )
}

export default App
