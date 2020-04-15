// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Strewbs',
  plugins: [
    {
      use: 'gridsome-source-directus',
      options: {
        apiUrl: process.env.API_URL,
        project: '_',
        email: process.env.CMS_EMAIL,
        password: process.env.CMS_PASS,
        collections: [
          {
            name: 'recipe',
            status: 'published',
            fields: '*.*.*.*.*'
          }
        ]
      }
    },
    {
      use: 'gridsome-plugin-typescript',
    }
  ],
  templates: {
    recipe: '/recipe/:id'
  }
}
