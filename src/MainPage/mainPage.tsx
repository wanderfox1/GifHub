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

type Pages = 'search' | 'random' | 'best'; // union type

export const MainPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean | null>(null);
    const [gifs, setGifs] = useState<gif[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [page, setPage] = useState<Pages>('best');

    const debouncedSearch = useDebounce(searchValue, 1000);

    useEffect(() => {
        searchGifs(debouncedSearch)
    }, [debouncedSearch])

    const keySearchWords = {
        trending: "trending",
        random: "random"
    }

    const searchGifs = async (query: string, method?: string) => {
        let url = '';
        if (query) {
            url =  `https://api.giphy.com/v1/gifs/search?api_key=etKxG3hsbehqiuyCe421BeJM6BRHJYE4&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        }
        else {
            url = `https://api.giphy.com/v1/gifs/${method}?api_key=etKxG3hsbehqiuyCe421BeJM6BRHJYE4&tag=&rating=g`
        }
        try {
            setLoading(true);
            setError(null);

            const data = await fetchData(url)

            setLoading(false)
            setGifs(data);
        } catch {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        searchGifs(page);
    }, [page])

    return (

        <div className={"main"} >
            <img className={'mainIcon'} src={mainIcon} alt={"mainIcon"}></img>

            {page === 'search' && <SearchBar input={searchValue} onInputChange={setSearchValue}/>}

            <div className={"btns"}>
                <button className={ page==='best' ? "btn__best active" : 'btn__best'}

                        onClick={() => setPage('best')}
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

        </div>
    )
}