import { Menu } from './menu.model';

export const companyMenuItems=[
  new Menu (10, 'ADMIN_NAV.DASHBOARD', '/admin', null, 'dashboard', null, false, 0),
  new Menu (20, 'Available Donations', null, null, 'card_giftcard', null, true, 0),
  new Menu (21, 'Donations List', '/admin/available-donations', null, 'category', null, false, 20),
  new Menu (30, 'Obtained Donations', null, null, 'card_giftcard', null, true, 0),
  new Menu (31, 'Donations List', '/admin/obtained-donations', null, 'list_alt', null, false, 30),
]
export const adminMenuItems =[
    new Menu (10, 'ADMIN_NAV.DASHBOARD', '/admin', null, 'dashboard', null, false, 0),
    new Menu (20, 'Settings', null, null, 'settings', null, true, 0),
    new Menu (21, 'Donation Types List', '/admin/donation-types', null, 'category', null, false, 20),
    new Menu (22, 'Delivery Types List', '/admin/delivery-types', null, 'category', null, false, 20),
    new Menu (30, 'Donations', null, null, 'card_giftcard', null, true, 0),
    new Menu (31, 'Donations List', '/admin/donations', null, 'category', null, false, 30),
    new Menu (40, 'Content', null, null, 'rss_feed', null, true, 0),
    new Menu (41, 'News List', '/admin/news', null, 'category', null, false, 40),
    new Menu (41, 'Notifications List', '/admin/notifications', null, 'category', null, false, 40),
    new Menu (50, 'Companies', null, null, 'category', null, true, 0),
    new Menu (51, 'Companies List', '/admin/companies', null, 'category', null, false, 50),
    new Menu (60, 'Requests', null, null, 'rss_feed', null, true, 0),
    new Menu (61, 'Requests List','/admin/requests', null, 'category', null, false, 60),
    new Menu (62, 'Offered List','/admin/offered-requests', null, 'category', null, false, 60),
    new Menu (70, 'Payment Reports', null, null, 'rss_feed', null, true, 0),
    new Menu (71, 'Payment Reports List','/admin/payment-reports', null, 'category', null, false, 70),
    // new Menu (70, 'ADMIN_NAV.WITHDRAWAL', '/admin/withdrawal', null, 'credit_card', null, false, 0),
    // new Menu (80, 'ADMIN_NAV.ANALYTICS', '/admin/analytics', null, 'multiline_chart', null, false, 0),
    // new Menu (90, 'ADMIN_NAV.REFUND', '/admin/refund', null, 'restore', null, false, 0),
    // new Menu (100, 'ADMIN_NAV.FOLLOWERS', '/admin/followers', null, 'follow_the_signs', null, false, 0),
    // new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0),
    // new Menu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0),
    // new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new Menu (144, 'Level 5', null, '/', 'link', null, false, 143),
    // new Menu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]
