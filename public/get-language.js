function getDefaultLanguage() {
  let languageNow = localStorage.getItem('language');
  if (languageNow == null) {
    const navigatorLanguage = navigator.language;
    if (navigatorLanguage == 'zh-CN' || navigatorLanguage == 'zh-SG') {
      languageNow = 'zh-Hans';
    } else if (navigatorLanguage == 'zh-TW' || navigatorLanguage == 'zh-HK') {
      languageNow = 'zh-Hant';
    } else {
      languageNow = 'en';
    }
  }
  return languageNow;
}
const defaultLanguage = getDefaultLanguage();
export default defaultLanguage;
