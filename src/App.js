import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Grid,
  Container,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import JobCard from "./components/job-card/index";
import FilterDropdown from "./components/filter/index";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  

  const observer = useRef();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          limit: 10,
          offset: (page - 1) * 10,
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
        if (page === 1) {
          setJobs(data.jdList);
          setFilteredData(data.jdList);
        } else {
          setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
          setFilteredData((prevData) => [...prevData, ...data.jdList]);
        }
        setLoading(false);
        setFetching(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setFetching(false);
      }
    };
    fetchJobs();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
  }, []);

  useEffect(() => {
    if (!fetching) {
      observer.current.observe(document.getElementById("observer"));
    }
  }, [fetching]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
  };

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
            textTransform: "capitalize", 
           
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
         Search Job 
        </Typography>

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
       
          <Grid item xs={12} sm={2}>
            <FilterDropdown
              data={jobs}
              label="Roles"
              property="jobRole"
              handleFilter={handleFilter}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FilterDropdown
              data={jobs}
              label="Experience"
              property="minExp"
              handleFilter={handleFilter}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FilterDropdown
              data={jobs}
              label="Base pay"
              property="minJdSalary"
              handleFilter={handleFilter}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FilterDropdown
              data={jobs}
              label="Location"
              property="location"
              handleFilter={handleFilter}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <FilterDropdown
              data={jobs}
              label="Remote"
              property="location"
              handleFilter={handleFilter}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FilterDropdown
              data={jobs}
              label="Comapny name"
              property="companyName"
              handleFilter={handleFilter}
            />
          </Grid>
        </Grid>

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
            {filteredData.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <JobCard data={item}  theme={theme}/>
              </Grid>
            ))}
          </Grid>
        )}

        {fetching && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {/* <CircularProgress /> */}
          </div>
        )}
        <div id="observer"></div>
      </Container>
    </ThemeProvider>
  );
};

export default App;


