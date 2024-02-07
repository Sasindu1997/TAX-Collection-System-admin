## [Material Kit - React](https://material-kit-react.devias.io/) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?text=%F0%9F%9A%A8Devias%20Freebie%20Alert%20-%20An%20awesome%20ready-to-use%20register%20page%20made%20with%20%23material%20%23react%0D%0Ahttps%3A%2F%2Fdevias.io%20%23createreactapp%20%23devias%20%23material%20%23freebie%20%40devias-io)

![license](https://img.shields.io/badge/license-MIT-blue.svg)

[![Material Kit - React](https://github.com/devias-io/material-kit-react/blob/main/public/assets/thumbnail.png)](https://material-kit-react.devias.io/)

> Free React Admin Dashboard made with [MUI's](https://mui.com/?ref=devias-io)
> components, [React](https://reactjs.org/?ref=devias-io) and of
> course [Next.js](https://github.com/vercel/next.js/?ref=devias-io) to boost your app development
> process!

## Demo

- [Dashboard Page](https://material-kit-react.devias.io)
- [Companies Page](https://material-kit-react.devias.io/companies)
- [Customers Page](https://material-kit-react.devias.io/customers)
- [Account Page](https://material-kit-react.devias.io/account)
- [Settings Page](https://material-kit-react.devias.io/settings)
- [Login Page](https://material-kit-react.devias.io/auth/login)
- [Register Page](https://material-kit-react.devias.io/auth/register)

## Free Figma Community File

- [Duplicate File](https://www.figma.com/community/file/1039837897183395483/Devias-Dashboard-Design-Library-Kit)

## Upgrade to PRO Version

We also have a pro version of this product which bundles even more pages and components if you want
to save more time and design efforts :)

| Free Version (this one) | [Material Kit Pro - React](https://mui.com/store/items/devias-kit-pro/)  |
|-------------------------|:-------------------------------------------------------------------------|
| **9** Demo Pages        | **40+** demo pages                                                       
| ✔ Mocked Authentication | ✔ Authentication with **Amplify**, **Auth0**, **JWT** and **Firebase**   
| -                       | ✔ Dark & light mode                                                      
| -                       | ✔ CRA version                                                            
| -                       | ✔ TypeScript version - for Standard Plus and Extended license            
| -                       | ✔ Design files (sketch & figma) - for Standard Plus and Extended license 
| -                       | ✔ Complete users flows                                                   

## Quick start

- [Download from Github](https://github.com/devias-io/material-kit-react/archive/master.zip)
  or [Download from Devias](https://devias.io/products/material-kit-react) or clone the
  repo: `git clone https://github.com/devias-io/material-kit-react.git`

- Make sure your Node.js and npm versions are up to date for `React 18`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

## File Structure

Within the download you'll find the following directories and files:

```
material-kit-react

┌── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── LICENSE.md
├── next.config.js
├── package.json
├── README.md
├── public
└── src
	├── components
	├── contexts
	├── guards
	├── hocs
	├── hooks
	├── layouts
	├── sections
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── companies.js
		├── customers.js
		├── index.js
		├── products.js
		└── settings.js
		└──  auth
			├── login.js
			└── register.js
```

## Resources

- More freebies like this one: <https://devias.io>

## Reporting Issues:

- [Github Issues Page](https://github.com/devias-io/react-material-dashboard/issues?ref=devias-io)

## License

- Licensed under MIT (https://github.com/devias-io/react-material-dashboard/blob/master/LICENSE.md)

## Contact Us

- Email Us: support@deviasio.zendesk.com


{
  "name": "material-kit-react",
  "version": "3.0.0",
  "author": "Devias",
  "licence": "MIT",
  "homepage": "http://investment.landmarkgroup.lk",
  "private": false,
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "export": "next export",
    "lint": "next lint",
    "lint-fix": "next lint --fix"
  },
  "dependencies": {
    "@emotion/cache": "11.10.5",
    "@emotion/react": "11.10.6",
    "@emotion/server": "11.10.0",
    "@emotion/styled": "11.10.6",
    "@heroicons/react": "2.0.16",
    "@mui/lab": "5.0.0-alpha.120",
    "@mui/material": "5.11.10",
    "@mui/system": "5.11.9",
    "@mui/x-date-pickers": "^5.0.19",
    "apexcharts": "3.37.0",
    "axios": "^1.5.0",
    "date-fns": "2.29.3",
    "dayjs": "^1.11.9",
    "formik": "2.2.9",
    "local-storage": "^2.0.0",
    "moment": "^2.29.4",
    "next": "13.1.6",
    "nprogress": "0.2.0",
    "prop-types": "15.8.1",
    "react": "18.2.0",
    "react-apexcharts": "1.4.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.46.1",
    "simplebar-react": "^3.2.1",
    "yup": "1.0.0"
  },
  "devDependencies": {
    "@types/node": "18.13.0",
    "@types/nprogress": "0.2.0",
    "@types/numeral": "2.0.2",
    "@types/react": "18.0.28",
    "@types/react-dom": "18.0.11",
    "eslint": "8.34.0",
    "eslint-config-next": "13.1.6"
  }
}
