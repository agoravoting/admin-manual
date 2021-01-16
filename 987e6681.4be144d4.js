(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{74:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",(function(){return l})),a.d(n,"metadata",(function(){return s})),a.d(n,"toc",(function(){return r})),a.d(n,"default",(function(){return b}));var t=a(3),o=a(7),i=(a(0),a(88)),l={id:"translation-guide",title:"Translation Guide",sidebar_label:"Translation Guide",slug:"/translation-guide"},s={unversionedId:"translation-guide",id:"translation-guide",isDocsHomePage:!1,title:"Translation Guide",description:"This document describes how to translate the Agora Voting project to a new",source:"@site/docs/translation-guide.mdx",slug:"/translation-guide",permalink:"/admin-manual/docs/translation-guide",editUrl:"https://github.com/agoravoting/admin-manual/edit/master/docs/translation-guide.mdx",version:"current",sidebar_label:"Translation Guide",sidebar:"mainSidebar",previous:{title:"Deployment Troubleshooting",permalink:"/admin-manual/docs/deployment/troubleshooting"},next:{title:"Bulk Election Testing",permalink:"/admin-manual/docs/testing/bulk"}},r=[{value:"Introduction",id:"introduction",children:[]},{value:"How to translate",id:"how-to-translate",children:[{value:"Step 1. Writing the translations",id:"step-1-writing-the-translations",children:[]},{value:"Step 2. Building the translations",id:"step-2-building-the-translations",children:[]},{value:"Step 3. Translation deployment and configuration",id:"step-3-translation-deployment-and-configuration",children:[]},{value:"Step 4. Send the Pull Request",id:"step-4-send-the-pull-request",children:[]}]}],c={toc:r};function b(e){var n=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(t.a)({},c,a,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This document describes how to translate the Agora Voting project to a new\nlanguage."),Object(i.b)("h2",{id:"introduction"},"Introduction"),Object(i.b)("p",null,"The Agora Voting project user interface is written in javascript using Angular 1\nand uses ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://www.i18next.com/"}),"i18next")," and\n",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://www.npmjs.com/package/ng-i18next"}),"ng-i18next")," for internationalization\n(i18n for short)."),Object(i.b)("p",null,"The user interface is divided in 4 different repositories:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"agora-gui-common"),": A common library used by the other three."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"agora-gui-admin"),": The election administrator interface."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"agora-gui-elections"),": The public election interface."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"agora-gui-booth"),": The voting booth interface.")),Object(i.b)("p",null,"Each repository has its own set of translation files. The format of these files\nis in JSON and is ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://www.i18next.com/misc/json-format#i-18-next-json-v1"}),"roughly defined here (JSON v1 i18next format)"),"."),Object(i.b)("h2",{id:"how-to-translate"},"How to translate"),Object(i.b)("h3",{id:"step-1-writing-the-translations"},"Step 1. Writing the translations"),Object(i.b)("p",null,"The English version of the translation JSON files is usually the most up to\ndate, and it is the most international language. For these reasons, to create\nyour translation we recommend to base it on the English JSON file for each\nrepository. This English base translation is located in the ",Object(i.b)("inlineCode",{parentName:"p"},"locales/en.json"),"\nin each repository:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(t.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-common/blob/master/locales/en.json"}),"agora-gui-common/locales/en.json")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(t.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-admin/blob/master/locales/en.json"}),"agora-gui-admin/locales/en.json")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(t.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-elections/blob/master/locales/en.json"}),"agora-gui-elections/locales/en.json")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(t.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-booth/blob/master/locales/en.json"}),"agora-gui-booth/locales/en.json"))),Object(i.b)("p",null,"To create a translation, just copy each of those files into the same ",Object(i.b)("inlineCode",{parentName:"p"},"locales/"),"\ndirectory as a new file with a name following the pattern\n",Object(i.b)("inlineCode",{parentName:"p"},"<language-code>.json"),". The language code for each language is defined in\nISO 639-1 and a ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"}),"table of codes can be found in Wikipedia"),". For example, the language code for Spanish is ",Object(i.b)("inlineCode",{parentName:"p"},"es"),"\nand for German is ",Object(i.b)("inlineCode",{parentName:"p"},"de"),"."),Object(i.b)("p",null,"Currently the Agora Voting Project contains translations for the following\nlanguages:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Catalan (ca)"),Object(i.b)("li",{parentName:"ul"},"English (en)"),Object(i.b)("li",{parentName:"ul"},"Finnish (fi)"),Object(i.b)("li",{parentName:"ul"},"Galician (gl)"),Object(i.b)("li",{parentName:"ul"},"Spanish (es)"),Object(i.b)("li",{parentName:"ul"},"Swedish (sv)")),Object(i.b)("h3",{id:"step-2-building-the-translations"},"Step 2. Building the translations"),Object(i.b)("p",null,"Once we have written the translation files and put them in the corresponding\n",Object(i.b)("inlineCode",{parentName:"p"},"locales/")," directories with the proper file names, we are not finished yet. We\nhave to modify the building system to incorporate these files."),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"agora-gui-*")," repositories use the ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://gruntjs.com/"}),"GruntJS")," task\nrunner  for building and bundling the javascript code. In each of the\n",Object(i.b)("inlineCode",{parentName:"p"},"agora-gui-*")," repositories you will find a top level file called ",Object(i.b)("inlineCode",{parentName:"p"},"Gruntfile.js"),"\nthat we will need to modify."),Object(i.b)("p",null,"The required modifications are pretty simple. Just search for the string\n",Object(i.b)("inlineCode",{parentName:"p"},"locales/")," inside the file ",Object(i.b)("inlineCode",{parentName:"p"},"Gruntfile.js")," and you will find usually one or two\nplaces where i18n files are processed. For example, in ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://github.com/agoravoting/agora-gui-common/blob/master/Gruntfile.js#L207"}),"agora-gui-common/Gruntfile.js")," around line 207 you will find\nsomething like:"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'    "merge-json": {\n      main: {\n        files: {\n            "dist/locales/en.json": ["locales/en.json", "plugins/**/locales/en.json"],\n            "dist/locales/es.json": ["locales/es.json", "plugins/**/locales/es.json"],\n            "dist/locales/gl.json": ["locales/gl.json", "plugins/**/locales/gl.json"],\n            "dist/locales/sv.json": ["locales/sv.json", "plugins/**/locales/sv.json"],\n            "dist/locales/fi.json": ["locales/fi.json", "plugins/**/locales/fi.json"],\n            "dist/locales/ca.json": ["locales/ca.json", "plugins/**/locales/ca.json"]\n        }\n      }\n    },\n')),Object(i.b)("p",null,"If you are adding a translation for Icelandic (",Object(i.b)("inlineCode",{parentName:"p"},"is")," language code), you should\nadd the following line in between:"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'            "dist/locales/is.json": ["locales/is.json", "plugins/**/locales/is.json"],\n')),Object(i.b)("p",null,"Ending up with the ",Object(i.b)("inlineCode",{parentName:"p"},"merge-json")," task inside the file ",Object(i.b)("inlineCode",{parentName:"p"},"Gruntfile.js")," being as\nfollows:"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'    "merge-json": {\n      main: {\n        files: {\n            "dist/locales/en.json": ["locales/en.json", "plugins/**/locales/en.json"],\n            "dist/locales/es.json": ["locales/es.json", "plugins/**/locales/es.json"],\n            "dist/locales/gl.json": ["locales/gl.json", "plugins/**/locales/gl.json"],\n            "dist/locales/is.json": ["locales/is.json", "plugins/**/locales/is.json"],\n            "dist/locales/sv.json": ["locales/sv.json", "plugins/**/locales/sv.json"],\n            "dist/locales/fi.json": ["locales/fi.json", "plugins/**/locales/fi.json"],\n            "dist/locales/ca.json": ["locales/ca.json", "plugins/**/locales/ca.json"]\n        }\n      }\n    },\n')),Object(i.b)("p",null,"This ",Object(i.b)("inlineCode",{parentName:"p"},"merge-json")," task joins the translation files for each language from the\n",Object(i.b)("inlineCode",{parentName:"p"},"locales/")," directory and from the ",Object(i.b)("inlineCode",{parentName:"p"},"plugins")," directory. "),Object(i.b)("p",null,"You'll notice that the  string ",Object(i.b)("inlineCode",{parentName:"p"},"locales/")," appears in another section inside the\nfile ",Object(i.b)("inlineCode",{parentName:"p"},"Gruntfile.js"),", in the ",Object(i.b)("inlineCode",{parentName:"p"},"uglify")," section around ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://github.com/agoravoting/agora-gui-common/blob/master/Gruntfile.js#L226"}),"line 226"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"    uglify: {\n      main: {\n        options:{\n          mangle: false,\n          compress: {},\n          beautify: true\n        },\n        files: {\n          'dist/appCommon-v20.2.0.js': 'temp/app.js',\n          'dist/libCommon-v20.2.0.js': 'temp/lib.js',\n          'dist/libnocompat-v20.2.0.js': 'temp/libnocompat.js',\n          'dist/libcompat-v20.2.0.js': 'temp/libcompat.js',\n          'dist/avWidgets.js': 'avWidgets.js',\n\n          \"dist/locales/moment/es.js\": \"node_modules/moment/locale/es.js\",\n          \"dist/locales/moment/gl.js\": \"node_modules/moment/locale/gl.js\",\n          \"dist/locales/moment/ca.js\": \"node_modules/moment/locale/ca.js\"\n        }\n")),Object(i.b)("p",null,"This is related to the usage of the ",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"https://momentjs.com/"}),"momentjs")," library,\nused for internationalization of times and dates. You can add a new line there\nalso for loading the moment internationalization file for your language if there\nis one."),Object(i.b)("p",null,"We have done this for the ",Object(i.b)("inlineCode",{parentName:"p"},"agora-gui-common")," project. We would have to repeat\nthe process for the other three ",Object(i.b)("inlineCode",{parentName:"p"},"agora-gui-*")," projects for which we are adding\ntranslation support for a new language."),Object(i.b)("h3",{id:"step-3-translation-deployment-and-configuration"},"Step 3. Translation deployment and configuration"),Object(i.b)("p",null,"We have now translated the interface to a new language and incorporated the\ntranslations in the building process. The next step is to configure our\ndeployment to include and use the new language translation."),Object(i.b)("div",{className:"admonition admonition-info alert alert--info"},Object(i.b)("div",Object(t.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(t.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(t.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(t.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(i.b)("div",Object(t.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"To deploy the Agora Voting project, please follow the\n",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"/admin-manual/docs/"}),"Deployment Guide"),"."))),Object(i.b)("p",null,"The configuration is fairly simple. In the ",Object(i.b)("inlineCode",{parentName:"p"},"config.yml")," file inside the\n",Object(i.b)("inlineCode",{parentName:"p"},"agora_gui")," section you can find the following configurations keys:"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-yaml"}),"    # Default language of the application\n    language: en\n\n    # Forces the default language\n    forceLanguage: false\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - en\n      - es\n      - gl\n      - ca\n")),Object(i.b)("p",null,"For example if you want to specify that the default language is going to be\nPolish  (",Object(i.b)("inlineCode",{parentName:"p"},"po")," language code), you would change the ",Object(i.b)("inlineCode",{parentName:"p"},"agora_gui.language")," key to\n",Object(i.b)("inlineCode",{parentName:"p"},"po")," and add ",Object(i.b)("inlineCode",{parentName:"p"},"po")," to the ",Object(i.b)("inlineCode",{parentName:"p"},"languagesWhitelist"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-yaml"}),"    # Default language of the application\n    language: po\n\n    # Forces the default language\n    forceLanguage: false\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - en\n      - es\n      - gl\n      - ca\n      - po\n")),Object(i.b)("p",null,"If you are doing a deployment only in Polish, you could remove other languages\nfrom the whitelist so that the user won't be able to choose any other language: "),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-yaml"}),"    # Default language of the application\n    language: po\n\n    # Forces the default language\n    forceLanguage: false\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - po\n")),Object(i.b)("p",null,"Or maybe you might want to support a secondary language (English for example)\nbut force the default language to be Polish. By default, the user interface will\ntry to detect the preferred language of the web browser, but this behaviour can\nbe overridden using the ",Object(i.b)("inlineCode",{parentName:"p"},"agora_gui.forceLanguage")," setting:"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-yaml"}),"    # Default language of the application\n    language: po\n\n    # Forces the default language\n    forceLanguage: true\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - po\n      - en\n")),Object(i.b)("p",null,"You might have integrated the Agora Voting project deployment with some other\nplatform. If voters access to the Agora Voting interface from some third-party\ninterface, this first interface might have some specific language configuration\nfor each user. When accessing to an Agora Voting deployment link from some other\nweb site, you can modify the access link to force a specific default language\nadding a query string such as ",Object(i.b)("inlineCode",{parentName:"p"},"?lang=pl"),". The name of this URL query string\nparamenter is specified with the ",Object(i.b)("inlineCode",{parentName:"p"},"agora_gui.detectLanguageQueryString"),"\nconfiguration  parameter."),Object(i.b)("h3",{id:"step-4-send-the-pull-request"},"Step 4. Send the Pull Request"),Object(i.b)("p",null,"We welcome your contributions. This is an open source project and we'll be happy\nto accept your pull request adding support for a new language or updating an\nexisting translation. Please ensure you read and follow the step in the\n",Object(i.b)("a",Object(t.a)({parentName:"p"},{href:"/admin-manual/docs/contribute"}),"Contribution Guide")," to do so."))}b.isMDXComponent=!0}}]);