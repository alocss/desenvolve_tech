import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/portfolio', label: 'Portfólio' },
  { href: '/sobre', label: 'Sobre' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" aria-label="Desenvolve Tech" className="flex items-center">
          <Image
            src="/brand/logo-official.png"
            alt="Desenvolve Tech"
            width={289}
            height={92}
            priority
            className="h-7 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm" render={<Link href="/contato" />} nativeButton={false}>
            Contato
          </Button>
        </nav>
      </div>
    </header>
  );
}
