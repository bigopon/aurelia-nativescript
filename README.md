# aurelia-nativescript

From NativeScript doc/ API, it appears NativeScript v3 is powerful and easy to use enough that it feels hard to justify the need for creating another abstraction layer on top of it.

I don't believe either Angular / Vue adds much value on top of it. Sharing UI code is inviting for a rewrite in the end when things have to be catered for difference between WEB and mobile OSs.

If it's so desired to have Aurelia / NativeScript integrated, probably there are not one, but two methods:

* use Jsdom, and associate each custom element with a NativeScript built in element.
* implement from scratch from Platform abstraction layer and templating, and basically whatever assumes there is Javascript DOM API

Following is the POC how to have Aurelia / NativeScript / jsdom work together

![Aurelia - NS - jsdom](https://i.imgur.com/pYCAogv.gif)


![Aurelia - NS - jsdom 2](https://i.imgur.com/Xy6ewYZ.gif)
