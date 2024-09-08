export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    return new Slug(value)
  }

  /**
   * Receives a string and normalizes it to a slug format.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   * @returns Slug {Slug}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+$/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
