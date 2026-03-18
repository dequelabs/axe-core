import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-shadow-component',
  shadow: true
})
export class MyShadowComponent {
  render() {
    return (
      <Host>
        <h1>Hello Shadow</h1>
        <button>Click me</button>
        <img src="test.png" />
        <input type="text" />
        <slot></slot>
      </Host>
    );
  }
}
