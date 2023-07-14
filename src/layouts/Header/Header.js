import { NavLink } from "react-router-dom"
import "./Header.scss"

export const Header = () => {
    return (
        <>
            <div className="navHolder d-flex justify-content-center gap-5">
                <NavLink to={"/"}>Digi Pair Game</NavLink>
                <NavLink to={"/yugiohcards"}>YuGiOh Card Finder</NavLink>
            </div>
        </>
    )
}