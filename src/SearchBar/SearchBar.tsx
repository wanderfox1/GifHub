import './SearchBar.css';
import findIcon from '../assets/find.png';
import cancelIcon from '../assets/cancel.png'

type Props = {
    input: string,
    onInputChange: (value: string) => void
}

export const SearchBar = ({input, onInputChange} : Props) => {

    return (
        <>

            <div className={"input-wrapper"}>
                <img className={"findIcon"} src={findIcon} alt={"findIcon"}/>

                <input placeholder="Type the word ..." className={"input"} value={input} onChange={(e) => onInputChange(e.target.value)}/>

                <button className={"cancelIcon"} onClick={(e) => onInputChange('')}>
                    <img  src={cancelIcon}/>
                </button>
            </div>
        </>
    )
}