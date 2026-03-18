import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-scoped-component',
  shadow: false,
  scoped: true
})
export class MyScopedComponent {
  render() {
    return (
      <Host>
        <h1>Hello Scoped</h1>
        <button>Click me</button>
        <img src="test.png" />
        <input type="text" />
        <slot></slot>
      </Host>
    );
  }
}
