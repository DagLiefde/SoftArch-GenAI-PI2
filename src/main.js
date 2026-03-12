document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Buttons
    const languageSections = Array.from(document.querySelectorAll('section'));
    const languageSection = languageSections.find(s => s.textContent.includes('Programming Language'));
    if (languageSection) {
        const langButtons = languageSection.querySelectorAll('button');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                langButtons.forEach(b => {
                    b.classList.remove('glow-selection');
                    b.classList.add('hover:border-primary'); // add hover explicitly
                });
                btn.classList.add('glow-selection');
                btn.classList.remove('hover:border-primary'); // remove hover when selected
            });
        });
    }

    // 2. Build System
    const buildSystemSection = languageSections.find(s => s.textContent.includes('Build System'));
    if (buildSystemSection) {
        const buildButtons = buildSystemSection.querySelectorAll('button');
        buildButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                buildButtons.forEach(b => {
                    b.className = 'flex-1 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300';
                });
                btn.className = 'flex-1 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-panel-dark shadow-sm text-primary';
            });
        });
    }

    // 3. Framework
    const frameworkSection = languageSections.find(s => s.textContent.includes('Framework'));
    if (frameworkSection) {
        const fwLabels = frameworkSection.querySelectorAll('label');
        fwLabels.forEach(label => {
            label.addEventListener('click', () => {
                fwLabels.forEach(l => {
                    l.className = 'flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer transition-colors';
                    const icon = l.querySelector('.material-symbols-outlined');
                    if (icon) {
                        icon.textContent = 'radio_button_unchecked';
                        icon.className = 'material-symbols-outlined text-slate-300 dark:text-slate-700 text-xl';
                    }
                });
                label.className = 'flex items-center justify-between p-3 rounded-xl border border-primary/30 bg-primary/5 cursor-pointer';
                const icon = label.querySelector('.material-symbols-outlined');
                if (icon) {
                    icon.textContent = 'check_circle';
                    icon.className = 'material-symbols-outlined text-primary text-xl';
                }
            });
        });
    }

    // 4. Project Domain
    const domainHeaders = Array.from(document.querySelectorAll('h2'));
    const domainHeader = domainHeaders.find(h => h.textContent.includes('Project Domain'));
    if (domainHeader) {
        const domainSectionContainer = domainHeader.parentElement;
        const domainCards = domainSectionContainer.querySelectorAll('.group.cursor-pointer');
        domainCards.forEach(card => {
            card.addEventListener('click', () => {
                domainCards.forEach(c => {
                    c.className = 'relative group cursor-pointer p-4 rounded-2xl border-2 border-slate-100 dark:border-border-dark bg-white dark:bg-panel-dark flex flex-col gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-700';
                    const icon = c.querySelector('.material-symbols-outlined.absolute');
                    if (icon) icon.remove();
                });
                card.className = 'relative group cursor-pointer p-4 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col gap-3 transition-all hover:shadow-lg';
                if (!card.querySelector('.material-symbols-outlined.absolute')) {
                    card.insertAdjacentHTML('beforeend', '<span class="material-symbols-outlined absolute top-3 right-3 text-primary text-lg">verified</span>');
                }
            });
        });
    }

    // 5. Project Metadata -> Preview updates
    const inputs = document.querySelectorAll('input[type="text"]');
    let groupIdInput = Array.from(inputs).find(i => i.value === 'io.nexus.initializer');
    let artifactIdInput = Array.from(inputs).find(i => i.value === 'project-nexus-api');
    let previewCode = document.querySelector('code');

    if (groupIdInput && artifactIdInput && previewCode) {
        const updatePreview = () => {
            const artifactSafe = artifactIdInput.value.replace(/-/g, '_').toLowerCase();
            const groupSafe = groupIdInput.value.toLowerCase();
            previewCode.textContent = groupSafe + '.' + artifactSafe;
        };
        groupIdInput.addEventListener('input', updatePreview);
        artifactIdInput.addEventListener('input', updatePreview);
    }

    // 6. Navigation to Chat
    const generateBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Generate Chat'));
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            window.location.href = './chat.html';
        });
    }
});
