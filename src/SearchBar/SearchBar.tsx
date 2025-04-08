import './SearchBar.css';
import findIcon from '../assets/find.png';
import {useState} from 'react';

export const SearchBar = () => {

    const [input, setInput] = useState<string>('')


    return (
        <>

            <div className={"input-wrapper"}>
                <img className={"findIcon"} src={findIcon} alt={"findIcon"}/>

                <input placeholder="Type the word ..." className={"input"} value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
        </>
    )
}