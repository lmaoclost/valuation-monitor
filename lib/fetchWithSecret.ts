export async function fetchWithSecret(path: string, options?: RequestInit) {
  if (typeof window !== "undefined") {
    throw new Error("fetchWithSecret só pode ser usado no servidor");
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      "x-app-secret": process.env.PRIVATE_API_SECRET!,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ao chamar ${url}: ${text}`);
  }

  return res.json();
}
