import { useAppSelector } from '../../utils/hooks';
import './progress-bar.scss';

export default function ProgressBar(props: {nameApiRequest: string}) {
  const { loading1, error1 } = useAppSelector(state => state.movies);
  const { loading2, error2 } = useAppSelector(state => state.movie);
  const vision1 = loading1 ? 'visible' : 'hidden';
  const vision2 = loading2 ? 'visible' : 'hidden';
  const stateName1 = props.nameApiRequest === 'moviesList';
  const stateName2 = props.nameApiRequest === 'movie';

  return (
    <>
      {stateName1 && <div className="spinner" data-testid="spinner" style={{ visibility: vision1 }}>
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
      </div>}
      
      {stateName2 && <div className="spinner" data-testid="spinner" style={{ visibility: vision2 }}>
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
      </div>}
      
      {stateName1 && error1 && <span className="message-failed">{error1}</span>}
      {stateName2 && error2 && <span className="message-failed">{error2}</span>}
    </>
  );
}
