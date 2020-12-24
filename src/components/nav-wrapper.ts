import {
  customElement,
  property,
  LitElement,
  html,
  css,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

@customElement('nav-wrapper')
export class NavWrapper extends LitElement {
  @property() title = 'Website';
  @property({ type: Boolean }) fixed = true;
  @property({ type: Boolean }) showFooter = true;
  @property({ type: Boolean }) showHeader = true;

  static get styles() {
    return css`
      header {
        padding: 10px;
        text-align: start;
        background: red;
        color: white;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      footer {
        padding: 10px;
        background: grey;
        color: white;
      }
      .actionItems {
        padding: 0px;
      }
      .actionItems > button {
        background-color: inherit;
        color: white;
        font-size: 16px;
        border: none;
      }
      header > * {
        padding: 0;
        margin: 0;
      }
    `;
  }

  render() {
    return html`
      <style>
        ${this.dynamicStyle()}
      </style>
      ${this.showHeader
        ? html`<header>
            <h2>${this.title}</h2>
            <div class="actionItems">
              ${this.menuItem('Home', '/')}
              ${this.menuItem('Blog', '/blog')}
              ${this.menuItem('About', '/about')}
            </div>
          </header>`
        : nothing}
      <slot></slot>
      ${this.showFooter ? html`<footer>Copyright 2020</footer>` : nothing}
    `;
  }

  private dynamicStyle(): string {
    if (this.fixed) {
      return `
      header {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
      }
      `;
    }
    return '';
  }

  private menuItem(label: string, route: string): TemplateResult {
    return html` <button @click=${() => (window.location.href = route)}>
      ${label}
    </button>`;
  }
}
