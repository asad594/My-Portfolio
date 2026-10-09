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

    // 3D Hover Tilt & Spotlight effect (excluding .skill-category to prevent tilting)
    const tiltCards = document.querySelectorAll('.portfolio-box, .feature-card, .experience-card');
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

    // Spotlight effect for skill cards (mouse glow without 3D tilt)
    const skillSpotlightCards = document.querySelectorAll('.skill-category');
    skillSpotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
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
    // Auto-Typing Hero Subtitle Animation (Single-Line Architecture)
    // ==========================================
    const subtitleEl = document.getElementById('heroSubtitle') || document.querySelector('.subtitle');
    const heroRoleLine = subtitleEl ? subtitleEl.querySelector('.hero-role-line') : null;
    const heroRoleStatic = subtitleEl ? subtitleEl.querySelector('.hero-role-static') : null;
    const heroRoleTyped = subtitleEl ? subtitleEl.querySelector('.hero-role-typed') : null;

    if (subtitleEl && heroRoleLine && heroRoleTyped) {
        let typedVisible = heroRoleTyped.querySelector('.typed-visible');
        let typedCursor = heroRoleTyped.querySelector('.typed-cursor');

        // Ensure sub-elements exist
        if (!typedVisible) {
            typedVisible = document.createElement('span');
            typedVisible.className = 'typed-visible';
            heroRoleTyped.prepend(typedVisible);
        }
        if (!typedCursor) {
            typedCursor = document.createElement('span');
            typedCursor.className = 'typed-cursor';
            typedCursor.setAttribute('aria-hidden', 'true');
            heroRoleTyped.appendChild(typedCursor);
        }

        // Clean up any obsolete typed-remaining elements
        const oldRemaining = heroRoleTyped.querySelector('.typed-remaining');
        if (oldRemaining) oldRemaining.remove();

        const phrases = [
            {
                full: "Python, Java & C#",
                short: "Python, Java, C#",
                tiny: "Python & Java"
            },
            {
                full: "Modern Web Frameworks",
                short: "Web Frameworks",
                tiny: "Web Frameworks"
            },
            {
                full: "Object-Oriented Programming",
                short: "OOP",
                tiny: "OOP"
            },
            {
                full: "Scalable Database Architectures",
                short: "Scalable Databases",
                tiny: "Scalable DBs"
            }
        ];

        let activePhrases = phrases.map(p => p.full);
        const typingSpeed = 100;
        const erasingSpeed = 60;
        const newTextDelay = 2000;
        const nextPhraseDelay = typingSpeed + 500;
        let textArrayIndex = 0;
        let charIndex = 0;
        let typingTimeout = null;
        let currentFontSizePx = 28;

        // Off-screen measuring span for Auto-Fitting Single Line
        let measureSpan = document.getElementById('heroRoleMeasure');
        if (!measureSpan) {
            measureSpan = document.createElement('span');
            measureSpan.id = 'heroRoleMeasure';
            measureSpan.setAttribute('aria-hidden', 'true');
            document.body.appendChild(measureSpan);
        }

        function getPhraseRatio(phrase) {
            measureSpan.style.fontSize = '100px';
            measureSpan.innerHTML = `<span class="hero-role-static" style="font-weight:600;">I specialize in </span><span class="hero-role-typed" style="font-weight:700;">${phrase}</span>`;
            const textWidth100 = measureSpan.getBoundingClientRect().width;
            // Add cursor width (3px) and margin gap (0.45ch at 100px ~= 25px) at reference 100px
            const cursorExtra100 = 28;
            return (textWidth100 + cursorExtra100) / 100;
        }

        function fitHeroSingleLine() {
            if (!heroRoleLine || !subtitleEl) return;

            // Measure column content width
            const column = subtitleEl.closest('.hero-content') || subtitleEl.parentElement || subtitleEl;
            const colRect = column.getBoundingClientRect();
            const colStyle = window.getComputedStyle(column);
            const colPadding = (parseFloat(colStyle.paddingLeft) || 0) + (parseFloat(colStyle.paddingRight) || 0);
            const availableColumnWidth = colRect.width - colPadding;
            if (availableColumnWidth <= 0) return;

            const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
            const minFontSizePx = 1.15 * rootFontSize; // Exactly 1.15rem (~18.4px)
            const maxFontSizePx = 1.75 * rootFontSize; // Current desktop heading size (~28px)

            // Configure measuring span font styling identical to heading
            const computedLine = window.getComputedStyle(heroRoleLine);
            measureSpan.style.fontFamily = computedLine.fontFamily;
            measureSpan.style.letterSpacing = computedLine.letterSpacing;
            measureSpan.style.whiteSpace = 'nowrap';
            measureSpan.style.display = 'inline-block';
            measureSpan.style.boxSizing = 'content-box';

            // Select variant for each phrase (full, short, or tiny if needed)
            const chosenVariants = [];
            for (let i = 0; i < phrases.length; i++) {
                const item = phrases[i];
                const fullRatio = getPhraseRatio(item.full);
                const fullMaxFont = availableColumnWidth / fullRatio;

                if (fullMaxFont >= minFontSizePx) {
                    chosenVariants.push({ text: item.full, ratio: fullRatio });
                } else {
                    const shortRatio = getPhraseRatio(item.short);
                    const shortMaxFont = availableColumnWidth / shortRatio;
                    if (shortMaxFont >= minFontSizePx || !item.tiny) {
                        chosenVariants.push({ text: item.short, ratio: shortRatio });
                    } else {
                        const tinyRatio = getPhraseRatio(item.tiny);
                        chosenVariants.push({ text: item.tiny, ratio: tinyRatio });
                    }
                }
            }

            activePhrases = chosenVariants.map(v => v.text);

            // Calculate ONE constant font-size for the whole heading
            let smallestMaxFont = Infinity;
            for (let i = 0; i < chosenVariants.length; i++) {
                const maxFont = availableColumnWidth / chosenVariants[i].ratio;
                if (maxFont < smallestMaxFont) {
                    smallestMaxFont = maxFont;
                }
            }

            currentFontSizePx = Math.max(minFontSizePx, Math.min(maxFontSizePx, smallestMaxFont));

            // Apply constant font-size and stable single-line height
            subtitleEl.style.fontSize = `${currentFontSizePx}px`;
            subtitleEl.style.lineHeight = '1.3';
            const fixedLineHeight = Math.ceil(currentFontSizePx * 1.3);
            subtitleEl.style.minHeight = `${fixedLineHeight}px`;

            updateLineWidth();
        }

        window.fitHeroSingleLine = fitHeroSingleLine;
        window.getActiveHeroPhrases = () => activePhrases;

        function updateLineWidth() {
            if (!heroRoleLine || activePhrases.length === 0) return;
            const currentFullPhrase = activePhrases[textArrayIndex] || activePhrases[0];
            measureSpan.style.fontSize = `${currentFontSizePx}px`;
            measureSpan.innerHTML = `<span class="hero-role-static" style="font-weight:600;">I specialize in </span><span class="hero-role-typed" style="font-weight:700;">${currentFullPhrase}</span>`;
            const fullWidth = Math.ceil(measureSpan.getBoundingClientRect().width);
            heroRoleLine.style.setProperty('--line-width', `${fullWidth}px`);
            subtitleEl.style.setProperty('--line-width', `${fullWidth}px`);
        }

        function updatePhraseDisplay() {
            const currentPhrase = activePhrases[textArrayIndex] || activePhrases[0];
            typedVisible.textContent = currentPhrase.substring(0, charIndex);
            subtitleEl.setAttribute('aria-label', `I specialize in ${currentPhrase}`);
        }

        // Set initial phrase state and fit immediately
        charIndex = 0;
        fitHeroSingleLine();
        updatePhraseDisplay();

        // Recalculate after web fonts finish loading
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                fitHeroSingleLine();
                updatePhraseDisplay();
            });
        }

        // Debounced resize handler (~150ms)
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                fitHeroSingleLine();
                updatePhraseDisplay();
            }, 150);
        });

        // Recalculate on mobile orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                fitHeroSingleLine();
                updatePhraseDisplay();
            }, 150);
        });

        // Respect prefers-reduced-motion: show first phrase statically without animation
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            charIndex = activePhrases[0].length;
            updateLineWidth();
            updatePhraseDisplay();
            if (typedCursor) {
                typedCursor.style.display = 'none';
            }
            return;
        }

        function setTypingTimeout(fn, delay) {
            if (typingTimeout) clearTimeout(typingTimeout);
            typingTimeout = setTimeout(fn, delay);
        }

        function type() {
            const currentPhrase = activePhrases[textArrayIndex] || activePhrases[0];
            if (charIndex === 0) {
                updateLineWidth();
            }
            if (charIndex < currentPhrase.length) {
                charIndex++;
                updatePhraseDisplay();
                setTypingTimeout(type, typingSpeed);
            } else {
                setTypingTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            const currentPhrase = activePhrases[textArrayIndex] || activePhrases[0];
            if (charIndex > 0) {
                charIndex--;
                updatePhraseDisplay();
                setTypingTimeout(erase, erasingSpeed);
            } else {
                textArrayIndex = (textArrayIndex + 1) % activePhrases.length;
                charIndex = 0;
                updateLineWidth();
                updatePhraseDisplay();
                setTypingTimeout(type, nextPhraseDelay);
            }
        }

        // Start typing after initial delay
        setTypingTimeout(type, 1000);
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

    // Skills Section Category Filtering
    const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillsGrid = document.querySelector('.skills-grid');
    const skillCards = document.querySelectorAll('.skill-category');

    if (skillTabBtns.length > 0 && skillCards.length > 0) {
        let filterTransitionTimeout = null;

        const applyFilter = (filter) => {
            if (filterTransitionTimeout) {
                clearTimeout(filterTransitionTimeout);
                filterTransitionTimeout = null;
            }

            const isAll = (filter === 'all');

            // Toggle single-card centered row state on container
            if (skillsGrid) {
                if (!isAll) {
                    skillsGrid.classList.add('is-filtered');
                } else {
                    skillsGrid.classList.remove('is-filtered');
                }
                // Ensure skills grid is visible if scroll-reveal hasn't triggered yet
                skillsGrid.classList.add('visible');
            }

            // Update tab button states and aria attributes
            skillTabBtns.forEach(btn => {
                const isActive = (btn.getAttribute('data-filter') === filter);
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            // Card visibility and transitions
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const matches = isAll || (category === filter);

                if (matches) {
                    // Force visible state so scroll-reveal doesn't leave card hidden
                    card.classList.add('visible');

                    if (card.classList.contains('hide')) {
                        // Pre-set fade-out before removing hide so it smoothly transitions in
                        card.classList.add('fade-out');
                        card.classList.remove('hide');
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                card.classList.remove('fade-out');
                            });
                        });
                    } else {
                        card.classList.remove('fade-out');
                    }
                } else {
                    // Fade out non-matching cards
                    card.classList.add('fade-out');
                }
            });

            // After CSS transition completes (~280ms), remove non-matching cards from layout
            filterTransitionTimeout = setTimeout(() => {
                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const matches = isAll || (category === filter);
                    if (!matches) {
                        card.classList.add('hide');
                    }
                });
                filterTransitionTimeout = null;
            }, 280);
        };

        // Attach click listeners to tabs
        skillTabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter') || 'all';
                applyFilter(filter);
            });

            // Keyboard accessibility: Left/Right Arrow, Home/End navigation
            btn.addEventListener('keydown', (e) => {
                let targetIdx = null;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    targetIdx = (index + 1) % skillTabBtns.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    targetIdx = (index - 1 + skillTabBtns.length) % skillTabBtns.length;
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    targetIdx = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    targetIdx = skillTabBtns.length - 1;
                }

                if (targetIdx !== null) {
                    skillTabBtns[targetIdx].focus();
                    skillTabBtns[targetIdx].click();
                }
            });
        });
    }

    // ==========================================
    // Hero Interactive Timeline Component
    // ==========================================
    const heroTimeline = document.getElementById('heroTimeline');
    if (heroTimeline) {
        const items = Array.from(heroTimeline.querySelectorAll('.hero-timeline-item'));
        const progressLine = document.getElementById('heroTimelineProgress');
        const track = heroTimeline.querySelector('.hero-timeline-track');
        let activeIndex = 0;
        let isUserInteracting = false;
        let introTimer = null;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function updateProgress(index) {
            if (!items[index] || !progressLine || !track) return;
            const trackRect = track.getBoundingClientRect();
            const marker = items[index].querySelector('.timeline-marker');
            if (!marker) return;
            const markerRect = marker.getBoundingClientRect();
            // Calculate distance from top of track to center of active marker
            const targetHeight = Math.max(0, (markerRect.top + markerRect.height / 2) - trackRect.top);
            progressLine.style.height = `${targetHeight}px`;
        }

        function setActivePoint(index, userTriggered = false) {
            if (index < 0 || index >= items.length) return;
            if (userTriggered) {
                isUserInteracting = true;
                if (introTimer) {
                    clearTimeout(introTimer);
                    introTimer = null;
                }
                // Ensure all items are fully visible if user interacted early
                items.forEach(el => {
                    el.style.opacity = '';
                    el.style.transform = '';
                });
            }

            activeIndex = index;
            items.forEach((item, i) => {
                const marker = item.querySelector('.timeline-marker');
                if (i === index) {
                    item.classList.add('active-item');
                    if (marker) marker.classList.add('active-marker');
                } else {
                    item.classList.remove('active-item');
                    if (marker) marker.classList.remove('active-marker');
                }
            });
            updateProgress(index);
        }

        // Attach events: hover, click, keyboard focus and Enter/Space activation
        items.forEach((item, idx) => {
            item.addEventListener('mouseenter', () => setActivePoint(idx, true));
            item.addEventListener('click', () => setActivePoint(idx, true));
            item.addEventListener('focus', () => setActivePoint(idx, true));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePoint(idx, true);
                }
            });
        });

        // Window resize adjusts progress line height
        window.addEventListener('resize', () => {
            updateProgress(activeIndex);
        });

        // Initialize progress line on load
        requestAnimationFrame(() => {
            updateProgress(0);
        });

        // Entrance stagger and step-through sequence
        if (!prefersReducedMotion) {
            // Initially prepare items for staggered reveal
            items.forEach((item) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                item.style.transition = 'opacity 0.35s ease, transform 0.35s ease, color 0.3s ease';
            });

            let currentStep = 0;
            const stepInterval = 280; // ms per step

            const runIntro = () => {
                if (isUserInteracting) return;

                if (currentStep < items.length) {
                    items[currentStep].style.opacity = '';
                    items[currentStep].style.transform = '';
                    setActivePoint(currentStep, false);
                    currentStep++;
                    introTimer = setTimeout(runIntro, stepInterval);
                } else {
                    // All points revealed; end with all points readable and settle on first point
                    items.forEach((item) => {
                        item.style.opacity = '';
                        item.style.transform = '';
                    });
                    introTimer = setTimeout(() => {
                        if (!isUserInteracting) {
                            setActivePoint(0, false);
                        }
                    }, 400);
                }
            };

            // Start intro sequence after hero fade-in animation starts
            introTimer = setTimeout(runIntro, 600);
        } else {
            // Respect reduced motion: no animations/stagger, all points visible immediately
            items.forEach((item) => {
                item.style.opacity = '';
                item.style.transform = '';
            });
            setActivePoint(0, false);
        }

        // Scroll activation via IntersectionObserver / scroll spy
        if ('IntersectionObserver' in window) {
            const pointObserver = new IntersectionObserver((entries) => {
                if (isUserInteracting) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isUserInteracting) {
                        const idx = parseInt(entry.target.getAttribute('data-index'), 10);
                        if (!isNaN(idx)) {
                            setActivePoint(idx, false);
                        }
                    }
                });
            }, {
                root: null,
                rootMargin: '-20% 0px -40% 0px',
                threshold: 0.5
            });

            items.forEach((item) => pointObserver.observe(item));
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

