import './mainPage.css';
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import mainIcon from '../assets/gifhub.png';
import {fetchData} from '../utils/fetchData.ts';
import {useEffect, useState} from "react";
import {useDebounce} from "../utils/useDebounce.ts";
import {useInView} from 'react-intersection-observer';

export type gif = {
    id: number,
    images: {
        fixed_height: {
            url: string
        }
    }
}

type Pages = 'search' | 'random' | 'trending'; // union type

export const MainPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean | null>(null);
    const [gifs, setGifs] = useState<gif[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [page, setPage] = useState<Pages>('trending');

    const { ref, inView, entry } = useInView({
        threshold: 0.5,
    });

    const debouncedSearch = useDebounce(searchValue, 1000);

    useEffect(() => {
        if (page !== 'search'){
            setGifs([])
            searchGifs({method: page});
        } else {
            setGifs([])
        }
    }, [page])

    useEffect(() => {
        if (page === 'search' && debouncedSearch) {
            searchGifs({query: debouncedSearch})
        }
    }, [debouncedSearch])

    useEffect(() => {
        if (inView && page=='search') {
            searchGifs({query: debouncedSearch, more: true});
        } else {
            searchGifs({method: page, more:true})
        }
    }, [inView])


    type SearchParams = {
        query?: string,
        method?: string,
        more?: boolean
    }

    const searchGifs = async ({query, method, more} : SearchParams) => {
        let url = '';
        if (query) {
            console.log("query =", query);
            console.log("encoded query =", encodeURIComponent(query));

            url =  `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIF_API_KEY}=${query}&limit=25&offset=${gifs.length}&rating=g&lang=en&bundle=messaging_non_clips`
            // почему-то сам вписывает q=
            console.log('1')
        }
        else {
            url = `https://api.giphy.com/v1/gifs/${method}?api_key=${import.meta.env.VITE_GIF_API_KEY}&offset=${gifs.length}&rating=g`
            console.log('2')
        }

        console.log(url)
        try {
            setLoading(true);
            setError(null);

            const data = await fetchData(url)

            setLoading(false)

            if (more) {
                setGifs(prev => [...prev, ...data]);
            }
            else {
                setGifs(data)
            }

        } catch {
            setError(error)
            setLoading(false)
        }
    }

    return (

        <div className={"main"} >
            <img className={'mainIcon'} src={mainIcon} alt={"mainIcon"}></img>

            {page === 'search' && <SearchBar input={searchValue} onInputChange={setSearchValue}/>}

            <div className={"btns"}>
                <button className={ page==='trending' ? "btn__best active" : 'btn__best'}
                        onClick={() => setPage('trending')}
                >Best
                </button>
                <button
                    className={ page==='search' ? "btn__best active" : 'btn__best'}
                    onClick={() => setPage('search')}>
                    Search
                </button>
                <button
                    className={ page==='random' ? "btn__best active" : 'btn__best'}
                    onClick={() => setPage('random')}>
                    Random
                </button>

            </div>



            {loading && <h3>Gifs are loading ...</h3>}
            {error && <h3>The error exists</h3>}

            {gifs.length === 1 ? (
                <div className="gif__single">
                    <img src={gifs[0].images.fixed_height.url} alt="gif"/>
                </div>
            ) : (

            <div className={"gif__container"}>
                {

                    gifs.map((gif) => (
                    <img key={gif.id} src={gif.images.fixed_height.url} alt="gif"/>
                    )
                )}
            </div> )
            }
            {!gifs && <div className={"searchPhrase"}>Search a gif!</div>}
            <div ref={ref} className={"intersection"}>Block for intersection-observer</div>
        </div>
    )
}