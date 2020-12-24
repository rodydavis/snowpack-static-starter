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
      * {
        --header-height: 45px;
      }
      #base {
        /* height: 100vh; */
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          'header'
          'main'
          'footer';
      }
      #base > header {
        grid-area: header;
        text-align: start;
        background: red;
        color: white;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: var(--header-height);
      }
      #base > header > * {
        padding: 10px;
      }
      #base > footer {
        grid-area: footer;
        padding: 10px;
        background: grey;
        color: white;
      }
      #base > main {
        grid-area: main;
        margin-top: var(--header-height);
        height: calc(100vh - (var(--header-height) * 2) + 10px);
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
      slot {
        grid-area: main;
      }
    `;
  }

  render() {
    return html`
      <div id="base">
        ${this.showHeader
          ? html`<header>
              <h2>${this.title}</h2>
              <div class="actionItems">
                ${this.menuItem('Home', '/')} ${this.menuItem('Blog', '/blog')}
                ${this.menuItem('About', '/about')}
              </div>
            </header>`
          : nothing}
        <main><slot></slot></main>
        ${this.showFooter ? html`<footer>Copyright 2020</footer>` : nothing}
      </div>
    `;
  }

  private menuItem(label: string, route: string): TemplateResult {
    return html` <button @click=${() => (window.location.href = route)}>
      ${label}
    </button>`;
  }
}
