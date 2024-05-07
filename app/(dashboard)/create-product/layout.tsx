import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    
    return (
        <section className=' flex max-w-screen justify-center  items-center flex-col h-screen overflow-hidden'>
            {children}
        </section>
    );
}
