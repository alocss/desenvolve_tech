export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} Desenvolve Tech. Todos os direitos reservados.</p>
        <a
          href="mailto:contato@desenvolvetech.com.br"
          className="transition-colors duration-fast ease-out hover:text-foreground"
        >
          contato@desenvolvetech.com.br
        </a>
      </div>
    </footer>
  );
}
