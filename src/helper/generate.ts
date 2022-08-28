export const getPathKey = (value: any) => {
    switch (value) {
        case 'dashboard':
            return '1';
        case undefined:
            return '1';
        case 'funds':
            return '2';
        case 'interest-tool':
            return '9';
        case 'profile':
            return '10';
        case 'settings':
            return '11';
    }
}