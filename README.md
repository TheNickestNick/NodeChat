About
=====
This is a basic chat server I wrote using Node and Socket.IO. I was just experimenting with Node and wanted to write something easy but still nontrivial. I also wanted to learn 
about Socket.IO, so a chat server seemed like an easy choice.

Features
--------
* Basic chat functionality implemented via NodeJS and Socket.IO
* Clients are notified when a new user joins the chat
* System messages can be sent to all clients from the console by entering "system <message>"

TODOs
-----
* Notify clients when a user leaves the chat.
* Send new clients a list of users who are in the chat (requires us to keep track of a session for each connection on the server).
* Implement username changes.
* Implement the ability to kick a user out of the chat. 
* Implement chat persistence - i.e., when a new user joins, they should see the last N messages. 
* Sounds (with the option to mute them) when a new user joins the chat.
* Rooms