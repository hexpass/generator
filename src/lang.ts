export default class Language {
    public locale: string = 'zh-Hans';
    public text: Map<string, string> = new Map();
    public hans: Map<string, string> = new Map([
      ['label', '标签'],
      ['password', '密码'],
      ['advanced', '高级'],
      ['length', '长度'],
    ]);

    private hant: Map<string, string> = new Map([
      ['label', '標籤'],
      ['password', '密碼'],
      ['advanced', '高級'],
      ['length', '長度'],
    ]);

    constructor(locale: string) {
      this.locale = locale;
      this.changeString();
    }

    public setLocale(locale: string) {
      this.locale = locale;
      this.changeString();
    }

    public changeString() {
      let value!: string | undefined;
      for (const key of this.hans.keys()) {
        switch (this.locale) {
          case 'zh-Hans':
            value = this.hans.get(key);
            break;
          case 'zh-Hant':
            value = this.hant.get(key);
            break;
          default:
            break;
        }
        if (typeof value == 'string') {
          this.text.set(key, value);
        }
      }
    }
}
