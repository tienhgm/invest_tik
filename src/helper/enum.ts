export const getPathKey = (value: any) => {
    switch (value) {
        case 'dashboard':
            return '1';
        case undefined:
            return '1';
        case 'packages':
            return '2';
        case 'interest-tool':
            return '9';
    }
}