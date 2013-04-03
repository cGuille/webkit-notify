(function () {
    'use strict';

    /*
    A webkit-notify sample.

    Here are the functions provided by the module:

    Module status:
        notify.isSupported() : tell whether the webkit notifications are supported or not.
        notify.isAllowed(): tell whether the notifications are currently allowed or not.
        notify.isAvailable(): tell whether the show() method is already active or just an empty function.
    Module actions:
        notify.init(callback): ask for notifications allowing and provide the show method, if applicable.
            NOTE THAT THIS FUNCTION MUST BE CALLED ON A USER INTERACTION, ELSE IT WON'T HAVE ANY EFFECT.

        notify.show(notification, options): Do nothing if the notify module has not been successfully enabled.
            @return Notification: the notification object on which you can :
                - bind the following events: display, error, close, click;
                - call the following methods: show(), close().
            @notification: {
                iconUrl: [string] contains the URL of an image resource to be shown with the notification,
                title: [string] contains the primary text of the notification,
                body: [string] contains the secondary text for the notification
            }
            @options: {
                closeOnClick: [boolean] close the notification on click if set to true,
                persist: [boolean] whether the notification must stay or close until an amount of time - default to false,
                duration: [number] if persist is set to false, define the number of seconds until the notification close - default to 3,
            } 
    */    

    notify.show({
        title: 'Notify quickstart',
        body: 'This notification will be displayed only if the notifications was previously enabled for this host.'
    }, { persist: true, closeOnClick: true });

    if (notify.isAllowed()) {
        notificationSamples();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            var enableBtn = document.getElementById('enableWebkitNotifications');

            enableBtn.classList.remove('no-display');
            enableBtn.addEventListener('click', function () {
                notify.init(function () {
                    enableBtn.parentNode.removeChild(enableBtn);
                    notificationSamples();
                });
            });
        });
    }

    function notificationSamples() {
        var duration = 5;// seconds

        notify.show({ title: 'Notify quickstart', body: 'This is a ' + duration + ' seconds notification' }, { duration: duration });
        notify.show({ title: 'Notify quickstart', body: 'This is a default notification' });
        var notification = notify.show({
            iconUrl: 'https://www.google.com/favicon.ico',
            title: 'Notify quickstart',
            body: 'This is a persistent notification with the Google icon and the closeOnClick option'
        }, { persist: true, closeOnClick: true });

        console.log('This is the last call (with Google icon) Notification object:');
        console.log(notification);
    }
}());
