import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportObserverService } from '../../../../shared/services/viewport/viewport.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

interface Skill {
  name: string;
  icon: string;
}

@Component({
    selector: 'app-skills-section',
    imports: [CommonModule, TranslateModule],
    template: `
    <section class="skills" id="skills">
      <div class="skills__container">
        <div class="skills__mobile-cta">
          <a href="#portfolio" class="skills__mobile-button">
            {{ "SKILLS.GET_IN_TOUCH" | translate }}
          </a>
        </div>

        <div class="skills__grid" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
          <div class="skills__item" *ngFor="let skill of skillsList">
            <img [src]="skill.icon" [alt]="skill.name">
            <span>{{ skill.name }}</span>
          </div>
        </div>

        <div class="skills__content">
          <div class="skills__header">
            <h2 class="skills__title" [@fadeInUp]="isVisible ? 'visible' : 'void'">
              {{ "SKILLS.MY_SKILLS" | translate }}
            </h2>
          </div>

          <p class="skills__description">
            {{ "SKILLS.DESCRIPTION" | translate }}
          </p>

          <div class="skills__cta">
            <a href="#portfolio" class="skills__button">
              {{ "SKILLS.GET_IN_TOUCH" | translate }}
            </a>
          </div>
        </div>
      </div>

      <img src="assets/img/green-shadow.png" alt="" class="skills__shadow">
    </section>
  `,
    styles: [`
    .skills {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: 100vh;
      background-color: var(--color-background-primary);
    }

    .skills__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1920px;
      padding: 0 10%;
    }

    .skills__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      max-width: 500px; /* Reduziert von 600px */
      z-index: 51;
      flex-shrink: 0; /* Verhindert das Schrumpfen */
    }

    .skills__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      img {
        width: 60px;
        height: 60px;
        transition: transform 0.3s ease;

        &:hover {
          animation: skillBounce 1s linear;
        }
      }

      span {
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
        font-weight: 700;
      }
    }

    @keyframes skillBounce {
      20%, 50%, 80%, to {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      70% {
        transform: translateY(-15px);
      }
      90% {
        transform: translateY(-4px);
      }
    }

    .skills__content {
      max-width: 500px;
    }

    .skills__header {
      margin-bottom: 2rem;
    }

    .skills__title {
      font-size: 90px;
      color: var(--color-text-primary);
      margin: 0;
      position: relative;
    }

    .skills__title::after {
      content: "";
      position: absolute;
      bottom: 50%;
      left: 100%;
      transform: translateY(50%);
      width: 80px;
      height: 4px;
  background-color: var(--color-accent-secondary) !important;
      margin-left: 2rem;
    }    

    .skills__line {
      display: none;
      height: 4px;
      width: 10vw;
      
  background-color: var(--color-accent-secondary);
    }

    .skills__description {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: 2rem;
      text-align: right;
    }

    .skills__cta {
      display: flex;
      justify-content: flex-end;
    }

    .skills__button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 58px;
      background-color: var(--color-accent-secondary);
      color: var(--color-text-primary);
      border-radius: 10px;
      font-size: 23px;
      transition: all 0.3s ease;
    }

    .skills__button:hover {
      background-color: var(--color-accent-primary);
      transform: scale(1.05);
    }

    .skills__mobile-cta {
      display: none;
    }

    .skills__shadow {
      position: absolute;
      left: 0;
      top: 30%;
      z-index: 50;
    }

    @media (max-width: 1200px) {
      .skills__container {
        padding: 0 5%;
      }

      .skills__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 890px) {
      .skills__container {
        flex-direction: column-reverse;
        gap: 4rem;
        padding: 4rem 2rem;
      }

      .skills__content {
        text-align: center;
        max-width: 100%;
      }

      .skills__header {
        display: flex;
        justify-content: center;
      }

      .skills__title::after {
        display: none; /* Linie auf Tablet verstecken */
      }

      .skills__description {
        text-align: center;
      }

      .skills__cta {
        justify-content: center;
      }

      .skills__grid {
        grid-template-columns: repeat(4, 1fr);
        max-width: 100%;
      }
    }

    @media (max-width: 580px) {
      .skills__title {
        font-size: 45px;
      }

      .skills__title::after {
        display: block;
      }

      .skills__grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .skills__cta {
        display: none;
      }

      .skills__mobile-cta {
        display: block;
        margin-bottom: 2rem;
      }

      .skills__mobile-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 48px;
        background-color: var(--color-accent-secondary);
        color: var(--color-text-primary);
        border-radius: 10px;
        font-size: 18px;
        transition: all 0.3s ease;
      }

      .skills__mobile-button:hover {
        background-color: var(--color-accent-primary);
        transform: scale(1.05);
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class SkillsSectionComponent implements OnInit {
  isVisible = false;

  skillsList: Skill[] = [
    { name: 'Angular', icon: 'assets/img/skills/Angular.png' },
    { name: 'TypeScript', icon: 'assets/img/skills/typescript.png' },
    { name: 'JavaScript', icon: 'assets/img/skills/Javascript.png' },
    { name: 'HTML', icon: 'assets/img/skills/html.png' },
    { name: 'Firebase', icon: 'assets/img/skills/firebase.png' },
    { name: 'Git', icon: 'assets/img/skills/git.png' },
    { name: 'CSS', icon: 'assets/img/skills/css.png' },
    { name: 'API', icon: 'assets/img/skills/Api.png' },
    { name: 'SCRUM', icon: 'assets/img/skills/scrum.png' },
    { name: 'Material', icon: 'assets/img/skills/material.png' }
  ];

  constructor(
    private elementRef: ElementRef,
    private viewportObserver: ViewportObserverService
  ) {}

  ngOnInit(): void {
    this.viewportObserver
      .observeElement(this.elementRef.nativeElement)
      .subscribe(visible => this.isVisible = visible);
  }
}