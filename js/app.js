// Main application logic

class PWAProxy {
    constructor() {
        this.proxyManager = new ProxyManager();
        this.currentUrl = '';
        this.isFullscreen = false;
        this.frame = null;
        
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupServiceWorker();
        this.loadSettings();
    }

    setupElements() {
        this.elements = {
            urlInput: document.getElementById('urlInput'),
            proxySelect: document.getElementById('proxySelect'),
            loadBtn: document.getElementById('loadBtn'),
            refreshBtn: document.getElementById('refreshBtn'),
            fullscreenBtn: document.getElementById('fullscreenBtn'),
            demoBtn: document.getElementById('demoBtn'),
            closeErrorBtn: document.getElementById('closeErrorBtn'),
            frame: document.getElementById('proxyFrame')
        };
        
        this.frame = this.elements.frame;
    }

    setupEventListeners() {
        // Button events
        this.elements.loadBtn.addEventListener('click', () => this.loadWebsite());
        this.elements.refreshBtn.addEventListener('click', () => this.refreshFrame());
        this.elements.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        this.elements.demoBtn.addEventListener('click', () => this.loadDemo());
        this.elements.closeErrorBtn.addEventListener('click', () => Utils.hideError());

        // Input events
        this.elements.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.loadWebsite();
            }
        });

        // Proxy selection change
        this.elements.proxySelect.addEventListener('change', () => {
            this.saveSettings();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Frame events
        this.setupFrameEvents();

        // Window events
        window.addEventListener('beforeunload', () => this.saveSettings());
    }

    setupFrameEvents() {
        this.frame.addEventListener('load', () => {
            Utils.hideLoading();
            this.onFrameLoad();
        });

        this.frame.addEventListener('error', () => {
            Utils.hideLoading();
            Utils.showError('Gagal memuat website. Coba proxy lain atau periksa URL.');
        });
    }

    onFrameLoad() {
        try {
            // Try to enhance iframe content
            const iframeDoc = this.frame.contentDocument || this.frame.contentWindow.document;
            
            if (iframeDoc) {
                // Inject custom styles
                const style = iframeDoc.createElement('style');
                style.textContent = `
                    body { 
                        margin: 0 !important; 
                        padding: 0 !important;
                        overflow-x: hidden !important;
                    }
                    html { 
                        overflow-x: hidden !important;
                    }
                    * {
                        max-width: 100% !important;
                    }
                `;
                
                if (iframeDoc.head) {
                    iframeDoc.head.appendChild(style);
                }
            }
        } catch (error) {
            // Cross-origin restrictions - expected
            console.log('Cannot modify iframe content due to CORS policy');
        }
    }

    loadWebsite() {
        const url = this.elements.urlInput.value.trim();
        
        if (!url) {
            Utils.showError('Masukkan URL terlebih dahulu');
            this.elements.urlInput.focus();
            return;
        }

        const validUrl = Utils.validateUrl(url);
        if (!validUrl) {
            Utils.showError('URL tidak valid. Pastikan format URL benar.');
            return;
        }

        this.currentUrl = validUrl;
        this.elements.urlInput.value = validUrl;
        
        const proxyType = this.elements.proxySelect.value;
        const proxyUrl = this.proxyManager.getProxyUrl(validUrl, proxyType);
        
        Utils.showLoading();
        Utils.hideError();
        
        this.frame.src = proxyUrl;
        
        // Timeout handler
        setTimeout(() => {
            Utils.hideLoading();
        }, 15000);
        
        this.saveSettings();
    }

    refreshFrame() {
        if (this.currentUrl) {
            this.loadWebsite();
        } else {
            Utils.showError('Tidak ada website yang dimuat');
        }
    }

    toggleFullscreen() {
        const appContainer = document.querySelector('.app-container');
        
        if (!this.isFullscreen) {
            appContainer.classList.add('fullscreen-mode');
            this.elements.fullscreenBtn.textContent = 'Exit Fullscreen';
            this.isFullscreen = true;
            
            // Try native fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(console.log);
            }
        } else {
            appContainer.classList.remove('fullscreen-mode');
            this.elements.fullscreenBtn.textContent = 'Fullscreen';
            this.isFullscreen = false;
            
            // Exit native fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(console.log);
            }
        }
    }

    loadDemo() {
        const demoUrl = this.proxyManager.getRandomDemoUrl();
        this.elements.urlInput.value = demoUrl;
        this.loadWebsite();
    }

    handleKeyboard(e) {
        // F11 for fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            this.toggleFullscreen();
        }
        
        // F5 or Ctrl+R for refresh
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault();
            this.refreshFrame();
        }
        
        // Escape to exit fullscreen
        if (e.key === 'Escape' && this.isFullscreen) {
            this.toggleFullscreen();
        }
    }

    saveSettings() {
        const settings = {
            lastUrl: this.currentUrl,
            selectedProxy: this.elements.proxySelect.value,
            timestamp: Date.now()
        };
        
        Utils.setStorageItem('pwa-proxy-settings', settings);
    }

    loadSettings() {
        const settings = Utils.getStorageItem('pwa-proxy-settings');
        
        if (settings) {
            if (settings.lastUrl) {
                this.elements.urlInput.value = settings.lastUrl;
            }
            
            if (settings.selectedProxy) {
                this.elements.proxySelect.value = settings.selectedProxy;
            }
        }
        
        // Focus URL input
        this.elements.urlInput.focus();
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PWAProxy();
});
