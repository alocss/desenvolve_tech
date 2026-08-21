import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CaseCard({
  title,
  summary,
  tags,
  image,
}: {
  title: string;
  summary: string;
  tags: string[];
  image?: string;
}) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/60 py-0">
      {image ? (
        <div className="relative aspect-video w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted/50" />
      )}
      <CardHeader className="pt-6">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <CardDescription className="text-sm leading-relaxed">{summary}</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
