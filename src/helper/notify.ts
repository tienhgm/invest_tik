import { notification, message } from 'antd';
export const notify = (type: any, message: string, description: any) => {
    // @ts-ignore
    notification[type]({
        message: message,
        description: description,
        placement: 'topLeft'
    });
};
export const successMes = (content: any) => {
    message.success(content);
};
export const errorMes = (content: any) => {
    message.error(content);
};

export const warning = (content: any) => {
    message.warning(content);
};