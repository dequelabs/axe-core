import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-nested-component',
  shadow: true
})
export class MyNestedComponent {
  render() {
    return (
      <Host>
        <div class="wrapper">
          <h2>Nested Parent</h2>
          <my-shadow-component>
            <p>Slotted content from parent</p>
          </my-shadow-component>
        </div>
      </Host>
    );
  }
}
