// Auth
export const LOGIN = 'auth/admin/login';
// export const REGISTER = 'auth/user/signup';
export const VERIFY_EMAIL = '/auth/user/verify-account';
export const RESEND_VERIFICATION_CODE = '/auth/user/otp/email-verification';
export const FORGOT_PASSWORD = '/auth/admin/forgot-password';
export const RESET_PASSWORD = '/auth/admin/reset-password';

// users
export const GET_PROFILE = '/admins/profile';
export const GET_USERS = '/admins/users';
export const EXPORT_USERS = '/admins/users/export';

// Dashboard
export const GET_DASHBOARD_STATS = '/admins/dashboard';

// Staffs management
export const GET_ALL_ADMINS = '/admins';
export const CREATE_ADMIN = '/auth/admin';
export const GET_ADMIN_ROLES = '/admins/roles';
export const CREATE_ADMIN_ROLE = '/admins/roles';
export const UPDATE_ADMIN_STATUS = '/admins/status';

// Settings
export const UPDATE_PASSWORD = '/admins/password';
export const FILE_UPLOAD = '/file-upload';
export const CREATE_BANNER = '/banners';

// Notifications
export const NOTIFICATIONS = '/notifications';

// APPlications
export const JOB_APPLICATIONS = '/admins/job-applications';

// Job Profiles
export const JOB_PROFILES = '/admins/job-profiles';
export const JOB_PROFILES_USER = '/admins/job-profiles/user';

//  subscriptions
export const GET_SUBSCRIPTIONS = '/admins/subscriptions';

// Payments
export const PAYMENTS = '/admins/payments';

// Resumes
export const RESUMES = '/admins/users';

// Promotions/coupons
export const COUPONS = '/admin/promotions/coupons';
export const CREATE_COUPON = '/admin/promotions/coupon';
export const PROMOTION = '/admin/promotions';
