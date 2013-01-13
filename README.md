Features
========
* Basic chat functionality implemented via NodeJS and Socket.IO
* Clients are notified when a new user joins the chat
* System messages can be sent to all clients from the console by entering "system <message>"


TODOs
=====
* Refactor out the code that sends static files. It was useful as a learning excercise, but it would be better to offload it to a middleware like Express.
* Notify clients when a user leaves the chat.
* Send new clients a list of users who are in the chat (requires us to keep track of a session for each connection on the server).
* Implement username changes.
* Implement the ability to kick a user out of the chat. 
* Implement chat persistence - i.e., when a new user joins, they should see the last N messages. 
