import styles from './styles.module.scss';
import games from '../../data/games.json';
import rankings from '../../data/rankings.json';
import Card from '../card';
import { Game, GameSortment } from '../../types';
import { useState } from 'react';

const getInitialState = (): GameSortment => {
    const initState: GameSortment = { unsorted: games };
    rankings.forEach((ranking) => {
        initState[ranking.key] = [];
    });
    return initState;
}

const Grid = () => {

    const [gameSortment, setGameSortment] = useState<GameSortment>(getInitialState());
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [packFilter, setPackFilter] = useState<number>();

    const setRanking = (game: Game, currentRanking: string, newRanking: string) => {
        const newState = { ...gameSortment };
        newState[currentRanking].splice(newState[currentRanking].indexOf(game), 1);
        newState[newRanking].push(game);
        setGameSortment(newState);
    }

    const renderGamesList = (games: Game[], rankingKey: string) => {
        return games.map((game) => <Card key={game.title} game={game} onSelect={(newRanking) => setRanking(game, rankingKey, newRanking)} />)
    }

    const filterGames = (games: Game[]) => {
        return games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return (
        <table className={styles.grid}>
            <thead>
                <tr>
                    <th>
                        Filter:<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </th>
                    {rankings.map((ranking) => <th key={ranking.key}>{ranking.displayText}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {renderGamesList(filterGames(gameSortment.unsorted), 'unsorted')}
                    </td>
                    {rankings.map((ranking) => <td key={ranking.key}>
                        {renderGamesList(gameSortment[ranking.key], ranking.key)}
                    </td>)}
                </tr>
            </tbody>
        </table>
    )
}

export default Grid;
