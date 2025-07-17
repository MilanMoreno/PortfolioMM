import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-project-card',
    imports: [CommonModule, TranslateModule],
    template: `
    <article class="project">
      <img [src]="image" [alt]="titleKey | translate" class="project__image">
      
      <div class="project__content">
        <h3 class="project__title">{{ titleKey | translate }}</h3>
        <p class="project__stack">{{ stackKey | translate }}</p>
        <p class="project__description">{{ descriptionKey | translate }}</p>
        
        <div class="project__actions">
          <a [href]="demoUrl" target="_blank" class="project__button project__button--primary">
            {{ 'PORTFOLIO.LIVE_TEST' | translate }}
          </a>
          <a [href]="repoUrl" target="_blank" class="project__button project__button--secondary">
            {{ 'PORTFOLIO.GITHUB' | translate }}
          </a>
        </div>
      </div>
    </article>
  `,
    styles: [`
    .project {
      display: flex;
      width: 100%;
      margin-bottom: 100px;
      z-index: 50;

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }

    .project__image {
      height: 400px;
      margin: 0 100px;
      z-index: 60;
    }

    .project__content {
      width: 500px;
      z-index: 50;
    }

    .project__title {
      font-size: var(--font-size-heading-medium);
      color: var(--color-accent-secondary);
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .project__stack {
      color: var(--color-accent-primary);
      font-size: 23px;
      margin-bottom: 1rem;
    }

    .project__description {
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      margin-bottom: 2rem;
    }

    .project__actions {
      display: flex;
      justify-content: space-between;
    }

    .project__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 23px;
      transition: all 0.3s ease;

      &--primary {
        background-color: var(--color-accent-secondary);
        color: var(--color-text-primary);

        &:hover {
          background-color: var(--color-accent-primary);
        }
      }

      &--secondary {
        border: 1px solid var(--color-accent-primary);
        color: var(--color-text-primary);

        &:hover {
          background-color: var(--color-accent-primary);
        }
      }
    }

    @media (max-width: 1290px) {
      .project {
        flex-direction: column !important;
        align-items: center;
      }

      .project__content {
        text-align: center;
      }

      .project__image {
        max-width: 70vw;
        width: auto;
        height: auto;
        margin: 0 0 2rem;
      }

      .project__content {
        max-width: 90vw;
        width: auto;
      }
    }

    @media (max-width: 600px) {
      .project__actions {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }

    @media (max-width: 417px) {
      .project__button {
        width: 140px;
        height: 45px;
        padding: 0 15px;
        font-size: 16px;
        min-height: 44px;
      }
    }

    @media (max-width: 368px) {
      .project__button {
        width: 120px;
        height: 40px;
        font-size: 14px;
        min-height: 44px;
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input() image!: string;
  @Input() titleKey!: string;
  @Input() stackKey!: string;
  @Input() descriptionKey!: string;
  @Input() demoUrl!: string;
  @Input() repoUrl!: string;
}
