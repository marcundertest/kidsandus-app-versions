'use client';

import { Check, CircleCheck, CircleX, Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ThemeToggle } from '@/components/ThemeToggle';
import { VersionBadge } from '@/components/VersionBadge';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';

// ─── Small layout helpers ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground border-border mb-4 border-b pb-2 text-[0.6875rem] font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn('text-[1.125rem] leading-tight font-semibold tracking-[-0.015em]', className)}
    >
      {children}
    </h2>
  );
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground mb-7 text-[0.8125rem]">{children}</p>;
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-foreground rounded-sm px-1.5 py-0.5 font-mono text-[0.8125rem]">
      {children}
    </code>
  );
}

function TypeMeta({ children }: { children: React.ReactNode }) {
  return <div className="text-muted-foreground mt-1 font-mono text-[0.6875rem]">{children}</div>;
}

// ─── Reusable demo building blocks ───────────────────────────────────────────

interface ColorSwatchProps {
  name: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  borderOnPreview?: boolean;
}

function ColorSwatch({ name, cssVar, lightValue, darkValue, borderOnPreview }: ColorSwatchProps) {
  return (
    <div className="border-border overflow-hidden rounded-(--radius) border">
      <div
        className={cn('h-16 w-full', borderOnPreview && 'border-border border-b')}
        style={{ background: `hsl(var(${cssVar}))` }}
      />
      <div className="bg-card px-2.5 py-2">
        <div className="text-xs font-medium">{name}</div>
        <div className="text-muted-foreground mt-px font-mono text-[0.6875rem]">{cssVar}</div>
        <div className="text-muted-foreground font-mono text-[0.6875rem]">Light: {lightValue}</div>
        <div className="text-muted-foreground font-mono text-[0.6875rem]">Dark: {darkValue}</div>
      </div>
    </div>
  );
}

interface StackCardProps {
  label: string;
  title: string;
  subtitle: string;
}

function StackCard({ label, title, subtitle }: StackCardProps) {
  return (
    <div className="bg-muted border-border rounded-(--radius) border px-3.5 py-2.5">
      <div className="text-muted-foreground mb-1.5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase">
        {label}
      </div>
      <div className="text-[0.8125rem] font-medium">{title}</div>
      <div className="text-muted-foreground font-mono text-[0.6875rem]">{subtitle}</div>
    </div>
  );
}

