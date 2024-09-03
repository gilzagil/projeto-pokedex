import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cards from "./cards"
import Card from "../card/card"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Cards/>}/>
                <Route exact path="/card/:pokemon" element={<Card/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas