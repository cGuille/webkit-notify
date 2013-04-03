webkit-notify
=============

A JS module to simplify the use of webkit desktop notifications.

To get more informations about the API, take a look [https://github.com/cGuille/webkit-notify/blob/master/quickstart/static/quickstart.js](right into the quickstart code).

You can try it yourself by including the [https://github.com/cGuille/webkit-notify/blob/master/webkit-notify.js](`webkit-notify.js`) script from your HTML page.
Please note that since the notifications permissions are attached to a host, it will not work ith the `file://` URL scheme.
Anyway, using your favorite web server on `localhost` will do the trick.

Such a web server is provided in the quickstart, running in Node.js with Express. To test the quickstart:
  - get the repo (`git clone https://github.com/cGuille/webkit-notify.git`) or [https://github.com/cGuille/webkit-notify/archive/master.zip](download the zip);
  - in the quickstart directory, run the `./server.js` Node.js script (`node run-server.js`);
  - open your browser at http://localhost:8080/.

