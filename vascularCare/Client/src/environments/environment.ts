// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   //appServiceURL: 'https://localhost:44376',
    //  appServiceURL: "https://app-mvp-prod-api.azurewebsites.net",
    // appServiceURL: "https://app-mvp-prod-api-stage.azurewebsites.net",
   appServiceURL: "https://app-mvp-prod-api-dev.azurewebsites.net",  
   clinetId: 'f5338dae-c398-48fb-b2e3-19bcff3e76d6',
   redirectUri: 'http://localhost:4200',
   version: '0.0.2'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
