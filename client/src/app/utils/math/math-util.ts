

export class MathUtil{

    /**
   * Returns value greater or equal to min
   */
    static fitLower(value: number, min=0): number{
      return value >= min ? value : min;
    }

  /**
   * Returns value lower or equal to max
   */
  static fitUpper(value:number, max = 1): number{
      return value <= max ? value : max;
    }

  /**
   * Returns value lower or equal to max and greater or equal to min
   */
    static fit(value: number, min=0, max=1): number{
      return MathUtil.fitLower(
        MathUtil.fitUpper(value, max),
        min
      );
    }
}
