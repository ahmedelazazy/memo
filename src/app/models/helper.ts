export class Helper {
  static guid() {
    return (
      Helper.s4() +
      Helper.s4() +
      '-' +
      Helper.s4() +
      '-' +
      Helper.s4() +
      '-' +
      Helper.s4() +
      '-' +
      Helper.s4() +
      Helper.s4() +
      Helper.s4()
    );
  }

  private static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
