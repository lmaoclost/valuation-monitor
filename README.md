# Valuation Monitor

O **Valuation Monitor** é uma aplicação construída em **Next.js** com o objetivo de auxiliar investidores a **filtrar ações** da bolsa de valores utilizando **indicadores clássicos de valuation**.

A proposta do projeto não é recomendar compra ou venda de ativos, mas sim **servir como um radar fundamentalista**, ajudando o investidor a decidir **quais ações merecem uma análise mais profunda**, especialmente quando combinadas com **análise gráfica posterior**.

---

## 🎯 Objetivo do Projeto

Facilitar a análise inicial de ações a partir de:

* Dados fundamentalistas obtidos via **CSV do Status Invest**
* Indicadores adicionais coletados por **raspagem de dados**
* Cálculo de preços justos com base em modelos consagrados

Tudo isso com foco em **investimento em valor (Value Investing)**, mantendo uma abordagem conservadora e transparente.

---

## 📊 Indicadores Utilizados

O projeto calcula e exibe parâmetros baseados em metodologias clássicas:

### 🔹 Desconto de Bazin

Utiliza dividendos históricos para estimar um preço justo baseado em retorno desejado.

### 🔹 Modelo de Graham

Avalia o preço justo considerando lucro por ação (LPA) e valor patrimonial por ação (VPA).

### 🔹 Modelo de Gordon (Dividend Discount Model)

Projeta o valor da ação com base no crescimento esperado dos dividendos.

> ⚠️ Importante: Todos os cálculos são **estimativas** e dependem diretamente da qualidade dos dados de entrada.

---

## 👥 Público-Alvo

* Investidores pessoa física
* Interessados em **value investing**
* Usuários que já possuem noções básicas de mercado financeiro

Este projeto **não é voltado para traders de curto prazo** nem para iniciantes absolutos.

---

## 🚫 O Que Este Projeto NÃO Faz

* ❌ Não fornece recomendações de compra ou venda
* ❌ Não substitui análise gráfica
* ❌ Não substitui avaliação de riscos individuais
* ❌ Não garante rentabilidade ou previsões de mercado

O uso da ferramenta é de **inteira responsabilidade do usuário**.

---

## 🧱 Arquitetura Geral

De forma simplificada, o fluxo do projeto é:

1. Entrada de dados via CSV (Status Invest)
2. Coleta complementar de dados via scraping
3. Processamento e cálculo dos indicadores
4. Exibição dos resultados para análise do usuário

A aplicação foi estruturada para manter **separação clara entre coleta, processamento e visualização**.

---

## 🛠️ Tecnologias Utilizadas

* **Next.js**
* **TypeScript**
* Processamento de CSV
* Raspagem de dados (web scraping)

---

## ▶️ Como Executar o Projeto

```bash
# instalar dependências
npm install

# rodar em ambiente de desenvolvimento
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## 📌 Limitações Conhecidas

* Dependência de fontes externas (CSV e sites raspados)
* Mudanças nos sites podem quebrar o scraping
* Resultados dependem da atualização e consistência dos dados

---

## 📈 Próximos Passos (Ideias Futuras)

* Melhorar tratamento de erros na coleta de dados
* Histórico de resultados por ativo
* Comparação entre múltiplos ativos
* Exportação dos dados analisados

---

## 📄 Aviso Legal

Este projeto possui **caráter educacional e informativo**.

Nenhuma informação apresentada deve ser interpretada como recomendação de investimento. Sempre faça sua própria análise e, se necessário, consulte um profissional certificado.
