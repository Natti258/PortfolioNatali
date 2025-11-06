/* ========================================
   📄 ФАЙЛ: carousel.js
   📂 РАСПОЛОЖЕНИЕ: portfolio-website/js/carousel.js
   🎯 ЭТО: Вертикальная карусель для портфолио
   
   ИНСТРУКЦИЯ:
   1. Создайте файл carousel.js в папке js/
   2. Скопируйте весь этот код
   3. Вставьте и сохраните
   
   ПРИМЕЧАНИЕ: Этот файл используется на странице work.html
========================================= */

// ========== ВЕРТИКАЛЬНАЯ КАРУСЕЛЬ ПОРТФОЛИО ==========

class PortfolioCarousel {
    constructor() {
        this.currentIndex = 0;
        this.projects = [];
        this.container = document.querySelector('.portfolio-container');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentCategory = 'all';
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        this.loadProjects();
        this.renderProjects();
        this.initFilters();
        this.initScroll();
        this.initKeyboardNav();
    }
    
    // Загрузка данных проектов
    loadProjects() {
        // Здесь данные проектов (позже можно загрузить из JSON)
        this.projects = [
            {
                id: 1,
                category: 'web',
                title: {
                    en: 'E-commerce Fashion Store',
                    de: 'E-Commerce Fashion Store',
                    ru: 'E-commerce магазин моды'
                },
                type: 'UX/UI • E-commerce',
                description: {
                    en: 'Redesign of a fashion e-commerce platform focused on usability and accessibility.',
                    de: 'Neugestaltung einer Mode-E-Commerce-Plattform mit Fokus auf Usability und Zugänglichkeit.',
                    ru: 'Редизайн модной e-commerce платформы с фокусом на юзабилити и доступность.'
                },
                image: 'images/projects/ecommerce.jpg',
                color: '#FF6B35'
            },
            {
                id: 2,
                category: 'web',
                title: {
                    en: 'Language School Website',
                    de: 'Sprachschule Website',
                    ru: 'Сайт языковой школы'
                },
                type: 'UX/UI • Web Design',
                description: {
                    en: "Modern language school website for Bavaria's international information architecture.",
                    de: 'Moderne Sprachschul-Website mit internationaler Informationsarchitektur.',
                    ru: 'Современный сайт языковой школы с международной информационной архитектурой.'
                },
                image: 'images/projects/language-school.jpg',
                color: '#4169E1'
            },
            {
                id: 3,
                category: 'web',
                title: {
                    en: 'Banking App Interface',
                    de: 'Banking-App-Interface',
                    ru: 'Интерфейс банковского приложения'
                },
                type: 'Mobile App • FinTech',
                description: {
                    en: 'Complete UX/UI design for mobile banking focusing on security and ease of use.',
                    de: 'Komplettes UX/UI-Design für Mobile Banking mit Fokus auf Sicherheit und Benutzerfreundlichkeit.',
                    ru: 'Полный UX/UI дизайн мобильного банкинга с фокусом на безопасность и простоту использования.'
                },
                image: 'images/projects/banking-app.jpg',
                color: '#00C9A7'
            },
            {
                id: 4,
                category: 'graphic',
                title: {
                    en: 'Brand Identity Collection',
                    de: 'Markenidentitäts-Kollektion',
                    ru: 'Коллекция фирменного стиля'
                },
                type: 'Branding • Logo Design',
                description: {
                    en: 'Logo designs and brand identities for various clients and social projects.',
                    de: 'Logo-Designs und Markenidentitäten für verschiedene Kunden und soziale Projekte.',
                    ru: 'Дизайн логотипов и фирменного стиля для различных клиентов и социальных проектов.'
                },
                image: 'images/projects/branding.jpg',
                color: '#FFD700'
            },
            {
                id: 5,
                category: 'graphic',
                title: {
                    en: 'Print Design Collection',
                    de: 'Print-Design-Kollektion',
                    ru: 'Коллекция печатного дизайна'
                },
                type: 'Print • Flyers • Posters',
                description: {
                    en: 'Collection of print materials for events, campaigns, and social initiatives.',
                    de: 'Sammlung von Printmaterialien für Veranstaltungen, Kampagnen und soziale Initiativen.',
                    ru: 'Коллекция печатных материалов для мероприятий, кампаний и социальных инициатив.'
                },
                image: 'images/projects/print.jpg',
                color: '#FF1493'
            }
        ];
    }
    
