import axios from 'axios';

export const fetchData = async (url : string)  => {

    try {
        const res = await axios.get(url);

        if (Array.isArray(res.data.data)) {
            console.log('res.data', res.data.data)
            return res.data.data;
        }

        console.log('[res]', [res.data.data])

        return [res.data.data]

    } catch (error) {
        console.log('Error: ', error)
        throw error;
    }
}