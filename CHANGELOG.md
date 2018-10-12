# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Menus Listing after clicking a single Catefory
- Register link at login page
- Register facebook
- Stylus all pages & components (maxwidth = $breakpoint-xs quasar's variable)
- Admin Default layout & Login
- Customer Detail Page with Sign-Out feaature
- Schema Admin (res loginAdmin,def type Admin,input AdminLoginInput)[@john]
### Removed 
- Join now button
### Fixed
- createdAt/updatedAt remove default val [#reason](default val is autogen when using upsert/update in sequelize)
- Register layout
- Change style reply botton and font size desc  [@john](https://github.com/tri-et/TPTEA/tree/feature/menu-detail)
- Change wrong routing at news detail page (orders->categories)
- Rename MyLayout to Default

## 0.0.1 - 2018-09-17
### Fixed
- Missing images due to improper using of assets images
- Remove dist/ from .gitignore [#reason](in-order to be able to upload to heroku)
- Change field fullname to name
### Changed
- Remove pull to refresh
- Use statics assets instead of google drive image download links
- Change default value for counter [@john](https://github.com/tri-et/TPTEA/tree/feature/fix-bugs-counter)
- Rename variable  to camel case in page MenuDetail 
- Remove register facebook button from login page into register page
### Added
- Customer Login feature
- Customer Register feature
- News & NewsDetail page
- Categories Listing page
- Logins fields validation
