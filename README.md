# Deployment: fullstack-vercel

- 1. rename server.js to index.js and update the package.json with the new file name.
- 2. add a file named 'vercel.json' with this code in it:

```
{
    "builds": [
      {
        "src": "./index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/"
      }
    ]
  }
```

- 3. don't include the build folder in the .gitignore file (if it exists there delete it, we need the build in the git repo since building is not going to happen automatically this time)

- 4. in client make sure to delete any http://localhost:xxxx from your axios requests (or fetch) only keep what comes after that in the path URL such as "/api/users/login" since the base URL is going to be the same for both client and server after deployment.

- 5. in client run the command npm run build.

- 6. in the login controller delete the cookie options object.

- 7. in the main folder: git add, commit, push to one of your remote repos on your github

- 8. go to [vercel.com](https://vercel.com/) log into your account (or make a new one) link it to your github, then choose the repo of your fullstack project which you want to deploy and hit deploy.

- 9. in the dashboard of your vercel project go to settings and add the environment variable under 'Environment Variables'