function AppIconDemo({ letter, size = 'sm' }: { letter: string; size?: 'sm' | 'md' }) {
  return (
    <div
      className={cn(
        'border-border bg-muted text-muted-foreground flex shrink-0 items-center justify-center rounded-md border font-bold',
        size === 'sm' ? 'h-6 w-6 text-[0.625rem]' : 'h-8 w-8 text-xs'
      )}
    >
      {letter}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StyleGuidePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ── Sticky header ── */}
      <header className="bg-background/95 sticky top-0 z-50 mx-auto max-w-225 px-4 backdrop-blur-md">
        <div className="border-border flex h-12 items-center justify-between border-b py-2 md:py-3">
          <h1 className="text-[0.9375rem] leading-[1.2] font-semibold tracking-[-0.01em]">
            Style Guide — Kids&amp;Us App Versions
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-225 px-4 pt-10">
        {/* ══════════════════════════ INTRO ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>Overview</SectionLabel>
          <h2 className="mb-2 text-[1.375rem] leading-[1.2] font-bold tracking-[-0.02em]">
            Design Tokens &amp; Components
          </h2>
          <p className="text-muted-foreground mb-5 max-w-140 text-sm leading-relaxed">
            Extracted directly from <Mono>globals.css</Mono> and the component source. Reference for
            replicating this visual system in future projects.
          </p>
          <div className="grid max-w-175 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
            <StackCard
              label="Framework"
              title="Next.js 16.1.6"
              subtitle="React 19 · TypeScript 5"
            />
            <StackCard
              label="Styles"
              title="Tailwind CSS v4"
              subtitle="@tailwindcss/postcss · tailwindcss-animate"
            />
            <StackCard
              label="Components"
              title="shadcn/ui (generated)"
              subtitle="radix-ui ^1.4.3 · cva ^0.7.1 · clsx ^2.1.1 · tailwind-merge ^3.4.0"
            />
            <StackCard
              label="Typography"
              title="Inter · JetBrains Mono"
              subtitle="next/font/google — variable: --font-inter"
            />
            <StackCard
              label="Icons"
              title="Lucide React ^0.563.0"
              subtitle="import { Sun, Moon, Check } from 'lucide-react'"
            />
            <StackCard
              label="Notifications"
              title="Sonner ^2.0.7"
              subtitle="<Toaster richColors /> in layout.tsx"
            />
          </div>
        </div>

        {/* ══════════════════════════ 01 COLORS ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>01 — Color Tokens</SectionLabel>
          <SectionTitle>Palette</SectionTitle>
          <SectionDesc>
            All colors are HSL CSS variables. Light and dark values are both documented here —
            toggle the theme button in the header to preview.
          </SectionDesc>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            <ColorSwatch
              name="Background"
              cssVar="--background"
              lightValue="0 0% 100%"
              darkValue="240 10% 3.9%"
              borderOnPreview
            />
            <ColorSwatch
              name="Foreground"
              cssVar="--foreground"
              lightValue="222.2 84% 4.9%"
              darkValue="0 0% 98%"
            />
            <ColorSwatch
              name="Primary"
              cssVar="--primary"
              lightValue="222.2 47.4% 11.2%"
              darkValue="0 0% 98%"
            />
            <ColorSwatch
              name="Secondary"
              cssVar="--secondary"
              lightValue="210 40% 96.1%"
              darkValue="240 3.7% 15.9%"
            />
            <ColorSwatch
              name="Muted"
              cssVar="--muted"
              lightValue="210 40% 96.1%"
              darkValue="240 3.7% 15.9%"
            />
            <ColorSwatch
              name="Muted Foreground"
              cssVar="--muted-foreground"
              lightValue="215.4 16.3% 46.9%"
              darkValue="240 5% 64.9%"
            />
            <ColorSwatch
              name="Border / Input"
              cssVar="--border"
              lightValue="214.3 31.8% 91.4%"
              darkValue="240 3.7% 15.9%"
            />
            <ColorSwatch
              name="Destructive"
              cssVar="--destructive"
              lightValue="0 84.2% 60.2%"
              darkValue="0 62.8% 30.6%"
            />
            {/* Success — custom utility, not a CSS var */}
            <div className="border-border overflow-hidden rounded-(--radius) border">
              <div className="h-16 w-full bg-green-100 dark:bg-green-900/30" />
              <div className="bg-card px-2.5 py-2">
                <div className="text-xs font-medium">Success (VersionBadge)</div>
                <div className="text-muted-foreground mt-px font-mono text-[0.6875rem]">
                  Custom utility
                </div>
                <div className="text-muted-foreground font-mono text-[0.6875rem]">
                  Light: green-100 / green-700
                </div>
                <div className="text-muted-foreground font-mono text-[0.6875rem]">
                  Dark: green-900/30 / green-400
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ 02 TYPOGRAPHY ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>02 — Typography</SectionLabel>
          <SectionTitle>Type Scale</SectionTitle>
          <SectionDesc>
            Base font size: <Mono>14px</Mono> set on <Mono>body</Mono>. All sizes below relative to
            that base.
          </SectionDesc>

          <div className="mb-6">
            <div className="text-[0.9375rem] leading-[1.2] font-semibold tracking-[-0.01em]">
              Page Title · H1
            </div>
            <TypeMeta>0.9375rem · 600 · tracking -0.01em · line-height 1.2</TypeMeta>
          </div>
          <div className="mb-6">
            <div className="text-[1.125rem] leading-tight font-semibold tracking-[-0.015em]">
              Section Header · H2
            </div>
            <TypeMeta>1.125rem · 600 · tracking -0.015em · line-height 1.25</TypeMeta>
          </div>
          <div className="mb-6">
            <div className="text-[0.9375rem] leading-[1.2] font-semibold tracking-[-0.01em]">
              Card Title · H3
            </div>
            <TypeMeta>0.9375rem · 600 · tracking -0.01em · line-height 1.2</TypeMeta>
          </div>
          <div className="mb-6">
            <div className="text-[0.875rem] font-semibold tracking-[-0.01em]">
              Subsection / Label · H4
            </div>
            <TypeMeta>0.875rem · 600 · tracking -0.01em</TypeMeta>
          </div>
          <div className="mb-6">
            <div className="text-sm leading-[1.6]">
              Body text. The main content font used across tables, descriptions, and content blocks.
              Legible at density.
            </div>
            <TypeMeta>0.875rem · 400 · line-height 1.6</TypeMeta>
          </div>
          <div className="mb-6">
            <div className="text-muted-foreground text-[0.8125rem]">
              Small / secondary text. Used for metadata, timestamps, and supporting labels.
            </div>
            <TypeMeta>0.8125rem · 400 · color: muted-foreground</TypeMeta>
          </div>
          <div className="mb-6">
            <div className="text-muted-foreground text-xs">
              Extra small. Footer copyright, section labels, table header notes.
            </div>
            <TypeMeta>0.75rem · 400 · color: muted-foreground</TypeMeta>
          </div>
          <div className="mb-6">
            <code className="bg-muted text-foreground rounded-sm px-1.5 py-0.5 font-mono text-[0.8125rem]">
              v1.4.2 · font-mono · version-badge class
            </code>
            <TypeMeta>
              JetBrains Mono · 0.6875rem · used in VersionBadge and .version-badge
            </TypeMeta>
          </div>

          <hr className="border-border my-8 border-0 border-t" />

          <div className="mb-3">
            <p className="text-muted-foreground mb-2 text-[0.8125rem]">
              Section label pattern — used for all section openers:
            </p>
            <p className="text-muted-foreground inline-block text-[0.6875rem] font-semibold tracking-widest uppercase">
              01 — Section Name
            </p>
            <TypeMeta>
              0.6875rem · 600 · letter-spacing 0.1em · uppercase · color: muted-fg
            </TypeMeta>
          </div>
        </div>

        {/* ══════════════════════════ 03 BUTTONS ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>03 — Buttons</SectionLabel>
          <SectionTitle>Button Variants</SectionTitle>
          <SectionDesc>
            6 variants × 6 sizes. <Mono>border-radius: --radius-md</Mono>. Focus ring: 3px offset
            using <Mono>--ring/50</Mono>.
          </SectionDesc>

          <p className="text-muted-foreground mb-2 text-xs">Variants</p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>

          <p className="text-muted-foreground mt-3 mb-2 text-xs">Sizes (Default variant)</p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Button size="lg">Large</Button>
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="xs">XSmall</Button>
          </div>

          <p className="text-muted-foreground mt-3 mb-2 text-xs">Icon buttons (Outline variant)</p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="icon-sm" title="Sun">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </Button>
            <Button variant="outline" size="icon-sm" title="Moon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon-xs" title="Small icon">
              ✕
            </Button>
          </div>

          <p className="text-muted-foreground mt-3 mb-2 text-xs">States</p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Button size="sm" disabled>
              Disabled
            </Button>
            <Button size="sm">Updating...</Button>
            <Button size="sm" variant="outline" disabled>
              Loading
            </Button>
          </div>

          <p className="text-muted-foreground mt-3 mb-2 text-xs">
            In-project usage (UpdateControl)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Update Data</Button>
            <span className="text-muted-foreground text-[0.8125rem]">
              Last update: 2025-03-12 14:30 (42m remaining)
            </span>
          </div>
        </div>

        {/* ══════════════════════════ 04 BADGES ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>04 — Badges</SectionLabel>
          <SectionTitle>Badge Variants</SectionTitle>
          <SectionDesc>
            Standard badges use <Mono>border-radius: 9999px</Mono>. VersionBadge uses{' '}
            <Mono>--radius-md</Mono> and <Mono>font-mono</Mono>.
          </SectionDesc>

          <p className="text-muted-foreground mb-2 text-xs">Standard variants</p>
          <div className="mb-4 flex flex-wrap items-start gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>

          <p className="text-muted-foreground mb-2 text-xs">
            VersionBadge — click to copy interaction
          </p>
          <div className="flex flex-wrap items-start gap-3">
            <VersionBadge version="1.4.2" />
            <VersionBadge version="23.11.0" />
            <VersionBadge version="6.0.1" />
            {/* Static "already copied" state for reference */}
            <Badge
              variant="secondary"
              className="cursor-default bg-green-100 font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3" />
                Copied!
              </span>
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2 text-[0.6875rem]">
            Clicked → bg: green-100 · text: green-700 · font-semibold · scale-95 active
          </p>
        </div>

        {/* ══════════════════════════ 05 CARDS ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>05 — Cards</SectionLabel>
          <SectionTitle>Card Component</SectionTitle>
          <SectionDesc>
            Used in mobile view of DashboardTable. Header has <Mono>bg-muted/30</Mono>, content is
            divided by rows.
          </SectionDesc>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {/* App-style card (manual layout to replicate DashboardTable mobile card) */}
            <div className="bg-card text-card-foreground border-border overflow-hidden rounded-xl border shadow-sm">
              <div className="border-border bg-muted/30 border-b px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <AppIconDemo letter="K" />
                  <div className="text-[0.9375rem] font-bold tracking-[-0.01em]">
                    Kids&amp;Us Learn
                  </div>
                </div>
              </div>
              <div>
                <div className="border-border border-b px-5 py-3.5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <a href="#" className="text-sm font-medium hover:underline">
                      Google Play
                    </a>
                    <VersionBadge version="3.2.1" />
                  </div>
                  <div className="text-muted-foreground flex justify-between text-[0.8125rem]">
                    <span>Last Update:</span>
                    <span className="font-medium">2025-02-14</span>
                  </div>
                </div>
                <div className="px-5 py-3.5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <a href="#" className="text-sm font-medium hover:underline">
                      App Store
                    </a>
                    <VersionBadge version="3.1.9" />
                  </div>
                  <div className="text-muted-foreground flex justify-between text-[0.8125rem]">
                    <span>Last Update:</span>
                    <span className="font-medium">2025-01-28</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generic shadcn Card */}
            <Card>
              <CardHeader className="border-border border-b px-5 pt-4 pb-4">
                <CardTitle>Generic Card</CardTitle>
                <CardDescription>With description and footer</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pt-4 pb-0">
                <p className="text-muted-foreground text-[0.8125rem]">
                  Card content area. Padding: 1.25rem. Used for any contained content block needing
                  a border + shadow.
                </p>
              </CardContent>
              <CardFooter className="border-border justify-end gap-2 border-t px-5 pt-4 pb-4">
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* ══════════════════════════ 06 TABLE ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>06 — Table</SectionLabel>
          <SectionTitle>Data Table</SectionTitle>
          <SectionDesc>
            Desktop view. <Mono>thead</Mono> uses <Mono>--muted</Mono> background. Rows hover at{' '}
            <Mono>muted/50</Mono>. Last row has no bottom border.
          </SectionDesc>

          <div className="bg-card border-border overflow-hidden rounded-(--radius) border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow className="border-border border-b hover:bg-transparent">
                  <TableHead className="text-foreground h-10 w-[40%] px-3 text-xs font-semibold">
                    Application
                  </TableHead>
                  <TableHead className="text-foreground h-10 w-[25%] px-3 text-xs font-semibold">
                    Store
                  </TableHead>
                  <TableHead className="text-foreground h-10 w-[15%] px-3 text-xs font-semibold">
                    Version
                  </TableHead>
                  <TableHead className="text-foreground h-10 w-[20%] px-3 text-xs font-semibold">
                    Last Update
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border border-b align-top">
                  <TableCell className="px-3 py-2.5 align-top" rowSpan={2}>
                    <div className="flex items-start gap-2">
                      <AppIconDemo letter="K" />
                      <span className="pt-0.5 font-semibold">Kids&amp;Us Learn</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <a href="#" className="text-foreground hover:underline">
                      Google Play
                    </a>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <VersionBadge version="3.2.1" />
                  </TableCell>
                  <TableCell className="px-3 py-2.5 text-[0.8125rem] whitespace-nowrap">
                    2025-02-14
                  </TableCell>
                </TableRow>
                <TableRow className="border-border border-b">
                  <TableCell className="px-3 py-2.5">
                    <a href="#" className="text-foreground hover:underline">
                      App Store
                    </a>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <VersionBadge version="3.1.9" />
                  </TableCell>
                  <TableCell className="px-3 py-2.5 text-[0.8125rem] whitespace-nowrap">
                    2025-01-28
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="px-3 py-2.5">
                    <div className="flex items-start gap-2">
                      <AppIconDemo letter="M" />
                      <span className="pt-0.5 font-semibold">Kids&amp;Us Music</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <a href="#" className="text-foreground hover:underline">
                      Microsoft Store
                    </a>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <span className="text-muted-foreground text-[0.6875rem] italic">N/A</span>
                  </TableCell>
                  <TableCell className="px-3 py-2.5 text-[0.8125rem] whitespace-nowrap">
                    —
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* ══════════════════════════ 07 FORM ELEMENTS ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>07 — Form Elements</SectionLabel>
          <SectionTitle>Inputs &amp; Progress</SectionTitle>
          <SectionDesc>
            Used in admin Dialog and UpdateControl. Focus ring: 3px, <Mono>--ring/20</Mono>.
          </SectionDesc>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            <div>
              <div className="mb-4">
                <Label htmlFor="demo-input" className="mb-1.5 block text-sm font-medium">
                  Label
                </Label>
                <Input id="demo-input" type="text" placeholder="Placeholder text…" />
              </div>
              <div className="mb-4">
                <Label htmlFor="demo-pass" className="mb-1.5 block text-sm font-medium">
                  Secret Key (password)
                </Label>
                <Input id="demo-pass" type="password" placeholder="••••••••" />
              </div>
              <div className="mb-4">
                <Label className="mb-1.5 block text-sm font-medium">Disabled</Label>
                <Input type="text" defaultValue="Disabled value" disabled />
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">Progress Bar</p>
              <p className="text-muted-foreground mb-1.5 text-xs">
                h-1.5 · used in UpdateControl while isUpdating
              </p>
              <Progress value={35} className="mb-3 h-1.5" />
              <Progress value={72} className="mb-3 h-1.5" />
              <Progress value={100} className="h-1.5" />
              <p className="text-muted-foreground mt-2 text-[0.6875rem]">
                Animates via JS interval: +random*10 every 500ms, caps at 90%, then jumps to 100
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ 08 SKELETON ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>08 — Loading States</SectionLabel>
          <SectionTitle>Skeleton</SectionTitle>
          <SectionDesc>
            Shimmer animation using <Mono>background-position</Mono> sweep. Gradient from{' '}
            <Mono>--muted → --border → --muted</Mono>.
          </SectionDesc>

          <div className="max-w-100">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
              <Skeleton className="h-3.5 w-32" />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-5 w-12 rounded-md" />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          </div>
          <pre className="bg-muted text-foreground border-border mt-4 overflow-x-auto rounded-(--radius) border px-4 py-3 font-mono text-xs whitespace-pre">{`animation: shimmer 2s infinite;
background: linear-gradient(
  90deg,
  hsl(var(--muted)) 25%,
  hsl(var(--border)) 50%,
  hsl(var(--muted)) 75%
);
background-size: 200% 100%;`}</pre>
        </div>

        {/* ══════════════════════════ 09 DIALOG ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>09 — Overlays</SectionLabel>
          <SectionTitle>Dialog</SectionTitle>
          <SectionDesc>
            Admin Force Update dialog — triggered by pressing <Mono>.</Mono> key. Max width ~425px.
            Shadow: elevated card.
          </SectionDesc>

          <div className="bg-card border-border max-w-100 rounded-xl border p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            <div className="mb-1 text-base font-semibold">Admin Force Update</div>
            <div className="text-muted-foreground mb-5 text-[0.8125rem]">
              Enter the admin secret key to bypass the cooldown.
            </div>
            <div className="mb-4">
              <Label htmlFor="dialog-key" className="mb-1.5 block text-sm font-medium">
                Secret Key
              </Label>
              <Input id="dialog-key" type="password" placeholder="••••••••" />
            </div>
            <div className="flex justify-end pt-2">
              <Button>Update Now</Button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ 10 TOAST ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>10 — Notifications</SectionLabel>
          <SectionTitle>Toast (Sonner — richColors)</SectionTitle>
          <SectionDesc>
            Uses <Mono>sonner</Mono> with <Mono>richColors</Mono> prop. Three states used in the
            project.
          </SectionDesc>

          <div className="flex flex-col gap-2">
            <div className="bg-card border-border flex max-w-95 items-center gap-2.5 rounded-(--radius) border px-3.5 py-2.5 text-[0.8125rem] font-medium shadow">
              <Loader className="size-4 shrink-0 animate-spin" />
              <span>Updating data...</span>
            </div>
            <div className="bg-card flex max-w-95 items-center gap-2.5 rounded-(--radius) border border-[hsl(142_50%_75%)] px-3.5 py-2.5 text-[0.8125rem] font-medium shadow dark:border-[hsl(142_40%_30%)]">
              <CircleCheck className="size-4 shrink-0 text-[hsl(142,60%,40%)]" />
              <span>Data updated successfully</span>
            </div>
            <div className="bg-card flex max-w-95 items-center gap-2.5 rounded-(--radius) border border-[hsl(0_80%_80%)] px-3.5 py-2.5 text-[0.8125rem] font-medium shadow dark:border-[hsl(0_50%_35%)]">
              <CircleX className="size-4 shrink-0 text-[hsl(0,70%,55%)]" />
              <span>Unauthorized. Invalid admin key.</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ 11 LAYOUT PATTERNS ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>11 — Layout Patterns</SectionLabel>
          <SectionTitle>Sticky Header</SectionTitle>
          <SectionDesc>
            <Mono>sticky top-0 z-50</Mono> · <Mono>backdrop-blur-md</Mono> ·{' '}
            <Mono>bg-background/95</Mono>. Max content width: <Mono>max-w-5xl (900px)</Mono>.
            Horizontal padding: <Mono>px-4</Mono>.
          </SectionDesc>

          <div className="bg-background/95 border-border rounded-(--radius) border backdrop-blur-sm">
            <div className="border-border flex h-11 items-center justify-between border-b px-4">
              <span className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
                Kids&amp;Us App Versions
              </span>
              <ThemeToggle />
            </div>
          </div>

          <SectionTitle className="mt-8">Footer</SectionTitle>
          <SectionDesc>
            Centered on mobile, split on <Mono>md:</Mono>. <Mono>border-t</Mono> separator. Links:{' '}
            <Mono>hover:text-foreground transition-colors</Mono>.
          </SectionDesc>

          <div className="border-border rounded-(--radius) border p-5">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground text-xs font-medium">© 2025 Marc Galindo</p>
                <p className="text-muted-foreground text-[0.625rem]">
                  All rights reserved. Released under the MIT License.
                </p>
              </div>
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <a href="#" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
                <span className="opacity-40">|</span>
                <a href="#" className="hover:text-foreground transition-colors">
                  marcundertest.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ 12 SPACING & RADIUS ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>12 — Spacing &amp; Radius</SectionLabel>
          <SectionTitle>Border Radius Scale</SectionTitle>
          <SectionDesc>
            Base: <Mono>--radius: 0.375rem</Mono>. All variants derived from it.
          </SectionDesc>

          <div className="mb-10 flex flex-wrap items-end gap-3">
            {(
              [
                { label: 'sm', value: '0.25rem', style: 'calc(var(--radius) - 4px)' },
                { label: 'md', value: '0.3125rem', style: 'calc(var(--radius) - 2px)' },
                { label: 'base', value: '0.375rem', style: 'var(--radius)' },
                { label: 'xl', value: '0.625rem', style: 'calc(var(--radius) + 4px)' },
                { label: 'full', value: '9999px', style: '9999px' },
              ] as const
            ).map(({ label, value, style }) => (
              <div key={label}>
                <div
                  className="bg-secondary border-border text-muted-foreground flex h-14 w-14 items-end justify-center border pb-1.5 font-mono text-[0.625rem]"
                  style={{ borderRadius: style }}
                >
                  {label}
                </div>
                <p className="text-muted-foreground mt-1 font-mono text-[0.6875rem]">{value}</p>
              </div>
            ))}
          </div>

          <SectionTitle>Spacing Scale</SectionTitle>
          <SectionDesc>Key values used throughout the project:</SectionDesc>

          <div className="flex flex-col gap-2">
            {(
              [
                { label: '0.25rem (1)', w: 4 },
                { label: '0.5rem (2)', w: 8 },
                { label: '0.75rem (3)', w: 12 },
                { label: '1rem (4)', w: 16 },
                { label: '1.25rem (5)', w: 20 },
                { label: '1.5rem (6)', w: 24 },
                { label: '2rem (8)', w: 32 },
                { label: '2.5rem (10)', w: 40 },
              ] as const
            ).map(({ label, w }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-muted-foreground w-30 font-mono text-[0.6875rem]">
                  {label}
                </span>
                <div className="bg-primary h-1.5 rounded-[2px]" style={{ width: `${w}px` }} />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════ 13 SPECIAL CLASSES ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>13 — Special Classes</SectionLabel>
          <SectionTitle>.app-icon &amp; .version-badge</SectionTitle>
          <SectionDesc>
            Two project-specific custom classes outside of shadcn/ui components.
          </SectionDesc>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <AppIconDemo letter="K" size="sm" />
            <AppIconDemo letter="M" size="md" />
            <span className="text-muted-foreground text-[0.8125rem]">
              .app-icon — 1.5rem × 1.5rem · --radius-md · border: 1px solid --border · object-fit:
              cover
            </span>
          </div>

          <pre className="bg-muted text-foreground border-border overflow-x-auto rounded-(--radius) border px-4 py-3 font-mono text-xs whitespace-pre">{`.app-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: calc(var(--radius) - 2px); /* --radius-md */
  flex-shrink: 0;
  object-fit: cover;
  border: 1px solid hsl(var(--border));
}
.version-badge {
  font-family: var(--font-mono); /* JetBrains Mono */
}`}</pre>
        </div>

        {/* ══════════════════════════ 14 QUICK REFERENCE ══════════════════════════ */}
        <div className="mb-16">
          <SectionLabel>14 — Quick Reference</SectionLabel>
          <SectionTitle>globals.css Token Map</SectionTitle>
          <SectionDesc>
            Copy-paste ready for new projects using Tailwind v4 + shadcn/ui.
          </SectionDesc>

          <pre className="bg-muted text-foreground border-border overflow-x-auto rounded-(--radius) border px-4 py-3 font-mono text-xs whitespace-pre">{`/* globals.css — @layer base */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.375rem;
}
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}`}</pre>
        </div>
      </div>
      <Footer />
    </div>
  );
}
