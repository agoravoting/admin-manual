(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{147:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/old-browser-error2-174930340266f8ed887b73ac183c4973.png"},148:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/mobile-b6af8683b5fbfe7b224b934a0bbda3a7.png"},149:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/old-browser-error1-fe71a765387b3b2904e502a04487991b.png"},82:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return b}));var o=n(3),r=n(7),i=(n(0),n(90)),a={id:"browsers-and-cookies",title:"Supported Browsers and Cookies used",sidebar_label:"Browsers and Cookies",slug:"/deployment/browsers-and-cookies"},s={unversionedId:"deployment/browsers-and-cookies",id:"deployment/browsers-and-cookies",isDocsHomePage:!1,title:"Supported Browsers and Cookies used",description:"1. Supported browsers",source:"@site/docs/deployment/browsers-and-cookies.md",slug:"/deployment/browsers-and-cookies",permalink:"/admin-manual/docs/deployment/browsers-and-cookies",editUrl:"https://github.com/agoravoting/admin-manual/edit/master/docs/deployment/browsers-and-cookies.md",version:"current",sidebar_label:"Browsers and Cookies",sidebar:"docsSidebar",previous:{title:"Deployment Troubleshooting",permalink:"/admin-manual/docs/deployment/troubleshooting"},next:{title:"Translation Guide",permalink:"/admin-manual/docs/translation/guide"}},l=[{value:"1. Supported browsers",id:"1-supported-browsers",children:[{value:"Mobile browsers",id:"mobile-browsers",children:[]},{value:"Javascript and old browsers",id:"javascript-and-old-browsers",children:[]},{value:"Insecure browsers",id:"insecure-browsers",children:[]}]},{value:"2. Required and allowed cookies",id:"2-required-and-allowed-cookies",children:[{value:"Used in all modules",id:"used-in-all-modules",children:[]},{value:"Admin",id:"admin",children:[]},{value:"Booth",id:"booth",children:[]},{value:"Election",id:"election",children:[]},{value:"Configuration",id:"configuration",children:[]}]}],c={toc:l};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"1-supported-browsers"},"1. Supported browsers"),Object(i.b)("p",null,"The web interface should work correctly on any modern browser. It's\nalways recommended to use the most updated version of your favourite browser to\nhave more security, but the interface can work on older versions if required."),Object(i.b)("p",null,"The interface has been tested with the following browsers version and newer:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Mozilla Firefox 36"),Object(i.b)("li",{parentName:"ul"},"Google Chrome 50"),Object(i.b)("li",{parentName:"ul"},"Microsoft Edge 15 (All versions)"),Object(i.b)("li",{parentName:"ul"},"Safari 7.1"),Object(i.b)("li",{parentName:"ul"},"Safari on iPhone 5 (iOS v7)"),Object(i.b)("li",{parentName:"ul"},"Chrome on Android (v6)")),Object(i.b)("p",null,"We use ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://browser-update.org"}),"https://browser-update.org")," to check the web browser used by the user\nand notify the user if it's unsupported. If the browser is too old the user\nget the following notification:"),Object(i.b)("p",null,Object(i.b)("img",{alt:"browser-update notification with Chrome 50",src:n(147).default,title:"browser-update notification"})),Object(i.b)("p",null,"You can disable this option in the ",Object(i.b)("inlineCode",{parentName:"p"},"config.yml")," deployment configuration file,\njust disabling the ",Object(i.b)("inlineCode",{parentName:"p"},"config.agora_gui.browser_update_config")," option. If that\noption is set to ",Object(i.b)("inlineCode",{parentName:"p"},"false"),", we don't check the browser version."),Object(i.b)("p",null,"The minimum browser version is also configurable in a deployment. The default\nvalue can be modified in the ",Object(i.b)("inlineCode",{parentName:"p"},"agora-gui/templates/avConfig.js")," in\n",Object(i.b)("inlineCode",{parentName:"p"},"agora-dev-box"),", updating the ",Object(i.b)("inlineCode",{parentName:"p"},"browserUpdate")," field, but that requires a bit\nmore of knowledge as you need to edit the ansible template and re-deploying."),Object(i.b)("h3",{id:"mobile-browsers"},"Mobile browsers"),Object(i.b)("p",null,"The voting interface is responsive, that means that it adapts to the browser\nsize and this makes the application usable on mobile phones:"),Object(i.b)("p",null,Object(i.b)("img",{alt:"Voting on smart phones",src:n(148).default,title:"Voting on smart phones"})),Object(i.b)("h3",{id:"javascript-and-old-browsers"},"Javascript and old browsers"),Object(i.b)("p",null,"The web interface requires javascript to work, so make sure that you don't have\njavascript disabled on your browser."),Object(i.b)("p",null,"The minimum required version of javascript is the ES6 (ECMAScript 2015). This\nversion is supported on most browsers, but it's not supported on Microsoft\nInternet Explorer 11, so this browser is not supported."),Object(i.b)("p",null,"In some old browsers, it's possible that the interface works but the encryption\nfails with an error like this:"),Object(i.b)("p",null,Object(i.b)("img",{alt:"Ballot encoding error",src:n(149).default,title:"Ballot encoding error"})),Object(i.b)("p",null,"In any case, this kind of errors only occurs in the unsupported browsers, and\nthe ",Object(i.b)("inlineCode",{parentName:"p"},"browser-update")," library will show a warning about the usage of an old\nbrowser in those cases."),Object(i.b)("h3",{id:"insecure-browsers"},"Insecure browsers"),Object(i.b)("p",null,"By default, we set ",Object(i.b)("inlineCode",{parentName:"p"},"insecure: true")," setting of the ",Object(i.b)("inlineCode",{parentName:"p"},"browser-update"),' library.\nThis means that all browser that are severely insecure get notified. "Severely\ninsecure" means that the browser has security issues that allow remote code\nexecution and similar stuff, and that they are being actively exploited on\nthe Internet.'),Object(i.b)("p",null,"At the moment of writing this document, it means that anyone using a web browser\nolder than the following ones will get the notification for security reasons,\n",Object(i.b)("strong",{parentName:"p"},"even if the browser is supported by our software"),":"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Edge/IE < 16"),Object(i.b)("li",{parentName:"ul"},"Firefox < 76"),Object(i.b)("li",{parentName:"ul"},"Opera < 62"),Object(i.b)("li",{parentName:"ul"},"Safari < 11.1.1"),Object(i.b)("li",{parentName:"ul"},"Chrome < 88.0.4324.150")),Object(i.b)("p",null,"If you want to disable this feature, which we don't recommend, you should change\nthe ",Object(i.b)("inlineCode",{parentName:"p"},"config.agora_gui.browser_update_config")," setting in the ",Object(i.b)("inlineCode",{parentName:"p"},"config.yml"),"\ndeployment configuration file, setting ",Object(i.b)("inlineCode",{parentName:"p"},"insecure: false"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="config.yml fragment" {7}',title:'"config.yml','fragment"':!0,"{7}":!0}),'    # Shows a dialog if the browser is too old to notify the user. Set this to\n    # false to disable. See how to customize in\n    #  http://browser-update.org/customize.html\n    browser_update_config: >\n      {\n        required: {e:15,f:36,o:65,s:7,c:50},\n        insecure:false,\n        api: "2021.04"\n      }\n')),Object(i.b)("h2",{id:"2-required-and-allowed-cookies"},"2. Required and allowed cookies"),Object(i.b)("p",null,"nVotes uses the bare minimum cookies needed for the interface usability. These\ncookies are the needed to login and for security reasons."),Object(i.b)("p",null,"There's no tracking code or external cookies, all the cookies used by the\nnVotes interface are used just as an local storage for the interface state, and\nin any case these cookies are sent to any external server, they are just used\nto be able to query the API with the authentication and the corresponding\nparameters."),Object(i.b)("p",null,"You can check the cookies present and the use in the following lists by GUI\nmodule."),Object(i.b)("h3",{id:"used-in-all-modules"},"Used in all modules"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"lang"),": Used to store the interface language. It'll be set even without\nlogin to keep track of the language selected by the user for the next use.\nagain. These cookies are present until the user logouts.")),Object(i.b)("h3",{id:"admin"},"Admin"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"authevent"),": A set of cookies used to store the admin interface state.\nThis is used to keep the user loged in if the browser is closed and opened\nagain. These cookies are present until the user logouts.")),Object(i.b)("h3",{id:"booth"},"Booth"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"authevent"),": A set of cookies used to store the booth interface state.\nIn the booth we just store:",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"The current election ID"),Object(i.b)("li",{parentName:"ul"},"The user email and authentication token"),Object(i.b)("li",{parentName:"ul"},"If the user is admin\nThese cookies are removed once the user emits the vote.")))),Object(i.b)("h3",{id:"election"},"Election"),Object(i.b)("p",null,"No special cookies are used here."),Object(i.b)("h3",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"The login session cookies expiration time can be configured instead of having\nno expiration time."),Object(i.b)("p",null,"To do that, just find the line with the ",Object(i.b)("inlineCode",{parentName:"p"},"config.agora_gui.cookies_expires"),"\nconfiguration in the ",Object(i.b)("inlineCode",{parentName:"p"},"config.yml")," deployment configuration file and uncomment\nit. The expiration time  will be set in minutes, but you can use a number\nbigger than 60 to set hours. For example if you want to set one day you can\nput ",Object(i.b)("inlineCode",{parentName:"p"},"1440"),"."))}b.isMDXComponent=!0},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var o=n(0),r=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),b=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=b(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},p=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=b(n),p=o,h=u["".concat(a,".").concat(p)]||u[p]||d[p]||i;return n?r.a.createElement(h,s(s({ref:t},c),{},{components:n})):r.a.createElement(h,s({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);