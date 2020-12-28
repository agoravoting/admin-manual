(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{76:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return h}));var a=n(3),o=n(7),i=(n(0),n(88)),r={id:"deployment_troubleshooting",title:"Deployment Troubleshooting",sidebar_label:"Deployment Troubleshooting",slug:"/deployment/troubleshooting"},s={unversionedId:"deployment_troubleshooting",id:"deployment_troubleshooting",isDocsHomePage:!1,title:"Deployment Troubleshooting",description:"1. Problems when creating the election",source:"@site/docs/deployment_troubleshooting.md",slug:"/deployment/troubleshooting",permalink:"/admin-manual/docs/deployment/troubleshooting",editUrl:"https://github.com/agoravoting/admin-manual/edit/master/docs/deployment_troubleshooting.md",version:"current",sidebar_label:"Deployment Troubleshooting",sidebar:"someSidebar",previous:{title:"Deployment Guide",permalink:"/admin-manual/docs/"}},l=[{value:"1. Problems when creating the election",id:"1-problems-when-creating-the-election",children:[]},{value:"2. The election tally never succeeds",id:"2-the-election-tally-never-succeeds",children:[]},{value:"3. Supervisor is not running",id:"3-supervisor-is-not-running",children:[]},{value:"4. Problems provisioning",id:"4-problems-provisioning",children:[]}],c={toc:l};function h(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"1-problems-when-creating-the-election"},"1. Problems when creating the election"),Object(i.b)("p",null,"This is usually a problem with election authorities. Unfortunately, most of the\nissues related to election authorities do not get reported to the user nor the\nsuperadmins, although it's also true that most of these issues are solved when\ndoing the deployment."),Object(i.b)("p",null,"To debug and analyze the situation, you can use the following commands in the\nelection authorities or the agora server:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"See if the requests are reaching to nginx reading its log:"),Object(i.b)("p",{parentName:"li"},"$ sudo tail -f /var/log/nginx/access.log"))),Object(i.b)("p",null,'nginx is in charge of filtering and accepting only https requests from http\nclients (i.e. other "eopeers" or "agora" servers) whose client tls certificate\nis installed in the peer.'),Object(i.b)("p",null,"If requests are being received but rejected with status 401 Unauthorized, it's\nusually because:"),Object(i.b)("p",null,"a) the client TLS certificate has not been correctly installed, in which case\nyou just need to install the eopeer package (and restart nginx)"),Object(i.b)("p",null,"b) the client TLS certificate has correctly been installed, but it hasn't been\napplied because you forgot to restart nginx with:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ service nginx restart\n")),Object(i.b)("p",null,"If on the other hand the requests are reaching to nginx but somehow are not\nbeing processed, this is usually because previously an error happened during the\nprocessing of an action of an election and the processing of the action was\nnever marked to a finished state, and election-orchestra is configured to\nexecute only one task at once. There's an easy way to solve this isssue; just\nrestart election-orchestra:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ supervisorctl restart eorchestra\n")),Object(i.b)("ol",{start:2},Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"You should also take a look at election-orchestra log:"),Object(i.b)("p",{parentName:"li"},"$ sudo supervisorctl tail -f eorchestra"))),Object(i.b)("p",null,"election-orchestra is the software that organizes the creation of the keys\nand the tallying of the election inside election authority servers,\ncommunicating with other authorities and the agora servers."),Object(i.b)("p",null,"You might find this kind of error in the eorchestra log:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"ConnectionError: HTTPConnectionPool(host='agora', port=14443): Max retries exceeded with url: /api/election/103/keydone (Caused by <class 'socket.error'>: [Errno 110] Connection timed out)\n")),Object(i.b)("p",null,"This happens when election keys have been created, but the last step, which is\nto send the public keys to the requester agora server, has failed. This might\nhave happened because the agora TLS certificate is correctly installed (with\nthe peer package), but the ip address in the peer package was invalid, for\nexample because the communication with the agora server should be through its\nprivate ip-address and it's been configured to be done through its public ip, or\nviceversa. If it's the former, what you'd do is:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"# generate the correct agora peer package, with the private ip address\nagoraServer $ sudo eopeers --show-mine --private > agora.pkg\n\n# copy the agora peer package to the election authorities\nscp blah blah\n\n# uninstall the old agora peer package, install the new one and reinstall\n# nginx\nauthX $ sudo eopeers --uninstall agora\nauthX $ sudo eopeers --install agora.pkg && sudo service nginx restart\n")),Object(i.b)("p",null,'An alternative way of correcting the ip-address issue is to just add another\nalias directly in /etc/hosts. This can be done in the deployment config.yml file\nin the "config.hosts" variable.'),Object(i.b)("ol",{start:3},Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Take a look at agora-elections log:"),Object(i.b)("p",{parentName:"li"},"$ sudo supervisorctl tail -f agora-elections"))),Object(i.b)("p",null,"agora-elections is the application run in agora web servers that is in charge of\ncollecting cast ballots (the electronic ballot box) and also connecting with\nelection authorities to trigger the creation of election keys and launching\nthe tally."),Object(i.b)("p",null,"When you launch an election, it might inmmediatly fail if the agora web server\ndoesn't have the election eopeer packages correctly installed. Please check\nthat:"),Object(i.b)("p",null,"a) The authority packages are installed with:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ sudo eopeers --list\n")),Object(i.b)("p",null,"b) The authority packages are installed with the correct ip-addresses. Bear in\nmind that they might be installed with the public-ip address and maybe they\nshould be installed with the public ip address or viceversa. You can see a peer\npackage installed ip-address with:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ sudo eopeers --list <NAME>\n")),Object(i.b)("p",null,'c) check that the director authority peer package, which is the authority that\norchestrates the communication with other authorities, has been installed with\nthe eopeers "--keystore /home/agoraelections/keystore.jks" parameter. This is\nneeded because the TLS certificate of this authority needs to be accessible not\nonly to nginx but also directly to agora-elections.'),Object(i.b)("p",null,'Also, if you ever need to uninstall the peer package of this election authority,\nremember to do --uninstall with the\n"--keystore /home/agoraelections/keystore.jks" parameter.'),Object(i.b)("p",null,"d) Check that you have restarted both nginx and agora-elections if you have\nchanged any peer package:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ sudo supevisorctl restart agora-elections && sudo service nginx restart\n")),Object(i.b)("p",null,'e) Check that the list of election authorities are correctly configured in\nagora-elections in the file\n/home/agoraelections/agora-elections/conf/application.local.conf. This is\n/configured during deployment in the "config.authorities", "config.director" and\n"config.auths" variables in "config.yml".'),Object(i.b)("ol",{start:4},Object(i.b)("li",{parentName:"ol"},"Bear in mind that if you are using a production environment deployment, you\nwill have two or more front-end web servers with agora-elections. This means\nthat any of these servers might connect with the election authorities. The\nconfiguration of the election authorities in that case is that one of them is\ndeemed to be the master agora server, and even though any of those agora servers\n(with different private ip addresses) might be the initiator of a request to\nthe director election authority, the callback url will always point to the\nsame master agora server ip address. Also, note that the TLS certificate of\nall the agora servers will be the same.")),Object(i.b)("h2",{id:"2-the-election-tally-never-succeeds"},"2. The election tally never succeeds"),Object(i.b)("p",null,"a) If the election public keys are correctly created, this means that the\nconnection between election authorities and the agora servers are usually all\nok; except for a couple things:"),Object(i.b)("p",null,'This usually happens when an election authority that is not the director\nelection authority hasn\'t got correctly configured the ip address or TLS\ncertificate of the agora server, and thus it has failed to download the list of\nballots from that server. This can be checked looking at the "eorchestra" log\nin that election authority:'),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"authX $ sudo supervisorctl tail -f eorchestra\n")),Object(i.b)("p",null,"Or taking a look at nginx log in the agora server, in which the request would\nnot reach because it's going to another ip address:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ sudo tail -f /var/log/nginx/access.log\n")),Object(i.b)("p",null,"Note that this issue can also happen if in the agora server's nginx log the\nrequest is logged (and thus the server is being reached) but with status\n401 Unauthorized because the agora web server hasn't got properly configured\nthe TLS certificate of that election authority. The TLS certificate is included\nin the peer package of the election authority."),Object(i.b)("p",null,"To solve peer packages problems, see section 1."),Object(i.b)("p",null,"b) If there is an error during the tally of plaintexts of the ballots (i.e.\nafter the anonymization and decryption step done by the election authorities)."),Object(i.b)("p",null,"In some rare cases, if there's an issue in agora-results configuration or a bug\nin agora-results or agora-tally, this might happen. To detect this issue, take\na look at the log in agora-elections when receiving the plaintexts of the\nballots when calculating the tally:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"agora $ sudo supervisorctl tail -f agora-elections\n")),Object(i.b)("h2",{id:"3-supervisor-is-not-running"},"3. Supervisor is not running"),Object(i.b)("p",null,"If the login page (/admin/login) loads but the form doesn't show up, and when\nyou analyze traffic some queries (for example  https://agora/authapi/api/auth-event/1/) return\n\"502 Bad Gateway\", this might be because supervisor is dead. This is a bug\nthat we don't know how to fix yet but has a simple solution: restart supervisor:"),Object(i.b)("p",null,"You can check that supervisor is down when this happens:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'$ cd agora\nagora $ vagrant ssh -c "sudo supervisorctl status"\n\n    unix:///var/run/supervisor.sock no such file\n    Connection to 127.0.0.1 closed.\n')),Object(i.b)("p",null,"If that's the case, restart it:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'$ cd agora\nagora $ vagrant ssh -c "sudo /etc/init.d/supervisor* restart"\n')),Object(i.b)("p",null,"Afterwards, supervisor status should return something like this, which is ok:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'$ cd agora\nagora $ vagrant ssh -c "sudo supervisorctl status"\n\n    agora-elections                  RUNNING    pid 7665, uptime 0:00:04\n    authapi                          RUNNING    pid 7663, uptime 0:00:04\n    authapi_celery                   RUNNING    pid 7667, uptime 0:00:04\n    sentry                           RUNNING    pid 7664, uptime 0:00:04\n    sentry_celery                    RUNNING    pid 7666, uptime 0:00:04\n    Connection to 127.0.0.1 closed.\n')),Object(i.b)("h2",{id:"4-problems-provisioning"},"4. Problems provisioning"),Object(i.b)("p",null,"Sometimes the provisioning fails. This can be related to some syntax changes on\nansible's playbooks format. Check that you have Ansible 2.x or superior. If you\nare using vagrant to provision a virtual machine, you need to install ansible 2.x\non the host machine, not on the guest."),Object(i.b)("p",null,"On Ubuntu, you can install the latest version of Ansible by executing:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ sudo apt-get install software-properties-common pwgen -y\n$ sudo apt-add-repository ppa:ansible/ansible -y\n$ sudo apt-get update\n$ sudo apt-get install ansible -y\n")))}h.isMDXComponent=!0}}]);