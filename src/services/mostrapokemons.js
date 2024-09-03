import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../components/cards/cards.css'
import styled from 'styled-components'

async function getPokemons(page) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page}`)
    const res = await response.json()
    return res
}

async function getPokemon(url) {
    const response = await fetch(url)
    const pokemon = await response.json()
    return pokemon
}

const MostraPokemons = () => {
    const pokemonsToLoad = 10;
    const [page, setPage] = useState(0);
    const [pocks, setPocks] = useState([]);

    const carregarMaisDez = async () => {
        setPage(page + pokemonsToLoad);
    }

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await getPokemons(page);
            const pokemonsUrls = pokemons.results.map(pokemon => pokemon.url);
            const pokemonsPromises = pokemonsUrls.map(async (pokemonUrl) => await getPokemon(pokemonUrl));
            const pokemonsCompletos = await Promise.all(pokemonsPromises);

            setPocks([...pocks, ...pokemonsCompletos]);

        };
        fetchData();
    }, [page]);

    return (

        <div>
            <h1>POKEDEX</h1>
            <Div>
                {pocks.map((pk, index) => {
                    return (
                        <div key={index}>
                            <DivCards>
                                <Link to={`/card/${pk.name}`}>
                                    <Img src={pk.sprites?.front_default} alt={pk.name} />
                                    <p>{pk.name.toUpperCase()}</p>
                                </Link>
                            </DivCards>
                        </div>
                    );
                })}
                <Btn onClick={() => carregarMaisDez()}>Carregar mais</Btn>
            </Div>
        </div>
    )
}

const Img = styled.img`
    width: 150px;
`
const Div = styled.div`
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    background-color:#dcbe98;
    background-size: cover;
    justify-content: center;
`
const DivCards = styled.div`
    background-color: darkcyan;
    width: 250px;
    height: 250px;
    font-size: 30px;
    margin: 20px;
    text-align: center;
    border-radius: 50%;
`
const Btn= styled.button`
    background-color: darkcyan;
    color: #FFF;
    font-size: 20px;
    border-radius: 15px;
    padding: 10px 25px;
    margin-bottom: 10px;
    cursor: pointer
`

export default MostraPokemons