import { useEffect, useState } from "react";
import "./DigiPairGame.scss";
import digiBack from "../../assets/images/digiBack.jpg"

export const DigiPairGame = () => {
    const [info, setInfo] = useState(null);
    const [inputVal, setInputVal] = useState(5)
    const [showHide, setShowHide] = useState(true);

    useEffect(() => {
        fetch("https://digimoncard.io/api-public/search.php?n=")
            .then(res => res.json())
            .then(data => setInfo(data))
    }, [])

    const [myCards, setMyCards] = useState([])

    const getCards = (number) => {
        if (number > 0 && number < 11) {
            const tempTab = []
            for (let index = 0; index < number; index++) {
                let rand = Math.floor(Math.random() * 2520 + 333);
                let newSrc = info[rand].image_url
                let newId = info[rand].cardnumber

                let newCard = {
                    imgSrc: newSrc,
                    imgId: newId
                }
                tempTab.push(newCard)
                tempTab.push(newCard)
            }
            setMyCards(shuffle(tempTab))
            setShowHide(false);
        }
    }

    //Brought to you by our Sponsor: Mr. StackOverflow
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const gameCheck = (number) => {
        let flipped = document.querySelectorAll(".flipped");
        setTimeout(() => {
            if (flipped.length === 2) {
                if (flipped[0].id !== flipped[1].id) {
                    flipped.forEach((element) => {
                        element.classList.remove("flipped")
                    })
                } else if (flipped[0].id === flipped[1].id) {
                    flipped.forEach((element) => {
                        element.classList.add("invisible");
                        element.classList.remove("flipped")
                        let invi = document.querySelectorAll(".invisible");
                        if (invi.length === number * 2) {
                            setMyCards([])
                            setShowHide(true)
                        }
                    })
                }
            }
        }, 1500);
    }

    return (
        <>
            <h1 className="text-center text-white bg-primary p-3 m-0 fw-bold">Digi Pair Game</h1>
            <div className="gameHolder">
                <div className={`inputHolder d-flex align-items-center justify-content-center gap-2 ${showHide ? '' : 'd-none'}`}>
                    <input type="number" placeholder="Choose a number between 1 and 10" onChange={(e) => {
                        setInputVal(e.target.value);
                    }} />
                    <button className="btn btn-primary" onClick={(e) => {
                        getCards(inputVal);
                    }}>START GAME</button>
                </div>
                <div className={`cardHolder ${showHide ? 'd-none' : ''}`}>
                    {
                        myCards.map((element) =>
                            <>
                                <div key={element.imgId} id={element.imgId} className="card"
                                    onClick={(event) => {
                                        event.target.classList.toggle("flipped");
                                        gameCheck(inputVal);

                                    }}>
                                    <img className="front" src={digiBack} alt="" />
                                    <img className="back" src={element.imgSrc} alt="" />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}