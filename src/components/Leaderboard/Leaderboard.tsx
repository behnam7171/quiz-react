import React, {FC, useState} from 'react';
import styles from './Leaderboard.module.css';
import {LeaderboardProfile} from "../../interfaces/leaderboard/LeaderboardProfile";


const Leaderboard: FC = () => {

    const [profiles, setProfiles] = useState<LeaderboardProfile[]>([]);

    const localStorageContent = localStorage.getItem("leaderboard") || JSON.stringify([])
    const leaderboard = JSON.parse(localStorageContent);
    leaderboard.sort((a: LeaderboardProfile, b: LeaderboardProfile) => b.score - a.score);


    React.useEffect(() => {
        if (leaderboard)
            setProfiles(leaderboard)
    }, [leaderboard.length])

    return (

        <div className={styles.main}>
            <div className={styles.board}>
                <h1 className={styles.leaderboard}>
                    {profiles.length !== 0 ? "Leaderboard" : "No one participated yet!"}
                </h1>
                {profiles.length !== 0 ? <div className={styles.profile} data-testid="Leaderboard">
                    {
                        profiles.map((value, index) => (
                                <div className={styles.flex} key={index}>
                                    <div className={styles.item}>
                                        <div className={styles.info}>
                                            <h3 title={value.name} className={styles.textDark}>{value.name}</h3>
                                            <span>{new Date(value.dateTime).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <span className={styles.score}>{value.score}</span>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div> : null}

            </div>
        </div>
    )
};

export default Leaderboard;
