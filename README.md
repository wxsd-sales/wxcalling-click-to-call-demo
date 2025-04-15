# Webex Calling Click to Call Demo

A Webapp to demo Guest Calling with Webex.

## Demo
[![Vidcast Overview](https://github.com/user-attachments/assets/7a2d1da8-8c55-4441-aef9-500077c203dc)](https://app.vidcast.io/share/e10b0087-68df-49d4-a730-38b9fc8b71c3)


## Getting Started

- Clone this repository:
  - ```git clone https://github.com/wxsd-sales/wxcalling-click-to-call-demo```

- [Click to Call must be configured in Control Hub](https://help.webex.com/en-us/article/ndzk21eb/Enable-customers-to-reach-your-organization-using-browser-based-click-to-call?_gl=1*1d1snt7*_gcl_au*NDI2OTEwODc1LjE3NDI4MzQ4ODAuMzYyNjU5MDUwLjE3NDM3MDQ3ODIuMTc0MzcwNDc4MQ..#configure_click-to-call)
  - You do not need to create a widget (that's what this repo is for).

## Installation

### 1. Setting up a Webex Service App

* a. [Create a new Webex Service App](https://developer.webex.com/my-apps/new)
  * You can give it any name ("Guest Calling Service App" - Will only appear in Control Hub).
* b. The Scopes selected must be:
  * ```spark:calls_read```
  * ```spark:calls_write```
  * ```spark:people_read```
  * ```spark:devices_read```
  * ```spark:telephony_config_read```
  * ```spark:webrtc_calling```
  * ```guest-issuer:read```
  * ```guest-issuer:write```
* c. Save the client_id, and client_secret for later
* d. [Service App Authentication Instructions](https://developer.webex.com/docs/service-apps) - you will need an Org Admin to Approve this Service App in order to generate a Refresh Token, which you will need later.
  * If you are an org admin, you can approve your own Service App in CH.


### 2. Setting up the .env file
- a. Inside this project's root folder, rename the file ```.env.example``` to ```.env```
- b. In a text editor, open the ```.env```
- c. Choose a ```PORT``` or use ```PORT=5000``` if you are not sure what to use.
- d. Choose a ```QUEUE_NUMBER``` which should be a Webex Calling Queue Extension that has been configured for Click to Call in Control Hub.
- e. Paste the client_id and client_secret values from step 1 to the right of the ```=``` for the corresponding ```CLIENT_ID=``` and ```CLIENT_SECRET=``` variables.
- f. Paste the refresh_token that you generated in Step 1 after an admin has approved it (see authentication instructions in step 1) as the ```REFRESH_TOKEN``` variable value.

### 3.a. Running the widget webserver as a container (Docker) (recommended)

- If you prefer to run this through ```npm```, skip this step and proceed to 3.b.
- Otherwise, run the following commands from the terminal inside your project's root directory:
- `docker build -t guest-calling-demo .`
- `docker run -p 5000:5000 -i -t guest-calling-demo`
  - replace `5000` in both places with the ```PORT``` used in your `.env` file.  

### 3.b. Running the widget webserver (npm)
_Node.js version 21.5 was used to develop this application._

- It is recommended that you run this as a container (step 3.a.).
- If you do not wish to run the webserver as a container (Docker), proceed with this step:
- Inside this project on your terminal type: `npm install`
- Then inside this project on your terminal type: `npm start`
- This should run the app on your ```PORT``` (from .env file)


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.

## Disclaimer

<!-- Keep the following here -->  
Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos.
 
 
## Support

Please contact the Webex SD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=CCMeetingTransferWidget) for questions. Or for Cisco internal, reach out to us on Webex App via our bot globalexpert@webex.bot & choose "Engagement Type: API/SDK Proof of Concept Integration Development". 
