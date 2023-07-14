import { useEffect, useState } from "react";
import "./YuGiOh.scss"

export const YuGiOh = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            .then(res => res.json())
            .then(data => setInfo(data))
    }, [])

    const [inputVal, setInputVal] = useState("");

    const [possRes, setPossRes] = useState([]);

    const makeUpper = (string) => {
        string = string.split(" ");
        for (let index = 0; index < string.length; index++) {
            const element = string[index]
            string[index] = element.charAt(0).toUpperCase() + element.slice(1);
        }
        string = string.join(" ");
        return string
    }

    const findAll = (input) => {
        input = makeUpper(input)
        setPossRes(info.data.filter(yugi => yugi.name.includes(input)));
    }

    return (
        <>
            <h1 className="text-center text-danger">Just a Prototype!!</h1>
            <div>
                <div className="d-flex align-items-center justify-content-center">
                    <input type="text" placeholder="Dark Magician" value={inputVal}
                        onChange={(e) => {
                            setInputVal(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                findAll(inputVal)
                            }
                        }}
                    />

                    <button
                        onClick={() => {
                            findAll(inputVal)
                        }}
                    >Find YuGiOh Card</button>
                </div>
            </div>

            {
                possRes && <div className="d-flex gap-4 mt-4">
                    {
                        possRes.map((element) =>
                            <>
                                <img src={element.card_images[0].image_url} alt="" />
                            </>
                        )
                    }
                </div>
            }

        </>
    )
}