import io from 'socket.io-client';
import Echo from 'laravel-echo';
// import configs from 'config';
const socketClient = (window.echo = new Echo({
    //   host: `${configs.DOMAIN}:${configs.PORT_SOCKET}`,
    host: "/",
    broadcaster: 'socket.io',
    authEndpoint: '/broadcasting/auth',
    client: io,
    transports: ["websocket"],
    auth: {
        headers: {
            'X-CSRF-TOKEN': document?.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
    },
}));

export default socketClient;
