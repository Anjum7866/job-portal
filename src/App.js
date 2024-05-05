import React, { useEffect, useState } from 'react';
import { Paper, Typography, Card, CardContent, Button, Avatar, CardActions, Chip, Grid, Container } from '@mui/material';

const App = () => {
  const [loading, setLoading] = useState(true);
  
  const [jobs, setJobs] = useState([]);
 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          "limit": 10,
          "offset": 0
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();
        console.log(data);
          setJobs(data.jdList);
         
        
      } catch (error) {
        console.error(error);
        setLoading(false);
        
      }
    };
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="lg">
    <Typography variant='h4' align="center" style={{ marginTop: "50px" }}>Job Search</Typography>
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
      {jobs.map((item) => (
         <Card sx={{ maxWidth: 345, height: '100%', borderRadius: "25px", marginTop: "10px" }}>
       
       <CardContent>
       <Chip label={`⏳ Posted 10 days ago`} variant="outlined" />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Avatar src={item.logoUrl} alt="logo" variant="rounded" sx={{ width: 30, height: 50 }} />
          </Grid>
          <Grid item xs={10}>
            <Typography gutterBottom variant="h6">
              {item.companyName}
            </Typography>
            <Typography variant="subtitle1" className="cards-sub-text">{item.jobRole} </Typography>
            <Typography variant="body2" color="text.secondary" className="card-salary">
              {item.location}
              </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
  <Typography variant="subtitle1" className="cards-sub-text">
    Estimated Salary:
    {item.minJdSalary && <>{item.salaryCurrencyCode === 'USD' ? ' $' : ' ₹'}{item.minJdSalary}</>}
    {item.minJdSalary && item.maxJdSalary && <> - </>}
    {item.maxJdSalary && <>{item.salaryCurrencyCode === 'USD' ? ' $' : ' ₹'}{item.maxJdSalary}LPA</>}
    {item.maxJdSalary && <>✅</>}
  </Typography>  
  <Typography variant="body1" className="cards-sub-text" style={{ fontSize: '1rem', lineHeight: '1.5', fontWeight: 500 }}>About Company:</Typography>
  <Typography variant="body2">
    <b>About us</b><br />
    {item.jobDetailsFromCompany}<br />
   
    <a href="#" style={{ color: 'blue' }}>View Job</a>
  </Typography>
  {item.minExp !== null && (
    <Typography variant="subtitle2" style={{ marginTop: '10px' }}>
      Minimum Experience<br />
      {item.minExp} years
    </Typography>
  )}
</CardContent>

      <CardActions style={{ display: 'block' }}>
        <Button variant="contained" color="primary" style={{ width: '100%', backgroundColor: 'rgb(85, 239, 196)', color: 'rgb(0, 0, 0)', fontWeight: 500, padding: '8px 18px' }}>
          ⚡ Easy Apply
        </Button>
        <Button variant="contained" color="primary" style={{ backgroundColor: 'rgb(73, 67, 218)', fontWeight: 500, marginTop: '20px' }}>
          <div style={{ display: 'flex' }}>
            <Avatar src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group.png" />
            <Avatar src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group(1).png" />
            <Typography variant="body1" className="MuiTypography-root MuiTypography-body1 css-13uo6gx">Unlock referral asks</Typography>
          </div>
        </Button>
      </CardActions>
    </Card>
      ))}
    </Grid>
    </Container>

  );
};

export default App;
