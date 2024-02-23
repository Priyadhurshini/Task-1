{App }

import './App.css'
import { Container, Grid } from '@mui/material'

import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Resume from './pages/Resume/Resume'
import Portfolio from './pages/Portfolio/Portfolio'

import { Routes, Route } from 'react-router-dom'


function App() {


  return (
    <>
      <Container className={'top_60'} >
        <Grid container  >
          <Grid item xs={12} sm={12} md={4} lg={3}  style={{backgroundColor: 'pink'}}>
            <Profile/>
          </Grid>

          <Grid item xs >
            <Header/>
            <div className='main-content'>
              <Routes>
                <Route path='/' element={<Resume/>}></Route>
                <Route path='/portfolio' element={<Portfolio/>}></Route>
              </Routes>
            <Footer/>
            </div>
           
            </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App

{App css}

#root {
  /* A varibale  */
  --main-color: #ffc500;
   
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

/* Margins and Padding */

.top_60{
  margin-top: 60px;
}

@media(max-width: 991px){
  .top_60{
    margin-top: 30px;
  }
}

.main-content{
  background-color: white;
  box-shadow: 0px 2px 92px 0px rgba(0,0,0,0.13);
  min-height: 100vh;
  border-radius: 6px;
  margin-bottom: 30px;
  padding: 20px
}

.section_title{
  position: relative;
  display: inline-block;
  padding: 0 3px;
}

{Timeline}

import React from 'react'
import './Timeline.css'
import { TimelineItem,Timeline, TimelineSeparator, TimelineConnector, TimelineContent,TimelineDot } from '@mui/lab'
import { Typography } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';

const CustomTimeline = ({title, children, icon}) => {
  return (
    
    <>
          <Timeline className='timeline'>
            {/* Item Header */}
              <TimelineItem className='timeline_firstItem'>
                  <TimelineSeparator>
                      <TimelineDot className='timeline_dot_header'>{icon}</TimelineDot>
                      <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent><Typography variant='h6' className='timeline_heder'>{title}</Typography></TimelineContent>
              </TimelineItem>

              {children}

              {/* Remaining Item */}
              
              {/* this will come from components 
                <TimelineItem>
                  <CustomTimelineSeparator/>
                  <TimelineContent>Code</TimelineContent>
              </TimelineItem> */}
          </Timeline>
    </>
  )
}

export const CustomTimelineSeparator =() => {
    return(
        <TimelineSeparator className='separator_padding'>
        <TimelineDot variant='outlined' className='timeline_dot_content' />
        <TimelineConnector />
    </TimelineSeparator>
    )
}

export default CustomTimeline

.timeline{
    /* cause mui has default padding */
    padding: 0; 
}

/* Header */

/* Header Title */

.timeline .timeline_heder{
    padding-top: 7px;
}

.timeline .timeline_firstItem{
    min-height: 95px;
}

.timeline .MuiTimelineItem-root{
    /* classname from mui ,can inspect */
    min-height: 40px;
}

.MuiTimeline-root{
    margin-bottom: 0;
}

.MuiTimelineItem-missingOppositeContent::before{
    display: none;
}

.timeline .timeline_dot_header{
    color: black;
    background-color: var(--main-color);
    font-size: small;
    padding: 10px
}

/* Remaining items */

.timeline .timeline_dot_content{
    color: black;
    border-color: var(--main-color);
    padding: 2px
}

.timeline .MuiTimelineConnector-root{
    background-color: #eee;
    min-height: 1%;
}

.timeline .timeline_dot_header > .MuiSvgIcon-root{
    font-size: 20px;
    color: darkslategray;
}

.timeline .separator_padding{
    padding-left: 18px;
}

.timeline .timeline_content{
    padding-top: 0px;
    margin-bottom: 20px;
}

{Profile}

import './Profile.css'
import { Typography } from '@mui/material'
import profileImage from '/src/assets/images/profile2.jpg'
import CustomTimeline, { CustomTimelineSeparator } from '../Timeline/Timeline'
import { PersonOutlineOutlined } from '@mui/icons-material'
import GetAppIcon from '@mui/icons-material/GetApp';

import resumeData from '../../utils/resumeData'
import { TimelineContent, TimelineItem } from '@mui/lab'
import CustomButton from '../Button/CustomButton'


const CustomTimelineItem = ({title, text, link}) =>{
  return(
    <TimelineItem>
      <CustomTimelineSeparator/>
      <TimelineContent>
        
        {link ?
          (
          <Typography className='timelineItem_text'><span >{title}: </span><a  href={link}><span style={{color: 'rgb(119, 119, 119)'}}>{text}</span></a></Typography> 
          ):(
            <Typography className='timelineItem_text'><span >{title}: </span> <span style={{color:'rgb(119, 119, 119)'}}>{text}</span></Typography>
          )
        }
      </TimelineContent>    
    </TimelineItem>
  )
}

const Profile = () => {
  return (
    <div className='profile_container_shadow'>
        <div className='profile_name'>
            <Typography className='name'>{resumeData.name}</Typography>
            <Typography className='title'>{resumeData.title}</Typography>
        </div>

        <figure className='profile_image'>
            <img style={{height: '248px', width:'248px'}} src={profileImage} alt='Profile Image'/>
        </figure>

        <div className='profile_info'>
            <CustomTimeline icon={<PersonOutlineOutlined/>}>
              <CustomTimelineItem title='Name' text={resumeData.name}/>
              <CustomTimelineItem title='Title' text={resumeData.title}/>
              <CustomTimelineItem title='Email' text={resumeData.email}/>
              

              {Object.keys(resumeData.socials).map((key)=>(
              <CustomTimelineItem 
                key={key}
                title={key} 
                text={resumeData.socials[key].text} 
                link={resumeData.socials[key].link}/>
              ))}
            </CustomTimeline>
            <br/>
            <div className='btn_container'>
            <CustomButton text={'Download CV'} icon={<GetAppIcon/>}/> 
            </div>
             
        </div>
    </div>
  )
}

export default Profile

.profile_container_shadow{
    
    background-color: white;
    border-radius: 6px;
    width: 100%;
    display: inline-block;
    
}

.profile_name{
    line-height: 18px;
    padding: 20px;
}

.profile_name .name{
    text-transform: uppercase;
    font-size: 17px;
    font-weight: bold;
}

.profile_name .title{
    font-size: 13px;
    color: rgb(119, 119, 119);
}

.profile_image{
    margin-top: -10px;
    clip-path: polygon(0 9%, 100% 0, 100% 94%, 0 100%);
    
}

.profile_image .img{
    width: 484px;
    height: 484px;
    color: blueviolet;
}

/* { Profile information} */

.profile_info{
    top: 0;
    left: 0;
    margin: -46px 10px 30px;
}

.timelineItem_text > a {
    text-decoration: none;
}

.timelineItem_text{
    font-size: 13.5px;
    color: #7F7F7F;
    line-height: 12px;
}

.timelineItem_text > span{
    color: black;
}

.profile_info .btn_container{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0;
}

{Header}

import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom'
import {  HomeRounded,
          SchoolRounded,
          WorkRounded,
          Facebook,
          Twitter,
          LinkedIn,
          GitHub,
          Telegram
} from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';

import resumeData from '../../utils/resumeData';

import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomButton from '../Button/CustomButton';


const Header = () => {
  return (
  
    <Navbar expand="lg"  sticky='top' className='header' >
      <NavLink to='/' className='header_navLink'>
        <Navbar.Brand className='header_home'>
          <HomeRounded/>
        </Navbar.Brand>
      </NavLink>

      <Navbar.Toggle/>

      <Navbar.Collapse>
        <Nav className='header_left'> 
          <NavLink to='/' className='>'>Resume</NavLink>
          <NavLink to='/portfolio' className='>'>Portfolio</NavLink>
        </Nav>
        <div className='header_right'>
          {Object.keys(resumeData.socials).map((key)=>(
            <a href ={resumeData.socials[key].link}>{resumeData.socials[key].icon}</a>
          ))}

            <CustomButton text={'Hire me'} icon={<TelegramIcon/>}/>

        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header

.header{
    margin-bottom: 30px;
    background-color: white;
    padding: 0 22px 0 0;
    border-radius: 6px;
    box-shadow: 0px 2px 92px 0px rgba(0, 0, 0, 0.7);
}

.header .navbar{
    --bs-navbar-padding-y: 0;
} 

.header navbar navbar-expand-lg navbar-light sticky-top{
    padding-top: 0;
    padding-bottom: 0;
}
.header .header_home{
    background-color: var(--main-color);
    padding: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

.header .header_left{
    margin-right: auto;
}

.header .header_right{
    display: flex;
    align-items: center;
}

.header .header_right > a >.MuiSvgIcon-root{
    font-size: 16px;
    margin-right: 12px;
    color: black;
}

{Footer}
import React from 'react'
import './Footer.css'

import resumeData from '../../utils/resumeData'
import { Typography } from '@mui/material'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_left'>
        <Typography className='footer_name'>{resumeData.name}</Typography>
      </div>
      <div className='footer_right'>
        <Typography className='footer_copyrights'>
          Designed and developed by <a href='#'>Sam</a>
           
        </Typography>
      </div>
    </div>
  )
}

export default Footer

.footer{
    background-color:#1e1e1e ;
    color: white;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between ;
    min-height: 70px;
    background-origin: 8px;
    padding: 20px 25px
}

.footer .footer_name{
    font-size: small;
    text-align: end;
    color: #dfdfdf;
}

.footer .footer_copyrights{
    font-size: small;
    text-align: end;
    color: #9c9c9c;
}

.footer .footer_copyrights > a {
    text-decoration: none;
    color: #dfdfdf;
}

{Button}

import React from 'react'
import { Button } from '@mui/material' 

import './CustomButton.css'

const CustomButton = ({text, icon}) => {
  return (
    <Button className='custombtn_container'
        endIcon={icon? (
        <div className='custombtn_icon_container'>
            {icon}
        </div>
        ): null}>
        <span className='custombtn_text'>{text}</span>
    </Button>
  )
}

export default CustomButton

.custombtn_container{
    background-color: var( --main-color);
    font-size: 14px;
    font-weight: 500;
    border: 0;
    border-radius: 50px;
    padding: 1px 12px;
    line-height: 35px;
    min-width: 100px;
    outline: none;
}

.custombtn_icon_container{
    color: #000;
    background-color: #fff;
    border-radius: 50px;
    height: 27px;
    line-height: 29px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.custombtn_icon_container > .MuiSvgIcon-root{
    font-size: 16px;
}

.custombtn_text{
    font-size: 14px;
    text-transform: none;
    text-align: center;
    width: 100%;
    margin-right: 5px;
    margin-left: 5px;
}

{Resume}
import React from 'react'
import resumeData from '../../utils/resumeData'

import './Resume.css'
import { Grid, Typography } from '@mui/material'

const Resume = () => {
  return (
    <>
      {/* About me */}
      <Grid container className='section'>
        <Grid item className='section_tite' xs={12}>
            <span></span>
            <Typography variant='h6'>About Me</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className='aboutme_text' variant='body1'>{resumeData.aboutMe}</Typography>
        </Grid>
      </Grid>

      {/* Experience and Education */}
      <Grid container className='section'>

      </Grid>

      {/* Services */}
      <Grid container className='section'>

      </Grid>

      {/* Skills */}
      <Grid container className='section'>

      </Grid>

      {/* Contact*/}
      <Grid container className='section'>

      </Grid>
    </>
  )
}

export default Resume




