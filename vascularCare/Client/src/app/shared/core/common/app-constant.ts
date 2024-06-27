import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

export class AppConsts {

  constructor() {
  }
  static readonly message = {
    saveMessage: "Saved successfully",
    referMessage: "Patient Referred successfully",
    loginMessage: "Logedin successfully",
    updateMessage: "Updated successfully",
    uploadMessage: "File uploaded successfully",
    resumeMessage: "Thanks for applying.",
    replaceMessage: "File image replaced successfully",
    deleteConformMessage: "Do you want to delete this user?",
    failureMessage: "Failed to perform the operation, Please try again?",
    invalidCredential:
      "Authentication failed,please enter valid userid and password.",
    header_Default_Notification: "User Confirmation",
    notification_Default_Message: "Do you want to cancel your changes?",
    notification_Default_NoButton: "No",
    notification_Default_YesButton: "Yes",
    notification_Default_OkButton: "Yes",
    notification_Default_CancelButton: "No",
    notification_Default_ValidationText: "Cancel",
    notification_Default_DiscardChanges:
      "Do you want to discard the current changes?",
    notification_Delete_Cinfirmation: "Delete",
    dosData: "previousDos",
    deletedMessage: "Deleted successfully",
    permissionExist:
      "Same permission already exist, Please enter different permission",
    mailDeleteMessage: "Do you want to delete this email?",
    mailDeleteHeader: "Confirm Delete",
    bioDeleteMessage: "Do you want to delete this bio?",
    userDeleteMessage: "Do you want to delete this user?",
    mailCampaginDeleteMessage: "Do you want to delete this campagin?",
    permissionDeleteHeader: "Do you want to delete this permission?",
    sentMessage: "Email sent successfully",
    applicantMessage: "Applicant selection Required",
    contactMessage: "Message sent Successfully",
    confirmFacilityMessage: "Do you want to Enable Facility?",
    confirmFacilityHeader: "Confirm Action",
    confirmFacilityInactiveMessage: "Do you want to Disable Facility?",
    internalUserPassword: null,
    corporationDeleteMessage: "Do you want to delete this corporation?",
    ruleDeleteMessage: "Do you want to delete this role?",
    ruleAssignedMessage: "Can not be deleted. Role has been assigned to the user",
    CampaginAssignedMessage: "Can not be deleted. Campagin has been assigned to the user",
    CorporationAssignedMessage: "Can not be deleted. Corporation has been assigned to the user",
    duplicateEmail: "Same email exist, Please enter different email.",
    applicantDeleteMessage: "Do you want to delete this Applicant?",
    encryptionToken: "D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y"
  };

  static readonly defaultTabId = {
    Savings: "62",
    ESCKey: 27,
  };
  static readonly encryptionDecryption = {
    key: "mvpSecretKeyHere",

  };
  static readonly azyreAd = {
    clientId: environment.clinetId,
    authority: 'https://login.microsoftonline.com/1875ebb8-4d91-4500-b768-2d1ea4d2dee1',
    redirectUri: environment.redirectUri //environment.redirectUri''

  };
  //static appServiceURL = "https://localhost:44376"; //Dev
  // static appServiceURL = "https://app-mvp-prod-api-stage.azurewebsites.net"; // Stage

