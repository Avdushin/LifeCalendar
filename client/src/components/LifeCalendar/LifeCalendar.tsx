import { useState } from 'react';
import styles from './LifeCalendar.module.scss';

type Event = {
  week: number;
  year: number;
  description: string;
};

export const LifeCalendar = () => {
  const years = Array.from({ length: 90 }, (_, i) => i + 1);
  const weeksPerYear = 52;

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventDescription, setEventDescription] = useState('');

  const handleWeekClick = (year: number, week: number) => {
    const event = events.find((e) => e.year === year && e.week === week);
    if (event) {
      setSelectedEvent(event);
      setEventDescription(event.description);
    } else {
      setSelectedEvent({ year, week, description: '' });
      setEventDescription('');
    }
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      const updatedEvent = { ...selectedEvent, description: eventDescription };
      setEvents([...events.filter((e) => e.year !== selectedEvent.year || e.week !== selectedEvent.week), updatedEvent]);
      setSelectedEvent(null);
      setEventDescription('');
    }
  };

  return (
    <div>
      <h2>Life Calendar</h2>
      <div className={styles.calendarGrid}>
        {years.map((year) => (
          <div key={year} className={styles.year}>
            {Array.from({ length: weeksPerYear }).map((_, week) => (
              <div
                key={week}
                className={`${styles.week} ${events.find((e) => e.year === year && e.week === week) ? styles.filled : ''}`}
                onClick={() => handleWeekClick(year, week)}
              />
            ))}
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className={styles.eventEditor}>
          <h3>Event for Year {selectedEvent.year}, Week {selectedEvent.week}</h3>
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
          />
          <button onClick={handleSaveEvent}>Save Event</button>
        </div>
      )}
    </div>
  );
};

// export default LifeCalendar;
