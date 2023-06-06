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
import RequestAdmin from './Request_Admin/Request_Admin';
import RequestFaculty from './Request_Faculty/Request_Faculty';
import Faculty_Cards from './Faculty_Cards/Faculty_Cards';
import ViewRequest from './View_Requests/View_Requests';


function FacultyDashboard() 
{

  const username = localStorage.getItem("UserName")

  const [activePage, setActivePage] = useState('Home');


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


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

  const handleAdminRequest = () => {setActivePage("Request Admin")}

  const handleFacultyRequest = () => {setActivePage("Request Faculty")}

  const handleViewRequest = () => {setActivePage("View Request")}



  const contentloader = () => {
    switch (activePage) {
      case 'Home':
        return (
          <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 6 }}>
              <CardDemo/>
            </div>
            <div style={{ flex: 4 }}>
              <FacultySchedule />
            </div>
          </div>
          <div>
          <Faculty_Cards handleadminRequest={handleAdminRequest} handlefacultyRequest={handleFacultyRequest} handleviewRequest={handleViewRequest}/>
        </div>
        </div>
        )
      case 'Your Schedule':
        return <FacultyScheduleTable/>;
      case 'Exam TimeTable':
        return <ExamScheduleTable/>;
      case "Edit Profile":
        return <Faculty_Edit_Profile/>
      case "Request Admin":
        return <RequestAdmin />
      case "Request Faculty":
        return <RequestFaculty />
      case "View Request":
        return <ViewRequest/>
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


    </div>
  );
}
export default FacultyDashboard;