/* PROJECTS-LAYOUT START */
(function initProjectsLayout() {
    function setup() {
        const projectsGrid = document.getElementById('projects-grid') || document.querySelector('.portfolio-container');
        const showMoreBtn = document.getElementById('projectsShowMoreBtn');
        const showMoreWrapper = document.querySelector('.projects-showmore-wrapper');
        const filterBtns = document.querySelectorAll('.filter-btn');

        if (!projectsGrid) return;

        const allCards = Array.from(projectsGrid.querySelectorAll('.portfolio-box'));
        if (allCards.length === 0) return;

        // 1. Setup compact cards: Tech tag overflow, description title, and bottom links
        allCards.forEach(card => {
            // Description title attribute for accessibility
            const desc = card.querySelector('.portfolio-info p');
            if (desc && !desc.getAttribute('title')) {
                desc.setAttribute('title', desc.textContent.trim());
            }

            // Tech tags single-row with +N pill if > 4 tags
            const tagsContainer = card.querySelector('.project-tags');
            if (tagsContainer) {
                const tags = Array.from(tagsContainer.querySelectorAll('.project-tag:not(.tag-more-pill)'));
                if (tags.length > 4) {
                    const extraTags = tags.slice(4);
                    extraTags.forEach(tag => tag.classList.add('tag-hidden-extra'));
                    const hiddenNames = extraTags.map(t => t.textContent.trim()).join(', ');
                    
                    let morePill = tagsContainer.querySelector('.tag-more-pill');
                    if (!morePill) {
                        morePill = document.createElement('span');
                        morePill.className = 'project-tag tag-more-pill';
                        tagsContainer.appendChild(morePill);
                    }
                    morePill.textContent = `+${extraTags.length}`;
                    morePill.setAttribute('title', `Additional technologies: ${hiddenNames}`);
                }
            }

            // Compact bottom links row
            let linksRow = card.querySelector('.portfolio-card-links');
            if (!linksRow) {
                const layerLinks = Array.from(card.querySelectorAll('.portfolio-layer a'));
                if (layerLinks.length > 0) {
                    linksRow = document.createElement('div');
                    linksRow.className = 'portfolio-card-links';

                    layerLinks.forEach(layerLink => {
                        const href = layerLink.getAttribute('href');
                        const isGithub = href.includes('github.com') || layerLink.querySelector('.fa-github') || (layerLink.getAttribute('title') || '').toLowerCase().includes('github');
                        const link = document.createElement('a');
                        link.href = href;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'portfolio-card-link';

                        if (isGithub) {
                            link.innerHTML = '<i class="fab fa-github" aria-hidden="true"></i> Code';
                            link.title = 'View Source Code';
                        } else {
                            link.innerHTML = '<i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo';
                            link.title = 'View Live Demo';
                        }
                        linksRow.appendChild(link);
                    });

                    const info = card.querySelector('.portfolio-info');
                    if (info) {
                        info.appendChild(linksRow);
                    }
                }
            }

            // 3D Tilt support on newly added cards
            if (!card.dataset.tiltInitialized) {
                card.dataset.tiltInitialized = 'true';
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const tiltX = (centerY - y) / 18;
                    const tiltY = (x - centerX) / 18;
                    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                });
            }
        });

        // 2. State & Display Management
        let isExpanded = false;
        let activeFilter = 'all';

        // Check if an active filter is already selected
        const currentActiveBtn = document.querySelector('.filter-btn.active');
        if (currentActiveBtn) {
            activeFilter = currentActiveBtn.getAttribute('data-filter') || 'all';
        }

        function updateProjectsView(animate = false) {
            const matchingCards = allCards.filter(card => {
                const categories = (card.getAttribute('data-category') || '').trim().split(/\s+/);
                return activeFilter === 'all' || categories.includes(activeFilter);
            });

            // Handle non-matching cards
            allCards.forEach(card => {
                if (!matchingCards.includes(card)) {
                    card.classList.add('is-filter-hidden', 'hide');
                    card.classList.remove('is-collapsed', 'is-revealing');
                }
            });

            // Handle matching cards
            matchingCards.forEach((card, index) => {
                card.classList.remove('is-filter-hidden', 'hide', 'fade-out');
                card.classList.add('visible');

                if (index < 6) {
                    card.classList.remove('is-collapsed', 'is-revealing');
                    card.style.opacity = '1';
                } else {
                    if (isExpanded) {
                        card.classList.remove('is-collapsed');
                        if (animate) {
                            card.classList.add('is-revealing');
                            card.style.animationDelay = `${Math.min((index - 6) * 40, 240)}ms`;
                        } else {
                            card.style.opacity = '1';
                        }
                    } else {
                        card.classList.add('is-collapsed');
                        card.classList.remove('is-revealing');
                    }
                }
            });

            if (animate) {
                setTimeout(() => {
                    allCards.forEach(c => {
                        c.classList.remove('is-revealing');
                        c.style.animationDelay = '';
                    });
                }, 350);
            }

            // Update button visibility and text
            if (showMoreBtn && showMoreWrapper) {
                const hiddenCount = Math.max(0, matchingCards.length - 6);
                if (hiddenCount > 0) {
                    showMoreWrapper.style.display = 'flex';
                    if (isExpanded) {
                        showMoreBtn.setAttribute('aria-expanded', 'true');
                        showMoreBtn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i> Show less';
                    } else {
                        showMoreBtn.setAttribute('aria-expanded', 'false');
                        showMoreBtn.innerHTML = `<i class="fas fa-chevron-down" aria-hidden="true"></i> Show more projects (${hiddenCount} more)`;
                    }
                } else {
                    showMoreWrapper.style.display = 'none';
                    showMoreBtn.setAttribute('aria-expanded', 'false');
                }
            }
        }

        // 3. Event Listeners
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!isExpanded) {
                    isExpanded = true;
                    updateProjectsView(!prefersReducedMotion);
                } else {
                    isExpanded = false;
                    updateProjectsView(false);
                    const projectsSec = document.getElementById('projects');
                    if (projectsSec) {
                        projectsSec.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                activeFilter = btn.getAttribute('data-filter') || 'all';
                isExpanded = false;
                updateProjectsView(false);
            });
        });

        // Initial setup
        updateProjectsView(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
/* PROJECTS-LAYOUT END */


