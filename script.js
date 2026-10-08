document.addEventListener('DOMContentLoaded', () => {


    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // Custom Cursor removed for performance and usability

    // Navbar Scroll Effect (optional, adding shadow)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Staggered animation for links
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `fadeInRight 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close menu when a link is clicked
        navLinks.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    }

    // Scroll to Top Logic
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // Theme Accent Switcher Logic
    const themeBtn = document.querySelector('.theme-btn');
    const themePalette = document.querySelector('.theme-palette');
    const colorDots = document.querySelectorAll('.color-dot');

    if (themeBtn && themePalette) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themePalette.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!themeBtn.contains(e.target) && !themePalette.contains(e.target)) {
                themePalette.classList.remove('active');
            }
        });
    }

    if (colorDots.length > 0) {
        colorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const color = dot.getAttribute('data-color');
                
                if (color === 'teal') {
                    document.documentElement.removeAttribute('data-theme');
                } else {
                    document.documentElement.setAttribute('data-theme', color);
                }

                colorDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                localStorage.setItem('portfolio-theme', color);
            });
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            const activeDot = document.querySelector(`.color-dot[data-color="${savedTheme}"]`);
            if (activeDot) {
                // Remove active class from all first
                colorDots.forEach(d => d.classList.remove('active'));
                activeDot.classList.add('active');
                if (savedTheme === 'teal') {
                    document.documentElement.removeAttribute('data-theme');
                } else {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                }
            }
        }
    }

    // 3D Hover Tilt & Spotlight effect
    const tiltCards = document.querySelectorAll('.portfolio-box, .skill-category, .feature-card, .experience-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (centerY - y) / 15;
            const tiltY = (x - centerX) / 15;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Magnetic Hover Effect
    const magneticTargets = document.querySelectorAll('.magnetic-target');
    magneticTargets.forEach(target => {
        target.addEventListener('mousemove', (e) => {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            target.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        target.addEventListener('mouseleave', () => {
            target.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================
    // Full-page Mouse Spotlight Glow Tracking
    // ==========================================
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-bg-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-bg-y', `${e.clientY}px`);
    });

    // ==========================================
    // Active Nav Link Scroll Spy
    // ==========================================
    const navSections = document.querySelectorAll('header[id], section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 200;

        navSections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ==========================================
    // Project Category Filtering
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.portfolio-box');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.classList.remove('hide');
                        requestAnimationFrame(() => {
                            card.classList.remove('fade-out');
                        });
                    } else {
                        card.classList.add('fade-out');
                        setTimeout(() => {
                            if (card.classList.contains('fade-out')) {
                                card.classList.add('hide');
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    // ==========================================
    // Auto-Typing Hero Subtitle Animation
    // ==========================================
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = ["Python, Java & C#", "Modern Web Frameworks", "Object-Oriented Programming", "Scalable Database Architectures"];
        const typingSpeed = 100;
        const erasingSpeed = 60;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingSpeed + 500);
            }
        }

        setTimeout(type, 1000);
    }

    // ==========================================
    // Contact Form Validation & Submission
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const formSummary = document.getElementById('form-summary');
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.getElementById('contact-submit-btn');

        if (nameInput && emailInput && messageInput && submitBtn) {
            let hasAttemptedSubmit = false;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            function validateName() {
                const val = nameInput.value.trim();
                if (!val) {
                    return { valid: false, message: 'Full name is required.' };
                }
                if (val.length < 2) {
                    return { valid: false, message: 'Name must be at least 2 characters.' };
                }
                return { valid: true };
            }

            function validateEmail() {
                const val = emailInput.value.trim();
                if (!val) {
                    return { valid: false, message: 'Email address is required.' };
                }
                if (!emailPattern.test(val)) {
                    return { valid: false, message: 'Please enter a valid email address.' };
                }
                return { valid: true };
            }

            function validateMessage() {
                const val = messageInput.value.trim();
                if (!val) {
                    return { valid: false, message: 'Message is required.' };
                }
                if (val.length < 10) {
                    return { valid: false, message: 'Message must be at least 10 characters.' };
                }
                return { valid: true };
            }

            function setFieldError(field, errorEl, message) {
                field.classList.add('input-error');
                field.setAttribute('aria-invalid', 'true');
                if (errorEl) {
                    field.setAttribute('aria-describedby', errorEl.id);
                    errorEl.textContent = message;
                    errorEl.classList.add('visible');
                }
            }

            function clearFieldError(field, errorEl) {
                field.classList.remove('input-error');
                field.removeAttribute('aria-invalid');
                field.removeAttribute('aria-describedby');
                if (errorEl) {
                    errorEl.textContent = '';
                    errorEl.classList.remove('visible');
                }
            }

            function updateLiveField(field, validator, errorEl) {
                if (!hasAttemptedSubmit) return;
                const res = validator();
                if (res.valid) {
                    clearFieldError(field, errorEl);
                } else {
                    setFieldError(field, errorEl, res.message);
                }

                const allValid = validateName().valid && validateEmail().valid && validateMessage().valid;
                if (allValid && formSummary) {
                    formSummary.classList.remove('visible');
                }
            }

            nameInput.addEventListener('input', () => updateLiveField(nameInput, validateName, nameError));
            emailInput.addEventListener('input', () => updateLiveField(emailInput, validateEmail, emailError));
            messageInput.addEventListener('input', () => updateLiveField(messageInput, validateMessage, messageError));

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                hasAttemptedSubmit = true;

                // Reset previous status banner
                if (formStatus) {
                    formStatus.className = 'form-status-msg';
                    formStatus.textContent = '';
                    formStatus.style.display = 'none';
                }

                const nameRes = validateName();
                const emailRes = validateEmail();
                const msgRes = validateMessage();

                let firstInvalid = null;

                if (!nameRes.valid) {
                    setFieldError(nameInput, nameError, nameRes.message);
                    if (!firstInvalid) firstInvalid = nameInput;
                } else {
                    clearFieldError(nameInput, nameError);
                }

                if (!emailRes.valid) {
                    setFieldError(emailInput, emailError, emailRes.message);
                    if (!firstInvalid) firstInvalid = emailInput;
                } else {
                    clearFieldError(emailInput, emailError);
                }

                if (!msgRes.valid) {
                    setFieldError(messageInput, messageError, msgRes.message);
                    if (!firstInvalid) firstInvalid = messageInput;
                } else {
                    clearFieldError(messageInput, messageError);
                }

                if (firstInvalid) {
                    if (formSummary) formSummary.classList.add('visible');
                    firstInvalid.focus();
                    return;
                }

                if (formSummary) formSummary.classList.remove('visible');

                // Disable button & indicate sending state
                submitBtn.disabled = true;
                const originalBtnHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

                const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
                const accessKeyValue = accessKeyInput ? accessKeyInput.value : 'e0c8f085-3d80-4c2c-9833-82440efc3d32';

                const payload = {
                    access_key: accessKeyValue,
                    from_name: 'Portfolio Contact',
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim(),
                    subject: 'New message from portfolio contact form'
                };

                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const data = await response.json();

                    if (response.ok && data && data.success) {
                        if (formStatus) {
                            formStatus.className = 'form-status-msg status-success';
                            formStatus.style.display = 'flex';
                            formStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Message sent successfully! I\'ll get back to you soon.</span>';
                        }

                        contactForm.reset();
                        hasAttemptedSubmit = false;
                        clearFieldError(nameInput, nameError);
                        clearFieldError(emailInput, emailError);
                        clearFieldError(messageInput, messageError);
                        if (formSummary) formSummary.classList.remove('visible');
                    } else {
                        if (formStatus) {
                            formStatus.className = 'form-status-msg status-error';
                            formStatus.style.display = 'flex';
                            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Something went wrong while sending your message. Please try again.</span>';
                        }
                    }
                } catch (err) {
                    if (formStatus) {
                        formStatus.className = 'form-status-msg status-error';
                        formStatus.style.display = 'flex';
                        formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Something went wrong while sending your message. Please try again.</span>';
                    }
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            });
        }
    }
});

// Skill Detail Modal Logic
(function () {
    console.log("Initializing Skill Modal Logic...");

    const skillData = {
        "C#": "I explore game development using C#, applying OOP principles to design interactive and performance-optimized experiences, particularly using engines like Unity.",
        "Python": "I utilize Python for automation, data analysis, and backend development, focusing on writing clean, efficient, and scalable scripts.",
        "Java": "I leverage Java to build robust cross-platform applications, applying strong Object-Oriented Programming (OOP) principles for maintainability.",
        "JavaScript (ES6+)": "I use modern JavaScript (ES6+) to create dynamic, interactive frontend experiences, ensuring seamless user interactions.",
        "Node.js": "I build scalable and efficient server-side applications using Node.js, focusing on event-driven, non-blocking I/O models.",
        "HTML/CSS": "With my strong CSS skills, I can style websites to be visually appealing, ensuring they are responsive and perform well across various devices. I structure web content effectively using semantic HTML.",
        "HTML": "I have a solid understanding of HTML, enabling me to structure web content effectively and create well-organized, semantic web pages.",
        "SQL": "I design and query relational databases with SQL, ensuring data integrity and optimizing retrieval for efficient performance.",
        "PostgreSQL": "I design and manage robust relational database systems with PostgreSQL, optimizing queries and structuring database schemas for reliability.",
        "MS SQL Server": "I design schemas, write complex stored procedures, and manage database performance with Microsoft SQL Server.",
        "Oracle DB": "I work with Oracle Database systems, managing tablespaces, users, schemas, and implementing database security and constraints.",
        "SQL Queries": "I write and optimize advanced SQL queries involving complex joins, subqueries, CTEs, window functions, and indexing for high performance.",
        "MySQL": "I use MySQL for building relational database schemas, handling transactions, and integrating backend databases with application layers.",
        "PL/SQL": "I write procedural database code using Oracle PL/SQL, including stored procedures, functions, packages, and database triggers.",
        "Linux Command Line": "Proficient in using the Linux terminal for file manipulation, system administration, process management, and automating tasks.",
        "Bash Scripting": "I write shell scripts to automate repetitive system tasks, configure environments, and orchestrate basic deployment workflows.",
        ".NET Core": "I build modern, high-performance web APIs and applications using .NET Core and ASP.NET to deliver scalable solutions.",
        "ASP.NET MVC": "I build dynamic, structured enterprise web applications using the ASP.NET MVC framework with C# and the .NET ecosystem.",
        "Visual Studio": "I expertly use Visual Studio for efficient code editing, debugging, and managing complex project lifecycles.",
        "Git & GitHub": "I manage version control effectively using Git and GitHub, facilitating smooth collaboration and code history tracking.",
        "React": "I build component-based user interfaces with React, creating fast single-page applications with reusable stateful components.",
        "Django": "I develop secure and maintainable web applications using the Django framework, adhering to best practices and MVC/MVT architecture.",
        "Docker": "I use Docker to containerize applications, ensuring consistent deployment environments across development and production.",
        "Data Structures": "I apply Data Structures effectively to optimize code performance and solve complex computational problems.",
        "Algorithms": "I analyze and implement efficient algorithms for sorting, searching, and pathfinding to enhance application logic.",
        "Design and Analysis of Algorithms": "I analyze computational complexity and design efficient algorithms to solve complex programming and logical problems.",
        "OOP": "I apply Object-Oriented Programming concepts like Inheritance, Polymorphism, and Encapsulation to write modular and reusable code.",
        "System Design": "I apply system design principles to create scalable, maintainable, and reliable software architectures.",
        "Software Architecture": "I design system architectures with clean separation of layers, focusing on scalability, security, and component decoupling.",
        "Software Design Patterns": "I apply creational, structural, and behavioral design patterns to solve common software design challenges with reusable solutions.",
        "Software Design Principles": "I follow clean code principles, SOLID design guidelines, and separation of concerns to write highly maintainable codebases.",
        "Requirement Elicitation": "I gather and analyze software requirements meticulously to ensure project goals align with user needs.",
        "Requriment Elicitation": "I gather and analyze software requirements meticulously to ensure project goals align with user needs.", /* Typo Fallback */
        "Digital Logic and Design": "I apply knowledge of digital logic circuits to bridge the gap between hardware and software integration.",
        // ByteCorp Traineeship Skills
        "Django REST Framework": "I build robust, decoupled RESTful APIs using Django REST Framework, implementing serializers, viewsets, filters, pagination, and permission classes.",
        "REST API Design": "I architect clean, resource-oriented RESTful endpoints adhering to HTTP standards, idempotent methods, clear status codes, and consistent JSON payload schemas.",
        "JWT Authentication": "I implement stateless JSON Web Token (JWT) authentication flows with access/refresh token rotation, secure cookie handling, and route protection.",
        "Google OAuth": "I integrate OAuth 2.0 social authentication with Google, enabling secure third-party login, token validation, and automated user profile sync.",
        "Database Schema Design (ERD, normalization, indexing)": "I design 3NF normalized relational database schemas with clear Entity Relationship Diagrams (ERDs), foreign key constraints, and performance indexes.",
        "Database Schema Design": "I design 3NF normalized relational database schemas with clear Entity Relationship Diagrams (ERDs), foreign key constraints, and performance indexes.",
        "Multi-database routing": "I configure dual/multi-database routing architectures in Django to decouple high-volume transactional workloads or request logs from the primary application DB.",
        "React 19": "I develop responsive, component-driven web applications leveraging modern React 19 features, hooks, concurrent state management, and optimized rendering.",
        "Vite": "I use Vite as a next-generation frontend build tool for lightning-fast HMR development server performance and optimized production asset bundling.",
        "Tailwind CSS v4": "I craft modern, highly customizable responsive interfaces using Tailwind CSS v4 utility-first classes, CSS variables, and modern styling tokens.",
        "TanStack Query": "I manage server state and asynchronous data fetching using TanStack Query (React Query) with automated caching, background refetching, and optimistic updates.",
        "Payload CMS": "I integrate Payload CMS 3 as a type-safe headless CMS, structuring custom collections, access control, and dynamic content delivery.",
        "Next.js": "I build fullstack and server-rendered web applications with Next.js App Router, server components, API routes, and optimized image/asset loading.",
        "Postman API Testing": "I design comprehensive Postman collections, environment variables, automated test scripts, and pre-request scripts for full API contract validation.",
        "Structured Logging and Observability": "I implement structured JSON request/response logging middleware to track API latency, status codes, user IPs, and payload metadata in a dedicated log database.",
        "Role-Based Access Control": "I engineer granular RBAC permissions models (Admin, Company Representative, Job Seeker) ensuring secure route and resource isolation.",
        "Technical Documentation (SRS)": "I author formal Software Requirements Specifications (SRS), architectural diagrams, API references, and deployment guides."
    };

    const skillItems = document.querySelectorAll('.skill-item');
    const modal = document.getElementById('skillModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = document.getElementById('closeModalBtn');
    const modalIcon = document.getElementById('modalIcon');

    if (!modal) {
        console.error("Skill Modal ID 'skillModal' not found!");
        return;
    }

    if (skillItems.length === 0) {
        console.warn("No .skill-item elements found!");
    }

    // click handler function
    const openModal = (skillName) => {
        if (!modalTitle || !modalDesc) return;

        modalTitle.innerText = skillName;
        // Use data or fallback
        const desc = skillData[skillName] || skillData[Object.keys(skillData).find(k => k.includes(skillName))] || `Expertise in ${skillName}.`;
        modalDesc.innerText = desc;

        // Show
        modal.classList.add('active');
    };

    skillItems.forEach(item => {
        item.style.cursor = 'pointer';
        // Remove old listeners (not easily possible without named function, but safe to add new one)
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues
            const skillName = item.innerText.trim();
            console.log("Clicked skill:", skillName);
            openModal(skillName);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

})();


