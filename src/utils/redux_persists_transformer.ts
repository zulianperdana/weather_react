import { createTransform } from 'redux-persist';

export const createBaseTransform = (convertToObject: (any) => any, reducerName: string) =>
    createTransform(
        (inboundState) => {
            return inboundState;
        },
        (outboundState) => {
            return convertToObject(outboundState);
        },
        { whitelist: [reducerName] },
    );
