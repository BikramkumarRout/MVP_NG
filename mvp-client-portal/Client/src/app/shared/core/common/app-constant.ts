import { HttpHeaders } from "@angular/common/http";

export class AppConsts {
  static readonly message = {
    saveMessage: "Saved successfully",
    referMessage: "Patient Referred successfully",
    loginMessage: "Logedin successfully",
    updateMessage: "Updated successfully",
    uploadMessage: "File uploaded successfully",
    replaceMessage: "File image replaced successfully",
    deleteConformMessage: "Do you want to delete this user?",
    invalidCredential:
      "Authentication failed,please enter valid userid and password.",
    header_Default_Notification: "User Confirmation",
    notification_Default_Message: "Do you want to cancel your changes?",
    notification_Default_NoButton: "No",
    notification_Default_YesButton: "Yes",
    notification_Default_OkButton: "Yes",
    notification_Default_CancelButton: "No",
    contactMessage: "Message sent Successfully",
    notification_Default_ValidationText: "Cancel",
    notification_Default_DiscardChanges:
      "Do you want to discard the current changes?",
    notification_Delete_Cinfirmation: "Delete",
    dosData: "previousDos",
    deletedMessage: "Deleted successfully",
    permissionExist:
      "Same permission already exist, Please enter different permission",
      encryptionToken: "D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y"
  };

  static readonly defaultTabId = {
    Savings: "62",
    ESCKey: 27,
  };
  static readonly encryptionDecryption = {
    key: "mvpSecretKeyHere",
  };
  static readonly perMissionData = {
    PagesCommonDashboard: "PagesCommonDashboard",
    PageAnalyticsEdit: "Analytics.View",
    PageAnalyticsView: "Analytics.Edit",
    PagesAppointmentsView: "Appointments.View",
    PagesAppointmentsEdit: "Appointments.Edit",
    PagesDashboardEdit: "Pages.Dashboard.Edit",
    PagesDashboardView: "Pages.Dashboard.View",
    PagesManageCorporationsEdit: "Manage Corporations.Edit",
    PagesManageCorporationsView: "Manage Corporations.View",
    PageManagePermissionsEdit: "Manage Permissions.Edit",
    PageManagePermissionsView: "Manage Permissions.View",
    PagesManageRolesEdit: "Manage Roles.View",
    PagesManageRolesView: "Manage Roles.Edit",
    PageManageSiteEdit: "Manage Site.Edit",
    PageManageSiteView: "Manage Site.View",
    PagesManageUsersEdit: "Manage Users.Edit",
    PagesManageUsersView: "Manage Users.View",
    PagesPatientsEdit: "Patients.Edit",
    PagesPatientsView: "Patients.View",
    PagesProviderEdit: "Provider.Edit",
    PagesProviderView: "Provider.View",
    PagesReferPatientEdit: "Refer A Patient.Edit",
    PagesReferPatientView: "Refer A Patient.View",
    SiteManagerEdit: "Site Manager Edit",
    PageManageCovidCardsView: "Maintain COVID-19 Cards .View",
    PageManageCovidCardsEdit: "Maintain COVID-19 Cards .Edit",
  };
  //static appServiceURL = "https://localhost:44376"; //Dev
  //static appServiceURL = "https://app-mvp-prod-api-stage.azurewebsites.net"; // Stage

