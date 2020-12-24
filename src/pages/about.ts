import {
  customElement,
  property,
  LitElement,
  html,
  css,
  TemplateResult,
} from 'lit-element';
import '../components/nav-wrapper';

@customElement('about-page')
export class AboutPage extends LitElement {
  static get styles() {
    return css`
      article {
        color: black;
        background-color: white;
        padding-left: 20px;
      }
    `;
  }

  render() {
    return html`
      <nav-wrapper title="About">
        <article>
          <h1>About Page</h1>
          <p>This is my about page and there is so much to say here!</p>
        </article>
      </nav-wrapper>
    `;
  }
}
