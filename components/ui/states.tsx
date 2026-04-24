"use client";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-body text-muted-foreground">Carregando dados...</p>
      </div>
    </div>
  );
}

export function ErrorState({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="text-center space-y-2">
        <p className="font-body text-destructive">Erro ao carregar dados</p>
        <p className="font-mono text-xs text-muted-foreground">
          {error.message}
        </p>
      </div>
    </div>
  );
}
