'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage >= 100 ? '#dc2626' : '#f59e0b',
          textColor: percentage >= 100 ? '#dc2626' : '#f59e0b',
          trailColor: '#d1d5db',
          textSize: 8,
        })}
        text={`${percentage}% Gastado`}
        value={percentage}
      />
    </div>
  );
}
