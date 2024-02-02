import{ useState } from 'react';
import axios from 'axios';
import ImageUploadComponent from './ImageUploadComponent';
import { Link } from 'react-router-dom';
const API_KEY= import.meta.env.VITE_API_KEY;
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Grid } from '@mui/material';

const ApplicationComponent = () => {
  const type='document-validation';
  const [country, setCountry] = useState('');
  const [document_type, setDocument_type]=useState('');
  const user_authorized=true
  const [error, setError]=useState(null)
  const [apiResponse, setApiResponse] = useState(null);

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Truora-API-Key':API_KEY,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setApiResponse(null)

    try {
      const response = await axios.post('https://api.validations.truora.com/v1/validations/', {
        type,
        country,
        document_type,
        user_authorized
      }, config);

      setApiResponse(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Typography  variant="h4">Identity Validation</Typography>
      <Typography margin={2} variant="body1">
        Enter your ID information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} style={{      
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',}}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="country-label">Select Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                value={country}
                label="Select Country"
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="CO">CO</MenuItem>
                <MenuItem value="CL">CL</MenuItem>
                <MenuItem value="MX">MX</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="document-type-label">Select Document Type</InputLabel>
              <Select
                labelId="document-type-label"
                id="document_type"
                value={document_type}
                label="Select Document Type"
                onChange={(e) => setDocument_type(e.target.value)}
              >
                <MenuItem value="national-id">National ID</MenuItem>
                <MenuItem value="passport">Passport</MenuItem>
                <MenuItem value="driver-license">Driver License</MenuItem>
                <MenuItem value="identity-card">Identity Card</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>

      {apiResponse ? (
        <div>
          <Typography variant="h5" margin={4}>Application Created!</Typography>
          <ImageUploadComponent id={apiResponse.validation_id} frontSide={apiResponse.instructions.front_url} backSide={apiResponse.instructions.reverse_url} />
        </div>
      ) : null}
      {error ? <Typography color="error">An error occurred: {error}</Typography> : null}
      <Link to="/application-status">
      <Button variant="contained" color="primary" style={{fontSize:'12px', margin:'15px'}}>
        View Application Status
      </Button>
      </Link>
    </div>
  );
};

export default ApplicationComponent;

