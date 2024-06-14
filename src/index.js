import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Sidebar from './atoms/Sidebar';
import HomeDash from './atoms/HomeDash';
import Login from './atoms/Login';
import AllVideos from './atoms/AllVideos';
import PopUp from './atoms/PopUp';
import {Amplify} from 'aws-amplify';
import AllScreens from './atoms/AllScreens';
import DeviceLocation from './atoms/DeviceLocation';
import Campaign from './atoms/Campaign';
import CampaignList from './atoms/CampaignList';
import CampaignDetails from './atoms/CampaignDetails';

const config = {
  bucketName:"moxiscreen",
  secretAccessKey:"AKIAQ3EGP2YOTF7EHSMS",
  accessKeyId:"ysbQOd0JORlnj7lvMa/oDmI2pRoDxHk38UJH4HX5",
  region:"ap-south-1"//us-east-1
}

// Amplify.configure({
//   Auth: {
//       identityPoolId: 'us-east-1_yEarO3MtL', // Your Cognito Identity Pool ID
//       region: 'us-east-1', // Your Cognito Region
//       userPoolId: 'us-east-1_yEarO3MtL', // Your User Pool ID
//       userPoolWebClientId: 'xxxxxxxxxxxxx', // Your User Pool Web Client ID
//   }
// });


// Amplify.configure(config);


const uri = 'mongodb+srv://dev:<j0BOBWvPdNy3XW3a>@schoolcluster.vte6gnc.mongodb.net/';
// console.log("mongo connection", uri)

const Root = createBrowserRouter([

  {
    path:"/",
    element:<Login/>
  },

{
  path:"/",
  element:<Sidebar/>,
  // this is how u render dashboards
  children:[
 {
  path:"/dashboard",
  element:<HomeDash/>
},
{
  path:"/campaigns",
  element:<Campaign/>
},

{
  path:"/campaign-list",
  element:<CampaignList/>
},

{
  path:"/campaign-details/:campaignId",
  element:<CampaignDetails/>
},

{
  path:"/all-screens",
  element:<AllScreens/>
},
{
  path:"/all-videos",
  element:<AllVideos/>
},
{
  path:"/screen-location",
  element:<DeviceLocation/>
},
{
  path:"/settings",
  element:"Settings"
},

{
  path:"/add-videos",
  element:<PopUp/>
},
  ]
},

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={Root}/>
);

reportWebVitals();
