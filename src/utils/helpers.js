export class Helper {

  static capitalizeWord(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  static formatAsMoney(amount) {
    return new Intl.NumberFormat().format(amount);
  }
}
