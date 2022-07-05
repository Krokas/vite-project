class Binary {
  byteElement: HTMLDivElement;
  decimalElement: HTMLDivElement;
  byte: Boolean[] = new Array(8);
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
    this.decimalElement = document.createElement("div");
    this.decimalElement.innerHTML = this.decimal.toString();
    this.byteElement.classList.add("byte");
    this.decimalElement.classList.add("decimal");
  }

  handleBitChange(event: Event): void {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    const value: number = Number(checkbox.value);
    const isChecked = checkbox.checked;

    this.byte[value] = isChecked;
    this.decimal = this.calculateDecimal();
    this.decimalElement.innerHTML = this.decimal.toString();
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

  getHTML(): HTMLElement {
    const container: HTMLElement = document.createElement("div");
    container.classList.add("container");
    container.append(this.byteElement);
    container.append(this.decimalElement);
    return container;
  }
}

export default Binary;
