import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { Paths } from '@/routes/paths';

export const NotFoundPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to={Paths.HOME}>
        Go to Home
      </Button>
    </Container>
  );
};

// export default NotFoundPage;
