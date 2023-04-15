import { useAppSelector } from '../../utils/hooks';
import './progress-bar.scss';

export default function ProgressBar() {
  const { loading, error } = useAppSelector(state => state.movies);
  const vision = loading ? 'visible' : 'hidden';

  return (
    <>
      <div className="spinner" data-testid="spinner" style={{ visibility: vision }}>
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
      {error && <span className="message-failed">{error}</span>}
    </>
  );
}
