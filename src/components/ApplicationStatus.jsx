import{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
// VLD4cb6deeacd8be7285b8c32c6167d9e1a
// VLDcd7112f5ef058489938412397d29ecae

const API_KEY = import.meta.env.VITE_API_KEY;

const ApplicationStatus = () => {
  const [id, setId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      'Accept': 'application/json',
      'Truora-API-Key': API_KEY,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    if (!id.trim()) {
      setError('Please enter your Application ID.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://api.validations.truora.com/v1/validations/${id}`, config);
      setStatus(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <Typography variant="h5" margin={2}>View your application status</Typography>
          <TextField
            label="Enter your Application ID"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            variant="outlined"
            style={{ fontSize: '10px' }}
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading && <CircularProgress size={20} style={{ marginRight: '8px' }} />}
          Check Status 🔍
        </Button>
      </form>

      {status && (
        <>
           <Paper style={{ padding: '24px', maxWidth: '800px', margin: 'auto', marginTop: '32px'}}>
              {status.validation_status && <Typography variant="h6">Status: {status.validation_status}</Typography>}
              {status.failure_status && <Typography variant="h6" margin={2}>Failure status: {status.failure_status}</Typography>}
              {status.declined_reason && (
                <Typography variant="h6" margin={2}>Declined reason: {status.declined_reason.split('_').join(' ')}</Typography>
              )}
              {status.creation_date&& <Typography variant="h6" margin={2}>Creation date: {status.creation_date}</Typography>}
              {status.details && <Typography variant="h6" margin={2}>Document number: {status.details.document_details.document_number}</Typography>}
              {status.details&& <Typography variant="h6" margin={2}>First Name: {status.details.document_details.name}</Typography>}
              {status.details && <Typography variant="h6" margin={2}>Last Name: {status.details.document_details.last_name}</Typography>}
              </Paper>
        </>
      )}
      {error && (
        <Paper style={{ padding: '24px', maxWidth: '800px', margin: 'auto', marginTop: '32px' }}>
          <Typography variant="h6" color='red'>{error}</Typography>
        </Paper>
      )}

      <Link to="/">
        <Button variant="contained" color="primary" style={{ fontSize: '12px', margin: '15px' }}>
          Submit Another Application
        </Button>
      </Link>
    </div>
  );
};

export default ApplicationStatus;