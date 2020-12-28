module.exports = {
  title: 'admin-manual',
  tagline: 'Agora Voting Project Admin Manual by nVotes',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/admin-manual/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'agoravoting', // Usually your GitHub org/user name.
  projectName: 'admin-manual', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Admin Manual',
      logo: {
        alt: 'nVotes',
        src: 'img/nvotes_logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://nvotes.com/blog/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/agoravoting',
	    },
            {
              label: 'Discord',
              href: 'https://discord.gg/BSqF8Cbr',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/nvotes_com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/agoravoting/admin-page',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} nVotes`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/agoravoting/admin-page/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://gitlab.com/nvotes/nvotes-com',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
