import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="group h-full border-border/60 bg-card/60 transition-all duration-base ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-[0_0_0_1px_var(--primary)_inset,0_12px_32px_-16px_var(--primary)]">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-base ease-out group-hover:scale-110">
          <Icon className="size-5" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
