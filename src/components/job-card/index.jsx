import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";

const JobCard = ({ data, theme }) => {
  return (
    <Card
    sx={{
      maxWidth: 345,
      height: "100%",
      borderRadius: "25px",
      marginTop: "10px",
      transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
          transform: "translateY(-5px)",
        },
    }}
    >
      <CardContent>
        <Chip label={`⏳ Posted 10 days ago`} variant="outlined" size="small" />
        <Grid container  sx={{flex: "1 1 0%", padding: "8px 16px"}} alignItems="center">
          <Grid item xs={2}>
            <Avatar
              src={data.logoUrl}
              alt="logo"
              variant="rounded"
              sx={{ width: "25px",
                height:" 2.5rem"}}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography gutterBottom variant="h6" sx={{ color: theme.palette.secondary.main }}>
              {data.companyName}
            </Typography>
            <Typography variant="subtitle1"   sx={{
                fontSize: "14px",
                lineHeight: 1.5,
                textTransform: "capitalize", // Capitalize the first letter
              }}>
              {data.jobRole}{" "}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="card-salary"
              sx={{
                fontSize: "11px",
                fontWeight: 500,
                marginTop: "5px",
              }}
            >
              {data.location}
            </Typography>
          </Grid>
        </Grid>
      
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
          Estimated Salary:
          {data.minJdSalary && (
            <>
              {data.salaryCurrencyCode === "USD" ? " $" : " ₹"}
              {data.minJdSalary}
            </>
          )}
          {data.minJdSalary && data.maxJdSalary && <> - </>}
          {data.maxJdSalary && (
            <>
              {data.salaryCurrencyCode === "USD" ? " $" : " ₹"}
              {data.maxJdSalary}LPA
            </>
          )}
          {data.maxJdSalary && <>✅</>}
        </Typography>
        <Typography
          variant="body1"
          className="cards-sub-text"
          sm={{ fontSize: "1rem", lineHeight: "1.5", fontWeight: 500 }}
        >
          About Company:
        </Typography>
        <Typography variant="body2">
          <strong>About us</strong>
          
        </Typography>
        <Typography variant="title" sm={{fontSize:"14px"}}>
          {data.jobDetailsFromCompany}
        
          <a href="#" >
            View Job
          </a>
        </Typography>
        {data.minExp !== null && (
          <><Typography variant="subtitle2" >
          Minimum Experience
         </Typography>
        <Typography variant="description2">{data.minExp} Years</Typography></>
          
        )}
      </CardContent>

      <CardActions>
          <Button variant="contained" color="primary" sx={{ backgroundColor: "rgb(85, 239, 196)", color: "rgb(0, 0, 0)" }}>
            ⚡ Easy Apply
          </Button>
          <Button variant="contained"  color="secondary"
            sx={{
              backgroundColor: "rgb(73, 67, 218)",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              marginTop:"10px",
              marginLeft:"0px !important"
            }} 
            >
            <Avatar src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group.png" />
            <Avatar src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group(1).png" />
            <Typography variant="" >
              Unlock referral asks
            </Typography>
          </Button>
        </CardActions>
    </Card>
  );
};

export default memo(JobCard);
