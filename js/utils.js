// Utility functions for the PWA

class Utils {
    static validateUrl(url) {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.href;
        } catch (error) {
            return null;
        }
    }

    static showElement(element) {
        if (element) {
            element.style.display = 'block';
        }
    }

    static hideElement(element) {
        if (element) {
            element.style.display = 'none';
        }
    }

    static showLoading() {
        const loading = document.getElementById('loading');
        this.showElement(loading);
    }

    static hideLoading() {
        const loading = document.getElementById('loading');
        this.hideElement(loading);
    }

    static showError(message = 'Terjadi kesalahan') {
        const error = document.getElementById('error');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorMessage) {
            errorMessage.textContent = message;
        }
        
        this.showElement(error);
    }

    static hideError() {
        const error = document.getElementById('error');
        this.hideElement(error);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static getStorageItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    }

    static setStorageItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            return false;
        }
    }
}
