# SolsticeJson work!

The repo uses lerna to create a **monorepo**.
This works really well for both **backend** and **frontend** applications that share the same tech stack, in our case **TypeScript**.

## solstice-app

a CRA with template of **redux-typescript**, the UI framework is **Google's Material UI** . I wish I had more time to work on making more elegant and sleaker reusable table components via TS **Generics**. However, the front end show of **REDUX** and **HOOK** in functional Components.
It was published using **GitHub Pages**

## solstice-common

This was to show off the power of the monorepo. Since this package was bootstrapped to the UI and API layers, we had a single source of truth for the data **interfaces**

## solstice-api

Welcome to the future of API management, no longer will you need to manage pesky containers, as a developer and tech company is writing code.
This takes advantage of the **SERVERLESS FRAMEWORK** . With the serverless yaml, we define **our infastructure as code**. Here we establish an **API Gateway**, the the various endpoints for Customers and Accounts which are Lambdas that only exist when you invoke them, hence you only pay for usage in time. We also establish the **S3 bucket** which will host the the JSON file initial.

## inital.Json

This file was dirty. It was using consts, so when I initially tried to parse, I was met with a rude surprise. I create an JSON object with two fields one is customers and the other were accounts. I captured the spirit of what the original json file was meant to convey. Also took the liberty of actually using boolean as a type for active. Using a 0 or 1 as truthy values, seems to be a disaster waiting to happen.
