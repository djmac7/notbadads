import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/brand/notbadadslogo.svg"
                alt="Not Bad Ads"
                width={88}
                height={20}
                className="h-8 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center gap-2 cursor-not-allowed opacity-60 hover:opacity-40 transition-opacity">
                <span className="text-sm font-medium text-gray-900">Ad Playbook</span>
                <Badge variant="outline" className="text-xs">
                  Coming Soon
                </Badge>
              </div>
            </nav>
          </div>

          <Button
            asChild
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 text-sm font-medium"
          >
            <Link href="https://www.djm.studio/" target="_blank" rel="noopener noreferrer">
              AD DESIGN SERVICE
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
