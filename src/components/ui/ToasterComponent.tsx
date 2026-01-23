import { Toaster as SonnerToaster } from 'sonner';

export default function Toaster() {
    return (
        <SonnerToaster
            position="bottom-right"
            richColors
            theme="light"
            toastOptions={{
                className: 'font-sans',
                style: {
                    borderRadius: '1rem',
                    padding: '1rem',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                }
            }}
        />
    );
}
