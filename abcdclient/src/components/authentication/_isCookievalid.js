import { useState, useEffect } from 'react';
import _baseapi from '../../api/_baseapi';
import { VALIDATE_COOKIE } from "../../api/_endpoints";

export const useCookieValid = () => {
    const [isCookie, setisCookie] = useState(true);
    useEffect(() => {
        try {
            getCookie();
        }
        catch (Err) {
            setisCookie(false);
        }
  
    async function getCookie() {
        try {
            await _baseapi.get(VALIDATE_COOKIE);
        }
        catch (error) {
            setisCookie(false);
        }
    }
});

    return isCookie;
}