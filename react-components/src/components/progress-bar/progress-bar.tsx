import { IProgressBarProps } from '../../types/types';
import './progress-bar.scss';

export default function ProgressBar(props: IProgressBarProps) {
  const vision = props.spinnerVisibility ? 'visible' : 'hidden';

  return (
    <div className="spinner" style={{ visibility: vision }}>
      <div className="spinner-inner">
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
