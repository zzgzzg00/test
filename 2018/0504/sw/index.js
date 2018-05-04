const {serviceWorker}=navigator;
if(serviceWorker){
    serviceWorker.register('./sw.js')
        .then(function registeredSw() {
            console.log('register')
        })
}