import * as React from 'react';
import {useState} from 'react'
import Typography from '@mui/material/Typography';
import CardDemo  from './FacultyAlerts';
import FacultySchedule from './FacultySchedule';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExamScheduleTable from './View_Schedule/View_Schedule';
import FacultyScheduleTable from './View_Faculty_Sched/View_Faculty_Sched';
import Faculty_Edit_Profile from './Faculty_Edit_Profile/Faculty_Edit_Profile';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Lottie from 'react-lottie';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import requestAnimation from './assets/lotties/submit-request.json';
import requestAdmin from "./assets/lotties/request-admin.json";
import viewrequest from "./assets/lotties/view-request.json";


function FacultyDashboard() 
{

  const username = localStorage.getItem("UserName")

  const [activePage, setActivePage] = useState('Home');


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const lottieOptions1 = {
    animationData: requestAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust the animation's position and size
    },
    speed: 1, // Adjust the animation's speed
  };

  const lottieOptions2 = {
    animationData: requestAdmin,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust the animation's position and size
    },
    speed: 1, // Adjust the animation's speed
  };

  const lottieOptions3 = {
    animationData: viewrequest,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust the animation's position and size
    },
    speed: 1, // Adjust the animation's speed
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    window.location.replace("/")
  }

  const handleSchedule = () => {setActivePage("Your Schedule")}

  const handleExam = () => {setActivePage("Exam TimeTable")}

  const handlehome = () => {setActivePage("Home")}

  const handleEdit = () => {setActivePage("Edit Profile")}

  const contentloader = () => {
    switch (activePage) {
      case 'Home':
        return (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 6 }}>
              <CardDemo/>
            </div>
            <div style={{ flex: 4 }}>
              <FacultySchedule />
            </div>
          </div>
        )
      case 'Your Schedule':
        return <FacultyScheduleTable/>;
      case 'Exam TimeTable':
        return <ExamScheduleTable/>;
      case "Edit Profile":
        return <Faculty_Edit_Profile/>
      default:
        return null;
    }
  };
  
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#A82121' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Exam Alteration Helper
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}

                <MenuItem >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>

                <MenuItem >
                  <Typography textAlign="center">Exam TimeTable</Typography>
                </MenuItem>

                <MenuItem >
                  <Typography textAlign="center">Your Schedule</Typography>
                </MenuItem>

            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
                <Button
                onClick={handlehome}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Home
                </Button>

                <Button
                onClick={handleExam}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Exam TimeTable 
                </Button>

                <Button
                onClick={handleSchedule}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Your Schedule
                </Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,backgroundColor: "white",height: "42px",width: "42px" }}>
                <Avatar sx = {{background: "lightgrey",color: "black"}} alt={username} src="/static/images/avatar/2.jpg" />
                {/* <Typography variant="body1"  sx={{fontWeight: 'bold',fontSize: '1.2rem',color: "#A82121"}}>A</Typography> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Edit Profile" onClick={handleEdit}>
                <Typography textAlign="center">Edit Profile</Typography>
              </MenuItem>

              <MenuItem key="Logout" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

      {contentloader()}

      <div style={{width: "100%",display: 'flex',flexDirection:"row",alignItems:"center",marginTop: "50px",paddingBottom:"100px"}}>
            
        <Card sx={{ minWidth: 300,minHeight: 500,margin: "0 auto",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",transition: 'transform 0.3s','&:hover': {transform: 'scale(1.1)'}}}  >
          <CardMedia style={{ width: '400px', height: '300px',display:"flex",alignItems:"center" }}>
          <Lottie options={lottieOptions2} />
          </CardMedia>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Request Admin<br/>for a Exam Reschedule
          </Typography>
          <Typography sx={{fontSize:"17px"}} component="div">
              In case you are not comfortable with any<br/> of the Exam Fixtures You can Request<br/>the admin to reschedule the exam to different<br/> hall,faculty or timings.
          </Typography>
          
        </CardContent>
        <CardActions sx={{display: "flex",flexDirection:"row-reverse",alignContent:"flex-end"}}>
          <Button sx={{color:"#A82121",fontSize:"15px",fontWeight: "bold",":hover":{backgroundColor:"#A82121",color:"white"}}}>Request Admin&nbsp; <ArrowForwardIcon color='#A82121'/></Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 300,minHeight: 500,margin: "0 auto",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",transition: 'transform 0.3s','&:hover': {transform: 'scale(1.1)'}}}  >
          <CardMedia style={{ width: '300px', height: '300px',display:"flex",alignItems:"center" }}>
          <Lottie options={lottieOptions1} />
          </CardMedia>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Request Faculty<br/>for a Invigilation Swap
          </Typography>
          <Typography sx={{fontSize:"17px"}} component="div">
              In case you are not comfortable with any<br/> Invigilation Fixture, Your can Request<br/> other faculties who are free<br/> at that time for a invigilation swap.
          </Typography>
          
        </CardContent>
        <CardActions sx={{display: "flex",flexDirection:"row-reverse",alignContent:"flex-end"}}>
          <Button sx={{color:"#A82121",fontSize:"15px",fontWeight: "bold",":hover":{backgroundColor:"#A82121",color:"white"}}}>Request <ArrowForwardIcon color='#A82121'/></Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 300,minHeight: 500,margin: "0 auto",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",transition: 'transform 0.3s','&:hover': {transform: 'scale(1.1)'}}}  >
          <CardMedia style={{ width: '400px', height: '300px',display:"flex",alignItems:"center" }}>
          <Lottie options={lottieOptions3} />
          </CardMedia>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            View Requests<br/>for a Invigilation Swap
          </Typography>
          <Typography sx={{fontSize:"17px"}} component="div">
              View any Requests from Invigilators<br/> for a Invigilation swap. Approve or Reject<br/> the request based on convinience
          </Typography>
          
        </CardContent>
        <CardActions sx={{display: "flex",flexDirection:"row-reverse",alignContent:"flex-end"}}>
          <Button sx={{color:"#A82121",fontSize:"15px",fontWeight: "bold",":hover":{backgroundColor:"#A82121",color:"white"}}}>View Requests&nbsp; <ArrowForwardIcon color='#A82121'/></Button>
        </CardActions>
      </Card>

      </div>
      
    </div>
  );
}
export default FacultyDashboard;
