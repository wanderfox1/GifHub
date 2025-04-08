import './mainPage.css';
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import mainIcon from '../assets/gifhub.png';

export const MainPage = () => {

    return (

        <div className={"main"} >
            <img className={'mainIcon'} src={mainIcon} alt={"mainIcon"}></img>

            <SearchBar/>

            <div className={"btns"}>
                <button className={"btn__search"}>Search</button>
                <button className={"btn__best"}>Best</button>
                <button className={"btn__random"}>Random</button>
            </div>



            <div className={"searchPhrase"}>Search a gif!</div>
        </div>
    )
}