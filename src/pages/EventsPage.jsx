// EventsPage.jsx - Página principal de eventos
import EventsList from '../components/events/EventsList';

function EventsPage(props) {
  const { onBack } = props;
  
  return <EventsList onBack={onBack} />;
}

export default EventsPage;
