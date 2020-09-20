import { ApiResponse } from 'apisauce';

export type GeneralApiProblem =
    /**
     * Times up.
     */
    | { kind: 'timeout'; temporary: true }
    /**
     * Cannot connect to the server for some reason.
     */
    | { kind: 'cannot-connect'; temporary: true }
    /**
     * The server experienced a problem. Any 5xx error.
     */
    | { kind: 'server'; temporary: false }
    /**
     * We're not allowed because we haven't identified ourself. This is 401.
     */
    | { kind: 'unauthorized'; temporary: false }
    /**
     * We don't have access to perform that request. This is 403.
     */
    | { kind: 'forbidden'; temporary: false }
    /**
     * Unable to find that resource.  This is a 404.
     */
    | { kind: 'not-found'; temporary: false }
    /**
     * All other 4xx series errors.
     */
    | { kind: 'rejected'; temporary: false }
    /**
     * Something truly unexpected happened. Most likely can try again. This is a catch all.
     */
    | { kind: 'unknown'; temporary: true }
    /**
     * The data we received is not in the expected format.
     */
    | { kind: 'bad-data'; temporary: false };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void | null {
    switch (response.problem) {
        case 'CONNECTION_ERROR':
            return { kind: 'cannot-connect', temporary: true };
        case 'NETWORK_ERROR':
            return { kind: 'cannot-connect', temporary: true };
        case 'TIMEOUT_ERROR':
            return { kind: 'timeout', temporary: true };
        case 'SERVER_ERROR':
            return { kind: 'server', temporary: false };
        case 'UNKNOWN_ERROR':
            return { kind: 'unknown', temporary: true };
        case 'CLIENT_ERROR':
            switch (response.status) {
                case 401:
                    return { kind: 'unauthorized', temporary: false };
                case 403:
                    return { kind: 'forbidden', temporary: false };
                case 404:
                    return { kind: 'not-found', temporary: false };
                default:
                    return { kind: 'rejected', temporary: false };
            }
        case 'CANCEL_ERROR':
            return null;
    }

    return null;
}
