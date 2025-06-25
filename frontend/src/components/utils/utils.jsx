
// Verificar el status actual del mensaje dentro de los useEffects de los componentes que usen alertas de eventos.
export const messageState = (message, setMessage) =>{
    if (message) {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }
};