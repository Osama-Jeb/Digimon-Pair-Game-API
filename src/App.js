import { Route, Routes } from "react-router-dom";
import {DigiPairGame} from "./pages/digimonPair/DigiPairGame";
import { YuGiOh} from "./pages/yugioh/YuGiOh";
import { Header } from "./layouts/Header/Header";


export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<DigiPairGame />} />
                <Route path="/yugiohcards" element={<YuGiOh />} />
            </Routes>
        </>
    )
}