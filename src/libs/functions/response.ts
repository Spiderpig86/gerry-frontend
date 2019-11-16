import { ResponseEnum } from '../../models';

export function formatResponse(status: ResponseEnum, data: any, fields: any = {}) {
    return {
        status,
        ...fields,
        data
    }
}