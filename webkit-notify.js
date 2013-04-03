(function () {
    'use strict';

    var exports = window.notify = {};

    var PERMISSION_ALLOWED = 0,
        PERMISSION_NOT_ALLOWED = 1,
        PERMISSION_DENIED = 2;

    var available = false;
    function exportShowFunction() {
        exports.show = createAndShowNotification;
        available = true;
    }

    exports.isSupported = function () {
        return !!webkitNotifications;
    };

    exports.isAllowed = function () {
        return webkitNotifications && webkitNotifications.checkPermission() === PERMISSION_ALLOWED;
    };

    exports.isAvailable = function () {
        return available;
    };

    /**
     * Do nothing if the notify module has not been successfully enabled.
     * 
     * @return Notification: the notification object on which you can :
     *     - bind the following events: display, error, close, click;
     *     - call the following methods: show(), close().
     * @notification: {
     *     iconUrl: [string] contains the URL of an image resource to be shown with the notification,
     *     title: [string] contains the primary text of the notification,
     *     body: [string] contains the secondary text for the notification
     * }
     * @options: {
     *     closeOnClick: [boolean] close the notification on click if set to true,
     *     persist: [boolean] whether the notification must stay or close until an amount of time - default to false,
     *     duration: [number] if persist is set to false, define the number of seconds until the notification close - default to 3,
     * }
     */
    exports.show = function () {};// Will be erased later if the notifications are available
    if (notify.isSupported() && notify.isAllowed()) {
        exportShowFunction();
    }

    exports.init = function (callback) {
        if (!notify.isSupported()) {
            callback && callback();
        } else {
            initWebkitNotifications(function (error) {
                if (error) {
                    console.info(error.message);
                    callback && callback();
                } else {
                    exportShowFunction();
                    callback && callback();
                }
            });
        }
    };


    function initWebkitNotifications(callback, autoAttempt) {
        function signalError(message, handler) {
            var error = new Error(message);
            if (handler) {
                handler(error);
            } else {
                throw error;
            }
        }

        var status = webkitNotifications.checkPermission();

        switch (status) {
            case PERMISSION_DENIED:
                signalError('Notifications will not be enabled since they has been denied.', callback);
                break;
            case PERMISSION_NOT_ALLOWED:
                if (!autoAttempt) {
                    webkitNotifications.requestPermission(initWebkitNotifications.bind(null, callback, true));
                } else {
                    signalError('Notifications will not be enabled since the user agent will not allow it (note that it cannot work with file:// URL scheme).', callback);
                }
                break;
            case PERMISSION_ALLOWED:
                if (callback) {
                    callback(null);
                }
                break;
            default:
                signalError('Unknown return status for `webkitNotifications.checkPermission`: ' + status, callback);
                break;
        }
    }

    function createAndShowNotification(notification, options) {
        var notification = webkitNotifications.createNotification(
                notification.iconUrl,
                notification.title,
                notification.body
            );

        notification.show();

        if (!options) {
            options = {};
        }

        if (options.closeOnClick) {
            notification.addEventListener('click', closeThis);
        }

        if (!options.persist) {
            var duration = parseFloat(options.duration);
            
            if (duration < 0 || isNaN(duration)) {
                duration = 3;
            }

            window.setTimeout(function () {
                notification.close();
            }, duration * 1000);
        }

        return notification;
    }

    function closeThis() {
        this.close();
    }
}());
