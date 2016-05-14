import { PropTypes, isValidElement, Children, createElement, DOM } from 'react';

const STORAGE_KEY = '17tee190yt8gs';
const storage = window.localStorage || null;

let currentLanguage;
let createdLanguageList = [];
let noMatchedLanguage = true;

export function getLanguage () {
  if (!currentLanguage) {
    if (storage) {
      currentLanguage = storage.getItem(STORAGE_KEY);
    }

    if (!currentLanguage) {
      currentLanguage = (window.navigator.language || window.navigator.userLanguage || '').toLowerCase();
    }

    checkLanguageList()
  }

  return currentLanguage;
}

// If created Language List has Component match currentLanguage, set noMatchedLanguage to false.
function checkLanguageList () {
  noMatchedLanguage = true;
  createdLanguageList.forEach((f) => {
    if (f(getLanguage())) {
      noMatchedLanguage = false;
    }
  });
}

// performance optimize
function memoize(fn) {
  return function (lang) {
    fn.cache = fn.cache || {};

    return (lang in fn.cache) ?
      fn.cache[lang] :
      fn.cache[lang] = fn(lang);
  };
}

// set currentLanguage, store language to LocalStorage for next visit.
export function setLanguage (lang) {
  currentLanguage = lang;
  checkLanguageList();
  if (storage) {
    storage.setItem(STORAGE_KEY, currentLanguage);
  }
}

export function create (lang) {
  let detect;

  // if lang === true, create default Language Component.
  if (lang === true) {
    // if currentLanguage has no other matched Language, show default Language.
    detect = () => noMatchedLanguage;
  } else {
    detect = memoize(typeof lang === 'function' ? lang : (l) => lang === l.toLowerCase());
    createdLanguageList.push(detect);
    checkLanguageList();
  }

  // Component ======================================
  function Language (props) {
    const { children, tag } = props;

    let isShow = detect(getLanguage());
    if (!isShow) {
      return DOM.noscript();
    }

    if (isValidElement(children)) {
      return Children.only(children);
    } else {
      return createElement(tag, {}, children);
    }
  }

  Language.propTypes = {
    children: PropTypes.any,
    tag: PropTypes.string
  };

  Language.defaultProps = {
    tag: 'span'
  };

  return Language;
}

