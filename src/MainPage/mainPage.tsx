import './mainPage.css';
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import mainIcon from '../assets/gifhub.png';
import {fetchData} from '../utils/fetchData.ts';
import {useState} from "react";

type gif = {
    id: number,
    url : string,
    images: string,
    // fixed_height: object,
}

export const MainPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean | null>(null);
    const [gifs, setGifs] = useState<gif[]>([])
    const [searchValue, setSearchValue] = useState<string>('')

    const random_url = "https://api.giphy.com/v1/gifs/random?api_key=etKxG3hsbehqiuyCe421BeJM6BRHJYE4&tag=&rating=g";
    const best_url = "https://api.giphy.com/v1/gifs/trending?api_key=etKxG3hsbehqiuyCe421BeJM6BRHJYE4&limit=25&offset=0&rating=g&bundle=messaging_non_clips";
    const search_url = `https://api.giphy.com/v1/gifs/search?api_key=etKxG3hsbehqiuyCe421BeJM6BRHJYE4&q=${searchValue}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`

    const handleSearch = async (url : string) => {

        try {
            setLoading(true);
            setError(null);

            const data = await fetchData(url);
            console.log(data)
            setGifs(Array.isArray(data) ? data : [data]);
        } catch {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className={"main"} >
            <img className={'mainIcon'} src={mainIcon} alt={"mainIcon"}></img>

            <SearchBar input={searchValue} onInputChange={setSearchValue}/>

            <div className={"btns"}>
                <button
                    className={"btn__search"}
                    onClick={() => handleSearch(search_url)}
                >
                    Search
                </button>
                <button className={"btn__best"}
                onClick={() => handleSearch(best_url)}

                >Best</button>
                <button
                    className={"btn__random"}
                    onClick={() => handleSearch(random_url)}>
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
                {gifs.map((gif) => (
                    <img key={gif.id} src={gif.images.fixed_height.url} alt="gif"/>
                    )
                )}
            </div> )
            }
            {!gifs && <div className={"searchPhrase"}>Search a gif!</div>}

        </div>
    )
}