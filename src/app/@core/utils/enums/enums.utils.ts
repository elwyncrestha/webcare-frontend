export class EnumUtils {

  /**
   * Returns the collection of enums.
   * @param enums An enumeration type.
   */
  public static keys(enums: {}) {
    return Object.keys(enums);
  }

  /**
   * Returns the collection of enums' value.
   * @param enums An enumeration type.
   */
  public static values(enums) {
    return Object.values(enums);
  }

  /**
   * Returns the collection of enum key-value pairs.
   * @param enums An enumeration type.
   */
  public static pairs(enums) {
    const pair = [];
    EnumUtils.keys(enums).forEach(key => {
      pair.push({
        key,
        value: enums[key],
      });
    });
    return pair;
  }

  /**
   * Returns an enum matching the value.
   * @param enums An enumeration type.
   * @param value An enum value.
   */
  public static getEnum(enums, value: string) {
    for (const pair of EnumUtils.pairs(enums)) {
      if (pair.value === value) {
        return pair.key;
      }
    }
  }
}
