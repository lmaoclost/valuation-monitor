let cachedRisk: number | null = null;
let lastFetchTime: number | null = null;

export async function getRisk(): Promise<number | null> {
  const CACHE_DURATION = 600 * 1000; // 10 minutos em milissegundos
  const now = Date.now();

  if (cachedRisk !== null && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return cachedRisk;
  }

  // Caso contrário, recalcula
  const risk = await fetchAndCalculateRisk(); // Sua lógica atual
  cachedRisk = risk;
  lastFetchTime = now;

  return cachedRisk;
}

async function fetchAndCalculateRisk(): Promise<number | null> {
  const ipcaUrl = "http://localhost:3000/api/fetch-ipca"; // Rota para IPCA
  const erpUrl = "http://localhost:3000/api/fetch-erp"; // Rota para ERP

  try {
    // Chamar as rotas simultaneamente
    const [ipcaResponse, erpResponse] = await Promise.all([
      fetch(ipcaUrl, {
        next: { revalidate: 600 }
      }),
      fetch(erpUrl, {
        next: { revalidate: 600 }
      }),
    ]);

    // Verificar se ambas as respostas são válidas
    if (!ipcaResponse.ok || !erpResponse.ok) {
      throw new Error("Erro ao buscar dados de IPCA ou ERP.");
    }

    // Extrair os valores das respostas
    const ipcaData = await ipcaResponse.json();
    const erpData = await erpResponse.json();

    const ipca = ipcaData.ipca ?? null;
    const erp = erpData.erp ?? null;

    if (ipca === null || erp === null) {
      throw new Error("Dados inválidos retornados das rotas.");
    }

    // Retornar a soma
    return ipca + erp;
  } catch (error) {
    console.error("Erro ao buscar e somar IPCA e ERP:", error);
    return null;
  }
}
