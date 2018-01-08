# aurelia-nativescript

From NativeScript doc/ API, it appears NativeScript v3 is powerful and easy to use enough that it feels hard to justify the need for creating another abstraction layer on top of it.

I don't believe either Angular / Vue adds much value on top of it. Sharing UI code is inviting for a rewrite in the end when things have to be catered for difference between WEB and mobile OSs.

If it's so desired to have Aurelia / NativeScript integrated, probably there are not one, but two methods:

* use Jsdom, and associate each custom element with a NativeScript built in element.
* implement from scratch from Platform abstraction layer and templating, and basically whatever assumes there is Javascript DOM API

Following is the POC how to have Aurelia / NativeScript / jsdom work together

![Aurelia - NS - jsdom](https://lh3.googleusercontent.com/g06IYNJFlicoyykHftJ0SRdYPd1woou-Rx8UivALTpjtwAWCj1opf4SeVUuwzlO_xRVhFtBkgimKUa4=w1680-h944-rw)


![Aurelia - NS - jsdom 2](https://lh6.googleusercontent.com/W7TU7OF4wkXrErJqgHcDaM__TQVX5qmduxqMpfEUImjLvhgDXvUekI23FoJOcYXR9nQN3C40no0ej2o=w1680-h944-rw)