    static appServiceURL = 'https://app-mvp-prod-api.azurewebsites.net';//Prod
  static httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  };

  static httpOptionsFileUpload = {
    headers: new HttpHeaders({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
  };

  static readonly apiUrl = {
    getTestData: AppConsts.appServiceURL + "/api/TokenAuth/getData?",
    getTestData1: AppConsts.appServiceURL + "/api/TokenAuth/getData1?",
    getTestData3: AppConsts.appServiceURL + "/api/TokenAuth/getData?",
    getTestData2: AppConsts.appServiceURL + "/api/TokenAuth",
    login: AppConsts.appServiceURL + "/api/TokenAuth/login?",
    getAppointmet:
      AppConsts.appServiceURL + "/api/Appointment/GetAppointments?",
    getPatient: AppConsts.appServiceURL + "/api/Patient/GetPatients?",

    getProvider: AppConsts.appServiceURL + "/api/Provider/GetProvider?",
    getCovidCardProvider:
      AppConsts.appServiceURL + "/api/Provider/GetCovidCardProvider?",
    isProviderExists:
      AppConsts.appServiceURL + "/api/Provider/IsProviderExist?",

    getCommonProvider: AppConsts.appServiceURL + "/api/Common/GetProviderLists",
    getDashboard: AppConsts.appServiceURL + "/api/Dashboard/GetDashboard?",
    getNextDos: AppConsts.appServiceURL + "/api/Dashboard/GetNextDos?",
    getChartData: AppConsts.appServiceURL + "/api/Dashboard/GetStatsPdosChart?",
    getbarChartData:
      AppConsts.appServiceURL + "/api/Dashboard/GetbarChartData?",
    saveFile: AppConsts.appServiceURL + "/api/Appointment/FileUpload?",
    getCovidUrl: AppConsts.appServiceURL + "/api/ManageSite/GetCovidUrl?",
    deleteCovidUrl:
      AppConsts.appServiceURL + "/api/ManageSite/DeleteCovidCard?",
    saveCovidFile: AppConsts.appServiceURL + "/api/ManageSite/CovidFileUpload?",
    removeCovidFile:
      AppConsts.appServiceURL + "/api/ManageSite/DeleteCovidCard?",
    getPatientProfile:
      AppConsts.appServiceURL + "/api/PatientProfile/GetPatientProfile?",
    getPatientInsurance:
      AppConsts.appServiceURL + "/api/Insurance/GetInsurance?",
    getPatientHistory:
      AppConsts.appServiceURL + "/api/AppHistory/GetAppHistory?",
    getUpcomingAppointments:
      AppConsts.appServiceURL +
      "/api/UpcomingAppointment/GetUpcomingAppointment?",
    getNextDosAppointment:
      AppConsts.appServiceURL + "/api/Appointment/GetNextDos?",
    getPastAppointment:
      AppConsts.appServiceURL + "/api/Appointment/GetPastAppoinements?",
    getFutureAppointment:
      AppConsts.appServiceURL + "/api/Appointment/GetFutureAppoinements?",
    downloadPastAppoinements:
      AppConsts.appServiceURL + "/api/Appointment/DownloadPastAppoinements?",

    saveCorporation: AppConsts.appServiceURL + "/api/Facility/SaveCorporation?",
    getCorporations: AppConsts.appServiceURL + "/api/Facility/GetCorporations?",
    updateCorporation:
      AppConsts.appServiceURL + "/api/Facility/UpdateCorporation",
    getUsers: AppConsts.appServiceURL + "/api/User/GetUsers?",
    saveUser: AppConsts.appServiceURL + "/api/User/SaveUser?",
    updateUser: AppConsts.appServiceURL + "/api/User/UpdateUser",
    getUserCorporateFacility:
      AppConsts.appServiceURL + "/api/User/GetUserFacility?",
    getUserCorporations:
      AppConsts.appServiceURL + "/api/User/GetCorporateFacility?",
    getUserFacilities: AppConsts.appServiceURL + "/api/User/Facilities?",
    resetPassword: AppConsts.appServiceURL + "/api/User/ResetPassword?",
    forgotPassword: AppConsts.appServiceURL + "/api/User/ForgotPassword?",
    verifyEmail: AppConsts.appServiceURL + "/api/User/VerifyEmail?",
    deleteUser: AppConsts.appServiceURL + "/api/User/DeleteUser?",

    vccFacility: AppConsts.appServiceURL + "/api/Facility/GetVccFacility?",
    dosDetail: AppConsts.appServiceURL + "/api/Dashboard/DosDetails?",
    getRoles: AppConsts.appServiceURL + "/api/Role/GetRoles?",
    getPermisions: AppConsts.appServiceURL + "/api/role/GetPermissions?",
    saveRole: AppConsts.appServiceURL + "/api/role/SaveRole?",
    savePermission: AppConsts.appServiceURL + "/api/role/SavePermission?",
    getAllPermisions: AppConsts.appServiceURL + "/api/role/GetAllPermissions?",
    getPermisionById: AppConsts.appServiceURL + "/api/role/GetPermissionsById?",
    getPermisionLookUp:
      AppConsts.appServiceURL + "/api/role/GetPermisionLookUp?",
    getIsPermissionEdit:
      AppConsts.appServiceURL + "/api/role/getIsPermissionEdit?",
    deletePermission: AppConsts.appServiceURL + "/api/role/DeletePermission?",

    saveUpdateVCCTransport:
      AppConsts.appServiceURL + "/api/Dashboard/SaveUpdateVCCTransport?",
    getVCCTransportDetail:
      AppConsts.appServiceURL + "/api/Dashboard/GetVCCTransportDetail?",
    getVccAppointments:
      AppConsts.appServiceURL + "/api/Dashboard/VCCAppointmentsData?",
    updateAcceptTermUser:
      AppConsts.appServiceURL + "/api/User/UpdateAcceptTermUser?",
    excelExport: AppConsts.appServiceURL + "/api/Common/ExcelExport?",
    contactUs: AppConsts.appServiceURL + "/api/vascularCare/ContactUs/ContactUs",
    getJobs: AppConsts.appServiceURL + "/api/Job/GetJobs",
    applyJob: AppConsts.appServiceURL + "/api/Job/ApplyJob",
    getLocationPatientCount: AppConsts.appServiceURL + "/api/Patient/GetPatientsLocationCount",
    getMvpTeam: AppConsts.appServiceURL + "/api/MvpTeam/GetMvpTeamBio?",
    deleteMvpTeamBio: AppConsts.appServiceURL + "/api/MvpTeam/DeleteMvpTeamBio?",
    getMvpTeamBioById: AppConsts.appServiceURL + "/api/MvpTeam/GetMvpTeamBioById?",
    getLandingPages:AppConsts.appServiceURL + "/api/Role/GetLandingPages",
    getMvpTeamBioByIdWithCount: AppConsts.appServiceURL + "/api/MvpTeam/GetMvpTeamBioByIdWithCount?"
    //getLocations: AppConsts.appServiceURL + "/api/vascularCare/getLocations",
   };

  static readonly constantValue = {
    login: "//login",
  };
}
