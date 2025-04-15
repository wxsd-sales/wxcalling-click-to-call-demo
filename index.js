import express from "express";
import cors from "cors";
import path from "path";
import crypto from 'crypto';
import 'dotenv/config';
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5000;

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var serviceAppToken;

console.log(path.join(__dirname, 'src'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get(`/guest`, cors(), async function(req, res, next) {
  console.log('GET /guest query:', req.query);
  let user = {};
  let name = "Guest Caller";
  if(req.query.name){
    name = req.query.name;
  }
  try { 
    let subject = crypto.randomUUID();
    if(req.query.subject){
      subject = req.query.subject;
    }
    let payload = {
      "subject": subject,
      "displayName": name,
    }
    console.log('/guests/token payload', payload);
    let resp = await fetch('https://webexapis.com/v1/guests/token',{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceAppToken}`
      },
      body: JSON.stringify(payload)
    });
    let json = await resp.json();
    console.log('/guests/token response json:', json);
    user = json;
  } catch (e) {
    console.error(`GET /guest token Error - ${req.query}:`);
    console.error(e);
  }
  try{
    let callNumber = process.env.QUEUE_NUMBER;
    if(req.query.destination){
      callNumber = req.query.destination;
    }
    let callTokenPayload = {
      "calledNumber": callNumber,
      "guestName": name,
    }
    console.log('/click2call/callToken payload', callTokenPayload);
    let callTokenResp = await fetch('https://webexapis.com/v1/telephony/click2call/callToken',{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceAppToken}`
      },
      body: JSON.stringify(callTokenPayload)
    });
    let json = await callTokenResp.json();
    console.log('/click2call/callToken response json:', json);
    user = {...user, ...json};
  }catch(e) {
    console.error(`GET /guest JWE Error - ${req.query}:`);
    console.error(e);
  }
  if(!user){ user = {}}
  console.log("/guest returning user:");
  console.log(user);
  res.setHeader('Content-Type',"application/json");
  res.send(JSON.stringify(user));
});


async function tokenRefresh(){
  console.log('refreshing serviceApp token...');
  let resp = await fetch('https://webexapis.com/v1/access_token',{
      method: "POST",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': process.env.REFRESH_TOKEN
    })
  });
  let json = await resp.json();
  console.log('tokenRefresh response json:', json);
  serviceAppToken = json.access_token;
}

app.listen(port, async () => {
  await tokenRefresh();
  setInterval(async () => {
    await tokenRefresh();
  }, 86400 * 1000); 
  console.log(`listening on ${port}`);
});
