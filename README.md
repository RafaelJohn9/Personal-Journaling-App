# Personal Journal App

**Hello  There Welcome to  My Personal Journal App repository**

I have put a lot of effort to make the finished app available to those:
- who want to see the finished product
- who want to see how the app works like testing the api endpoints and running  the Frontend locally
- who want to test the whole app locally

**Okay let's get started:**
    For starters here is the demo of the working app:

### App Demo:
#### [https://youtu.be/8AJ0KJUAmpg](https://youtu.be/8AJ0KJUAmpg)

## The Finished App  (.apk)
The finished application is contained in a zip file     [right here](https://github.com/RafaelJohn9/Personal-Journaling-App/blob/main/APKs/personaljournal.zip)
As for the  steps of downloading it:
- **On the page you are redirected to, you will notice a download icon appearing on the left at the topbar. Click on it**


- **When the zip file has finished downloading, unzip it then download the apk found inside it *(personaljournal.apk)* from an *android mobile device* (sadly I was not able to deploy on ios devices due to unavoidable circumstances)**
    - **incase of *"app not installed errors"*:**
        - **Try to:**
            - **Switch of google play protect first then try installing it again**
            - **allow installation from unknown app sources**

---
## Deploying the frontend
**1. Node.js and npm: Ensure you have Node.js and npm installed. You can download them from [Node.js Official Website](https://nodejs.org/en) or  [Yarn Package Website](https://yarnpkg.com/)**

**2. To install expo run:**
```bash
npm install -g expo-cli
```
**or (depending with package manager)**

```bash
yarn global add expo-cli
```

**3. Clone the repository**
```bash
git clone https://github.com/RafaelJohn9/Personal-Journaling-App/
```

**4. Navigate to the frontend directory**
```bash
cd Personal-Journaling-App/frontend
```

**5. To install dependencies run:**
```bash
npm install
```

**or (depending with package manager)**
```bash
yarn install
```
**6. Run the app**
```bash
expo start
```


**7. [To Download the expo go app on your mobile device (click here)](https://expo.dev/go) or you can use and android simulator to run the app**

----
## Backend setup
For the Backend I made a docker image for it to prevent library conflicts some dependencies though are needed locally.