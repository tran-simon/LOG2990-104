export class MathUtil {

  /**
   * Returns value greater or equal to min
   */
  static fitLower(value: number, min = 0): number {
    return value >= min ? value : min;
  }

  /**
   * Returns value lower or equal to max
   */
  static fitUpper(value: number, max = 1): number {
    return value <= max ? value : max;
  }

  /**
   * Returns value lower or equal to max and greater or equal to min
   */
  static fit(value: number, min = 0, max = 1): number {
    return MathUtil.fitLower(
      MathUtil.fitUpper(value, max),
      min
    );
  }

  /**
   * Returns hex string of minimum size 2. If value is smaller than 16, result will be '0X'
   */
  static toHex(value: number): string {
    const stringValue = value.toString(16);
    return stringValue.length !== 1 ? stringValue : '0' + stringValue;
  }

}
