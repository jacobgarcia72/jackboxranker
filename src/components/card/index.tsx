import { Game } from '../../types';
import rankings from '../../data/rankings.json';
import styles from './styles.module.scss';
import { useState } from 'react';

const Card = ({ game, onSelect }: { game: Game; onSelect: (key: string) => void; }) => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleSelect = (selection: string) => {
        setShowMenu(false);
        onSelect(selection);
    }

    return (
        <div className={styles.card}>
            <div className={styles.title}>{game.title}</div>
            <div className={styles.select} onClick={() => setShowMenu(!showMenu)}>&#x25B6;</div>
            {showMenu && (
                <div className={styles.menu}>
                    {rankings.map((ranking) => <div key={ranking.key} onClick={() => handleSelect(ranking.key)}>{ranking.displayText}</div>)}
                </div>
            )}
        </div>
    )
}

export default Card;