  // static appServiceURL = "https://app-mvp-prod-api.azurewebsites.net";//Prod

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
  static readonly routingPerMission = { 
    PageHome: "Home",  
    PageHr: "HR",
    PageAnalytics: "Analytics",    
    PagesAppointments: "Appointments",    
    PagesDashboard: "Dashboard",    
    PagesManageCorporations: "Manage Corporations",    
    PageManagePermissions: "Manage Permissions",  
    PagesManageRoles: "Manage Roles", 
    PageManageSite: "Manage Site",   
    PagesManageUsers: "Manage Users",    
    PagesPatients: "Patients",
    PagesProvider: "Provider",  
    PagesReferPatient: "Refer A Patient",    
    SiteManagerEdit: "Site Manager Edit",
    PageManageCovidCards: "Maintain COVID-19 Cards ",   
    PagesCareers: "Careers",      
    PagesManageEmail: "Manage Email",     
    PagesEmailCampaignManager: "Email Campaign Manager",      
    PagesEmailManager: "Email Manager",
  

  };
  static readonly perMissionData = {
    PagesCommonDashboard: "PagesCommonDashboard",
    PageAnalyticsEdit: "Analytics.View",
    PageAnalyticsView: "Analytics.Edit",
    PagesAppointmentsView: "Appointments.View",
    PagesAppointmentsEdit: "Appointments.Edit",
    PagesDashboardEdit: "Dashboard.Edit",
    PagesDashboardView: "Dashboard.View",
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
    PagesCareersEdit: "Careers.Edit",
    PagesCareersView: "Careers.View",   
    PagesManageEmailView: "Manage Email.View",
    PagesManageEmailEdit: "Manage Email.Edit",   
    PagesEmailCampaignManagerView: "Email Campaign Manager.View",
    PagesEmailCampaignManagerEdit: "Email Campaign Manager.Edit",    
    PagesEmailManagerView: "Email Manager.View",
    PagesEmailManagerEdit: "Email Manager.Edit",
    PagesResumeView: "Resume.View",
    PagesResumeEdit: "Resume.Edit",
    PagesNewfacesheetView: "Newfacesheet.View",
    PagesNewfacesheetEdit: "Newfacesheet.Edit",
    PagesContactusView: "Contact us.View",
    PagesContactusEdit: "Contact us.Edit",
    PagesHrView: "HR.View",
    PagesHrEdit: "HR.Edit",
    PagesFacilitiesView: "Facilities.View",
    PagesFacilitiesEdit: "Facilities.Edit",
    PagesVccView: "VCC.View",
    PagesVccEdit: "VCC.Edit",
    PagesAppSettingView: "AppSetting.View",
    PagesAppSettingEdit: "AppSetting.Edit",
    PagesBioUploadView: "Biographies.View",
    PagesBioUploadEdit: "Biographies.Edit"
  };

