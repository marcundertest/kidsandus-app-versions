'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface VersionBadgeProps {
  version: string;
  className?: string;
}

export function VersionBadge({ version, className }: VersionBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(version);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy version:', err);
    }
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'hover:bg-muted-foreground/20 cursor-pointer transition-all duration-200 active:scale-95',
        copied && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        className
      )}
      onClick={handleCopy}
      title="Click to copy version"
    >
      <span className={cn('flex items-center gap-1.5', copied && 'font-semibold')}>
        {copied ? (
          <>
            <Check className="h-3 w-3" />
            Copied!
          </>
        ) : (
          version
        )}
      </span>
    </Badge>
  );
}
