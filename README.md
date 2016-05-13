# ReactLanguage
This is a React component for build i18n website more effortless.
[online example](https://jsfiddle.net/lobos/hma00jf2/)

# Install
```
npm install react-language
```

# Usage
```
var ReactLanguage = require('react-language');

// set currentLanguage, if currentLanguage not set, use window.navigator.language || window.navigator.userLanguage
// setLanguage also store the language to localStorage, the broswer reopen the web page will getItem from localStorage before get from window.navigator 
ReactLanguage.setLanguage('xxx');

// create method return a ReactComponent, it must and only pass one argument.
// if argument === true, this component will be the default component, if no other created component match currentLanguge, this content(children) will show. It has only one default component in a project.
const En = ReactLanguage.create(true);

// string argument, if argument === currentLanguage, the content(children) will show.
const Ja = ReactLanguage.create('ja');

// function argument, if return true, the content(children) will show. 
const Cn = ReactLanguage.create(function (currentLanguage) {
    return currentLanguage.indexOf('zh-') === 0;
});

....

<div>
    <Cn>你好，世界</Cn>
    <En tag="div">Hello world.</En>
    <Ja>こんにちは世界</Ja>
</div>

======================================================
rendered result:
<div><div>Hello world.</div></div> // currentLanguage === 'en-US'
<div><span>你好，世界</span></div> // currentLanguage === 'zh-CN'
<div><span>こんにちは世界</span></div> // currentLanguage === 'ja'
<div><div>Hello world.</div></div> // currentLanguage === 'other language'
```

# props
created component only has two props
- children: content, anything
- tag: ReactElement type string, like 'div', 'a', 'span'... if children is an Array or a string, render a new ReactElement wrapped by the tag. default value is 'span'.

#license

The MIT License (MIT)
