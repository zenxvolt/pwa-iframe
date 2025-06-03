// Proxy handling functionality

class ProxyManager {
    constructor() {
        this.endpoints = {
            allorigins: 'https://api.allorigins.win/raw?url=',
            corsproxy: 'https://corsproxy.io/?',
            thingproxy: 'https://thingproxy.freeboard.io/fetch/',
            crossorigin: 'https://crossorigin.me/'
        };
        
        this.demoUrls = [
            'https://example.com',
            'https://httpbin.org/html',
            'https://jsonplaceholder.typicode.com',
            'https://www.wikipedia.org',
            'https://github.com'
        ];
    }

    getProxyUrl(originalUrl, proxyType) {
        const endpoint = this.endpoints[proxyType];
        if (!endpoint) {
            throw new Error(`Unknown proxy type: ${proxyType}`);
        }
        
        return endpoint + encodeURIComponent(originalUrl);
    }

    getRandomDemoUrl() {
        return this.demoUrls[Math.floor(Math.random() * this.demoUrls.length)];
    }

    async testProxy(url, proxyType, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const timer = setTimeout(() => {
                reject(new Error('Timeout'));
            }, timeout);

            img.onload = () => {
                clearTimeout(timer);
                resolve(true);
            };

            img.onerror = () => {
                clearTimeout(timer);
                reject(new Error('Proxy test failed'));
            };

            // Test with a simple endpoint
            const testUrl = this.getProxyUrl('https://httpbin.org/status/200', proxyType);
            img.src = testUrl;
        });
    }
}
