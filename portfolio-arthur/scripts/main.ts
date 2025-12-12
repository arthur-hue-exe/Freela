// Interfaces para tipagem
interface AnimationConfig {
    duration: number;
    easing: string;
    delay?: number;
}

interface ScrollAnimationElement {
    element: HTMLElement;
    animation: string;
    threshold: number;
}

// Classe principal para gerenciar o portfólio
class Portfolio {
    private navbar: HTMLElement | null;
    private hamburger: HTMLElement | null;
    private navMenu: HTMLElement | null;
    private scrollElements: ScrollAnimationElement[] = [];
    private isMenuOpen: boolean = false;

    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupFloatingElements();
        this.setupFormAnimations();
        this.setupSmoothScrolling();
    }

    private setupEventListeners(): void {
        // Menu mobile
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());

        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Scroll da navbar
        window.addEventListener('scroll', () => this.handleNavbarScroll());

        // Animações de scroll
        window.addEventListener('scroll', () => this.handleScrollAnimations());

        // Botão CTA animado
        const ctaButton = document.getElementById('cta-button');
        ctaButton?.addEventListener('click', () => this.handleCtaClick());

        // Animações dos cards de habilidades
        this.setupSkillCardAnimations();

        // Animações dos cards de projetos
        this.setupProjectCardAnimations();

        // Formulário de contato
        this.setupContactForm();
    }

    private toggleMobileMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        this.hamburger?.classList.toggle('active');
        this.navMenu?.classList.toggle('active');
    }

    private handleNavbarScroll(): void {
        if (!this.navbar) return;

        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
    }

    private setupScrollAnimations(): void {
        const elements = document.querySelectorAll('.section-header, .about-text, .skill-card, .project-card, .contact-info, .contact-form');
        
        elements.forEach(element => {
            this.scrollElements.push({
                element: element as HTMLElement,
                animation: 'fade-in',
                threshold: 0.1
            });
        });
    }

    private handleScrollAnimations(): void {
        this.scrollElements.forEach(({ element, animation, threshold }) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    private setupCounterAnimations(): void {
        const counters = document.querySelectorAll('.stat-number');
        let animated = false;

        const animateCounters = () => {
            if (animated) return;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target') || '0');
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current).toString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toString();
                    }
                };

                updateCounter();
            });

            animated = true;
        };

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(aboutSection);
        }
    }

    private setupFloatingElements(): void {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = parseFloat(element.getAttribute('data-speed') || '1');
            
            setInterval(() => {
                const currentTransform = element.getAttribute('style') || '';
                const randomX = Math.sin(Date.now() * 0.001 * speed) * 10;
                const randomY = Math.cos(Date.now() * 0.001 * speed) * 10;
                
                (element as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 50);
        });
    }

    private setupSkillCardAnimations(): void {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateSkillCard(card as HTMLElement, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateSkillCard(card as HTMLElement, false);
            });
        });
    }

    private animateSkillCard(card: HTMLElement, isHover: boolean): void {
        const icon = card.querySelector('.skill-icon');
        
        if (isHover) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            if (icon) {
                (icon as HTMLElement).style.transform = 'scale(1.1) rotate(10deg)';
            }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            if (icon) {
                (icon as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }

    private setupProjectCardAnimations(): void {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card as HTMLElement, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card as HTMLElement, false);
            });
        });
    }

    private animateProjectCard(card: HTMLElement, isHover: boolean): void {
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        if (isHover) {
            card.style.transform = 'translateY(-5px)';
            if (overlay) {
                (overlay as HTMLElement).style.opacity = '1';
            }
            
            links.forEach((link, index) => {
                setTimeout(() => {
                    (link as HTMLElement).style.transform = 'scale(1) translateY(0)';
                }, index * 100);
            });
        } else {
            card.style.transform = 'translateY(0)';
            if (overlay) {
                (overlay as HTMLElement).style.opacity = '0';
            }
        }
    }

    private setupFormAnimations(): void {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.animateFormInput(input as HTMLElement, true);
            });

            input.addEventListener('blur', () => {
                this.animateFormInput(input as HTMLElement, false);
            });
        });
    }

    private animateFormInput(input: HTMLElement, isFocused: boolean): void {
        const formGroup = input.closest('.form-group');
        
        if (isFocused) {
            formGroup?.classList.add('focused');
            input.style.borderColor = 'var(--primary-color)';
            input.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        } else {
            formGroup?.classList.remove('focused');
            input.style.borderColor = 'var(--border-color)';
            input.style.boxShadow = 'none';
        }
    }

    private setupContactForm(): void {
        const form = document.querySelector('.contact-form');
        
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    private handleFormSubmit(): void {
        const submitButton = document.querySelector('.contact-form .btn-primary') as HTMLElement;
        
        if (submitButton) {
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.style.pointerEvents = 'none';
            
            // Simular envio
            setTimeout(() => {
                submitButton.innerHTML = '<span>Enviado!</span><i class="fas fa-check"></i>';
                submitButton.style.background = '#10b981';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.style.pointerEvents = '';
                    
                    // Limpar formulário
                    const form = document.querySelector('.contact-form') as HTMLFormElement;
                    form?.reset();
                }, 2000);
            }, 1500);
        }
    }

    private handleCtaClick(): void {
        const button = document.getElementById('cta-button');
        
        if (button) {
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                
                // Scroll suave para seção de contato
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        }
    }

    private setupSmoothScrolling(): void {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = anchor.getAttribute('href');
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = (target as HTMLElement).offsetTop - 70;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Método público para adicionar animações customizadas
    public addCustomAnimation(element: HTMLElement, animation: AnimationConfig): void {
        element.style.transition = `all ${animation.duration}ms ${animation.easing}`;
        
        if (animation.delay) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, animation.delay);
        }
    }

    // Método para criar efeito de partículas
    public createParticleEffect(container: HTMLElement, count: number = 20): void {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
            `;
            
            container.appendChild(particle);
            
            // Animar partícula
            const startX = Math.random() * container.offsetWidth;
            const startY = Math.random() * container.offsetHeight;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = startY - Math.random() * 100;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            particle.animate([
                { opacity: 0, transform: 'translate(0, 0) scale(0)' },
                { opacity: 1, transform: 'translate(0, -20px) scale(1)' },
                { opacity: 0, transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)` }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
}

