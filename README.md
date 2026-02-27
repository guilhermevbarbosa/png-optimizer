# PNG Otimizer 🖼️

Uma ferramenta simples e eficiente para **comprimir e otimizar imagens PNG** em lote, preservando a qualidade visual com redução significativa de tamanho de arquivo.

## 📋 Funcionalidades

- ✅ **Compressão em lote**: Processa múltiplas imagens PNG de uma vez
- ✅ **Backup automático**: Preserva as imagens originais em pasta segura
- ✅ **Otimização inteligente**: Redução agressiva de tamanho usando paleta de cores
- ✅ **Relatório detalhado**: Mostra economia de espaço por arquivo e total
- ✅ **Tratamento de erros**: Continua processando mesmo se houver falha em uma imagem

## 🛠️ Requisitos

- **Node.js** 14.0.0 ou superior
- **npm** (gerenciador de pacotes do Node.js)

## 📦 Instalação

1. Clone ou baixe o projeto:
```bash
git clone https://github.com/seu-usuario/png-optimizer.git
cd png-optimizer
```

2. Instale as dependências:
```bash
npm install
```

Ou use o script de setup:
```bash
npm run setup
```

## 🚀 Como Usar

### 1. Coloque suas imagens PNG na pasta `/imagens`

```
png-optimizer/
├── imagens/
│   ├── foto1.png
│   ├── logo.png
│   └── screenshot.png
├── backup/
├── otimizadas/
└── png-otimizer.js
```

### 2. Execute o script:

```bash
npm start
```

Ou diretamente:
```bash
npm run otimizar
```

### 3. Verifique os resultados

As imagens otimizadas estarão em `/otimizadas` e o backup das originais em `/backup`.

## 📊 Exemplo de Saída

```
🚀 Iniciando otimização de 3 imagens...

✅ foto1.png | -45.2%
✅ logo.png | -38.7%
✅ screenshot.png | -52.1%

--- RESULTADO FINAL ---
📦 Espaço total economizado: 12.34 MB
📉 Redução média: 45.3%
✨ Originais preservados na pasta /backup
```

## 📁 Estrutura do Projeto

```
png-optimizer/
├── png-otimizer.js           # Script principal
├── package.json              # Configuração do projeto
├── README.md                 # Este arquivo
├── imagens/                  # 📥 Coloque suas imagens aqui
├── backup/                   # 🔒 Backup automático das originais
└── otimizadas/              # 📤 Imagens otimizadas
```

## ⚙️ Configuração Avançada

Para modificar a qualidade e compressão, edite `png-otimizer.js`:

```javascript
.png({ 
  palette: true,           // Usar paleta de cores (melhora compressão)
  quality: 80,            // Qualidade de 1-100 (menor = mais compressão)
  compressionLevel: 9     // Nível de compressão de 1-9 (9 = máximo)
})
```

> ⚠️ **Dica**: Valores mais baixos de `quality` resultam em maior compressão, mas podem afetar a qualidade visual.

## 📦 Dependências

- **[sharp](https://sharp.pixelplumbing.com/)** ^0.34.5 - Biblioteca de processamento de imagens de alto desempenho

## 👤 Autor

**Guilherme Vinicius Barbosa**

## 📄 Licença

ISC

## 💡 Dicas Úteis

- Se encontrar erro de permissão, execute como administrador
- Para imagens muito grandes, aumente o `quality` para evitar perda de qualidade
- O backup é essencial; sempre mantenha um em local seguro
- Teste com uma ou duas imagens antes de processar lotes grandes

## 🐛 Troubleshooting

**Problema**: Erro ao instalar sharp
- **Solução**: Certifique-se de ter o Node.js e build tools instalados

**Problema**: Nenhuma imagem foi processada
- **Solução**: Verifique se as imagens estão em `/imagens` e possuem extensão `.png`

**Problema**: Arquivo não encontrado
- **Solução**: Execute o script do diretório raiz do projeto

---

Feito com ❤️ - Otimize suas imagens com facilidade!
