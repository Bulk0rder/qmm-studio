export const PageShell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <main className={`flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14 py-8 ${className}`}>
            {children}
        </main>
    );
};
