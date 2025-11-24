export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
      <h1>Bem-vindo(a) à sua Tierlist de Filmes</h1>
      {children}
    </main>
  );
}