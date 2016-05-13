import * as ReactLanguage from '../src';
import React from 'react';
import ReactDOM from 'react-dom';

var En = ReactLanguage.create(true);
var Ja = ReactLanguage.create('ja');
var Cn = ReactLanguage.create(function (lang) {
  return lang.toLowerCase().indexOf('zh-') === 0;
});

var Demo = React.createClass({
  handleClick: function (lang) {
    ReactLanguage.setLanguage(lang);
    this.forceUpdate();
  },

  render: function () {
    return (
      <div>
        <Cn>你好，世界</Cn>
        <En tag="div">Hello world.</En>
        <Ja>こんにちは世界</Ja>

        <div>
          <a href="javascript:;" onClick={this.handleClick.bind(this, 'en-US')}>English</a>
          <a href="javascript:;" onClick={this.handleClick.bind(this, 'zh-CN')}>中文</a>
          <a href="javascript:;" onClick={this.handleClick.bind(this, 'ja')}>日本語</a>
          <a href="javascript:;" onClick={this.handleClick.bind(this, 'fr')}>Français</a>
        </div>
      </div>
    );
  }
})

ReactDOM.render(
  <Demo />,
  document.querySelector('#demo')
);
