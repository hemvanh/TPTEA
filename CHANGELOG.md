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
- Validator Login form[@phillip](https://github.com/hemvanh/TPTEA/pull/23)
- Routing algorithm with new token of Admin & Customer[@phillip](https://github.com/hemvanh/TPTEA/pull/33)
- Automation test routing [@phillip](https://github.com/hemvanh/TPTEA/pull/33)
- Schema Admin (res loginAdmin,def type Admin,input AdminLoginInput)[@john]
- Demo QR code scanner
- Admin Login validator
- Generate gift card QR
- Topup page
- Authenticate a GiftCard utility function
- GiftCard page [@phillip](https://github.com/hemvanh/TPTEA/pull/55)
### Removed 
- Join now button
- Remove parameter "expiry" and change parameter "amount" to "giftCardid" in genGiftCard function
### Fixed
- createdAt/updatedAt remove default val [#reason](default val is autogen when using upsert/update in sequelize)
- Register layout
- Change style reply botton and font size desc  [@john](https://github.com/tri-et/TPTEA/tree/feature/menu-detail)
- Change wrong routing at news detail page (orders->categories)
- Rename MyLayout to Default
- Rename auth-token-admin to auth-token
- Responsive customer grid
- CSS fix for Topup & Login page

## 0.0.1 - 2018-09-17
### Fixed
- Missing images due to improper using of assets images
- Remove dist/ from .gitignore [#reason](in-order to be able to upload to heroku)
- Change field fullname to name
- Apply jwt to _get, _post
### Changed
- Remove pull to refresh
- Use statics assets instead of google drive image download links
- Change default value for counter [@john](https://github.com/tri-et/TPTEA/tree/feature/fix-bugs-counter)
- Rename variable  to camel case in page MenuDetail 
- Remove register facebook button from login page into register page
- Adjust createGiftCard, simplify and shorten jwt by moving Gift Card info DB
- Adjust authGiftCard
- Adjust applyGiftCard (update customerId to GiftCard table)
### Added
- Customer Login feature
- Customer Register feature
- News & NewsDetail page
- Categories Listing page
- Logins fields validation
- Login admin
- Fetch admin -> fetch Admin info (username) and show to admin default logged in page
- Creat seeders GiftCard add amount, expiry
- A single GiftCard component used for printing
- Verify and generate customer payment Id
- Add IsPrinted to Giftcard
- Receive payment function
- Grid recive payment