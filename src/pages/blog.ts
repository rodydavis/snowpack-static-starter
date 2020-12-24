import {
  customElement,
  property,
  LitElement,
  html,
  css,
  TemplateResult,
} from 'lit-element';
import { getURLParam } from '../utils/routing';
import '../components/nav-wrapper';

@customElement('blog-page')
export class BlogPage extends LitElement {
  @property({ type: String }) id = '';

  async firstUpdated() {
    window.addEventListener('popstate', () => this.checkUrl());
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkUrl();
  }

  private checkUrl() {
    this.id = getURLParam('id') || '';
    this.requestUpdate();
  }

  static get styles() {
    return css`
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        background-color: #2196f3;
        background: linear-gradient(315deg, #b4d2ea 0%, #2196f3 100%);
        font-size: 24px;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
        grid-gap: 1rem;
        padding: 10px;
      }
      .card {
        height: 200px;
        border: 2px solid #e7e7e7;
        border-radius: 4px;
        padding: 0.5rem;
        color: black;
        background-color: snow;
      }
      article {
        padding-left: 20px;
        color: black;
        background-color: white;
      }
      .not-found {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        background-color: white;
      }
    `;
  }

  show404 = false;

  render() {
    if (this.id.length > 0) {
      const post = posts.filter((post) => post.id === this.id)[0];
      if (post) {
        return html` <nav-wrapper title="Blog Id -> ${this.id}">
          <article>
            <h2>${post.title}</h2>
          </article>
        </nav-wrapper>`;
      }
      if (this.show404) {
        return html` <nav-wrapper title="Blog Id -> ${this.id}">
          <div class="not-found">Post Not Found!</div>
        </nav-wrapper>`;
      } else {
        alert('Post Not Found!');
      }
    }
    return html`
      <nav-wrapper title="${'Blog'}">
        <div class="cards">
          ${posts.map(
            (post) => html` <div
              class="card"
              @click=${() => (window.location.href = `/blog?id=${post.id}`)}
            >
              <h2>${post.title}</h2>
            </div>`,
          )}
        </div>
      </nav-wrapper>
    `;
  }
}

interface Post {
  id: string;
  title: string;
}

const posts: Post[] = [
  {
    id: '1234',
    title: 'My First Post',
  },
  {
    id: '2345',
    title: 'My Second Post',
  },
  {
    id: '3456',
    title: 'My Third Post',
  },
];
