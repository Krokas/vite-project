class Binary {
  byteElement: HTMLDivElement;
  decimalElement: HTMLInputElement;
  byte: boolean[] = new Array(8);
  decimal: Number = 0;
  constructor() {
    this.byteElement = document.createElement("div");
    for (let i = 0; i < 8; i++) {
      this.byte[i] = false;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;
      checkbox.name = `bit`;
      checkbox.value = i.toString();
      checkbox.addEventListener("change", (event: Event) =>
        this.handleBitChange(event)
      );
      this.byteElement.append(checkbox);
    }
    this.decimalElement = document.createElement("input");
    this.decimalElement.type = "number";
    this.decimalElement.min = Number(0).toString();
    this.decimalElement.max = Number(255).toString();
    this.decimalElement.value = this.decimal.toString();
    this.decimalElement.addEventListener("change", (event: Event) =>
      this.handleDecimalChange(event)
    );
    this.byteElement.classList.add("byte");
    this.decimalElement.classList.add("decimal");
  }

  handleBitChange(event: Event): void {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    const value: number = Number(checkbox.value);
    const isChecked = checkbox.checked;

    this.byte[value] = isChecked;
    this.decimal = this.calculateDecimal();
    this.decimalElement.value = this.decimal.toString();
  }

  handleDecimalChange(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    let value: number = Number(input.value);

    if (value > 255) {
      value = 255;
      input.value = value.toString();
    }

    if (value < 0) {
      value = 0;
      input.value = value.toString();
    }
    input.blur();

    this.byte = this.calculateBinary(value);
    const checkboxes: HTMLInputElement[] = Array.from(
      this.byteElement.querySelectorAll("input[type=checkbox]")
    );

    this.byte.forEach((value: boolean, index: number) => {
      const checkbox: HTMLInputElement | undefined = checkboxes.find(
        (checkbox: HTMLInputElement) => checkbox.value === index.toString()
      );
      if (checkbox) checkbox.checked = value;
    });
  }

  calculateDecimal(): number {
    var decimal: number = 0;
    this.byte.forEach((value, index) => {
      if (value) {
        decimal += Math.pow(2, index);
      }
    });
    return decimal;
  }

  calculateBinary(value: number): boolean[] {
    let remainder: number = value;
    let byte: boolean[] = Array(8);
    for (let i = 7; i >= 0; i--) {
      const divisor = Math.pow(2, i);
      const bitValue = Math.floor(remainder / divisor);
      remainder = remainder % divisor;
      byte[i] = !!bitValue;
    }
    return byte;
  }

  getHTML(): HTMLElement {
    const container: HTMLElement = document.createElement("div");
    container.classList.add("container");
    container.append(this.byteElement);
    container.append(this.decimalElement);
    return container;
  }
}

export default Binary;
