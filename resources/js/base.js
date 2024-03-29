import _ from 'lodash';
import moment from 'moment-timezone';

export default {
    computed: {
        Telescope() {
            return Telescope;
        },
    },

    methods: {
        /**
         * Show the time ago format for the given time.
         */
        timeAgo(time) {

            const date = new Date(time);
            const currentDate = new Date();
            const timeDifference = (currentDate - date) / 1000; // Time difference in seconds

            if (timeDifference < 60) {
                return `${Math.floor(timeDifference)} Sec ago`;
            } else if (timeDifference < 3600) {
                const minutes = Math.floor(timeDifference / 60);
                return `${minutes} Min ago`;
            } else if (timeDifference < 86400) {
                const hours = Math.floor(timeDifference / 3600);
                return `${hours} H ago`;
            } else {
                const days = Math.floor(timeDifference / 86400);
                return `${days} Day${days !== 1 ? 's' : ''} ago`;
            }
        },

        /**
         * Show the time in local time.
         */
        localTime(time) {
            return moment(time).local().format('MMMM Do YYYY, h:mm:ss A');
        },

        /**
         * Truncate the given string.
         */
        truncate(string, length = 70) {
            return _.truncate(string, {
                length: length,
                separator: /,? +/,
            });
        },

        /**
         * Creates a debounced function that delays invoking a callback.
         */
        debouncer: _.debounce((callback) => callback(), 500),

        /**
         * Show an error message.
         */
        alertError(message) {
            this.$root.alert.type = 'error';
            this.$root.alert.autoClose = false;
            this.$root.alert.message = message;
        },

        /**
         * Show a success message.
         */
        alertSuccess(message, autoClose) {
            this.$root.alert.type = 'success';
            this.$root.alert.autoClose = autoClose;
            this.$root.alert.message = message;
        },

        /**
         * Show confirmation message.
         */
        alertConfirm(message, success, failure) {
            this.$root.alert.type = 'confirmation';
            this.$root.alert.autoClose = false;
            this.$root.alert.message = message;
            this.$root.alert.confirmationProceed = success;
            this.$root.alert.confirmationCancel = failure;
        },
    },
};
