const NotificationHelper = {
  async sendNotification({ title, options }) {
    try {
      const isAvailable = await this._checkAvailability();
      if (!isAvailable) {
        console.info('Notification not supported in this browser');
        return;
      }

      const isPermitted = await this._checkPermission();
      if (!isPermitted) {
        console.info('User did not yet grant permission');
        await this._requestPermission();
      }

      this._showNotification({ title, options });
    } catch (error) {
      console.error('Error:', error);
    }
  },

  _checkAvailability() {
    return new Promise((resolve) => {
      resolve(Boolean('Notification' in window));
    });
  },

  _checkPermission() {
    return new Promise((resolve) => {
      resolve(Notification.permission === 'granted');
    });
  },

  _requestPermission() {
    return new Promise((resolve) => {
      Notification.requestPermission((status) => {
        if (status === 'denied') {
          console.log('Notification Denied');
        }
        if (status === 'default') {
          console.warn('Permission closed');
        }
        resolve();
      });
    });
  },

  _showNotification({ title, options }) {
    navigator.serviceWorker.ready
      .then((serviceWorkerRegistration) => {
        serviceWorkerRegistration.showNotification(title, options);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
};

export default NotificationHelper;
