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
        console.info('User did not grant permission yet');
        await this._requestPermission();
      }

      await this._showNotification({ title, options });
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async _checkAvailability() {
    return Boolean('Notification' in window);
  },

  async _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    try {
      const status = await Notification.requestPermission();
      if (status === 'denied') {
        console.log('Notification Denied');
      }
      if (status === 'default') {
        console.warn('Permission closed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async _showNotification({ title, options }) {
    try {
      if (Notification.permission === 'granted') {
        const serviceWorkerRegistration = await navigator.serviceWorker.ready;
        await serviceWorkerRegistration.showNotification(title, options);
      } else {
        console.log('Notification permission is not granted.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

export default NotificationHelper;