// Classe para gerenciar temas (futuro)
class ThemeManager {
    private currentTheme: 'light' | 'dark' = 'light';
    
    public toggleTheme(): void {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        
        // Salvar preferência
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }
    
    public initTheme(): void {
        const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark';
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.body.setAttribute('data-theme', this.currentTheme);
        }
    }
}

// Utilitários
class Utils {
    public static debounce(func: Function, wait: number): Function {
        let timeout: NodeJS.Timeout;
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    public static throttle(func: Function, limit: number): Function {
        let inThrottle: boolean;
        return function(...args: any[]) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    public static isElementInViewport(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    const themeManager = new ThemeManager();
    
    // Inicializar tema
    themeManager.initTheme();
    
    // Adicionar elementos fade-in
    const fadeElements = document.querySelectorAll('.section-header, .about-text, .skill-card, .project-card, .contact-info, .contact-form');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Performance: usar throttle para scroll
    const throttledScroll = Utils.throttle(() => {
        portfolio['handleScrollAnimations']();
    }, 16);
    
    window.addEventListener('scroll', throttledScroll);
    
    // Adicionar efeito de loading
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remover loader se existir
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 500);
        }
    });
    
    console.log('🚀 Portfolio Arthur Alves carregado com sucesso!');
});

// Exportar para uso global se necessário
declare global {
    interface Window {
        Portfolio: typeof Portfolio;
        ThemeManager: typeof ThemeManager;
        Utils: typeof Utils;
    }
}

window.Portfolio = Portfolio;
window.ThemeManager = ThemeManager;
window.Utils = Utils;