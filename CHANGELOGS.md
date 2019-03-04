# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## 0.0.2za - 2018-12-12
### Fix bugs
- Change Column name Receiving Time to Time (Order Admin)
- Display of address & time PlaceOrderMethod correctly by Deliver & Pickup mode
- Clear Address, Contact info when user chose Pickup order mode
- Purify aliasType (don't uppercase 1st letter, add more 's')
- Disable button (+) of ETModal when don't have any changing)
- Add alert when the order has been placed successfully
- Warning confirm miss handling catch (cancel)
- Disable notify successfully temporary
- Fix responsive for grid in admin page
- Change notify to alert apply giftcard Topup page
- Select text for Deliver Address and Contact ( Safari not support)
- Change icon pay now button
- Prevent place order when delivery address & contact are blank
- Add enter event password textbox login
### Added
- Menus Listing after clicking a single Catefory
- Register link at login page
- Register facebook
- Stylus all pages & components (maxwidth = $breakpoint-xs quasar's variable)
- Admin Default layout & Login
- Customer Detail Page with Sign-Out feature
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
- iOS splash screen - dark
- Stores page with Google Maps
- QRCodeCapture for test PWA iOS
- ModalPage component (use for page is a modal/popup) [@phillip](https://github.com/hemvanh/TPTEA/pull/85)
- ModalPage to Register & Login page
- Pwa Cache busting when new version updated
- Auto redirect from http to https protocol
- Sign-Out confirmation
- Add app version in Member details and admin Home page
- Main Categories page [@phillip](https://github.com/hemvanh/TPTEA/pull/108)
- API Place Order [@phillip](https://github.com/hemvanh/TPTEA/pull/111)
- Button add to card
- Finding nearest store [@phillip](https://github.com/hemvanh/TPTEA/pull/118)
- Orders Management for Admin [@phillip](https://github.com/hemvanh/TPTEA/pull/124) [@phillip](https://github.com/hemvanh/TPTEA/pull/126)
- Modifier CRUD Admin [@phillip](https://github.com/hemvanh/TPTEA/pull/130)
- Add categories admin page 
- Paynow feature [@phillip](https://github.com/hemvanh/TPTEA/pull/134)
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
- Add button export for printing
- Remove pwa icon transparency
- Reset current order to 1 after going back to menus
- Adjust gulp to copy over the fb-login-receiver to dist folder
- Smooth out scrolling in all page
- Fix FB login/register in pwa
- Fix jumping layout in Make Payment page
- Updating balance after leaving the topup page & make payment page
- Provide scope with email/public_profile for FB Access token grant request
- Message invaild jwt giftcard code
- Admin receive payment error handling #97
- Facebook Login & Register button keep spining when directly closing facebook login form
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
- Change style of category and menu page like the coffee house
- Change style of menu detail page like the coffee house
- Sort order migrate in folder server
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
- Push notification
- Add migration,seed maincategories
