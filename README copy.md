# MusicMe
MusicMe is a mobile app that allows people to improve their musical ability through a community that facilitates feedback through posting videos, sending direct messages, and creating a basis for collaboration.

### Running checklist of what we need
- [x] Login/signup authentication
- [x] 3 party support for login/signup (Google SSO)
- [x] Working tables and associated APIs for following entities: User, Videos, DirectMessages
- [x] Working frontend to incorporate above APIs
- [ ] Real message connectivity using websockets
  
## Deploying the backend
<mark> Before running, please make sure to double check the application properties (i.e., `application.yml`) </mark>
Run `mvn install` to install dependencies.  
Then `mvn package` to build application into runnable JAR.  
Finally, run `java -jar target/spring-social-0.0.1-SNAPSHOT.jar`.

## Deploying the frontend
Run `npm install` to install dependencies.  
Then, `npm start`.