  static readonly apiUrl = {
    getTestData: environment.appServiceURL + "/api/TokenAuth/getData?",
    getTestData1: environment.appServiceURL + "/api/TokenAuth/getData1?",
    getTestData3: environment.appServiceURL + "/api/TokenAuth/getData?",
    getTestData2: environment.appServiceURL + "/api/TokenAuth",
    login: environment.appServiceURL + "/api/TokenAuth/login?",
    getAppointmet:
      environment.appServiceURL + "/api/Appointment/GetAppointments?",
    getPatient: environment.appServiceURL + "/api/Patient/GetPatients?",

    getProvider: environment.appServiceURL + "/api/Provider/GetProvider?",
    getCovidCardProvider:
      environment.appServiceURL + "/api/Provider/GetCovidCardProvider?",
    isProviderExists:
      environment.appServiceURL + "/api/Provider/IsProviderExist?",

    getCommonProvider: environment.appServiceURL + "/api/Common/GetProviderLists",
    getDashboard: environment.appServiceURL + "/api/Dashboard/GetDashboard?",
    getNextDos: environment.appServiceURL + "/api/Dashboard/GetNextDos?",
    getChartData: environment.appServiceURL + "/api/Dashboard/GetStatsPdosChart?",
    getbarChartData:
      environment.appServiceURL + "/api/Dashboard/GetbarChartData?",
    saveFile: environment.appServiceURL + "/api/Appointment/FileUpload?",
    getCovidUrl: environment.appServiceURL + "/api/ManageSite/GetCovidUrl?",
    deleteCovidUrl:
      environment.appServiceURL + "/api/ManageSite/DeleteCovidCard?",
    saveCovidFile: environment.appServiceURL + "/api/ManageSite/CovidFileUpload?",
    removeCovidFile:
      environment.appServiceURL + "/api/ManageSite/DeleteCovidCard?",
    getPatientProfile:
      environment.appServiceURL + "/api/PatientProfile/GetPatientProfile?",
    getPatientInsurance:
      environment.appServiceURL + "/api/Insurance/GetInsurance?",
    getPatientHistory:
      environment.appServiceURL + "/api/AppHistory/GetAppHistory?",
    getUpcomingAppointments:
      environment.appServiceURL +
      "/api/UpcomingAppointment/GetUpcomingAppointment?",
    getNextDosAppointment:
      environment.appServiceURL + "/api/Appointment/GetNextDos?",
    getPastAppointment:
      environment.appServiceURL + "/api/Appointment/GetPastAppoinements?",
    getFutureAppointment:
      environment.appServiceURL + "/api/Appointment/GetFutureAppoinements?",
    downloadPastAppoinements:
      environment.appServiceURL + "/api/Appointment/DownloadPastAppoinements?",

    saveCorporation: environment.appServiceURL + "/api/Facility/SaveCorporation?",
    getCorporations: environment.appServiceURL + "/api/Facility/GetCorporations?",
    updateCorporation:
      environment.appServiceURL + "/api/Facility/UpdateCorporation",
    deleteCorporation:
      environment.appServiceURL + "/api/Facility/DeleteCorporation?",
    getUsers: environment.appServiceURL + "/api/User/GetUsers?",
    saveUser: environment.appServiceURL + "/api/User/SaveUser?",
    updateUser: environment.appServiceURL + "/api/User/UpdateUser",
    getUserCorporateFacility:
      environment.appServiceURL + "/api/User/GetUserFacility?",
    getUserCorporations:
      environment.appServiceURL + "/api/User/GetCorporateFacility?",
    getUserFacilities: environment.appServiceURL + "/api/User/Facilities?",
    resetPassword: environment.appServiceURL + "/api/User/ResetPassword?",
    forgotPassword: environment.appServiceURL + "/api/User/ForgotPassword?",
    verifyEmail: environment.appServiceURL + "/api/User/VerifyEmail?",
    deleteUser: environment.appServiceURL + "/api/User/DeleteUser?",

    vccFacility: environment.appServiceURL + "/api/Facility/GetVccFacility?",
    dosDetail: environment.appServiceURL + "/api/Dashboard/DosDetails?",
    getRoles: environment.appServiceURL + "/api/Role/GetRoles?",
    deleteRole: environment.appServiceURL + "/api/Role/DeleteRole?",
    getPermisions: environment.appServiceURL + "/api/role/GetPermissions?",
    saveRole: environment.appServiceURL + "/api/role/SaveRole?",
    savePermission: environment.appServiceURL + "/api/role/SavePermission?",
    getAllPermisions: environment.appServiceURL + "/api/role/GetAllPermissions?",
    getPermisionById: environment.appServiceURL + "/api/role/GetPermissionsById?",
    getPermisionLookUp:
      environment.appServiceURL + "/api/role/GetPermisionLookUp?",
    getIsPermissionEdit:
      environment.appServiceURL + "/api/role/getIsPermissionEdit?",
    deletePermission: environment.appServiceURL + "/api/role/DeletePermission?",

    saveUpdateVCCTransport:
      environment.appServiceURL + "/api/Dashboard/SaveUpdateVCCTransport?",
    getVCCTransportDetail:
      environment.appServiceURL + "/api/Dashboard/GetVCCTransportDetail?",
    getVccAppointments:
      environment.appServiceURL + "/api/Dashboard/VCCAppointmentsData?",
    updateAcceptTermUser:
      environment.appServiceURL + "/api/User/UpdateAcceptTermUser?",
    excelExport: environment.appServiceURL + "/api/Common/ExcelExport?",
    decrypted: environment.appServiceURL + "/api/Common/GetDecryptedData?",
    getJobs: environment.appServiceURL + "/api/Job/GetJobs?",
    saveUpdateJobs: environment.appServiceURL + "/api/Job/SaveUpdateJobs?",
    applyJob: environment.appServiceURL + "/api/Job/ApplyJob?",
    deleteJob: environment.appServiceURL + "/api/Job/DeleteJob?",
    getMailCampaigns: environment.appServiceURL + "/api/MailCampaign/GetMailCampaigns?",
    deleteMail: environment.appServiceURL + "/api/MailCampaign/DeleteMailCampaign?",
    saveUpdateMail: environment.appServiceURL + "/api/MailCampaign/SaveUpdateMailCampaign?",
    getUpdatedMail: environment.appServiceURL + "/api/MailCampaign/GetUpdatedMailCampaign?",
    getUpdateMailCampaignType: environment.appServiceURL + "/api/MailCampaign/GetUpdateMailCampaignType?",
    saveUpdateMailCampaign: environment.appServiceURL + "/api/MailCampaign/UpdateMailCampaignDescription?",
    getApplicationSetting: environment.appServiceURL + "/api/ApplicationSetting/GetApplicationSettings?",
    saveApplicationSetting: environment.appServiceURL + "/api/ApplicationSetting/SaveApplicationSetting?",
    getEmailIdText: environment.appServiceURL + "/api/MailCampaign/GetMailCampaignIdText?",
    prepareBatch: environment.appServiceURL + "/api/Email/PrepareBatch?",
    searchEmails: environment.appServiceURL + "/api/Email/SearchEmails?",
    getApplicants: environment.appServiceURL + "/api/MailCampaign/GetApplicant?",
    onGetFacesheets: environment.appServiceURL + "/api/MailCampaign/GetFacesheetLists?",
    sendMessages:  environment.appServiceURL + "/api/Email/SendMessages?",
    getApplicantJobDetails: environment.appServiceURL + "/api/MailCampaign/GetApplicantJobDetails?",
    getApplicantFileUrl: environment.appServiceURL + "/api/MailCampaign/GetApplicantFileUrl?",
    updateFacility: environment.appServiceURL + "/api/Facility/UpdateFacility?",
    getActiveInActiveFacility: environment.appServiceURL + "/api/Facility/GetActiveInActiveFacility?",
    updateFacilityFromCerebro: environment.appServiceURL + "/api/Facility/UpdateFacilityFromCerebro?",
    saveInternalUser: environment.appServiceURL + "/api/User/SaveInternalUser?",
    getLocationPatientCount: environment.appServiceURL + "/api/Patient/GetPatientsLocationCount",
    getVccFacility: environment.appServiceURL + "/api/Facility/GetVccFacility",
    updateVccFacility: environment.appServiceURL + "/api/Facility/UpdateVccFacility" ,
    getUsersByRole: environment.appServiceURL + "/api/Role/GetUsersByRole?",
    contactUs: environment.appServiceURL + "/api/vascularCare/ContactUs/ContactUs?",
    deleteApplicant: environment.appServiceURL + "/api/MailCampaign/DeleteApplicant?",
    getInternalUserVccFacility: environment.appServiceURL + "/api/Facility/GetInternalUserVccFacility?",
    saveUpdateMvpTeamBio : environment.appServiceURL + "/api/MvpTeam/SaveUpdateMvpTeamBio?",
    getMvpTeam: environment.appServiceURL + "/api/MvpTeam/GetMvpTeamBio?",
    deleteMvpTeamBio: environment.appServiceURL + "/api/MvpTeam/DeleteMvpTeamBio?",
    getMvpTeamBioById: environment.appServiceURL + "/api/MvpTeam/GetMvpTeamBioById?",
    getLandingPages:environment.appServiceURL + "/api/Role/GetLandingPages",
    getMvpTeamBioByIdWithCount: environment.appServiceURL + "/api/MvpTeam/GetMvpTeamBioByIdWithCount?",
    getDocumentById: environment.appServiceURL + "/api/Common/GetDocumentById?",
    twoStepSendCode: environment.appServiceURL + "/api/TokenAuth/TwoStepSendCode?",
    twoStepVerification: environment.appServiceURL + "/api/TokenAuth/TwoStepVerification?"
  }
  static readonly constantValue = {
    login: "//login",
  };
}
export const ROUTE_BY_PERMISSION = {
  corportionPath: '/manage-site/manage-corporations',
  hrMenuPath: '/manage-site/hr-menu'
}