    // Рендеринг проектов
    renderProjects() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        const filteredProjects = this.currentCategory === 'all' 
            ? this.projects 
            : this.projects.filter(p => p.category === this.currentCategory);
        
        filteredProjects.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            this.container.appendChild(card);
        });
        
        // Инициализируем анимации для новых карточек
        this.initCardAnimations();
    }
    
    // Создание карточки проекта
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.index = index;
        card.dataset.category = project.category;
        
        const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
        
        card.innerHTML = `
            <div class="card-number">${String(index + 1).padStart(2, '0')}</div>
            <div class="card-image" style="background-image: url('${project.image}'); background-color: ${project.color};">
                <div class="card-blur"></div>
            </div>
            <div class="card-content">
                <span class="card-category">${project.type}</span>
                <h2 class="card-title">${project.title[currentLang]}</h2>
                <p class="card-description">${project.description[currentLang]}</p>
                <a href="project-detail.html?id=${project.id}" class="btn-view-project">
                    View Project →
                </a>
            </div>
        `;
        
        // Добавляем blur эффект при движении мыши
        this.addBlurEffect(card);
        
        return card;
    }
    
    // Blur эффект следует за курсором
    addBlurEffect(card) {
        const cardBlur = card.querySelector('.card-blur');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (cardBlur) {
                cardBlur.style.left = x + 'px';
                cardBlur.style.top = y + 'px';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (cardBlur) {
                cardBlur.style.left = '50%';
                cardBlur.style.top = '50%';
            }
        });
    }
    
    // Инициализация анимаций карточек
    initCardAnimations() {
        const cards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Фильтры категорий
    initFilters() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убираем active у всех
                this.filterButtons.forEach(b => b.classList.remove('active'));
                // Добавляем active к нажатой
                btn.classList.add('active');
                
                // Получаем категорию
                this.currentCategory = btn.dataset.category;
                
                // Перерендериваем проекты
                this.renderProjects();
            });
        });
    }
    
    // Scroll эффект (stacking)
    initScroll() {
        const cards = document.querySelectorAll('.project-card');
        
        window.addEventListener('scroll', () => {
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const scrollProgress = 1 - (rect.top / window.innerHeight);
                
                // Stacking эффект
                if (scrollProgress > 0 && scrollProgress < 1) {
                    const scale = 0.9 + (scrollProgress * 0.1);
                    const translateY = (1 - scrollProgress) * 50;
                    
                    card.style.transform = `scale(${Math.max(scale, 0.9)}) translateY(${translateY}px)`;
                    card.style.opacity = Math.max(0.5, scrollProgress);
                } else if (scrollProgress >= 1) {
                    card.style.transform = 'scale(1) translateY(0)';
                    card.style.opacity = '1';
                }
            });
        });
    }
    
    // Навигация с клавиатуры
    initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            const cards = document.querySelectorAll('.project-card');
            
            if (e.key === 'ArrowDown' && this.currentIndex < cards.length - 1) {
                this.currentIndex++;
                this.scrollToCard(this.currentIndex);
            } else if (e.key === 'ArrowUp' && this.currentIndex > 0) {
                this.currentIndex--;
                this.scrollToCard(this.currentIndex);
            }
        });
    }
    
    // Прокрутка к карточке
    scrollToCard(index) {
        const cards = document.querySelectorAll('.project-card');
        const card = cards[index];
        
        if (card) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const cardTop = card.offsetTop - navHeight - 40;
            
            window.scrollTo({
                top: cardTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Обновление языка
    updateLanguage(lang) {
        this.renderProjects();
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Создаём экземпляр карусели только на странице портфолио
    if (document.querySelector('.portfolio-container')) {
        window.portfolioCarousel = new PortfolioCarousel();
        
        // Слушаем смену языка
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (window.portfolioCarousel) {
                    window.portfolioCarousel.updateLanguage(lang);
                }
            });
        });
    }
});

// ========== ЭКСПОРТ ==========
window.PortfolioCarousel = PortfolioCarousel;
