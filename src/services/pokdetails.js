import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../components/card/card.css"
import styled from 'styled-components'


async function getPokemon(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const res = await response.json()
    return res
}

async function getAbilities(abilities) {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilities}/`)
    const res = await response.json()
    return res
}

const PokDetails = () => {

    const { pokemon } = useParams()

    const [pock, setPock] = useState({});
    const [moves, setMoves] = useState([])
    const [abilities, setAbilities] = useState([])
    const [abilitiesInfo, setAbilitiesInfo] = useState([])
    const [types, setTypes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const details = await getPokemon(pokemon);
            setPock(details)
            setMoves(details.moves.map(moves => moves.move.name))
            setAbilities(details.abilities.map(abilities => abilities.ability.name))
            setTypes(details.types.map(types => types.type.name))
            const abilitiesInfo = await Promise.all(abilities.map(ability => getAbilities(ability)))
            setAbilitiesInfo(abilitiesInfo)
        };
        fetchData();
    }, [pokemon, abilities]);

    return (
        <DivGeral>
            <h1>Detalhes do Pokemon</h1>
            <Link to='/'>Voltar</Link>
            <div className="geral">
                <DivCard>
                    <img src={pock.sprites?.front_default} alt={pock.name} />
                    <p>{pock.name ? pock.name.toUpperCase(): pock.name}</p>
                </DivCard> 
                <DivTypes>
                    <h2>TYPES:</h2>
                    {types.map((type, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    <p>{type}</p>
                                </div>
                            </div>
                        );
                    })}
                </DivTypes>
                <DivMoves>
                    <h2 className="title">MOVES:</h2>
                    {moves.map((move, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    <div className="moves">{move}</div>
                                </div>
                            </div>
                        );
                    })}
                </DivMoves>
            </div>
            <DivAbilities>
                <h2>ABILITIES:</h2>
                {abilitiesInfo.map((ab, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <br />
                                <p>{ab.name.toUpperCase()}</p>
                                <p>{ab.effect_entries[0].effect}</p>
                                <p>{ab.effect_entries[1].effect}</p>
                            </div>
                        </div>
                    );
                })}
            </DivAbilities>
        </DivGeral>
    )
}

const DivGeral = styled.div`
    height: 100%;
    background-size: cover;
    background-color:#dcbe98;
`
const DivCard = styled.div`
    background-color: darkcyan;
    color: #fff;
    width: 300px;
    height: 300px;
    font-size: 30px; 
    margin: 20px;
    text-align: center;
    border-radius: 50%;
`
const DivTypes = styled.div`
    background-color: darkcyan;
    color: #fff;
    width: 150px;
    height: 150px;
    font-size: 20px;
    padding: 20px;
    text-align: center;
    border-radius: 20px;
    margin-top: 100px;
`
const DivMoves = styled.div`
    background-color: darkcyan;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 10px;
    margin-left: 20px;
`
const DivAbilities = styled.div`
    background-color: darkcyan;
    color: #fff;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 10px;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 30px;
`
export default PokDetails