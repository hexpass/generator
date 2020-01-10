import MD5 from 'crypto-js/md5';
import HmacMD5 from 'crypto-js/hmac-md5';
import PasswordParams from './PasswordParams';

export default class GenerateUitl {
  private static symbolNum: number = 0;
  private static numberNum: number = 0;
  private static upperCaseNum: number = 0;
  private static lowerCaseNum: number = 0;
  private static characterTypeNum: number = 3;

  private static symbolCharsArray: string[] = [];
  private static numberCharsArray: string[] = [];
  private static upperCaseCharsArray: string[] = [];
  private static lowerCaseCharsArray: string[] = [];

  public static generate(params: PasswordParams): string {
    const tagMd5: string = MD5(params.tag).toString();
    const pwdMd5: string = MD5(params.pwd).toString();
    const versionMd5: string = MD5(params.version.toString()).toString();
    const seedArray: string[] = HmacMD5(tagMd5 + versionMd5, pwdMd5)
      .toString()
      .split('');
    const passwordMd5Array: string[] = seedArray.splice(0, params.length);
    const passwordArray: string[] = new Array(params.length);

    this.initVariable();
    this.getEachTypeCharsNum(params);
    this.initChars(params.avoidAmbChar);

    passwordMd5Array.forEach((value, index) => {
      const itemInt: number = parseInt(value, 16);
      let char: string = '';
      let cursor: number = 0;
      for (let i = 0; i <= itemInt; i++) {
        if (passwordArray[cursor] != undefined) {
          i--;
        }
        if (i != itemInt) {
          cursor = cursor == params.length - 1 ? 0 : cursor + 1;
        }
      }

      if (index < this.symbolNum) {
        char = this.getChar(this.symbolCharsArray, itemInt);
      } else if (index < this.symbolNum + this.numberNum) {
        char = this.getChar(this.numberCharsArray, itemInt);
      } else if (index < params.length - this.lowerCaseNum) {
        char = this.getChar(this.upperCaseCharsArray, itemInt);
      } else {
        char = this.getChar(this.lowerCaseCharsArray, itemInt);
      }
      passwordArray[cursor] = char;
    });

    return passwordArray.join('');
  }

  private static initVariable() {
    this.symbolNum = 0;
    this.numberNum = 0;
    this.upperCaseNum = 0;
    this.lowerCaseNum = 0;
    this.characterTypeNum = 3;
  }

  private static initChars(avoidAmbChar: boolean) {
    if (avoidAmbChar) {
      this.symbolCharsArray = '@#$%^&*+-'.split('');
      this.numberCharsArray = '23456789'.split('');
      this.upperCaseCharsArray = 'ABDEFGHJLMNQRTY'.split('');
      this.lowerCaseCharsArray = 'abdefghjmnqrty'.split('');
    } else {
      this.symbolCharsArray = '!@#$%^&*+-'.split('');
      this.numberCharsArray = '0123456789'.split('');
      this.upperCaseCharsArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      this.lowerCaseCharsArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
    }
  }

  public static getCharacterTypeNum(params: PasswordParams): number {
    const characterTypes: boolean[] = [
      params.hasSymbol,
      params.hasNumber,
      params.hasUpperCase,
      params.hasLowerCase,
    ];
    return characterTypes.reduce((total, element) => (element ? total + 1 : total), 0);
  }

  private static getEachTypeCharsNum(params: PasswordParams) {
    this.characterTypeNum = this.getCharacterTypeNum(params);

    if (params.hasSymbol) {
      this.symbolNum = Math.floor(params.length / this.characterTypeNum);
    }
    if (params.hasNumber) {
      if (!(params.hasUpperCase || params.hasLowerCase)) {
        this.numberNum = params.length - this.symbolNum;
      } else {
        this.numberNum = Math.floor(params.length / this.characterTypeNum);
      }
    }
    if (params.hasUpperCase) {
      if (!params.hasLowerCase) {
        this.upperCaseNum = params.length - this.symbolNum - this.numberNum;
      } else {
        this.upperCaseNum = Math.floor((params.length - this.symbolNum - this.numberNum) / 2);
      }
    }
    if (params.hasLowerCase) {
      this.lowerCaseNum = params.length - this.symbolNum - this.numberNum - this.upperCaseNum;
    }
  }

  public static getChar(charsArray: string[], index: number): string {
    if (index < charsArray.length) {
      return charsArray[index];
    }
    return charsArray[index % charsArray.length];
  }
}
