import './Notifications.css';
import closeIcon from './assets/close-button.png';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
  return (
    <div className="notifications">
      <button
        style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none' }}
        aria-label="Close"
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt="close" style={{ height: '10px', width: '10px' }} />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  );
}

export default Notifications;