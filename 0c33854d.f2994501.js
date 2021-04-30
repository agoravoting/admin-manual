(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{63:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return r})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return p}));var a=t(3),i=t(7),o=(t(0),t(88)),l={id:"guide",title:"Translation Guide",sidebar_label:"Translation Guide",slug:"/translation/guide"},r={unversionedId:"translation/guide",id:"translation/guide",isDocsHomePage:!1,title:"Translation Guide",description:"This document describes how to translate the Agora Voting project to a new",source:"@site/docs/translation/guide.md",slug:"/translation/guide",permalink:"/admin-manual/docs/translation/guide",editUrl:"https://github.com/agoravoting/admin-manual/edit/master/docs/translation/guide.md",version:"current",sidebar_label:"Translation Guide",sidebar:"docsSidebar",previous:{title:"Deployment Troubleshooting",permalink:"/admin-manual/docs/deployment/troubleshooting"},next:{title:"Bulk Election Testing",permalink:"/admin-manual/docs/testing/bulk"}},s=[{value:"Introduction",id:"introduction",children:[]},{value:"How to translate <code>agora-gui</code>",id:"how-to-translate-agora-gui",children:[{value:"Step 1. Writing the translations",id:"step-1-writing-the-translations",children:[]},{value:"Step 2. Building the translations",id:"step-2-building-the-translations",children:[]},{value:"Step 3. Translation deployment and configuration",id:"step-3-translation-deployment-and-configuration",children:[]},{value:"Step 4. Send the Pull Request",id:"step-4-send-the-pull-request",children:[]}]},{value:"How to translate <code>agora-results</code>",id:"how-to-translate-agora-results",children:[{value:"Step 1. Writing the translations",id:"step-1-writing-the-translations-1",children:[]},{value:"Step 2. Building the translations",id:"step-2-building-the-translations-1",children:[]},{value:"Step 3. Choosing the PDF results language",id:"step-3-choosing-the-pdf-results-language",children:[]},{value:"Step 4. Send the Pull Request",id:"step-4-send-the-pull-request-1",children:[]}]}],c={toc:s};function p(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This document describes how to translate the Agora Voting project to a new\nlanguage."),Object(o.b)("h2",{id:"introduction"},"Introduction"),Object(o.b)("p",null,"The Agora Voting project user interface is written in javascript using Angular 1\nand uses ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.i18next.com/"}),"i18next")," and\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/ng-i18next"}),"ng-i18next")," for internationalization\n(i18n for short)."),Object(o.b)("p",null,"The user interface is divided in 4 different repositories:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"agora-gui-common"),": A common library used by the other three."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"agora-gui-admin"),": The election administrator interface."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"agora-gui-elections"),": The public election interface."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"agora-gui-booth"),": The voting booth interface.")),Object(o.b)("p",null,"Each repository has its own set of translation files. The format of these files\nis in JSON and is ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.i18next.com/misc/json-format#i-18-next-json-v1"}),"roughly defined here (JSON v1 i18next format)"),"."),Object(o.b)("p",null,"There's also translation files in ",Object(o.b)("strong",{parentName:"p"},"agora-results"),", currently just for\ngenerating PDF results in the chosen language. These work with ",Object(o.b)("inlineCode",{parentName:"p"},"gettext")," ",Object(o.b)("inlineCode",{parentName:"p"},".po"),"\nand ",Object(o.b)("inlineCode",{parentName:"p"},".pot")," files. "),Object(o.b)("p",null,"This guide is grouped in two sections:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"How to translate ",Object(o.b)("inlineCode",{parentName:"li"},"agora-gui-*"),"."),Object(o.b)("li",{parentName:"ol"},"How to translate ",Object(o.b)("inlineCode",{parentName:"li"},"agora-results"),".")),Object(o.b)("h2",{id:"how-to-translate-agora-gui"},"How to translate ",Object(o.b)("inlineCode",{parentName:"h2"},"agora-gui")),Object(o.b)("h3",{id:"step-1-writing-the-translations"},"Step 1. Writing the translations"),Object(o.b)("p",null,"The English version of the translation JSON files is usually the most up to\ndate, and it is the most international language. For these reasons, to create\nyour translation we recommend to base it on the English JSON file for each\nrepository. This English base translation is located in the ",Object(o.b)("inlineCode",{parentName:"p"},"locales/en.json"),"\nin each repository:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-common/blob/master/locales/en.json"}),"agora-gui-common/locales/en.json")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-admin/blob/master/locales/en.json"}),"agora-gui-admin/locales/en.json")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-elections/blob/master/locales/en.json"}),"agora-gui-elections/locales/en.json")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/agoravoting/agora-gui-booth/blob/master/locales/en.json"}),"agora-gui-booth/locales/en.json"))),Object(o.b)("p",null,"To create a translation, just copy each of those files into the same ",Object(o.b)("inlineCode",{parentName:"p"},"locales/"),"\ndirectory as a new file with a name following the pattern\n",Object(o.b)("inlineCode",{parentName:"p"},"<language-code>.json"),". The language code for each language is defined in\nISO 639-1 and a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"}),"table of codes can be found in Wikipedia"),". For example, the language code for Spanish is ",Object(o.b)("inlineCode",{parentName:"p"},"es"),"\nand for German is ",Object(o.b)("inlineCode",{parentName:"p"},"de"),"."),Object(o.b)("p",null,"Currently the Agora Voting Project contains translations for the following\nlanguages:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Catalan (ca)"),Object(o.b)("li",{parentName:"ul"},"English (en)"),Object(o.b)("li",{parentName:"ul"},"Finnish (fi)"),Object(o.b)("li",{parentName:"ul"},"Galician (gl)"),Object(o.b)("li",{parentName:"ul"},"Spanish (es)"),Object(o.b)("li",{parentName:"ul"},"Swedish (sv)")),Object(o.b)("h3",{id:"step-2-building-the-translations"},"Step 2. Building the translations"),Object(o.b)("p",null,"Once we have written the translation files and put them in the corresponding\n",Object(o.b)("inlineCode",{parentName:"p"},"locales/")," directories with the proper file names, we are not finished yet. We\nhave to modify the building system to incorporate these files."),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"agora-gui-*")," repositories use the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://gruntjs.com/"}),"GruntJS")," task\nrunner  for building and bundling the javascript code. In each of the\n",Object(o.b)("inlineCode",{parentName:"p"},"agora-gui-*")," repositories you will find a top level file called ",Object(o.b)("inlineCode",{parentName:"p"},"Gruntfile.js"),"\nthat we will need to modify."),Object(o.b)("p",null,"The required modifications are pretty simple. Just search for the string\n",Object(o.b)("inlineCode",{parentName:"p"},"locales/")," inside the file ",Object(o.b)("inlineCode",{parentName:"p"},"Gruntfile.js")," and you will find usually one or two\nplaces where i18n files are processed. For example, in ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/agoravoting/agora-gui-common/blob/master/Gruntfile.js#L207"}),"agora-gui-common/Gruntfile.js")," around line 207 you will find\nsomething like:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="agora-gui-common/Gruntfile.js fragment"',title:'"agora-gui-common/Gruntfile.js','fragment"':!0}),'    "merge-json": {\n      main: {\n        files: {\n            "dist/locales/en.json": ["locales/en.json", "plugins/**/locales/en.json"],\n            "dist/locales/es.json": ["locales/es.json", "plugins/**/locales/es.json"],\n            "dist/locales/gl.json": ["locales/gl.json", "plugins/**/locales/gl.json"],\n            "dist/locales/sv.json": ["locales/sv.json", "plugins/**/locales/sv.json"],\n            "dist/locales/fi.json": ["locales/fi.json", "plugins/**/locales/fi.json"],\n            "dist/locales/ca.json": ["locales/ca.json", "plugins/**/locales/ca.json"]\n        }\n      }\n    },\n')),Object(o.b)("p",null,"If you are adding a translation for Icelandic (",Object(o.b)("inlineCode",{parentName:"p"},"is")," language code), you should\nadd the following line in between:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="agora-gui-common/Gruntfile.js fragment"',title:'"agora-gui-common/Gruntfile.js','fragment"':!0}),'            "dist/locales/is.json": ["locales/is.json", "plugins/**/locales/is.json"],\n')),Object(o.b)("p",null,"Ending up with the ",Object(o.b)("inlineCode",{parentName:"p"},"merge-json")," task inside the file ",Object(o.b)("inlineCode",{parentName:"p"},"Gruntfile.js")," being as\nfollows:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="agora-gui-common/Gruntfile.js fragment" {7}',title:'"agora-gui-common/Gruntfile.js','fragment"':!0,"{7}":!0}),'    "merge-json": {\n      main: {\n        files: {\n            "dist/locales/en.json": ["locales/en.json", "plugins/**/locales/en.json"],\n            "dist/locales/es.json": ["locales/es.json", "plugins/**/locales/es.json"],\n            "dist/locales/gl.json": ["locales/gl.json", "plugins/**/locales/gl.json"],\n            "dist/locales/is.json": ["locales/is.json", "plugins/**/locales/is.json"],\n            "dist/locales/sv.json": ["locales/sv.json", "plugins/**/locales/sv.json"],\n            "dist/locales/fi.json": ["locales/fi.json", "plugins/**/locales/fi.json"],\n            "dist/locales/ca.json": ["locales/ca.json", "plugins/**/locales/ca.json"]\n        }\n      }\n    },\n')),Object(o.b)("p",null,"This ",Object(o.b)("inlineCode",{parentName:"p"},"merge-json")," task joins the translation files for each language from the\n",Object(o.b)("inlineCode",{parentName:"p"},"locales/")," directory and from the ",Object(o.b)("inlineCode",{parentName:"p"},"plugins")," directory. "),Object(o.b)("p",null,"You'll notice that the  string ",Object(o.b)("inlineCode",{parentName:"p"},"locales/")," appears in another section inside the\nfile ",Object(o.b)("inlineCode",{parentName:"p"},"Gruntfile.js"),", in the ",Object(o.b)("inlineCode",{parentName:"p"},"uglify")," section around ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/agoravoting/agora-gui-common/blob/master/Gruntfile.js#L226"}),"line 226"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="agora-gui-common/Gruntfile.js fragment" {15-17}',title:'"agora-gui-common/Gruntfile.js','fragment"':!0,"{15-17}":!0}),"    uglify: {\n      main: {\n        options:{\n          mangle: false,\n          compress: {},\n          beautify: true\n        },\n        files: {\n          'dist/appCommon-v20.2.0.js': 'temp/app.js',\n          'dist/libCommon-v20.2.0.js': 'temp/lib.js',\n          'dist/libnocompat-v20.2.0.js': 'temp/libnocompat.js',\n          'dist/libcompat-v20.2.0.js': 'temp/libcompat.js',\n          'dist/avWidgets.js': 'avWidgets.js',\n\n          \"dist/locales/moment/es.js\": \"node_modules/moment/locale/es.js\",\n          \"dist/locales/moment/gl.js\": \"node_modules/moment/locale/gl.js\",\n          \"dist/locales/moment/ca.js\": \"node_modules/moment/locale/ca.js\"\n        }\n")),Object(o.b)("p",null,"This is related to the usage of the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://momentjs.com/"}),"momentjs")," library,\nused for internationalization of times and dates. You can add a new line there\nalso for loading the moment internationalization file for your language if there\nis one."),Object(o.b)("p",null,"We have done this for the ",Object(o.b)("inlineCode",{parentName:"p"},"agora-gui-common")," project. We would have to repeat\nthe process for the other three ",Object(o.b)("inlineCode",{parentName:"p"},"agora-gui-*")," projects for which we are adding\ntranslation support for a new language."),Object(o.b)("h3",{id:"step-3-translation-deployment-and-configuration"},"Step 3. Translation deployment and configuration"),Object(o.b)("p",null,"We have now translated the interface to a new language and incorporated the\ntranslations in the building process. The next step is to configure our\ndeployment to include and use the new language translation."),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"To deploy the Agora Voting project, please follow the\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../deployment/guide"}),"Deployment Guide"),"."))),Object(o.b)("p",null,"The configuration is fairly simple. In the ",Object(o.b)("inlineCode",{parentName:"p"},"config.yml")," file inside the\n",Object(o.b)("inlineCode",{parentName:"p"},"agora_gui")," section you can find the following configurations keys:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="config.yml fragment"',title:'"config.yml','fragment"':!0}),"    # Default language of the application\n    language: en\n\n    # Forces the default language\n    forceLanguage: false\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - en\n      - es\n      - gl\n      - ca\n")),Object(o.b)("p",null,"For example if you want to specify that the default language is going to be\nPolish  (",Object(o.b)("inlineCode",{parentName:"p"},"po")," language code), you would change the ",Object(o.b)("inlineCode",{parentName:"p"},"agora_gui.language")," key to\n",Object(o.b)("inlineCode",{parentName:"p"},"po")," and add ",Object(o.b)("inlineCode",{parentName:"p"},"po")," to the ",Object(o.b)("inlineCode",{parentName:"p"},"languagesWhitelist"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="config.yml fragment" {2,16}',title:'"config.yml','fragment"':!0,"{2,16}":!0}),"    # Default language of the application\n    language: po\n\n    # Forces the default language\n    forceLanguage: false\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - en\n      - es\n      - gl\n      - ca\n      - po\n")),Object(o.b)("p",null,"If you are doing a deployment only in Polish, you could remove other languages\nfrom the whitelist so that the user won't be able to choose any other language: "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="config.yml fragment" {2,12}',title:'"config.yml','fragment"':!0,"{2,12}":!0}),"    # Default language of the application\n    language: po\n\n    # Forces the default language\n    forceLanguage: false\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - po\n")),Object(o.b)("p",null,"Or maybe you might want to support a secondary language (English for example)\nbut force the default language to be Polish. By default, the user interface will\ntry to detect the preferred language of the web browser, but this behaviour can\nbe overridden using the ",Object(o.b)("inlineCode",{parentName:"p"},"agora_gui.forceLanguage")," setting:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="config.yml fragment" {5,13}',title:'"config.yml','fragment"':!0,"{5,13}":!0}),"    # Default language of the application\n    language: po\n\n    # Forces the default language\n    forceLanguage: true\n\n    # Specifies the set language query string\n    detectLanguageQueryString: lang\n\n    # Specifies what translations will be available\n    languagesWhitelist:\n      - po\n      - en\n")),Object(o.b)("p",null,"You might have integrated the Agora Voting project deployment with some other\nplatform. If voters access to the Agora Voting interface from some third-party\ninterface, this first interface might have some specific language configuration\nfor each user. When accessing to an Agora Voting deployment link from some other\nweb site, you can modify the access link to force a specific default language\nadding a query string such as ",Object(o.b)("inlineCode",{parentName:"p"},"?lang=pl"),". The name of this URL query string\nparamenter is specified with the ",Object(o.b)("inlineCode",{parentName:"p"},"agora_gui.detectLanguageQueryString"),"\nconfiguration  parameter."),Object(o.b)("h3",{id:"step-4-send-the-pull-request"},"Step 4. Send the Pull Request"),Object(o.b)("p",null,"We welcome your contributions. This is an open source project and we'll be happy\nto accept your pull request adding support for a new language or updating an\nexisting translation. Please ensure you read and follow the step in the\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../contribute/guide"}),"Contribution Guide")," to do so."),Object(o.b)("h2",{id:"how-to-translate-agora-results"},"How to translate ",Object(o.b)("inlineCode",{parentName:"h2"},"agora-results")),Object(o.b)("h3",{id:"step-1-writing-the-translations-1"},"Step 1. Writing the translations"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"agora-results")," is written in Python and executes in the backend. It uses the\nstandard ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.python.org/3/library/gettext.html"}),"gettext")," library for\ninternationalization in Python projects. We use\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"http://babel.pocoo.org/en/latest/"}),"Babel")," for extracting i18n strings\nand for compiling them and loosely followed\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.mattlayman.com/blog/2015/i18n/"}),"this guide"),"."),Object(o.b)("p",null,"The i18n strings inside the code are directly in English language and located\ncurrently only the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/pdf.py"}),Object(o.b)("inlineCode",{parentName:"a"},"agora_results/pipes/pdf.py"))," file. The translation template is located in\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/locale/pipes.pot"}),Object(o.b)("inlineCode",{parentName:"a"},"agora_results/pipes/locale/pipes.pot"))," and the translation for each language are\nto be located in a path following the pattern\n",Object(o.b)("inlineCode",{parentName:"p"},"agora_results/pipes/locale/<lang-code>/LC_MESSAGES/pipes.po"),"."),Object(o.b)("p",null,"To create a translation, just copy ",Object(o.b)("inlineCode",{parentName:"p"},"agora_results/pipes/locale/pipes.pot"),"\ninto a new file following the previously mentioned pattern\n",Object(o.b)("inlineCode",{parentName:"p"},"agora_results/pipes/locale/<lang-code>/LC_MESSAGES/pipes.po"),". The language code\nfor each language is defined in\nISO 639-1 and a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"}),"table of codes can be found in Wikipedia"),". For example, the language code for Spanish is ",Object(o.b)("inlineCode",{parentName:"p"},"es"),"\nand for German is ",Object(o.b)("inlineCode",{parentName:"p"},"de"),"."),Object(o.b)("p",null,"Currently ",Object(o.b)("inlineCode",{parentName:"p"},"agora-results")," contains translations for the following languages:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"English (en, the default)"),Object(o.b)("li",{parentName:"ul"},"Spanish (es)")),Object(o.b)("h3",{id:"step-2-building-the-translations-1"},"Step 2. Building the translations"),Object(o.b)("p",null,"Each time an i18n string is changed, removed or added to the code, you should\nrun:the following command to update the translation template (the\n",Object(o.b)("inlineCode",{parentName:"p"},"agora_results/pipes/locale/pipes.pot")," file):"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"# run in the `agora-results` directory\npython setup.py extract_messages\n")),Object(o.b)("p",null,"After updating a translation or adding a new one, you should rebuild the\ntranslation files. Even if translations are written in plaintext (",Object(o.b)("inlineCode",{parentName:"p"},".po")," format),\nthey are used in compiled format, as this is the way the venerable ",Object(o.b)("inlineCode",{parentName:"p"},"gettext"),"\nlibrary (+30 years old) works. This compilation can be done with the following\ncommand in the ",Object(o.b)("inlineCode",{parentName:"p"},"agora-results")," directory:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"# run in the `agora-results` directory\npython setup.py compile_catalog\n")),Object(o.b)("h3",{id:"step-3-choosing-the-pdf-results-language"},"Step 3. Choosing the PDF results language"),Object(o.b)("p",null,"By default, the election results are shown in english. Of course, this can be\nchanged. The PDF election results are generated by ",Object(o.b)("inlineCode",{parentName:"p"},"agora-results"),". The way to\napply any configuration to ",Object(o.b)("inlineCode",{parentName:"p"},"agora-results")," is through the\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../file-formats/election-creation-json#results-config-pipes"}),"Results config pipes"),"."),Object(o.b)("p",null,"By default, the language is English and the default election results config\npipes is the following:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json",metastring:'title="election_pipes.json fragment" {7}',title:'"election_pipes.json','fragment"':!0,"{7}":!0}),'{\n  "version": "1.0",\n  "pipes": [\n    {\n      "type": "agora_results.pipes.pdf.configure_pdf",\n      "params": {\n        "languages": ["en"] \n      }\n    },\n    {\n      "type": "agora_results.pipes.results.do_tallies",\n      "params": {}\n    },\n    {\n      "type": "agora_results.pipes.sort.sort_non_iterative",\n      "params": {}\n    }\n  ]\n}\n')),Object(o.b)("p",null,"You can specify the language of the PDF election results changing the\nhighlighted line. For example, if you want the election results in Spanish,\nthe line would be ",Object(o.b)("inlineCode",{parentName:"p"},'"languages": ["es"]')," instead."),Object(o.b)("h3",{id:"step-4-send-the-pull-request-1"},"Step 4. Send the Pull Request"),Object(o.b)("p",null,"We welcome your contributions. This is an open source project and we'll be happy\nto accept your pull request adding support for a new language or updating an\nexisting translation. Please ensure you read and follow the step in the\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../contribute/guide"}),"Contribution Guide")," to do so."))}p.isMDXComponent=!0},88:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return d}));var a=t(0),i=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=i.a.createContext({}),p=function(e){var n=i.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=p(e.components);return i.a.createElement(c.Provider,{value:n},e.children)},g={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},b=i.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(t),b=a,d=u["".concat(l,".").concat(b)]||u[b]||g[b]||o;return t?i.a.createElement(d,r(r({ref:n},c),{},{components:t})):i.a.createElement(d,r({ref:n},c))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=b;var r={};for(var s in n)hasOwnProperty.call(n,s)&&(r[s]=n[s]);r.originalType=e,r.mdxType="string"==typeof e?e:a,l[1]=r;for(var c=2;c<o;c++)l[c]=t[c];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);