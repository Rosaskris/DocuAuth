import{ useState } from 'react';
import axios from 'axios';
import { Button, Typography, Paper } from '@mui/material';


// eslint-disable-next-line react/prop-types
const ImageUploadComponent = ({frontSide, backSide, id}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [error, setError] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const application_id=id


  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleImageUpload = async () => {
    setError(null)
    setValidationResults(null)
    const formData = new FormData();
    formData.append('frontSide', frontSide); 
    formData.append('backSide', backSide);   
    formData.append('image1', image1);       
    formData.append('image2', image2);  
    
    try {
        await axios.post('http://localhost:5000/uploadImages', formData ,config);
        setValidationResults("completed")
  
      } catch (error) {
        setError(error)
      }
    };

    const inputStyle = {
      display: 'none',
    };
  
    const buttonStyle = {
      backgroundColor: 'gray',
      marginTop: '10px', 
      fontSize: '10px',
    };
  
    const errorStyle = {
      color: 'red',
      marginTop: '16px',
    };
  
    const successStyle = {
      color: 'green',
      marginTop: '16px', 
    };
  
    return (
      <>
      <Paper style={{ padding: '24px', maxWidth: '400px', margin: 'auto', marginTop: '32px' }}>
        <Typography variant="h5" margin={2}>Upload your Document pictures</Typography>
        <label>
        <Typography variant="h6">Front Side:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0] || null)}
            style={inputStyle}
          />

          <Button
            variant="contained"
            component="span"
            style={buttonStyle}
            onClick={() => document.getElementById('frontInput').click()}
          >
            Choose File
          </Button>
          {image1 && <p>Selected File: {image1.name}</p>}
        </label>
        <br />
        <label>
        <Typography variant="h6">Reverse Side:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage2(e.target.files[0] || null)}
            style={inputStyle}
          />
          <Button
            variant="contained"
            component="span"
            style={buttonStyle}
            onClick={() => document.getElementById('reverseInput').click()}
          >
            Choose File
          </Button>
          {image2 && <p>Selected File: {image2.name}</p>}
        </label>
        <br />
        <Button
          variant="contained"
          margin={2}
          color="primary"
          onClick={handleImageUpload}
          style={{fontSize:'12px', margin:'15px'}}
        >
          Submit Images
        </Button>
  
        {error && (
          <Typography variant="h6" style={errorStyle}>
            An error occurred, please submit your images again
          </Typography>
        )}
  
        {validationResults === 'completed' && (
          <div style={successStyle}>
            <Typography variant="h5">Document submitted successfully</Typography>
            <Typography>
              Check your validation status in a few minutes with your ID: {application_id}
            </Typography>
          </div>
        )}

      </Paper>

      </>
    );
};

export default ImageUploadComponent;
