import { useState, useEffect } from 'react'

async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    const res = await response.json()
    return res
}

const MostraPokemon = () => {

    const [pock, setPock] = useState({
        pocks: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const pokemon = await getPokemon();
            console.log(pokemon.results)
            setPock({
                pocks: pokemon.results
            });
        };
        fetchData();
    }, []);
    
    return (
        <section>
            <ul>
                {pock.pocks.map((pk, index) => {
                    return (
                        <li key={index}>
                            <img src={pk.url} />
                            {/* <p>{pk.name}</p> */}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default MostraPokemon
