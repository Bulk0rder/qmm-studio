export const PageShell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <main className={`flex-1 w-full max-w-[1280px] mx-auto px-5 py-6 pb-24 md:ml-16 md:px-8 md:pb-10 xl:ml-60 lg:mx-0 lg:px-10 ${className}`}>
            {children}
        </main>
    );
};
