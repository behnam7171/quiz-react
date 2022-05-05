import React, {FC} from 'react';
import styles from './Leaderboard.module.css';

interface LeaderboardProps {}

const Leaderboard: FC<LeaderboardProps> = () => (
  <div className={styles.Leaderboard} data-testid="Leaderboard">
    Leaderboard Component
  </div>
);

export default Leaderboard;
