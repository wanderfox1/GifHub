export const fetchData = async (url : string)  => {

    const res = await fetch(url);
    const gifs = await res.json();

    return gifs.data;
}