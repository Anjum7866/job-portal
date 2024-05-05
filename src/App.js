import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Container,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import JobCard from "./components/job-card/index";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          limit: 10,
          offset: 0,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
       
          setJobs(data.jdList);
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

 

 
  const theme = createTheme({
    palette: {
      primary: {
        main: "#54EFC3",
      },
      secondary:{
        main:"#8b8b8b",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
      },
      grey: {
        "100": "rgb(230, 230, 230)"
      },
      link: {
        main: "#4943da",
      },

    },
    components: {
      MuiChip: {
        styleOverrides: {
          sizeSmall: {
            fontSize: "9px",
          },
          outlined: {
            borderColor: "rgb(230, 230, 230)"
          },
          root:{
            padding:"5px 0px",
          }
        },
      },
      MuiTypography: {
        styleOverrides: {
          h6: {
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "1px",
            marginBottom: "3px",
            color: "#8b8b8b",
          },
          body1: {
            flex: "1", // Allow the text to take remaining space
          },
          title: {
            fontSize: "14px",
            "& a": {
              display: "block",
              textAlign: "center",
              color: "#4943da",
              textDecoration: "none",
            },
          },
          subtitle2: {
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "1px",
            marginBottom: "3px",
            color: "#8b8b8b",
            marginTop:"10px"
          },
          description2: {
            fontSize: "14px",
            fontWeight: 400,
            color: "#000", // Adjust the color as needed
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            display: "block",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: "100%",
            fontWeight: 500,
            fontSize: "16px",
            borderRadius:"8px",
          },
          containedSecondary: {
            color: "#fff",
          },
        },
      },
      
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Job Search
        </Typography>

        
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {jobs.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <JobCard data={item}  theme={theme}/>
              </Grid>
            ))}
          </Grid>
        )}

      
      </Container>
    </ThemeProvider>
  );
};

export default App;
